import { ContactForm, SocialLinks } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-space mb-4">Contact</h1>
          <p className="text-text-secondary text-lg">Let&apos;s build something meaningful together.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
            Available for new projects
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <section className="space-y-8">
          <div className="glass p-8">
            <h2 className="text-2xl font-space mb-8">Send a Message</h2>
            <ContactForm />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-space">Connect Elsewhere</h2>
          {/* SocialLinks is a self-contained client component — no function props cross the boundary */}
          <SocialLinks />

          <div className="glass p-8 bg-accent-gold/5 border-accent-gold/20">
            <h3 className="text-accent-gold font-space font-bold mb-2">Office Hours</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Based in Kigali (GMT+2). I usually respond to all inquiries within 24 hours. For
              urgent matters, reach out via WhatsApp.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
