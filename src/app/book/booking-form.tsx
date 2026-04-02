"use client";

import { useState } from "react";
import Link from "next/link";

const serviceOptions = [
  { value: "self-defense", label: "Self-Defense Training" },
  { value: "defensive-tactics", label: "Defensive Tactics" },
  { value: "de-escalation", label: "De-Escalation Training" },
  { value: "corporate", label: "Corporate & Group Training" },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

type Step = "service" | "details" | "confirm";

export function BookingForm() {
  const [step, setStep] = useState<Step>("service");
  const [service, setService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    participants: "1",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleFieldChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service }),
      });
      if (!res.ok) throw new Error("Failed to book");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (status === "sent") {
    return (
      <div className="text-center py-12 border border-border rounded-lg">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">Booking Request Submitted!</h2>
        <p className="text-muted mb-2">
          <strong>Service:</strong> {serviceOptions.find((s) => s.value === service)?.label}
        </p>
        <p className="text-muted mb-2">
          <strong>Date:</strong> {formData.date} at {formData.time}
        </p>
        <p className="text-muted mb-6">
          We&apos;ll confirm your session within 24 hours via email.
        </p>
        <Link
          href="/"
          className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {(["service", "details", "confirm"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s
                  ? "bg-accent text-white"
                  : (["service", "details", "confirm"].indexOf(step) > i)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-muted"
              }`}
            >
              {["service", "details", "confirm"].indexOf(step) > i ? "✓" : i + 1}
            </div>
            <span className={`text-sm ${step === s ? "font-semibold" : "text-muted"}`}>
              {s === "service" ? "Service" : s === "details" ? "Details" : "Confirm"}
            </span>
            {i < 2 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Service */}
      {step === "service" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
          {serviceOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setService(opt.value)}
              className={`w-full text-left border rounded-lg p-4 transition-colors ${
                service === opt.value
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
          <button
            onClick={() => setStep("details")}
            disabled={!service}
            className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded font-semibold transition-colors disabled:opacity-50 mt-4"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Details */}
      {step === "details" && (
        <div className="space-y-5">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                required
                className="w-full border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                required
                className="w-full border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              className="w-full border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">Preferred Date *</label>
              <input
                type="date"
                id="date"
                min={minDate}
                value={formData.date}
                onChange={(e) => handleFieldChange("date", e.target.value)}
                required
                className="w-full border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-1">Preferred Time *</label>
              <select
                id="time"
                value={formData.time}
                onChange={(e) => handleFieldChange("time", e.target.value)}
                required
                className="w-full border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white"
              >
                <option value="">Select a time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="participants" className="block text-sm font-medium mb-1">
              Number of Participants
            </label>
            <input
              type="number"
              id="participants"
              min="1"
              max="50"
              value={formData.participants}
              onChange={(e) => handleFieldChange("participants", e.target.value)}
              className="w-full border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => handleFieldChange("notes", e.target.value)}
              className="w-full border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Any special requirements or questions..."
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setStep("service")}
              className="flex-1 border border-border py-3 rounded font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep("confirm")}
              disabled={!formData.name || !formData.email || !formData.date || !formData.time}
              className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 rounded font-semibold transition-colors disabled:opacity-50"
            >
              Review Booking
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === "confirm" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
          <div className="border border-border rounded-lg p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted">Service</span>
              <span className="font-medium">
                {serviceOptions.find((s) => s.value === service)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Name</span>
              <span className="font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Email</span>
              <span className="font-medium">{formData.email}</span>
            </div>
            {formData.phone && (
              <div className="flex justify-between">
                <span className="text-muted">Phone</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted">Date</span>
              <span className="font-medium">{formData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Time</span>
              <span className="font-medium">{formData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Participants</span>
              <span className="font-medium">{formData.participants}</span>
            </div>
            {formData.notes && (
              <div>
                <span className="text-muted">Notes</span>
                <p className="font-medium mt-1">{formData.notes}</p>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setStep("details")}
              className="flex-1 border border-border py-3 rounded font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 rounded font-semibold transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-red-600 text-center text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
