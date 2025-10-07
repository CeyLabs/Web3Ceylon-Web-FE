import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const SYSTEM_PROMPT = `
You are a social media expert for attendees of Web3Ceylon Sri Lanka events.
Provide clear, simple, and concise tweeter post relevant for users in Sri Lanka.
Keep your responses short and sweet - strictly under 150 characters compatible for tweet post without hashtags.
Use plain text only - NO markdown, NO bullet points, NO asterisks, NO special formatting.
Write in short, easy-to-read sentences with simple paragraphs.
Highlight any important requirements, limits, or compliance reminders in a friendly, conversational tone.
`;
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
    if (!process.env.OPENAI_API_KEY) {
        return new Response(
            JSON.stringify({
                error: "OPENAI_API_KEY is not set in the environment.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    let prompt: string | undefined;

    try {
        const body = await req.json();
        if (typeof body?.prompt === "string") {
            prompt = body.prompt.trim();
        } else if (typeof body?.question === "string") {
            prompt = body.question.trim();
        }
    } catch (error) {
        console.error("Invalid JSON payload received for Bybit assistant:", error);
        return new Response(
            JSON.stringify({
                error: "Invalid request payload.",
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    if (!prompt) {
        return new Response(
            JSON.stringify({
                error: "A prompt is required to generate a response.",
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    try {
        const openai = createOpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await streamText({
            model: openai("gpt-4o-mini"),
            temperature: 0.4,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: prompt },
            ],
        });

        return result.toAIStreamResponse();
    } catch (error) {
        console.error("Failed to generate Bybit assistant response:", error);
        return new Response(
            JSON.stringify({
                error: "Unable to generate a response at this time. Please try again later.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}
