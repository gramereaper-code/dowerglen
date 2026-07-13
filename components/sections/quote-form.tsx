"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Mail, MessageCircle, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SITE, provinces, services } from "@/lib/site";
import { formatWhatsAppMessage } from "@/lib/utils";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  businessName: string;
  equipmentType: string;
  brand: string;
  problem: string;
  urgency: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  province: "",
  businessName: "",
  equipmentType: "",
  brand: "",
  problem: "",
  urgency: "Standard"
};

export function QuoteForm({ initialService = "" }: { initialService?: string }) {
  const [form, setForm] = useState<FormState>({ ...initialState, equipmentType: initialService });
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const payload = useMemo(
    () => ({
      "Full Name": form.fullName,
      Phone: form.phone,
      Email: form.email,
      Province: form.province,
      "Business Name": form.businessName,
      "Equipment Type": form.equipmentType,
      Brand: form.brand,
      Urgency: form.urgency,
      "Problem Description": form.problem,
      "Uploaded Images": files ? `${files.length} file(s) selected for email attachment/manual follow-up` : ""
    }),
    [files, form]
  );

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Valid email is required";
    if (!form.province) nextErrors.province = "Province is required";
    if (!form.equipmentType) nextErrors.equipmentType = "Equipment type is required";
    if (form.problem.trim().length < 12) nextErrors.problem = "Please add a short fault description";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const whatsappHref = SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${formatWhatsAppMessage(payload)}`
    : `https://wa.me/?text=${formatWhatsAppMessage(payload)}`;

  const emailHref = SITE.email
    ? `mailto:${SITE.email}?subject=${encodeURIComponent("Rasheed Repairs Quote Request")}&body=${formatWhatsAppMessage(payload)}`
    : `mailto:?subject=${encodeURIComponent("Rasheed Repairs Quote Request")}&body=${formatWhatsAppMessage(payload)}`;

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-insetGlow md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" error={errors.fullName}>
          <Input value={form.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Your full name" autoComplete="name" />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <Input value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+27..." autoComplete="tel" />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" autoComplete="email" />
        </Field>
        <Field label="Province" error={errors.province}>
          <Select value={form.province} onChange={(event) => update("province", event.target.value)}>
            <option value="">Select province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Business Name">
          <Input value={form.businessName} onChange={(event) => update("businessName", event.target.value)} placeholder="Restaurant, store or home" />
        </Field>
        <Field label="Equipment Type" error={errors.equipmentType}>
          <Select value={form.equipmentType} onChange={(event) => update("equipmentType", event.target.value)}>
            <option value="">Select equipment</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Brand">
          <Input value={form.brand} onChange={(event) => update("brand", event.target.value)} placeholder="Brand or model if known" />
        </Field>
        <Field label="Urgency Level">
          <Select value={form.urgency} onChange={(event) => update("urgency", event.target.value)}>
            <option>Emergency</option>
            <option>Priority</option>
            <option>Standard</option>
            <option>Maintenance Planning</option>
          </Select>
        </Field>
      </div>

      <Field label="Problem Description" error={errors.problem}>
        <Textarea value={form.problem} onChange={(event) => update("problem", event.target.value)} placeholder="Describe the fault, symptoms, and when it started." />
      </Field>

      <label className="focus-within:border-electric/60 group grid min-h-36 cursor-pointer place-items-center rounded-lg border border-dashed border-white/16 bg-white/[0.03] p-6 text-center transition hover:border-electric/50">
        <input
          type="file"
          multiple
          accept="image/*"
          className="sr-only"
          onChange={(event) => setFiles(event.target.files)}
        />
        <span className="grid place-items-center gap-3">
          <UploadCloud className="text-electric" size={30} />
          <span className="font-bold uppercase text-white">Upload Images</span>
          <span className="text-sm text-smoke/58">
            {files ? `${files.length} image file(s) selected` : "Photos help speed up diagnostics"}
          </span>
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg">
          Submit Quote Request
          <CheckCircle2 size={18} />
        </Button>
        <Button asChild type="button" size="lg" variant="secondary">
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp Request
            <MessageCircle size={18} />
          </a>
        </Button>
        <Button asChild type="button" size="lg" variant="secondary">
          <a href={emailHref}>
            Email Request
            <Mail size={18} />
          </a>
        </Button>
      </div>

      {submitted ? (
        <div className="rounded-lg border border-reactor/40 bg-reactor/10 p-5 text-sm leading-7 text-smoke">
          <strong className="text-white">Quote request prepared.</strong> Since no verified business email or WhatsApp number was provided, use the WhatsApp or email button to send the request from this laptop with your preferred contact details.
        </div>
      ) : null}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase text-smoke/62">{label}</span>
      {children}
      {error ? <span className="text-xs font-semibold text-red-300">{error}</span> : null}
    </label>
  );
}
