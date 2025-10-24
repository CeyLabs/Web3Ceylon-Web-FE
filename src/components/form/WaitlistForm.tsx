"use client";

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { useWaitlistModalStore } from "@/lib/zustand/stores";
import { Switch } from "@/components/ui/switch";
// use contact-form style pills for single-select profession

export interface WaitlistFormRef {
    submit: () => void;
    onSubmitAnimating?: (animating: boolean) => void;
}

const WaitlistForm = forwardRef<WaitlistFormRef>((_, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [clientData, setClientData] = useState({
        fullName: "",
        email: "",
        profession: "",
        consentToShareWithThirdParties: false,
    });
    const [errors, setErrors] = useState({
        fullName: false,
        email: false,
        consentToShareWithThirdParties: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const toggleModal = useWaitlistModalStore((state) => state.toggleModal);

    // Cleanup timeout on unmount
    useEffect(() => {
        const currentTimeout = timeoutRef.current;
        return () => {
            if (currentTimeout) {
                clearTimeout(currentTimeout);
            }
        };
    }, []);

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
            consentToShareWithThirdParties: !clientData.consentToShareWithThirdParties,
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
                    profession: clientData.profession,
                    consentToShareWithThirdParties: clientData.consentToShareWithThirdParties,
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
                profession: "",
                consentToShareWithThirdParties: false,
            });
            setErrors({
                fullName: false,
                email: false,
                consentToShareWithThirdParties: false,
            });

            // Close modal after successful submission
            timeoutRef.current = setTimeout(() => {
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
            <h2 className="font-instrument mb-[clamp(16px,3vw,32px)] text-[clamp(32px,5vw,72px)] leading-[1] font-semibold tracking-tight">
                <span className="text-zinc-200">Join the</span>{" "}
                <span className="text-zinc-100">Waitlist</span>
            </h2>

            <p className="mb-8 text-[clamp(16px,2vw,24px)] text-zinc-400">
                Be the first to know when Web3Ceylon returns in 2026. We'll notify you about
                upcoming events and exclusive updates.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                    <div
                        className={`flex h-28 w-full flex-col justify-center rounded-2xl border bg-white/5 px-6 py-4 backdrop-blur-sm transition-colors duration-300 focus-within:border-white/20 lg:h-32 lg:rounded-3xl 2xl:h-44 ${
                            errors.fullName ? "border-red-500" : "border-white/10"
                        }`}
                    >
                        <label
                            htmlFor="fullName"
                            className="text-[clamp(16px,1.2vw,24px)] font-semibold text-zinc-200"
                        >
                            Full name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={clientData.fullName}
                            onChange={(e) => {
                                setClientData({ ...clientData, fullName: e.target.value });
                                setErrors({ ...errors, fullName: false });
                            }}
                            placeholder="Kasun Fernando"
                            autoComplete="name"
                            aria-invalid={errors.fullName}
                            aria-describedby={errors.fullName ? "fullName-error" : undefined}
                            className="rounded-md bg-white/5 px-3 py-2 text-[clamp(18px,1.2vw,24px)] font-semibold text-zinc-100 ring-offset-zinc-900 backdrop-blur-sm placeholder:text-zinc-300 focus:ring-2 focus:ring-white/20 focus:outline-none"
                            disabled={isSubmitting}
                        />
                        {errors.fullName && (
                            <div id="fullName-error" className="mt-1 text-sm text-red-400">
                                Full name is required
                            </div>
                        )}
                    </div>

                    <div
                        className={`flex h-28 w-full flex-col justify-center rounded-2xl border bg-white/5 px-6 py-4 backdrop-blur-sm transition-colors duration-300 focus-within:border-white/20 lg:h-32 lg:rounded-3xl 2xl:h-44 ${
                            errors.email ? "border-red-500" : "border-white/10"
                        }`}
                    >
                        <label
                            htmlFor="email"
                            className="text-[clamp(16px,1.2vw,24px)] font-semibold text-zinc-200"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={clientData.email}
                            onChange={(e) => {
                                setClientData({ ...clientData, email: e.target.value });
                                setErrors({ ...errors, email: false });
                            }}
                            placeholder="kasun@example.com"
                            autoComplete="email"
                            aria-invalid={errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className="rounded-md bg-white/5 px-3 py-2 text-[clamp(18px,1.2vw,24px)] font-semibold text-zinc-100 ring-offset-zinc-900 backdrop-blur-sm placeholder:text-zinc-300 focus:ring-2 focus:ring-white/20 focus:outline-none"
                            disabled={isSubmitting}
                        />
                        {errors.email && (
                            <div id="email-error" className="mt-1 text-sm text-red-400">
                                Valid email address is required
                            </div>
                        )}
                    </div>

                    {/* full-width profession selector (contact-form style pills) */}
                    <div className="w-full md:col-span-2">
                        <label className="mb-2 block text-[clamp(14px,1vw,18px)] font-semibold text-zinc-200">
                            Profession / Industry
                        </label>
                        <ul className="flex w-full flex-wrap gap-2">
                            {[
                                { value: "web3", label: "Web3" },
                                { value: "finance", label: "Finance" },
                                { value: "retail", label: "Retail" },
                                { value: "it", label: "IT" },
                                { value: "education", label: "Education" },
                                { value: "other", label: "Other" },
                            ].map((opt) => (
                                <li
                                    key={opt.value}
                                    onClick={() =>
                                        setClientData({ ...clientData, profession: opt.value })
                                    }
                                    role="radio"
                                    aria-checked={clientData.profession === opt.value}
                                    className={`cursor-pointer rounded-full border-2 px-3.5 py-1.5 text-[clamp(14px,1vw,18px)] font-semibold transition-colors duration-300 ease-in-out 2xl:px-5 2xl:py-2 ${
                                        clientData.profession === opt.value
                                            ? "border-white/80 bg-white/80 text-zinc-900"
                                            : "border-white/10 text-zinc-200"
                                    }`}
                                >
                                    {opt.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {submitMessage && (
                    <div
                        className={`rounded-lg px-4 py-2 text-center text-[clamp(16px,1.5vw,20px)] font-semibold backdrop-blur-sm ${
                            submitMessage.includes("Successfully")
                                ? "border border-green-500/20 bg-green-500/10 text-green-400"
                                : "border border-red-500/20 bg-red-500/10 text-red-400"
                        }`}
                    >
                        {submitMessage}
                    </div>
                )}

                {/* Consent Switch */}
                <div className="flex flex-col gap-3">
                    <div className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 lg:rounded-3xl">
                        <Switch
                            id="consent"
                            name="consentToShareWithThirdParties"
                            checked={clientData.consentToShareWithThirdParties}
                            onCheckedChange={(checked) => {
                                setClientData({
                                    ...clientData,
                                    consentToShareWithThirdParties: checked,
                                });
                                setErrors({ ...errors, consentToShareWithThirdParties: false });
                            }}
                            aria-invalid={errors.consentToShareWithThirdParties}
                            aria-describedby={
                                errors.consentToShareWithThirdParties ? "consent-error" : undefined
                            }
                            disabled={isSubmitting}
                        />
                        <label
                            htmlFor="consent"
                            className="flex flex-1 cursor-pointer flex-col gap-1"
                        >
                            <span className="text-[clamp(14px,1vw,18px)] font-semibold text-zinc-200">
                                I consent to share my email
                            </span>
                            <span className="text-[clamp(12px,0.9vw,14px)] text-zinc-400">
                                For Web3Ceylon 2026 updates and event notifications
                            </span>
                        </label>
                    </div>
                    {errors.consentToShareWithThirdParties && (
                        <div id="consent-error" className="px-6 text-sm text-red-400">
                            Please consent to join the waitlist
                        </div>
                    )}
                </div>

                {/* Visually hidden submit button to keep Enter-key and AT support */}
                <button type="submit" className="sr-only" aria-hidden>
                    Submit
                </button>
            </form>
        </div>
    );
});

WaitlistForm.displayName = "WaitlistForm";

export default WaitlistForm;
