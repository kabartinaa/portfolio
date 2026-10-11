/**
 * Single source of truth for portfolio content.
 * Edit this file to update text, projects, skills or links — no component changes needed.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export interface Skill {
  name: string
  /** Key into the icon map in components/TechIcon.tsx. Falls back to a generic icon. */
  icon?: string
}

export interface SkillCategory {
  title: string
  /** Lucide icon key, resolved in components/Skills.tsx */
  icon: 'code' | 'layers' | 'database' | 'wrench' | 'brain' | 'terminal'
  skills: Skill[]
}

export interface ExperienceItem {
  organization: string
  role: string
  period: string
  /** One-line takeaway shown above the bullet list. */
  focus: string
  highlights: string[]
  tags: string[]
}

export interface ProjectLinks {
  /** Add a real repository URL to show the "GitHub" button. */
  github?: string
  /** Add a real deployment URL to show the "Live Demo" button. */
  live?: string
}

export type ProjectVisualKey = 'room' | 'subscription' | 'crypto'

export interface Project {
  id: string
  title: string
  categories: string[]
  summary: string
  technologies: string[]
  features: string[]
  visual: ProjectVisualKey
  links: ProjectLinks
  details: {
    overview: string
    problem: string
    solution: string
    contributions: string[]
  }
}

export interface Education {
  institution: string
  degree: string
  period: string
  coursework: string[]
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Kabartinaa S',
  logo: 'KS.',
  email: 'skabartinaa@gmail.com',
  location: 'Tamil Nadu, India',
  linkedin: 'https://linkedin.com/in/kabartinaa',
  github: 'https://github.com/kabartinaa',
  resumeFile: 'KABARTINAA_RESUME.pdf',
} as const

/** The resume PDF lives in /public so it is served from the site root. */
export const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

