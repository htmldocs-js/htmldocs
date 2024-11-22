import { Document, Head, Page, Spacer } from "@htmldocs/react";
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import "~/index.css";

interface Education {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface Experience {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

interface Project {
  name: string;
  dateRange: string;
  githubUrl: string;
  achievements: string[];
}

interface Skills {
  languages: string[];
  frameworks: string[];
  technologies: string[];
}

interface Contact {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface ResumeProps {
  name: string;
  summary: string;
  contact: Contact;
  experience: Experience[];
  projects: Project[];
  education: Education;
  skills: Skills;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-black mb-2">
      <h2 className="text-lg font-bold">{children}</h2>
    </div>
  );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  );
}

function Resume({
  name,
  summary,
  contact,
  experience,
  projects,
  education,
  skills,
}: ResumeProps) {
  return (
    <Document size="A4" orientation="portrait">
      <Head>
        <link href="https://fonts.cdnfonts.com/css/cmu-serif" rel="stylesheet" />
      </Head>
      <Page className="text-sm flex flex-col" style={{ fontFamily: "CMU Serif" }}>
        {/* Header */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold mb-1">{name}</h1>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-4 h-4 mr-1" />
              {contact.location}
            </div>
            <div className="flex items-center">
              <FaPhone className="w-4 h-4 mr-1" />
              {contact.phone}
            </div>
            <div className="flex items-center">
              <FaEnvelope className="w-4 h-4 mr-1" />
              <a href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
            <div className="flex items-center">
              <FaLinkedin className="w-4 h-4 mr-1" />
              <a href={`https://linkedin.com/in/${contact.linkedin}`}>
                {contact.linkedin}
              </a>
            </div>
            <div className="flex items-center">
              <FaGithub className="w-4 h-4 mr-1" />
              <a href={`https://github.com/${contact.github}`}>
                {contact.github}
              </a>
            </div>
          </div>
        </div>

        <Spacer height={16} />

        {/* Summary */}
        <section>
          <SectionHeader>Summary</SectionHeader>
          <p>
            Technical leader with 12 years of experience as an engineering leader — see my work at <Link href="https://johndoe.com">johndoe.com</Link>.
          </p>
        </section>

        <Spacer height={16} />

        {/* Experience */}
        <section>
          <SectionHeader>Experience</SectionHeader>
          {experience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <span className="font-semibold">{job.company}</span>
                <span>
                  {job.startDate} – {job.endDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="italic">{job.title}</span>
                <span className="italic">{job.location}</span>
              </div>
              <ul className="list-[circle] ml-6 mt-1">
                {job.achievements.map((achievement, i) => (
                  <li key={i} className="mt-1 pl-1">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <Spacer height={16} />

        {/* Projects */}
        <section>
          <SectionHeader>Projects</SectionHeader>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <span className="font-semibold">{project.name}</span>
                <span>{project.dateRange}</span>
              </div>
              <div className="flex">
                <a href={project.githubUrl} className="hover:text-blue-600 flex items-center">
                  <FaGithub className="w-4 h-4 mr-1" />
                  {project.githubUrl}
                </a>
              </div>
              <ul className="list-[circle] ml-6 mt-1">
                {project.achievements.map((achievement, i) => (
                  <li key={i} className="mt-1 pl-1">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <Spacer height={16} />

        {/* Education */}
        <section>
          <SectionHeader>Education</SectionHeader>
          <div className="flex justify-between">
            <span className="font-semibold">{education.school}</span>
            <span>
              {education.startDate} – {education.endDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="italic">{education.degree}</span>
            <span className="italic">{education.location}</span>
          </div>
        </section>

        <Spacer height={16} />

        {/* Skills */}
        <section>
          <SectionHeader>Skills</SectionHeader>
          <table className="w-full">
            <tbody>
              <tr className="align-top">
                <td className="pr-4 font-semibold">Languages</td>
                <td>{skills.languages.join(", ")}</td>
              </tr>
              <tr className="align-top">
                <td className="pr-4 font-semibold">Frameworks</td>
                <td>{skills.frameworks.join(", ")}</td>
              </tr>
              <tr className="align-top">
                <td className="pr-4 font-semibold">Technologies</td>
                <td>{skills.technologies.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </Page>
    </Document>
  );
}

Resume.PreviewProps = {
  name: "John Doe",
  summary: "Technical leader with 12 years of experience in scalable applications and engineering leadership — see my work at jkuo.me.",
  contact: {
    location: "San Francisco, CA",
    phone: "123-456-7890",
    email: "jdoe@gmail.com",
    linkedin: "jdoe12",
    github: "jdoe",
  },
  experience: [
    {
      company: "Stripe",
      title: "Staff Software Engineer",
      location: "San Francisco, CA",
      startDate: "May 2020",
      endDate: "Aug 2020",
      achievements: [
        "Spearheaded design and development of Stripe's core iOS app with over 5 million monthly active users",
        "Collaborated with the infrastructure team to reduce integration issues by 28%",
        "Architected a distributed load-balancing service in Go that uses Redis and Apache Zookeeper to serve 6 billion requests a year, increase edge-to-edge speed by 50%, and save a projected 2 million dollars annually",
      ],
    },
    {
      company: "Facebook",
      title: "Senior Software Engineer",
      location: "Menlo Park, CA",
      startDate: "May 2020",
      endDate: "Aug 2020",
      achievements: [
        "Worked with the Ads team to create an end-to-end tool for building campaigns, used by 300,000+ businesses",
        "Wrote new integrations in Hack/PHP, resulting in a 25% performance improvement",
        "Was a core contributor to the React Native framework, which included fixing bugs, defining roadmaps, and implementing features. Leveraged WebAssembly to achieve 64% faster compile times with real-time logging",
      ],
    },
    {
      company: "Apple",
      title: "iOS Engineer",
      location: "Cupertino, CA",
      startDate: "May 2020",
      endDate: "Aug 2020",
      achievements: [
        "Worked with Swift and Objective-C to implement Guides in Apple Maps, supporting 10,000+ cities worldwide",
        "Re-engineered the landing pages for the 16\" Macbook Pro and Apple Pay, improving initial load times by 42%",
        "Hosted a total of 7 interns across 2 years, with a 70% intern-to-fulltime conversion ratio",
      ],
    },
  ],
  projects: [
    {
      name: "3D Graphics Rendering Engine",
      dateRange: "May 2017 – Aug 2020",
      githubUrl: "github.com/user/project",
      achievements: [
        "Used C++ to create a 3D renderer with support for OpenGL, GLFW integration, and textures",
        "Implemented custom shaders using Vulkan, achieving sub-100ms light scattering and diffusion",
        "Wrote popular blog post on project, reaching #1 on HackerNews and featured on WIRED magazine",
      ],
    },
  ],
  education: {
    school: "Harvard University",
    degree: "Bachelor of Computer Science",
    location: "Boston, MA",
    startDate: "2012",
    endDate: "2016",
  },
  skills: {
    languages: ["TypeScript", "Python", "Ruby", "Go", "Java", "C++"],
    frameworks: ["React", "Redux", "Express", "Flask"],
    technologies: ["AWS", "Redis", "MongoDB", "Docker", "PostgreSQL", "Kubernetes"],
  },
};

Resume.documentId = "resume";

export default Resume;
