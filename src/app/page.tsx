import Link from "next/link";
import { ContactForm } from "./contact-form";

const services = [
  {
    title: "Self-Defense Training",
    description:
      "Practical, hands-on self-defense techniques tailored to real-world scenarios. Build confidence and learn to protect yourself effectively.",
    icon: "🛡️",
  },
  {
    title: "Defensive Tactics",
    description:
      "Professional defensive tactics training for law enforcement and security personnel. Control-based techniques that prioritize safety.",
    icon: "⚔️",
  },
  {
    title: "De-Escalation Training",
    description:
      "Learn verbal and non-verbal communication strategies to defuse conflict before it becomes physical. Essential for all professionals.",
    icon: "🤝",
  },
  {
    title: "Corporate & Group Training",
    description:
      "On-site training sessions for organizations, schools, and community groups. We come to you with customized programs.",
    icon: "🏢",
  },
];

const instructors = [
  {
    name: "Training Staff",
    role: "Lead Instructor",
    bio: "Experienced self-defense and defensive tactics instructor with a background in law enforcement and security training. Passionate about empowering individuals through practical safety skills.",
  },
  {
    name: "Guest Instructors",
    role: "Specialized Training",
    bio: "We partner with experienced professionals in martial arts, law enforcement, and emergency response to deliver specialized workshops and advanced training sessions.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Safety Through Training
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Mobile self-defense, defensive tactics, and de-escalation training
            for individuals, organizations, law enforcement, and security
            personnel. We come to you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/book"
              className="bg-accent hover:bg-accent-hover px-8 py-3 rounded text-lg font-semibold transition-colors"
            >
              Book a Session
            </Link>
            <Link
              href="#services"
              className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded text-lg font-semibold transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-card-bg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-muted text-center mb-12 max-w-xl mx-auto">
            We offer a range of training programs designed to meet the needs of
            individuals and organizations alike.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section id="instructors" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Meet the Team
          </h2>
          <p className="text-muted text-center mb-12 max-w-xl mx-auto">
            Our instructors bring real-world experience to every training
            session.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {instructors.map((instructor) => (
              <div
                key={instructor.name}
                className="text-center border border-border rounded-lg p-8"
              >
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {instructor.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold">{instructor.name}</h3>
                <p className="text-accent font-medium mb-3">
                  {instructor.role}
                </p>
                <p className="text-muted text-sm">{instructor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card-bg">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Get in Touch</h2>
          <p className="text-muted text-center mb-8">
            Have questions or want to learn more? Send us a message and
            we&apos;ll get back to you promptly.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