/** Set `open` to false to hide the availability badge in the hero. */
export const availability = {
  open: true,
  label: 'Open to software engineering opportunities',
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: 'ASPIRING SOFTWARE DEVELOPMENT ENGINEER',
  greeting: "Hi, I'm Kabartinaa S.",
  headline: 'Building software that solves real-world problems.',
  intro:
    'I build full-stack applications and REST APIs, and I explore AI/ML solutions. From authentication and databases to deployment, I like seeing an idea become working software.',
  rotating: ['Full-Stack Development', 'Backend & API Engineering', 'AI/ML Applications'],
  /** Values shown in the code-editor panel. */
  editor: {
    role: 'Aspiring SDE',
    focus: ['Full-stack', 'REST APIs', 'AI/ML'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Python'],
    internships: 3,
    education: 'B.E. Computer Science, 2027',
    interests: ['Machine learning', 'Cybersecurity'],
  },
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  heading: 'A little about me',
  paragraphs: [
    "I'm a Computer Science engineering student at Sri Venkateswara College of Engineering, expected to graduate in April 2027. Across three internships I've built full-stack applications and RESTful APIs, working with authentication, database persistence, API integration, debugging, and deployment.",
    "I'm drawn to artificial intelligence, machine learning, cybersecurity, and reverse engineering. I enjoy collaborating on practical projects and turning requirements into working software.",
  ],
  cards: [
    {
      title: 'Full-Stack Development',
      icon: 'layers' as const,
      text: 'React frontends with Node.js and Express backends, MongoDB or MySQL persistence, and JWT authentication.',
    },
    {
      title: 'AI/ML & Intelligent Applications',
      icon: 'brain' as const,
      text: 'Python applications that combine machine learning with external APIs, plus AI rendering and firmware analysis projects.',
    },
    {
      title: 'Backend Engineering & API Design',
      icon: 'server' as const,
      text: 'RESTful API design, backend workflows, database operations, debugging, and deployment.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillsHeading = 'Technologies I work with'

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: 'code',
    skills: [
      { name: 'Java', icon: 'java' },
      { name: 'Python', icon: 'python' },
      { name: 'C++', icon: 'cpp' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'SQL', icon: 'sql' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
    ],
  },
  {
    title: 'Frameworks and Libraries',
    icon: 'layers',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express.js', icon: 'express' },
      { name: 'Flask', icon: 'flask' },
      { name: 'MERN Stack', icon: 'mern' },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'MySQL', icon: 'mysql' },
    ],
  },
  {
    title: 'Development and Engineering',
    icon: 'wrench',
    skills: [
      { name: 'Full-Stack Development', icon: 'fullstack' },
      { name: 'REST API Design', icon: 'api' },
      { name: 'JWT Authentication', icon: 'jwt' },
      { name: 'Database Design', icon: 'sql' },
      { name: 'API Integration', icon: 'api' },
      { name: 'Debugging', icon: 'debug' },
      { name: 'Application Deployment', icon: 'deploy' },
    ],
  },
  {
    title: 'AI/ML and Security',
    icon: 'brain',
    skills: [
      { name: 'Machine Learning', icon: 'ml' },
      { name: 'Reverse Engineering', icon: 'reverse' },
      { name: 'Cryptography Analysis', icon: 'crypto' },
      { name: 'Ethical Hacking fundamentals', icon: 'security' },
    ],
  },
  {
    title: 'Tools and Platforms',
    icon: 'terminal',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Postman', icon: 'postman' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'IntelliJ IDEA', icon: 'intellij' },
      { name: 'Eclipse', icon: 'eclipse' },
      { name: 'VMware', icon: 'vmware' },
      { name: 'Kali Linux', icon: 'kali' },
      { name: 'n8n', icon: 'n8n' },
      { name: 'Cursor', icon: 'cursor' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experienceHeading = 'Experience that shaped my engineering skills'

export const experience: ExperienceItem[] = [
  {
    organization: 'Prodapt Solutions Pvt. Ltd.',
    role: 'Product Delivery Intern',
    period: 'December 2025 – February 2026',
    focus: 'Connecting engineering execution, customer requirements, and practical solution delivery.',
    highlights: [
      'Developed a Forward Deployed Engineer learning and practice platform that simulates end-to-end delivery workflows.',
      'Worked through requirements analysis, development, debugging, integration, and deployment.',
      'Designed structured learning modules on technical problem-solving, customer communication, debugging, and solution delivery.',
    ],
    tags: ['Requirements Analysis', 'Debugging', 'Integration', 'Deployment', 'Learning Design'],
  },
  {
    organization: 'Edunet Foundation – IBM SkillsBuild',
    role: 'AI/ML Intern',
    period: 'September 2025 – October 2025',
    focus: 'Combining data, backend integration, and application development.',
    highlights: [
      'Built a Python-based AI/ML application that integrates external REST APIs to process and display real-time data.',
      'Applied machine learning fundamentals and Flask.',
      'Used frontend technologies to develop, test, and validate application workflows.',
    ],
    tags: ['Python', 'Flask', 'Machine Learning', 'REST APIs', 'Frontend'],
  },
  {
    organization: 'CodTech',
    role: 'Backend Developer Intern',
    period: 'May 2025 – June 2025',
    focus: 'Three MERN applications, built and deployed.',
    highlights: [
      'Built and deployed three MERN applications: a Blog API, a Movie Recommendation System, and a Chat Application.',
      'Designed RESTful APIs and backend workflows.',
      'Worked with authentication and database operations using Node.js, Express.js, and MongoDB.',
    ],
    tags: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Authentication'],
  },
]

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const projectsHeading = "Projects I've built"

export const projects: Project[] = [
  {
    id: 'ai-room-designer',
    title: 'AI-Powered Room Designer',
    categories: ['AI Rendering', 'Full-Stack Development'],
    summary:
      'An AI-powered room visualization platform that transforms uploaded room images into redesigned visual concepts based on user-selected configurations.',
    technologies: ['AI Rendering', 'Image Processing', 'Full-Stack'],
    features: [
      'Upload room images',
      'Generate AI-based room visualizations',
      'Explore different design configurations',
      'Compare original and redesigned rooms side by side',
      'Interactive visualization workflow',
    ],
    visual: 'room',
    // Add real URLs here to reveal the buttons, e.g. github: 'https://github.com/kabartinaa/<repo>'
    links: {},
    details: {
      overview:
        'A platform that turns a photo of a room into redesigned visual concepts. Users choose a design configuration, and the app renders a new version of their space they can inspect next to the original.',
      problem:
        'It is hard to picture how a room will look after a redesign. Descriptions and mood boards only go so far, and seeing a realistic result beside the original makes design decisions easier.',
      solution:
        'Users upload a room image and select a configuration. The app passes the image through an AI-based rendering step and returns a redesigned visualization, with a side-by-side comparison of the original and the result.',
      contributions: [
        'Implemented the room image upload flow.',
        'Built the AI-based rendering workflow that produces redesigned visuals.',
        'Implemented side-by-side comparison of the original and redesigned room.',
        'Connected frontend interactions, image handling, and AI rendering into one visualization workflow.',
      ],
    },
  },
  {
    id: 'subscription-tracker',
    title: 'Subscription Tracker App',
    categories: ['Full-Stack Development', 'Backend Engineering'],
    summary:
      'A full-stack subscription management application for tracking recurring payments, renewal dates, and subscription details.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features: [
      'JWT-based user authentication',
      'Subscription creation and management',
      'Persistent data storage with MongoDB',
      'Automated renewal reminders',
      'A clear interface for monitoring subscription information',
    ],
    visual: 'subscription',
    links: {},
    details: {
      overview:
        'A subscription management app that keeps recurring payments, renewal dates, and subscription details in one place for each signed-in user.',
      problem:
        'Recurring subscriptions are easy to lose track of. A missed renewal date means an unexpected charge, and details end up scattered across emails and apps.',
      solution:
        'Users sign in with JWT-based authentication, add and manage their subscriptions, and monitor them from a single interface. Data is stored in MongoDB, and automated reminders flag upcoming renewals.',
      contributions: [
        'Implemented JWT authentication for user accounts.',
        'Built the subscription workflows for creating and managing subscription details.',
        'Modeled and persisted subscription data in MongoDB.',
        'Implemented automated renewal reminders.',
        'Built the React interface for monitoring subscriptions.',
      ],
    },
  },
  {
    id: 'crypto-detection',
    title: 'Cryptography Algorithm Detection in Firmware',
    categories: ['Machine Learning', 'Cybersecurity', 'Reverse Engineering'],
    summary:
      'A machine learning framework that analyzes disassembled firmware to identify cryptographic configurations and help detect unfamiliar algorithms.',
    technologies: ['Python', 'Machine Learning', 'Reverse Engineering'],
    features: [
      'Firmware-level analysis',
      'Analysis of disassembled implementations',
      'Identification of 16 cryptographic configurations',
      'Machine learning for cryptographic algorithm classification',
      'Exploration of unknown or previously unseen algorithms',
    ],
    visual: 'crypto',
    links: {},
    details: {
      overview:
        'A multi-modal analysis framework that studies disassembled firmware to identify cryptographic configurations, and explores how unfamiliar algorithms can be flagged.',
      problem:
        'Cryptographic code inside firmware is rarely labelled. Working out which algorithm or configuration a binary uses usually means manual reverse engineering, and unfamiliar algorithms make that harder.',
      solution:
        'The framework works on disassembled firmware, combines reverse engineering with machine learning, and classifies implementations across 16 cryptographic configurations. It also explores detecting algorithms it has not seen before.',
      contributions: [
        'Engineered the multi-modal analysis framework in Python.',
        'Applied reverse engineering techniques to firmware-level cryptographic implementations.',
        'Applied machine learning techniques to classify cryptographic configurations.',
        'Explored detection of unknown or previously unseen algorithms.',
      ],
    },
  },
]

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const educationHeading = 'Education'

export const education: Education = {
  institution: 'Sri Venkateswara College of Engineering, Sriperumbudur',
  degree: 'Bachelor of Engineering in Computer Science',
  period: 'September 2023 – April 2027 (Expected)',
  coursework: [
    'Artificial Intelligence and Data Science',
    'Machine Learning',
    'Statistics',
    'Social Networks',
    'Cryptography',
    'Ethical Hacking',
    'Compiler Design',
    'Internet of Things',
  ],
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  heading: "Let's build something meaningful",
  text: "I'm interested in software engineering opportunities where I can contribute to practical products, strengthen my engineering skills, and work on challenging technical problems. Feel free to connect with me.",
}
