export const PERSONAL_INFO = {
  name: "Rudresh Borle",
  title: "AI Developer",
  subtitle: "Full Stack Engineer",
  tagline: "Building intelligent systems at the intersection of AI and software engineering.",
  email: "rudreshborle@gmail.com",
  github: "https://github.com/rudreshborle",
  linkedin: "https://www.linkedin.com/in/rudresh-borle/",
  instagram: "https://www.instagram.com/grrruto.tm/",
};

export const STATS = [
  { value: "4+", label: "Projects Shipped" },
  { value: "10+", label: "Technologies Mastered" },
  { value: "3+", label: "Years of Coding" },
  { value: "100%", label: "Client Satisfaction" },
];

export const PROJECTS = [
  {
    id: "agrixai",
    name: "AGRIXAI",
    tagline: "AI for the fields that feed the world.",
    description:
      "AI-powered agriculture assistant that uses computer vision and Retrieval-Augmented Generation to detect crop diseases in real-time and provide intelligent, context-aware farming recommendations.",
    longDescription:
      "AGRIXAI combines YOLOv8 object detection with a RAG pipeline built on LangChain and FAISS to deliver precise crop disease diagnosis. Farmers upload photos of their crops and receive instant, actionable advice backed by a curated agricultural knowledge base.",
    tech: ["YOLOv8", "Python", "FastAPI", "LangChain", "FAISS", "Computer Vision"],
    category: "AI / Computer Vision",
    gradient: "from-emerald-500 to-cyan-500",
    accentColor: "#00F0FF",
    github: "https://github.com/rudreshborle",
    featured: true,
  },
  {
    id: "sscms",
    name: "SSCMS",
    tagline: "Intelligent logistics for the final frontier.",
    description:
      "A logistics optimization system for space stations using 3D bin packing algorithms and intelligent retrieval heuristics for efficient cargo storage and mission-critical supply management.",
    longDescription:
      "Space Station Cargo Management System solves the NP-hard bin packing problem adapted for microgravity constraints. A React + Three.js frontend renders a live 3D visualization of cargo placement, while FastAPI and PostgreSQL power the backend optimization engine.",
    tech: ["FastAPI", "PostgreSQL", "React", "Three.js", "Algorithms"],
    category: "Systems / Optimization",
    gradient: "from-blue-500 to-violet-500",
    accentColor: "#7B2FF7",
    github: "https://github.com/rudreshborle",
    featured: true,
  },
  {
    id: "trinetra",
    name: "TRINETRA",
    tagline: "Three eyes on the earth beneath your feet.",
    description:
      "AI-powered geological monitoring system that ingests environmental sensor data, applies ML models to detect anomalies, and predicts geological risks with real-time interactive dashboards.",
    longDescription:
      "TRINETRA (Sanskrit: three-eyed) processes simulated seismic, atmospheric, and hydrological sensor streams. The FastAPI backend runs continuous anomaly detection while a Next.js frontend renders live data visualizations and risk heatmaps.",
    tech: ["FastAPI", "Next.js", "Machine Learning", "Data Visualization", "AI/ML"],
    category: "AI / Monitoring",
    gradient: "from-orange-500 to-rose-500",
    accentColor: "#FF6B35",
    github: "https://github.com/rudreshborle",
    featured: true,
  },
  {
    id: "sentinel-x",
    name: "SENTINEL-X",
    tagline: "The AI that never sleeps on threat intelligence.",
    description:
      "Cybersecurity intelligence system that predicts and analyzes threats using AI-driven anomaly detection and pattern recognition across network traffic and behavioral telemetry.",
    longDescription:
      "SENTINEL-X applies unsupervised and supervised machine learning to identify zero-day threat patterns, network intrusions, and behavioral anomalies. A Python FastAPI backend processes real-time event streams and surfaces alerts through a threat intelligence dashboard.",
    tech: ["Python", "Machine Learning", "FastAPI", "Anomaly Detection", "Cybersecurity"],
    category: "AI / Cybersecurity",
    gradient: "from-red-500 to-purple-600",
    accentColor: "#FF2D55",
    github: "https://github.com/rudreshborle",
    featured: false,
  },
];

export const SKILLS = [
  {
    category: "AI & Machine Learning",
    color: "#00F0FF",
    items: ["Python", "YOLOv8", "LangChain", "FAISS", "TensorFlow", "PyTorch", "RAG", "Computer Vision"],
  },
  {
    category: "Full Stack Development",
    color: "#7B2FF7",
    items: ["Next.js", "React", "TypeScript", "FastAPI", "Node.js", "PostgreSQL", "REST APIs", "WebSockets"],
  },
  {
    category: "Tools & Infrastructure",
    color: "#FF6B35",
    items: ["Docker", "Git", "AWS", "Vercel", "Three.js", "Postman", "Linux", "CI/CD"],
  },
];

export const SERVICES = [
  {
    title: "AI System Development",
    description: "End-to-end AI pipelines — from data ingestion to model deployment — built for production scale.",
    icon: "Brain",
  },
  {
    title: "Computer Vision",
    description: "Real-time object detection, classification, and visual intelligence systems using state-of-the-art models.",
    icon: "Eye",
  },
  {
    title: "Full Stack Engineering",
    description: "Performant, scalable web applications with modern frameworks, robust APIs, and optimized databases.",
    icon: "Layers",
  },
  {
    title: "RAG & LLM Integration",
    description: "Custom Retrieval-Augmented Generation systems that connect LLMs to your proprietary knowledge base.",
    icon: "MessageSquare",
  },
  {
    title: "API Architecture",
    description: "Fast, secure, well-documented REST and GraphQL APIs built with FastAPI, Node.js, and OpenAPI specs.",
    icon: "Zap",
  },
  {
    title: "Technical Consulting",
    description: "Architecture reviews, AI strategy, and technical direction for teams building intelligent products.",
    icon: "Lightbulb",
  },
];
