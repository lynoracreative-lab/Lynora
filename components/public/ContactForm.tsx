"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BUDGET_OPTIONS, CONTACT_METHODS, SERVICE_OPTIONS } from "@/lib/constants";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-[18px] border border-gold/15 bg-ink px-4 py-3 text-sm text-ivory outline-none transition focus:border-gold/50";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      website: "",
      service: (SERVICE_OPTIONS.includes(defaultService as (typeof SERVICE_OPTIONS)[number])
        ? defaultService
        : SERVICE_OPTIONS[0]) as ContactInput["service"],
      budget: BUDGET_OPTIONS[2],
      message: "",
      preferredContact: "Email",
    },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setStatus("error");
      setMessage(data.error || "Something went wrong. Please try again or WhatsApp us.");
      return;
    }
    setStatus("success");
    setMessage("Thank you. Your enquiry has been received. We will be in touch shortly.");
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs tracking-[0.16em] uppercase text-stone">
          Name
          <input className={cn(fieldClass, "mt-2")} {...form.register("name")} />
          {form.formState.errors.name ? (
            <span className="mt-1 block text-[0.7rem] normal-case tracking-normal text-red-300">
              {form.formState.errors.name.message}
            </span>
          ) : null}
        </label>
        <label className="text-xs tracking-[0.16em] uppercase text-stone">
          Business Name
          <input className={cn(fieldClass, "mt-2")} {...form.register("businessName")} />
          {form.formState.errors.businessName ? (
            <span className="mt-1 block text-[0.7rem] normal-case tracking-normal text-red-300">
              {form.formState.errors.businessName.message}
            </span>
          ) : null}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs tracking-[0.16em] uppercase text-stone">
          Email
          <input type="email" className={cn(fieldClass, "mt-2")} {...form.register("email")} />
          {form.formState.errors.email ? (
            <span className="mt-1 block text-[0.7rem] normal-case tracking-normal text-red-300">
              {form.formState.errors.email.message}
            </span>
          ) : null}
        </label>
        <label className="text-xs tracking-[0.16em] uppercase text-stone">
          Phone / WhatsApp
          <input className={cn(fieldClass, "mt-2")} {...form.register("phone")} />
          {form.formState.errors.phone ? (
            <span className="mt-1 block text-[0.7rem] normal-case tracking-normal text-red-300">
              {form.formState.errors.phone.message}
            </span>
          ) : null}
        </label>
      </div>
      <label className="text-xs tracking-[0.16em] uppercase text-stone">
        Website
        <input className={cn(fieldClass, "mt-2")} placeholder="https://" {...form.register("website")} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs tracking-[0.16em] uppercase text-stone">
          Service Interested In
          <select className={cn(fieldClass, "mt-2")} {...form.register("service")}>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs tracking-[0.16em] uppercase text-stone">
          Budget
          <select className={cn(fieldClass, "mt-2")} {...form.register("budget")}>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="text-xs tracking-[0.16em] uppercase text-stone">
        Project details
        <textarea rows={6} className={cn(fieldClass, "mt-2 resize-y")} {...form.register("message")} />
        {form.formState.errors.message ? (
          <span className="mt-1 block text-[0.7rem] normal-case tracking-normal text-red-300">
            {form.formState.errors.message.message}
          </span>
        ) : null}
      </label>
      <fieldset className="text-xs tracking-[0.16em] uppercase text-stone">
        <legend>Preferred contact method</legend>
        <div className="mt-3 flex gap-4">
          {CONTACT_METHODS.map((method) => (
            <label key={method} className="flex items-center gap-2 text-ivory">
              <input type="radio" value={method} {...form.register("preferredContact")} />
              {method}
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="mt-2 rounded-full bg-gold px-6 py-3 text-[0.72rem] tracking-[0.2em] uppercase text-ink transition hover:bg-gold-light disabled:opacity-60"
      >
        {form.formState.isSubmitting ? "Sending..." : "Send Project Enquiry"}
      </button>
      {status !== "idle" ? (
        <p className={status === "success" ? "text-sm text-gold-light" : "text-sm text-red-300"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
