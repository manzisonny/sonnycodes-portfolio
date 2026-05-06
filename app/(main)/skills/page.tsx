import { ProgressRing, SkillHex } from "@/components/skills/SkillComponents";

const topSkills = [
  { name: "React", percentage: 90, color: "#61dafb" },
  { name: "Node.js", percentage: 85, color: "#68a063" },
  { name: "TypeScript", percentage: 80, color: "#3178c6" },
  { name: "React Native", percentage: 75, color: "#61dafb" },
  { name: "PostgreSQL", percentage: 78, color: "#336791" },
];

const skillCategories = [
  {
    title: "Frontend",
    skills: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Redux", "HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Backend",
    skills: ["Express", "GraphQL", "Prisma", "Supabase", "MongoDB", "REST APIs", "Websockets"]
  },
  {
    title: "Mobile",
    skills: ["Flutter", "React Native", "Expo", "Dart"]
  },
  {
    title: "DevOps",
    skills: ["Docker", "Vercel", "GitHub Actions", "CI/CD", "AWS", "Nginx"]
  },
  {
    title: "Tools & Design",
    skills: ["Git", "Figma", "Postman", "Jest", "Trello", "Agile"]
  }
];

export default function SkillsPage() {
  return (
    <div className="space-y-24">
      <header>
        <h1 className="text-4xl md:text-5xl font-space mb-4">Skills</h1>
        <p className="text-text-secondary text-lg">Full stack capabilities for the modern web.</p>
      </header>

      <section>
        <h2 className="text-2xl font-space mb-12 flex items-center gap-4">
          Core Proficiency
          <div className="h-[1px] flex-1 bg-border" />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {topSkills.map((skill) => (
            <ProgressRing key={skill.name} percentage={skill.percentage} label={skill.name} color={skill.color} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-space mb-12 flex items-center gap-4">
          Tech Ecosystem
          <div className="h-[1px] flex-1 bg-border" />
        </h2>
        <div className="space-y-16">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-lg font-space text-accent-purple mb-6 uppercase tracking-widest">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <SkillHex key={skill} name={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass p-8 text-center bg-accent-purple/5 border-accent-purple/20">
        <h2 className="text-2xl font-space mb-4">Currently Learning</h2>
        <p className="text-text-secondary mb-6">Always pushing the boundaries of my knowledge.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {["Rust", "Web3/Solidity", "Kubernetes", "AI/ML Integration"].map((item) => (
            <span key={item} className="px-4 py-2 glass border-accent-cyan/30 text-accent-cyan font-bold rounded-lg uppercase text-xs tracking-wider">
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
