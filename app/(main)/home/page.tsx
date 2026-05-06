import { StatCard, ServiceCard } from "@/components/home/HomeComponents";
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Palette, 
  Layers, 
  Terminal,
  ShieldCheck,
  Zap,
  Users
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Years Coding", value: "3+" },
  { label: "Projects Built", value: "15+" },
  { label: "GitHub Accounts", value: "2" },
  { label: "Company Founded", value: "1" },
];

const services = [
  { title: "Web Development", description: "Modern, high-performance web applications built with Next.js and React.", icon: Globe },
  { title: "Mobile Apps", description: "Cross-platform mobile experiences using React Native and Flutter.", icon: Smartphone },
  { title: "API Development", description: "Scalable backend systems and RESTful APIs with Node.js and GraphQL.", icon: Terminal },
  { title: "UI/UX Design", description: "Premium, user-centric interfaces designed with Figma and implemented with CSS.", icon: Palette },
  { title: "DevOps & Deployment", description: "Automated CI/CD pipelines and cloud infrastructure management.", icon: Layers },
  { title: "Tech Mentoring", description: "Guiding the next generation of developers through code reviews and advice.", icon: Code2 },
];

const values = [
  { title: "Integrity First", description: "I don't work like an employee. I work like an owner. Honesty is my core stack.", icon: ShieldCheck },
  { title: "Built to Last", description: "Clean, scalable, and maintainable code that grows with your vision.", icon: Zap },
  { title: "People > Technology", description: "Software is a tool for humans. I build solutions that solve real human problems.", icon: Users },
];

const hobbies = [
  { name: "Music", icon: "🎵", text: "Playing and producing beats." },
  { name: "Sports", icon: "⚽", text: "Fitness and football lover." },
  { name: "Bible Study", icon: "📖", text: "Finding wisdom and purpose." },
  { name: "Gaming", icon: "🎮", text: "Strategy and RPG enthusiast." },
  { name: "Travel", icon: "✈️", text: "Exploring new cultures." },
  { name: "Mentoring", icon: "👨‍🏫", text: "Sharing what I've learned." },
  { name: "Photography", icon: "📸", text: "Capturing moments in time." },
  { name: "Ideation", icon: "💡", text: "Turning ideas into reality." },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Strip */}
      <section className="flex flex-col lg:flex-row items-center gap-12 pt-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border bg-secondary">
             {/* Placeholder for Sonny's Photo */}
             <div className="w-full h-full flex items-center justify-center text-4xl font-space font-bold text-accent-purple">SC</div>
          </div>
        </div>
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl md:text-6xl font-space mb-4">
            Hi, I'm <span className="text-gradient">Sonny</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl">
            A Full Stack Engineer based in Kigali, building scalable software with integrity and purpose.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link href="/projects" className="btn-primary">View Projects</Link>
            <Link href="/contact" className="btn-secondary">Let's Collaborate</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} index={i} />
        ))}
      </section>

      {/* About Section */}
      <section className="glass p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-space mb-6">Who I Am</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            In a world full of skilled developers, I bring something harder to find — integrity. 
            I don't work like an employee. I work like an owner. I show up with consistency, 
            deliver with commitment, and earn trust the same way I build software: 
            with honesty, care, and purpose.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            I've built 15–20+ projects across personal and company accounts, 
            closing the gap between ideas and technical reality project by project.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-3xl font-space mb-12 text-center">What I Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </section>

      {/* Approach Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((val, i) => (
          <div key={i} className="text-center p-8 glass group hover:border-accent-cyan/50 transition-colors">
            <div className="inline-flex w-16 h-16 items-center justify-center bg-accent-cyan/10 text-accent-cyan rounded-full mb-6 group-hover:scale-110 transition-transform">
              <val.icon size={32} />
            </div>
            <h3 className="text-xl font-space mb-4">{val.title}</h3>
            <p className="text-text-muted text-sm">{val.description}</p>
          </div>
        ))}
      </section>

      {/* Hobbies Section */}
      <section>
        <h2 className="text-3xl font-space mb-12 text-center">Beyond the Code</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hobbies.map((hobby, i) => (
            <div key={i} className="glass p-6 text-center group cursor-default">
              <span className="text-4xl mb-4 block group-hover:scale-125 transition-transform duration-300">{hobby.icon}</span>
              <p className="font-space font-bold mb-1">{hobby.name}</p>
              <p className="text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">{hobby.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub Activity Placeholder */}
      <section className="glass p-8 text-center">
        <h2 className="text-2xl font-space mb-6">GitHub Activity</h2>
        <div className="h-48 flex items-center justify-center border-2 border-dashed border-border rounded-xl">
           <p className="text-text-muted">Live Activity Feed (Personal & Company) goes here.</p>
        </div>
      </section>
    </div>
  );
}
