import { StatCard, ServicesSection, ValuesSection } from "@/components/home/HomeComponents";
import Link from "next/link";

const stats = [
  { label: "Years Coding", value: "3+" },
  { label: "Projects Built", value: "15+" },
  { label: "GitHub Accounts", value: "2" },
  { label: "Company Founded", value: "1" },
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
            <div className="w-full h-full flex items-center justify-center text-4xl font-space font-bold text-accent-purple">
              SC
            </div>
          </div>
        </div>
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl md:text-6xl font-space mb-4">
            Hi, I&apos;m <span className="text-gradient">Sonny</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl">
            A Full Stack Engineer based in Kigali, building scalable software with integrity and
            purpose.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/contact" className="btn-secondary">
              Let&apos;s Collaborate
            </Link>
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
            In a world full of skilled developers, I bring something harder to find — integrity. I
            don&apos;t work like an employee. I work like an owner. I show up with consistency,
            deliver with commitment, and earn trust the same way I build software: with honesty,
            care, and purpose.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            I&apos;ve built 15–20+ projects across personal and company accounts, closing the gap
            between ideas and technical reality project by project.
          </p>
        </div>
      </section>

      {/* Services Section — self-contained client component, no function props passed */}
      <ServicesSection />

      {/* Values Section — self-contained client component, no function props passed */}
      <ValuesSection />

      {/* Hobbies Section */}
      <section>
        <h2 className="text-3xl font-space mb-12 text-center">Beyond the Code</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hobbies.map((hobby, i) => (
            <div key={i} className="glass p-6 text-center group cursor-default">
              <span className="text-4xl mb-4 block group-hover:scale-125 transition-transform duration-300">
                {hobby.icon}
              </span>
              <p className="font-space font-bold mb-1">{hobby.name}</p>
              <p className="text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {hobby.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub Activity removed — will be added when live data is available */}
    </div>
  );
}
