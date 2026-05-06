import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Linkedin, Twitter, MessageSquare, Github } from "lucide-react";

const socialCards = [
  { 
    name: "Email", 
    value: "manzisonny81@gmail.com", 
    href: "mailto:manzisonny81@gmail.com", 
    icon: Mail,
    color: "text-red-400"
  },
  { 
    name: "LinkedIn", 
    value: "/in/manzi-sonny-034566408", 
    href: "https://www.linkedin.com/in/manzi-sonny-034566408/", 
    icon: Linkedin,
    color: "text-blue-400"
  },
  { 
    name: "Twitter/X", 
    value: "@sonny_manzi73001", 
    href: "https://twitter.com/sonny_manzi73001", 
    icon: Twitter,
    color: "text-sky-400"
  },
  { 
    name: "WhatsApp", 
    value: "+250 791385768", 
    href: "https://wa.me/250791385768", 
    icon: MessageSquare,
    color: "text-green-400"
  },
  { 
    name: "GitHub", 
    value: "manzisonny", 
    href: "https://github.com/manzisonny", 
    icon: Github,
    color: "text-white"
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-space mb-4">Contact</h1>
          <p className="text-text-secondary text-lg">Let's build something meaningful together.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Available for new projects</span>
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
          <div className="grid grid-cols-1 gap-4">
            {socialCards.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 flex items-center gap-6 group hover:border-accent-purple/50 transition-all"
              >
                <div className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform ${social.color}`}>
                  <social.icon size={28} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">{social.name}</p>
                  <p className="text-lg font-space group-hover:text-accent-purple transition-colors">{social.value}</p>
                </div>
              </a>
            ))}
          </div>
          
          <div className="glass p-8 bg-accent-gold/5 border-accent-gold/20">
            <h3 className="text-accent-gold font-space font-bold mb-2">Office Hours</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Based in Kigali (GMT+2). I usually respond to all inquiries within 24 hours. 
              For urgent matters, reach out via WhatsApp.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
