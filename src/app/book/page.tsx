import { BookingForm } from "./booking-form";

export const metadata = {
  title: "Book a Session | Incite Defense",
  description: "Schedule a self-defense, defensive tactics, or de-escalation training session.",
};

export default function BookPage() {
  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">Book a Training Session</h1>
        <p className="text-muted text-center mb-10">
          Select a service, pick your preferred date and time, and submit your request.
          We&apos;ll confirm your session within 24 hours.
        </p>
        <BookingForm />
      </div>
    </section>
  );
}
