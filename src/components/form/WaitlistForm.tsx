"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useWaitlistModalStore } from "@/lib/zustand/stores";

export interface WaitlistFormRef {
    submit: () => void;
}

const WaitlistForm = forwardRef<WaitlistFormRef>((_, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [clientData, setClientData] = useState({
        fullName: "",
        email: "",
    });
    const [attendance, setAttendance] = useState<string>("");
    const [errors, setErrors] = useState({
        fullName: false,
        email: false,
        attendance: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const toggleModal = useWaitlistModalStore((state) => state.toggleModal);

    useImperativeHandle(ref, () => ({
        submit: () => {
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        },
    }));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            fullName: clientData.fullName.trim() === "",
            email: clientData.email.trim() === "",
            attendance: attendance === "",
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;

        setIsSubmitting(true);
        setSubmitMessage("");

        try {
            const resp = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: clientData.fullName,
                    email: clientData.email,
                    attendance: attendance,
                }),
            });

            const payload = await resp.json().catch(async () => ({ error: await resp.text() }));

            if (!resp.ok || (payload && payload.success === false)) {
                const message =
                    (payload && (payload.message || payload.error)) || `HTTP ${resp.status}`;
                throw new Error(`Submit failed: ${message}`);
            }

            setSubmitMessage("Successfully joined the waitlist!");
            setClientData({
                fullName: "",
                email: "",
            });
            setAttendance("");
            setErrors({
                fullName: false,
                email: false,
                attendance: false,
            });

            // Close modal after successful submission
            setTimeout(() => {
                toggleModal();
                setSubmitMessage("");
            }, 2000);
        } catch (err) {
            console.error("Failed to submit form", err);
            setSubmitMessage("Failed to join waitlist. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex h-full flex-col">
            <h2 className="font-primary mb-[clamp(16px,3vw,32px)] text-[clamp(32px,5vw,72px)] leading-[1] font-semibold tracking-tight">
                <span className="text-zinc-200">Join the</span>{" "}
                <span className="text-zinc-100">Waitlist</span>
            </h2>

            <p className="font-secondary mb-8 text-[clamp(16px,2vw,24px)] text-zinc-400">
                Be the first to know when Web3Ceylon returns in 2026. We'll notify you about
                upcoming events and exclusive updates.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div
                        className={`flex h-28 w-full flex-col justify-end rounded-2xl border-3 bg-zinc-900/50 px-6 py-4 transition-colors duration-300 focus-within:border-zinc-400 lg:h-32 lg:rounded-3xl 2xl:h-44 ${
                            errors.fullName ? "border-red-500" : "border-zinc-700"
                        }`}
                    >
                        <label
                            htmlFor="fullName"
                            className="text-[clamp(16px,1.2vw,24px)] font-semibold text-zinc-200"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={clientData.fullName}
                            onChange={(e) => {
                                setClientData({ ...clientData, fullName: e.target.value });
                                setErrors({ ...errors, fullName: false });
                            }}
                            placeholder="Kasun Fernando"
                            className="rounded-lg bg-zinc-800/50 px-2 py-1 text-[clamp(18px,1.2vw,24px)] font-semibold text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div
                        className={`flex h-28 w-full flex-col justify-end rounded-2xl border-3 bg-zinc-900/50 px-6 py-4 transition-colors duration-300 focus-within:border-zinc-400 lg:h-32 lg:rounded-3xl 2xl:h-44 ${
                            errors.email ? "border-red-500" : "border-zinc-700"
                        }`}
                    >
                        <label
                            htmlFor="email"
                            className="text-[clamp(16px,1.2vw,24px)] font-semibold text-zinc-200"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={clientData.email}
                            onChange={(e) => {
                                setClientData({ ...clientData, email: e.target.value });
                                setErrors({ ...errors, email: false });
                            }}
                            placeholder="kasun@example.com"
                            className="rounded-lg bg-zinc-800/50 px-2 py-1 text-[clamp(18px,1.2vw,24px)] font-semibold text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="text-[clamp(16px,1.2vw,24px)] font-semibold text-zinc-200">
                            Have you attended any 2025 edition of Web3Ceylon?
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {["Yes", "No", "Haven't, but I'm interested!"].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        setAttendance(option);
                                        setErrors({ ...errors, attendance: false });
                                    }}
                                    disabled={isSubmitting}
                                    className={`rounded-full border-2 px-4 py-2 text-[clamp(14px,1vw,18px)] font-semibold transition-colors duration-300 ${
                                        attendance === option
                                            ? "border-zinc-400 bg-zinc-400 text-black"
                                            : "border-zinc-600 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500"
                                    } ${errors.attendance ? "border-red-500" : ""} disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {submitMessage && (
                    <div
                        className={`rounded-lg px-4 py-2 text-center text-[clamp(16px,1.5vw,20px)] font-semibold ${
                            submitMessage.includes("Successfully")
                                ? "border border-green-700 bg-green-900/20 text-green-400"
                                : "border border-red-700 bg-red-900/20 text-red-400"
                        }`}
                    >
                        {submitMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-[clamp(18px,1.5vw,24px)] font-semibold text-white transition-all duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 lg:h-32 lg:rounded-3xl 2xl:h-44"
                >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
            </form>
        </div>
    );
});

WaitlistForm.displayName = "WaitlistForm";

export default WaitlistForm;
