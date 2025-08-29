"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { volunteerAreas, availabilityOptions } from "@/data/volunteerForm";
import { useContactModalStore } from "@/lib/zustand/stores";

export interface ContactFormRef {
  submit: () => void;
}

const ContactForm = forwardRef<ContactFormRef>((_, ref) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [areas, setAreas] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
    message: false,
    areas: false,
    availability: false,
  });
  const toggleModal = useContactModalStore((state) => state.toggleModal);

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    },
  }));

  const toggleArea = (area: string) => {
    setAreas((prev) =>
      prev.includes(area) ? prev.filter((s) => s !== area) : [...prev, area]
    );
    setErrors((e) => ({ ...e, areas: false }));
  };

  const toggleAvailability = (slot: string) => {
    setAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
    setErrors((e) => ({ ...e, availability: false }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: clientData.name.trim() === "",
      email: clientData.email.trim() === "",
      phone: clientData.phone.trim() === "",
      company: false, // optional
      message: clientData.message.trim() === "",
      areas: areas.length === 0,
      availability: availability.length === 0,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY as
        | string
        | undefined;
      const endpointEnv = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT as
        | string
        | undefined;

      if (web3Key) {
        // Web3Forms path (no backend needed)
        const resp = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: "Volunteer with Web3Ceylon 2025",
            program: "Volunteer with Web3Ceylon 2025",
            name: clientData.name,
            email: clientData.email,
            phone: clientData.phone,
            company: clientData.company || "",
            message: clientData.message,
            areas: areas.join(", "),
            availability: availability.join(", "),
          }),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok || (data && data.success === false)) {
          throw new Error(
            `Submit failed: ${resp.status} ${data?.message || "Unknown error"}`
          );
        }
      } else if (endpointEnv) {
        // Custom backend endpoint path
        const resp = await fetch(endpointEnv, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            program: "Volunteer with Web3Ceylon 2025",
            name: clientData.name,
            email: clientData.email,
            phone: clientData.phone,
            company: clientData.company || undefined,
            message: clientData.message,
            areas,
            availability,
          }),
        });
        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Submit failed: ${resp.status} ${text}`);
        }
      } else {
        // Dev fallback
        console.warn(
          "No endpoint configured. Set NEXT_PUBLIC_WEB3FORMS_KEY or NEXT_PUBLIC_CONTACT_ENDPOINT."
        );
        await new Promise((res) => setTimeout(res, 300));
        console.log("Form submitted (dev):", {
          clientData,
          areas,
          availability,
        });
      }
      setClientData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      setAreas([]);
      setAvailability([]);
      setErrors({
        name: false,
        email: false,
        phone: false,
        company: false,
        message: false,
        areas: false,
        availability: false,
      });
      toggleModal();
    } catch (err) {
      console.error("Failed to submit form", err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-[clamp(32px,5vw,72px)] font-instrument font-semibold tracking-tight mb-[clamp(16px,3vw,32px)] leading-[1]">
        <span className="text-[#9A5A3A]">Volunteer</span>{" "}
        <span className="text-[#5E2A1B]">with Web3Ceylon 2025</span>
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 h-full"
      >
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <div
            className={`flex flex-col justify-end w-full lg:w-1/4 px-6 py-4 h-28 lg:h-32 2xl:h-44 rounded-2xl lg:rounded-3xl bg-[#EEE4D7] border-3 transition-colors duration-300 focus-within:border-[#7B3F00] ${
              errors.name ? "border-[#d40101]" : "border-[#7B3F00]/0"
            }`}
          >
            <label
              htmlFor="name"
              className="text-[#7B3F00] font-semibold text-[clamp(16px,1.2vw,24px)]"
            >
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={clientData.name}
              onChange={(e) => {
                setClientData({ ...clientData, name: e.target.value });
                setErrors({ ...errors, name: false });
              }}
              placeholder="Kasun Fernando"
              className="text-[#7B3F00] font-semibold placeholder:text-[#7B3F00]/40 text-[clamp(18px,1.2vw,24px)] focus:outline-none bg-white/40 rounded-lg px-2 py-1"
            />
          </div>
          <div
            className={`flex flex-col justify-end w-full lg:w-1/4 px-6 py-4 h-28 lg:h-32 2xl:h-44 rounded-2xl lg:rounded-3xl bg-[#EEE4D7] border-3 transition-colors duration-300 focus-within:border-[#7B3F00] ${
              errors.email ? "border-[#d40101]" : "border-[#7B3F00]/0"
            }`}
          >
            <label
              htmlFor="email"
              className="text-[#7B3F00] font-semibold text-[clamp(16px,1.2vw,24px)]"
            >
              Email
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
              className="text-[#7B3F00] font-semibold placeholder:text-[#7B3F00]/40 text-[clamp(18px,1.2vw,24px)] focus:outline-none bg-white/40 rounded-lg px-2 py-1"
            />
          </div>
          <div
            className={`flex flex-col justify-end w-full lg:w-1/4 px-6 py-4 h-28 lg:h-32 2xl:h-44 rounded-2xl lg:rounded-3xl bg-[#EEE4D7] border-3 transition-colors duration-300 focus-within:border-[#7B3F00] ${
              errors.phone ? "border-[#d40101]" : "border-[#7B3F00]/0"
            }`}
          >
            <label
              htmlFor="phone"
              className="text-[#7B3F00] font-semibold text-[clamp(16px,1.2vw,24px)]"
            >
              Contact Number
            </label>
            <input
              type="tel"
              name="phone"
              value={clientData.phone}
              onChange={(e) => {
                setClientData({ ...clientData, phone: e.target.value });
                setErrors({ ...errors, phone: false });
              }}
              placeholder="+94 123456789"
              className="text-[#7B3F00] font-semibold placeholder:text-[#7B3F00]/40 text-[clamp(18px,1.2vw,24px)] focus:outline-none bg-white/40 rounded-lg px-2 py-1"
            />
          </div>
          <div
            className={`flex flex-col justify-end w-full lg:w-1/4 px-6 py-4 h-28 lg:h-32 2xl:h-44 rounded-2xl lg:rounded-3xl bg-[#EEE4D7] border-3 transition-colors duration-300 focus-within:border-[#7B3F00] ${
              errors.company ? "border-[#d40101]" : "border-[#7B3F00]/0"
            }`}
          >
            <label
              htmlFor="company"
              className="text-[#7B3F00] font-semibold text-[clamp(16px,1.2vw,24px)]"
            >
              Company / Organization (optional)
            </label>
            <input
              type="text"
              name="company"
              value={clientData.company}
              onChange={(e) => {
                setClientData({ ...clientData, company: e.target.value });
              }}
              placeholder="ABC Innovations"
              className="text-[#7B3F00] font-semibold placeholder:text-[#7B3F00]/40 text-[clamp(18px,1.2vw,24px)] focus:outline-none bg-white/40 rounded-lg px-2 py-1"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-full h-full">
          <div
            className={`flex flex-col w-full lg:w-1/2 px-6 pt-10 lg:pt-12 pb-4 h-72 lg:h-full rounded-2xl lg:rounded-3xl bg-[#EEE4D7] border-3 transition-colors duration-300 focus-within:border-[#7B3F00] ${
              errors.message ? "border-[#d40101]" : "border-[#7B3F00]/0"
            }`}
          >
            <label
              htmlFor="message"
              className="text-[#7B3F00] font-semibold text-[clamp(16px,1.2vw,24px)] mb-2"
            >
              How can you help?
            </label>
            <textarea
              name="message"
              value={clientData.message}
              onChange={(e) => {
                setClientData({ ...clientData, message: e.target.value });
                setErrors({ ...errors, message: false });
              }}
              placeholder="Tell us how you’d like to contribute"
              className="text-[#7B3F00] font-semibold placeholder:text-[#7B3F00]/40 text-[clamp(18px,1.2vw,24px)] leading-tight focus:outline-none h-full resize-none bg-white/40 rounded-lg px-2 py-2"
            />
          </div>
          <div
            className={`flex flex-col w-full lg:w-1/4 px-6 pt-10 lg:pt-12 pb-6 lg:h-full rounded-2xl lg:rounded-3xl bg-[#EEE4D7] border-3 transition-colors duration-300 ${
              errors.areas ? "border-[#d40101]" : "border-[#7B3F00]/0"
            }`}
          >
            <label
              htmlFor="areas"
              className="text-[#7B3F00] font-semibold text-[clamp(16px,1.2vw,24px)] mb-2 lg:mb-4"
            >
              Volunteer Area(s)
            </label>
            <ul className="flex flex-wrap gap-2 w-full">
              {volunteerAreas.map((area) => (
                <li
                  key={area}
                  onClick={() => toggleArea(area)}
                  className={`px-3.5 2xl:px-5 py-1.5 2xl:py-2 text-[clamp(14px,1vw,18px)] font-semibold rounded-full border-2 border-[#7B3F00] cursor-pointer transition-colors duration-300 ease-in-out ${
                    areas.includes(area)
                      ? "text-[#EEE4D7] bg-[#7B3F00]"
                      : "text-[#7B3F00]"
                  }`}
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`flex flex-col w-full lg:w-1/4 px-6 pt-10 lg:pt-12 pb-6 h-96 lg:h-full rounded-2xl lg:rounded-3xl bg-[#EEE4D7] border-3 transition-colors duration-300 ${
              errors.availability ? "border-[#d40101]" : "border-[#7B3F00]/0"
            }`}
          >
            <label
              htmlFor="availability"
              className="text-[#7B3F00] font-semibold text-[clamp(16px,1.2vw,24px)] mb-2 lg:mb-4"
            >
              Availability
            </label>
            <ul className="flex flex-wrap gap-2 w-full">
              {availabilityOptions.map((slot) => (
                <li
                  key={slot}
                  onClick={() => toggleAvailability(slot)}
                  className={`px-3.5 2xl:px-5 py-1.5 2xl:py-2 text-[clamp(14px,1vw,18px)] font-semibold rounded-full border-2 border-[#7B3F00] cursor-pointer transition-colors duration-300 ease-in-out ${
                    availability.includes(slot)
                      ? "text-[#EEE4D7] bg-[#7B3F00]"
                      : "text-[#7B3F00]"
                  }`}
                >
                  {slot}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
