import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SidebarLeft from './components/SidebarLeft';
import HomeFeed from './components/HomeFeed';
import ProfileFeed from './components/ProfileFeed';
import StatsView from './components/StatsView';
import SidebarRight from './components/SidebarRight';
import WriteView from './components/WriteView';
import EditProfileModal from './components/EditProfileModal';
import NetworkView from './components/NetworkView';
import { motion, AnimatePresence } from 'framer-motion';
import IntroAnimation from './components/IntroAnimation';
import SavedFeed from './components/SavedFeed';
import ArticleDetailView from './components/ArticleDetailView';
import { getImagePath } from './utils/paths';
import AuthView from './components/AuthView';

// Seed default users if empty
const seedDefaultUsers = () => {
  const usersRaw = localStorage.getItem('users');
  if (!usersRaw) {
    const satyamUser = {
      name: 'Satyam',
      email: 'satyam@scholr.com',
      password: 'password123',
      stream: '🎓 B.Tech / B.E.',
      avatar: getImagePath('/images/avatar_user.png'),
      banner: getImagePath('/images/cover_user.png'),
      headline: 'AI/ML Enthusiast | Web Developer | Open Source Learner',
      education: 'QUAD AI School of Technology / Medhavi Skills University',
      branch: 'Integrated B.Tech in Computer Science (AI/ML)',
      gradYear: '2028',
      collegeLocation: 'Ranchi, Jharkhand, India',
      skills: 'React, Python, DSA, Machine Learning, C++, HTML, CSS, JavaScript, Git, EasyEDA, Tinkercard, Circuit Design',
      areasOfInterest: 'Robotics & Automation, Artificial Intelligence, Frontend Development, Participating in Hackathon',
      github: 'https://github.com/satyam',
      linkedin: 'https://linkedin.com/in/satyam',
      portfolio: 'https://satyam.dev',
      about: `Satyam is a Computer Science (AI/ML) student at QUAD AI School of Technology pursuing an Integrated B.Tech program affiliated with Medhavi Skills University.

He is passionate about Robotics, AI/ML, and building real-world tech projects. He enjoy participating in hackathons, solving practical problems, and learning by building innovative solutions under real challenges.
Over the past few months, He has worked on robotics projects, PCB design, frontend development, and AI-based ideas while actively participating in multiple hackathons .

Technical Skills & Tools:
 • C++, Python
 • HTML, CSS, JavaScript, React
 • Git & GitHub
 • EasyEDA
 • Tinkercard
 • Circuit Design
 • AI/ML Basics
 • Robotics

Areas of Interest:
 • Robotics & Automation
 • Artificial Intelligence
 • Frontend Development
 • Participating in Hackathon

Achievements & Highlights:
 • Finalist at hackathon events organized by BITS Pilani
 • Winner at competitions hosted by Indian Institute of Technology Dhanbad
 • Winner at tech competitions organized by Birsa Institute of Technology Sindri
 • Published technical and student-focused articles on Medium .

He believe in learning through hands-on experience, teamwork, and continuous experimentation. Always open to collaborating, learning new technologies, and building impactful project.`,
      profileArticles: [
        {
          id: 'p1',
          category: 'AI Insights',
          author: 'Satyam',
          date: 'May 12',
          title: 'The Future of AI Agents: Why Students Should Care',
          excerpt: 'Autonomous agents are redefining the academic landscape, from research automation to personalized study assistants. We look into the AI tools driving student productivity and breakthroughs.',
          initialClaps: 2400,
          comments: 2,
          commentsList: [
            {
              id: 'c1',
              author: 'Anna Richards',
              avatar: getImagePath('/images/avatar_anna.png'),
              text: 'This is an outstanding breakdown! The explanation of the agentic loop makes perfect sense.',
              date: '3 days ago'
            },
            {
              id: 'c2',
              author: 'Marc Thompson',
              avatar: getImagePath('/images/avatar_marc.png'),
              text: 'Absolutely! I have been building similar deterministic loops with python. Keep up the great writing.',
              date: '2 days ago'
            }
          ],
          image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop',
          content: [
            "Autonomous AI agents are set to transform the student experience. Far from being simple text predictors, these agents plan, call APIs, and reason through long-term academic tasks.",
            "## Personalized Tutors",
            "Instead of a static textbook, an agent analyzes your homework code, suggests debugging solutions, and tests your understanding with interactive quizzes.",
            "## Research Automation",
            "Agents can scour scientific databases, summarize relevant papers, and draft literature review structures, saving students hours of research overhead."
          ]
        },
        {
          id: 'p2',
          category: 'Code Academy',
          author: 'Sarah Miller',
          date: 'May 10',
          title: '2024 Web Development Roadmap: From Zero to Full Stack',
          excerpt: 'Mastering modern web development requires a strategic approach. We break down the absolute essentials of HTML, CSS, JavaScript, React, server architectures, and databases for full mastery.',
          initialClaps: 1800,
          comments: 2,
          commentsList: [
            {
              id: 'c1',
              author: 'Anna Richards',
              avatar: getImagePath('/images/avatar_anna.png'),
              text: 'This is an outstanding breakdown! The explanation of the agentic loop makes perfect sense.',
              date: '3 days ago'
            },
            {
              id: 'c2',
              author: 'Marc Thompson',
              avatar: getImagePath('/images/avatar_marc.png'),
              text: 'Absolutely! I have been building similar deterministic loops with python. Keep up the great writing.',
              date: '2 days ago'
            }
          ],
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop',
          content: [
            "Web development moves incredibly fast. To avoid tutorial hell, build a systematic learning list mapping out standard web structures.",
            "## Phase 1: Semantic HTML & Vanilla CSS",
            "Master responsive styling, document mapping, flexbox layouts, and grids.",
            "## Phase 2: JavaScript & DOM Manipulation",
            "Understand asynchronous promises, fetch API calls, storage mechanics, and event listeners.",
            "## Phase 3: Frameworks & Deployments",
            "Learn React lifecycle states, routers, custom hooks, and publish application bundles to hosting solutions."
          ]
        },
        {
          id: 'p3',
          category: 'Student Success',
          author: 'Satyam',
          date: 'May 8',
          title: 'How I Landed a FAANG Internship as a Sophomore',
          excerpt: 'Networking, open-source contributions, and the exact resume template that got me past the screening bots at Google and Stripe. Here is the step-by-step sophomore guide.',
          initialClaps: 4200,
          comments: 2,
          commentsList: [
            {
              id: 'c1',
              author: 'Anna Richards',
              avatar: getImagePath('/images/avatar_anna.png'),
              text: 'This is an outstanding breakdown! The explanation of the agentic loop makes perfect sense.',
              date: '3 days ago'
            },
            {
              id: 'c2',
              author: 'Marc Thompson',
              avatar: getImagePath('/images/avatar_marc.png'),
              text: 'Absolutely! I have been building similar deterministic loops with python. Keep up the great writing.',
              date: '2 days ago'
            }
          ],
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop',
          content: [
            "Landing a sophomore internship at FAANG is tough, but far from impossible. If you focus on building a robust portfolio and networking, you can skip the standard application filters.",
            "## 1. Technical Depth Wins",
            "Don't build basic calculator apps. Build systems that handle multi-user database entries or automate hardware processes.",
            "## 2. Resume Keyword Optimization",
            "Align project bullet points to job description nouns: e.g., 'Implemented responsive React hooks, decreasing loading latency by 20%'.",
            "## 3. Direct Cold Messaging",
            "Connect with engineering managers, present your open-source projects, and ask for career advice. Often, they will refer you directly."
          ]
        }
      ],
      savedArticles: [],
      followingCreators: [
        {
          id: 'a1',
          name: 'Anna Richards',
          title: 'Data Scientist at Google',
          avatar: getImagePath('/images/avatar_anna.png')
        },
        {
          id: 'm1',
          name: 'Marc Thompson',
          title: 'Senior SWE at Stripe',
          avatar: getImagePath('/images/avatar_marc.png')
        }
      ],
      followers: [
        {
          id: 'f1',
          name: 'Sarah Miller',
          title: 'Technical Writer',
          avatar: getImagePath('/images/avatar_anna.png')
        },
        {
          id: 'f2',
          name: 'Alex Chen',
          title: 'AI Engineer',
          avatar: getImagePath('/images/avatar_user.png')
        },
        {
          id: 'f3',
          name: 'Sergey Nes',
          title: 'Staff Developer',
          avatar: getImagePath('/images/avatar_marc.png')
        }
      ]
    };
    localStorage.setItem('users', JSON.stringify([satyamUser]));
  }
};

seedDefaultUsers();

// Helper to get active user
const getActiveUser = () => {
  const raw = localStorage.getItem('currentUser');
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
};

// Helper mock comments to initialize articles beautifully
const mockComments = [
  {
    id: 'c1',
    author: 'Anna Richards',
    avatar: getImagePath('/images/avatar_anna.png'),
    text: 'This is an outstanding breakdown! The explanation of the agentic loop makes perfect sense.',
    date: '3 days ago'
  },
  {
    id: 'c2',
    author: 'Marc Thompson',
    avatar: getImagePath('/images/avatar_marc.png'),
    text: 'Absolutely! I have been building similar deterministic loops with python. Keep up the great writing.',
    date: '2 days ago'
  }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('currentUser');
  });

  const [showIntro, setShowIntro] = useState(() => {
    return !localStorage.getItem('currentUser');
  });

  const [activeTab, setActiveTab] = useState('Home');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Lifted global states
  const [savedArticles, setSavedArticles] = useState(() => {
    const active = getActiveUser();
    if (active && active.savedArticles) return active.savedArticles;
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [viewedProfileAuthor, setViewedProfileAuthor] = useState(null);


  const [followingCreators, setFollowingCreators] = useState(() => {
    const active = getActiveUser();
    if (active && active.followingCreators) return active.followingCreators;
    return [
      {
        id: 'a1',
        name: 'Anna Richards',
        title: 'Data Scientist at Google',
        avatar: getImagePath('/images/avatar_anna.png')
      },
      {
        id: 'm1',
        name: 'Marc Thompson',
        title: 'Senior SWE at Stripe',
        avatar: getImagePath('/images/avatar_marc.png')
      }
    ];
  });

  const [followers, setFollowers] = useState(() => {
    const active = getActiveUser();
    if (active && active.followers) return active.followers;
    return [
      {
        id: 'f1',
        name: 'Sarah Miller',
        title: 'Technical Writer',
        avatar: getImagePath('/images/avatar_anna.png')
      },
      {
        id: 'f2',
        name: 'Alex Chen',
        title: 'AI Engineer',
        avatar: getImagePath('/images/avatar_user.png')
      },
      {
        id: 'f3',
        name: 'Sergey Nes',
        title: 'Staff Developer',
        avatar: getImagePath('/images/avatar_marc.png')
      }
    ];
  });

  // Central User Profile state
  const [userProfile, setUserProfile] = useState(() => {
    const active = getActiveUser();
    if (active) return active;
    return {
      name: 'Satyam',
      email: 'satyam@scholr.com',
      avatar: getImagePath('/images/avatar_user.png'),
      banner: getImagePath('/images/cover_user.png'),
      headline: 'AI/ML Enthusiast | Web Developer | Open Source Learner',
      education: 'QUAD AI School of Technology / Medhavi Skills University',
      branch: 'Integrated B.Tech in Computer Science (AI/ML)',
      gradYear: '2028',
      collegeLocation: 'Ranchi, Jharkhand, India',
      skills: 'React, Python, DSA, Machine Learning, C++, HTML, CSS, JavaScript, Git, EasyEDA, Tinkercard, Circuit Design',
      areasOfInterest: 'Robotics & Automation, Artificial Intelligence, Frontend Development, Participating in Hackathon',
      github: 'https://github.com/satyam',
      linkedin: 'https://linkedin.com/in/satyam',
      portfolio: 'https://satyam.dev',
      about: `Satyam is a Computer Science (AI/ML) student at QUAD AI School of Technology pursuing an Integrated B.Tech program affiliated with Medhavi Skills University.

He is passionate about Robotics, AI/ML, and building real-world tech projects. He enjoy participating in hackathons, solving practical problems, and learning by building innovative solutions under real challenges.
Over the past few months, He has worked on robotics projects, PCB design, frontend development, and AI-based ideas while actively participating in multiple hackathons .

Technical Skills & Tools:
 • C++, Python
 • HTML, CSS, JavaScript, React
 • Git & GitHub
 • EasyEDA
 • Tinkercard
 • Circuit Design
 • AI/ML Basics
 • Robotics

Areas of Interest:
 • Robotics & Automation
 • Artificial Intelligence
 • Frontend Development
 • Participating in Hackathon

Achievements & Highlights:
 • Finalist at hackathon events organized by BITS Pilani
 • Winner at competitions hosted by Indian Institute of Technology Dhanbad
 • Winner at tech competitions organized by Birsa Institute of Technology Sindri
 • Published technical and student-focused articles on Medium .

He believe in learning through hands-on experience, teamwork, and continuous experimentation. Always open to collaborating, learning new technologies, and building impactful project.`
    };
  });

  const [homeArticles, setHomeArticles] = useState([
    {
      id: 'h1',
      publication: 'The Daily Draft',
      author: 'Clive Thompson',
      date: 'May 26',
      title: 'How To Spot Someone Secretly Writing With AI',
      excerpt: 'I’ve spent enough time online to notice people becoming confident about their ability to spot AI writing on sight, which probably explains why every few days somebody publishes a thread exposing fraudsters.',
      initialClaps: 1820,
      comments: 3,
      commentsList: [...mockComments],
      initialRepeats: 25,
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop',
      tags: ['For you', 'Featured', 'Writing'],
      content: [
        "A man typing on a laptop. Photo by Ono Kosuki from Pexels.",
        "I’ve spent enough time online to notice people becoming confident about their ability to spot AI writing on sight, which probably explains why every few days somebody publishes a thread exposing fraudsters. One person focuses on punctuation. Another gets suspicious of articles that sound too structured. And lately, I’ve seen more people treating completely normal literary techniques like evidence somebody secretly opened ChatGPT halfway through writing.",
        "==Earlier this morning, I read one of those articles out of curiosity. The examples were all over the place. One section pointed to similes as an obvious AI tell. Another warned readers to watch out for metaphors and descriptive qualifiers. Which would’ve been surprising news to basically every novelist, essayist, and columnist from the last hundred years.",
        "Then things got even more ridiculous.",
        "The author started breaking down phrases like “slightly confusing” or “remarkably difficult” as though qualifying descriptors were invented by OpenAI. It was a bizarre display of revisionist history—as if clear, structured, or vivid writing was a machine-only domain, and human writers should only produce fragmented, unstructured prose to prove their humanity.",
        "In reality, the search for AI tells is becoming a form of online paranoia. Instead of evaluating writing on its merits, substance, or factual accuracy, we are teaching people to fear good style."
      ]
    },
    {
      id: 'h2',
      publication: 'Data Science Collective',
      author: 'Marina Wyss',
      date: 'Apr 21',
      title: 'The Fastest Way To Become an AI Engineer (For Software Engineers)',
      excerpt: 'A comprehensive, engineering-first roadmap to transition into AI Engineering in 2026, focusing on prompt ops, agentic design patterns, and deployment pipelines.',
      initialClaps: 428,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop',
      tags: ['For you', 'AI/ML'],
      content: [
        "AI Engineering is the fastest-growing field in software development. But you don't need a PhD in Mathematics or Machine Learning to build AI products.",
        "## 1. Focus on API Orchestration",
        "Modern AI applications are powered by prompt operations, vector databases, and LLM orchestration frameworks. Start by mastering how to design prompts and manage context windows.",
        "## 2. Master Agentic Patterns",
        "Instead of single-turn prompts, learn how to build multi-turn systems that call tools, reflect on results, and collaborate to achieve a goal.",
        "> \"An AI engineer is just a software engineer who knows how to leverage model intelligence as a system component.\""
      ]
    },
    {
      id: 'h3',
      publication: 'Level Up Coding',
      author: 'Marcus Aurelius',
      date: 'May 20',
      title: "Getting Started with ROS2: A Student's Guide to Robotics Middleware",
      excerpt: 'An introductory guide to Robot Operating System (ROS2). Learn how nodes, topics, and services work together to build autonomous mobile robots.',
      initialClaps: 320,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 8,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop',
      tags: ['For you', 'Robotics'],
      content: [
        "The Robot Operating System (ROS) is the de facto standard for writing robot software. ROS2 modernizes the middleware with improved safety, security, and real-time support.",
        "## 1. The ROS2 Graph",
        "A ROS2 system consists of nodes that communicate via topics, services, and actions. This node-based design allows robots to run different modules (navigation, computer vision, arm control) concurrently.",
        "```cpp\n#include \"rclcpp/rclcpp.hpp\"\nint main(int argc, char **argv) {\n  rclcpp::init(argc, argv);\n  auto node = rclcpp::Node::make_shared(\"minimal_node\");\n  RCLCPP_INFO(node->get_logger(), \"Hello ROS2!\");\n  rclcpp::spin(node);\n  rclcpp::shutdown();\n  return 0;\n}\n```",
        "## 2. Navigating and Sensing",
        "Once your nodes are up and running, you can connect Lidar data or camera frames to topics and implement autonomous navigation."
      ]
    },
    {
      id: 'h4',
      publication: 'Data Science Collective',
      author: 'Emily Watson',
      date: 'May 18',
      title: '10 Advanced Python Features Every Computer Science Student Should Master',
      excerpt: 'From decorators and generators to metaclasses and async/await. Elevate your Python code from basic scripts to robust production-ready libraries.',
      initialClaps: 850,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 15,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop',
      tags: ['For you', 'Python'],
      content: [
        "Python is easy to learn but hard to master. Here are the top features that distinguish junior scripters from senior Python developers.",
        "## 1. Decorators & Metaprogramming",
        "Decorators allow you to wrap functions to add functionality dynamically.",
        "```python\ndef log_call(func):\n    def wrapper(*args, **kwargs):\n        print(f'Calling {func.__name__}')\n        return func(*args, **kwargs)\n    return wrapper\n```",
        "## 2. Context Managers",
        "Learn to use `with` statements to handle system resources and file locks safely.",
        "> \"Writing Pythonic code means writing readable, performant, and self-documenting software.\""
      ]
    },
    {
      id: 'h5',
      publication: 'Level Up Coding',
      author: 'David Miller',
      date: 'May 15',
      title: 'How We Built a Full-Stack LMS for Our University in 3 Weeks',
      excerpt: 'A case study on building a high-scale learning management system using Next.js, Fastify, and PostgreSQL, managed entirely by student developers.',
      initialClaps: 1200,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 33,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop',
      tags: ['For you', 'Web Development'],
      content: [
        "Building a Learning Management System (LMS) in three weeks is a challenge. When our university asked us to modernize their online testing systems, we leaped at the opportunity.",
        "## Core Architecture Goals",
        "We prioritized immediate rendering speed, real-time sync of grades, and stateless server sessions. Next.js served as the framework, with Fastify powering the background APIs.",
        "## Key Tech Strategies",
        "- **Stateless Authentication:** JSON Web Tokens stored in HTTP-only cookies.",
        "- **Database Clustering:** Postgres read replicas for handling high load during exams.",
        "- **Edge Caching:** Static paths cached globally."
      ]
    },
    {
      id: 'h6',
      publication: 'Data Science Collective',
      author: 'Chloe Adams',
      date: 'May 14',
      title: 'Figma to Code: Creating Pixel-Perfect Interfaces with Tailwind CSS',
      excerpt: 'Stop guessing padding and line-height. Master the design-to-code handoff by building a structural layout from scratch using a systemized UI design template.',
      initialClaps: 512,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 6,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop',
      tags: ['For you', 'UI Design'],
      content: [
        "Design handoff is notoriously full of friction. By using structural utility layouts, developers can write exact code matched with Figma design tokens.",
        "## Setup Tokens First",
        "Define exact typography sizes, custom tailwind configs, and unified paddings before writing any components.",
        "## Autolayout Mapping",
        "Think of Figma Auto Layout as CSS Flexbox. If you map vertical and horizontal frames directly to flex configurations, your code remains clean and extremely easy to scale."
      ]
    },
    {
      id: 'h7',
      publication: 'Level Up Coding',
      author: 'Nathan Drake',
      date: 'May 11',
      title: 'Analyzing 10 Years of Campus Dining Data with Pandas and Seaborn',
      excerpt: 'A fun data science exploration tracking student eating habits, peak dining hours, and favorite food items across different campus dining halls.',
      initialClaps: 640,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 11,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop',
      tags: ['For you', 'Data Science'],
      content: [
        "Campus dining halls produce surprisingly rich logs of data. In this project, we cleaned ten years of scan logs to track daily trends.",
        "## Cleaning the Raw Logs",
        "Using Python Pandas, we loaded the CSV transaction records, filtered out empty entries, and parsed date/time features.",
        "```python\nimport pandas as pd\ndf = pd.read_csv('dining_logs.csv')\ndf['timestamp'] = pd.to_datetime(df['timestamp'])\ndf['hour'] = df['timestamp'].dt.hour\nprint(df.groupby('hour')['scans'].mean())\n```",
        "## Visualizing the Rush Hour",
        "Using Seaborn, we generated high-density line charts showing that dining halls experience severe spikes between 12:15 PM and 1:00 PM."
      ]
    },
    {
      id: 'h8',
      publication: 'Data Science Collective',
      author: 'Sophie Turner',
      date: 'May 9',
      title: 'Understanding Inflation and Interest Rates: A Practical Guide for Students',
      excerpt: 'An intuitive breakdown of macroeconomic policies, Federal Reserve decisions, and how interest rates directly impact student loans and post-grad hiring.',
      initialClaps: 290,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 2,
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop',
      tags: ['For you', 'Economics'],
      content: [
        "Macroeconomics impacts everything, yet it remains abstract. Here is a student-friendly guide on how high interest rates change the post-grad hiring landscape.",
        "## The Cost of Capital",
        "When central banks raise interest rates, borrowing money becomes expensive. Companies cut down on experimental projects and freeze hiring to preserve cash flow.",
        "## Student Loans and Debt",
        "Understand if your loans are fixed or variable rate, and learn to navigate repayment packages before graduation."
      ]
    },
    {
      id: 'h9',
      publication: 'Level Up Coding',
      author: 'Jessica Pearson',
      date: 'May 7',
      title: 'Demystifying the Resume Screening Process: An Insider Look at ATS Algorithms',
      excerpt: 'What happens to your application after you hit submit? We analyze how modern applicant tracking systems parse text and rank resumes for entry-level roles.',
      initialClaps: 980,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 22,
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop',
      tags: ['For you', 'Career Prep'],
      content: [
        "Over 90% of Fortune 500 companies use an Applicant Tracking System (ATS). If your resume is not structured properly, it may never be seen by human eyes.",
        "## How ATS Parses Data",
        "ATS software uses NLP (Natural Language Processing) to scan resumes, extract skills, and grade relevance against a job description.",
        "## Key Optimization Rules",
        "- **Avoid Columns:** Multi-column layouts often parse out of order.",
        "- **Use Clean Headings:** Use standard headers like 'Education' and 'Work Experience'.",
        "- **Match Keywords:** Incorporate exact nouns from the job posting."
      ]
    },
    {
      id: 'h10',
      publication: 'Level Up Coding',
      author: 'Alex Rivera',
      date: 'May 6',
      title: "Mastering React's Concurrent Features: Transition API and Suspense",
      excerpt: 'Dive deep into React 19\'s asynchronous updates. Learn how to keep your user interface responsive during heavy computational loads and data fetching.',
      initialClaps: 1100,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 28,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop',
      tags: ['For you', 'React'],
      content: [
        "React 19 introduces high-fidelity concurrency tools that prioritize browser responsiveness. Here is how you can use transitions to run heavy calculations in the background.",
        "## The `useTransition` Hook",
        "By wrapping state updates in `startTransition`, you tell React that the update is non-urgent and can be interrupted by user typing or clicks.",
        "```javascript\nconst [isPending, startTransition] = useTransition();\n\nconst handleFilter = (query) => {\n  startTransition(() => {\n    setSearchFilter(query);\n  });\n};\n```",
        "This prevents the UI from freezing during complex list filtering."
      ]
    },
    {
      id: 'h11',
      publication: 'Data Science Collective',
      author: 'Vikram Singh',
      date: 'May 5',
      title: 'Visualizing Graph Algorithms: From BFS to A* Search',
      excerpt: 'Understanding complex data structures through visualization. We implement graph traversal, Dijkstra, and A* pathfinding step-by-step.',
      initialClaps: 720,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 14,
      image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop',
      tags: ['For you', 'DSA'],
      content: [
        "Graphs are everywhere: social networks, maps, recommendation engines. Visualizing how traversals run makes understanding DSA much more intuitive.",
        "## BFS vs DFS",
        "Breadth-First Search uses a queue to traverse level-by-level, finding the shortest path in unweighted graphs. Depth-First Search uses recursion (a stack) to traverse deeply.",
        "## Dijkstra and A*",
        "Dijkstra uses a priority queue to find the absolute shortest path in weighted graphs. A* optimizes this by adding a heuristic estimation towards the target node."
      ]
    },
    {
      id: 'h12',
      publication: 'Self Published',
      author: 'Satyam',
      date: 'May 2',
      title: 'How Our Team Won the IIT Dhanbad Hackathon: A 36-Hour Blueprint',
      excerpt: 'From ideation to pitching under intense pressure. We share the technical stack, team management, and demo strategies that won us first place.',
      initialClaps: 1540,
      comments: 2,
      commentsList: [...mockComments],
      initialRepeats: 45,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop',
      tags: ['For you', 'Hackathons', 'Featured'],
      content: [
        "IIT Dhanbad Hackathon is one of the most competitive student hackathons in India. Our team, representing Scholr, managed to win the grand prize.",
        "## Our 36-Hour Schedule",
        "- **Hour 0-6:** Brainstorming and UI design using Figma.",
        "- **Hour 6-24:** Core backend implementation, DB schemas, and API tests.",
        "- **Hour 24-32:** Front-end integration, animations, and deployment.",
        "- **Hour 32-36:** Pitch preparation, slide deck alignment, and dry runs.",
        "## Technical Stack",
        "We chose React for the frontend, Node.js with Express for the API, and PostgreSQL for state management. This allowed us to build extremely fast, responsive, and robust dashboards.",
        "> \"Focus on the demo. A working demo is worth a thousand slides when presenting to hackathon judges.\""
      ]
    },

    // 10 Beginner Special Articles
    {
      id: 'b1',
      publication: 'Self Published',
      author: 'Emily Watson',
      date: 'Jun 1',
      title: "How to Start with Open Source: A Beginner's First Pull Request",
      excerpt: "Ready to contribute to open source but don't know where to start? We guide you through finding beginner-friendly issues, forking, and landing your very first PR.",
      initialClaps: 520,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Contributing to open source can feel extremely intimidating. Seeing code repositories with thousands of stars and complex structures might make you feel like you aren't ready. However, open source thrives on small contributions.",
        "## 1. Finding Good First Issues",
        "Start by looking for repositories with labels like `good first issue` or `documentation`. These issues are intentionally marked by maintainers for beginners.",
        "## 2. The Git Fork & Clone Workflow",
        "Fork the repository to your own account, then clone it to your local environment. Work on a separate feature branch to make your modifications clean.",
        "```bash\ngit checkout -b fix/typo-in-docs\n# Edit files and save\ngit add .\ngit commit -m 'Fix spelling in readme'\ngit push origin fix/typo-in-docs\n```",
        "## 3. Creating and Reviewing the PR",
        "Navigate back to the original repository on GitHub. Fill out the pull request template carefully, describing your changes, and submit. Welcome to the open-source community!"
      ]
    },
    {
      id: 'b2',
      publication: 'Self Published',
      author: 'Satyam',
      date: 'Jun 2',
      title: "Cracking Your First Hackathon: The Beginner's Survival Kit",
      excerpt: "From ideation to pitching under intense pressure. We share team-building, prototyping, and demonstration strategies that will make your first hackathon a success.",
      initialClaps: 610,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "A hackathon is a marathon of building, coding, and networking. While winning is fantastic, the main goal for a beginner is learning how to iterate quickly and collaborate with others.",
        "## 1. Choosing the Right Team",
        "A balanced team is key. You don't need four elite frontend coders. You need a mix of frontend, backend, UI design, and someone who can pitch the business value clearly.",
        "## 2. Scoping Your MVP (Minimum Viable Product)",
        "The number one reason hackathon teams fail is over-scoping. Focus on building ONE feature that works flawlessly instead of ten features that are half-broken.",
        "## 3. Perfecting the Final Presentation",
        "> \"Judges evaluate what they see. Spend the last 4 hours on your pitch and demo preparation, not debugging a minor CSS border.\"",
        "Make sure to record a backup video of your demo in case the live server crashes during judging."
      ]
    },
    {
      id: 'b3',
      publication: 'Level Up Coding',
      author: 'Jessica Pearson',
      date: 'Jun 3',
      title: "Landing Your First Tech Internship: Resume & Application Blueprint",
      excerpt: "An actionable, sophomore-friendly guide to formatting resumes, creating high-impact personal projects, and cold emailing recruiters to land your first role.",
      initialClaps: 740,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Securing a tech internship is highly competitive. Without prior job experience, your personal portfolio and resume structure must stand out to cross the screening automated filters.",
        "## 1. Designing Your Personal Projects",
        "Instead of copying generic weather apps or to-do lists, build applications that solve a real problem. For example, design an automated notification system for your college dining hall.",
        "## 2. Optimizing the ATS Resume",
        "Use a single-column layout, use standard fonts, and avoid rating bars or icons for skills. List your technical skills in a plain text block so keywords are easily read.",
        "## 3. Cold Outreach on LinkedIn",
        "Find recruiters or engineering leads at firms you love. Send a short, polite note showing your project link and asking for career feedback."
      ]
    },
    {
      id: 'b4',
      publication: 'Data Science Collective',
      author: 'Chloe Adams',
      date: 'Jun 4',
      title: "Web Development for Absolute Beginners: HTML & CSS Fundamentals",
      excerpt: "Step-by-step introduction to web layout. Master headings, semantic layouts, CSS flexbox, and responsive principles to design your first website.",
      initialClaps: 480,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Web development starts with understanding how structure and styling interact. Think of HTML as the skeleton of a building and CSS as the paint and decorations.",
        "## 1. Writing Semantic HTML5",
        "Always use descriptive elements like `<header>`, `<nav>`, `<main>`, and `<footer>` rather than wrapping everything in nested `<div>` blocks. This greatly improves SEO.",
        "## 2. Mastering CSS Flexbox",
        "Flexbox makes aligning layouts incredibly simple. By using `display: flex`, you easily align items horizontally or vertically.",
        "```css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```",
        "## 3. Mobile-First Media Queries",
        "Use responsive breakpoints to ensure your site looks stunning on both smartphones and laptop displays."
      ]
    },
    {
      id: 'b5',
      publication: 'Self Published',
      author: 'Emily Watson',
      date: 'Jun 5',
      title: "Python Basics: A Friendly Guide to Your First Script",
      excerpt: "A beginner-friendly introduction to variables, data types, standard inputs, and simple loop commands to start your programming journey.",
      initialClaps: 390,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Python is renowned for its readability and simplicity. It allows beginners to write logical scripts with very little boilerplate code compared to C++ or Java.",
        "## 1. Variables and Print Actions",
        "In Python, you do not need to declare variable types explicitly. The interpreter determines it dynamically.",
        "```python\nusername = \"Satyam\"\nage = 19\nprint(f\"Hello {username}, you are {age} years old!\")\n```",
        "## 2. Basic Conditional Logic",
        "Use simple `if` blocks to guide script behavior based on data input.",
        "## 3. Your First Simple Loop",
        "Use `for` loops to repeat tasks, such as iterating through a student name list."
      ]
    },
    {
      id: 'b6',
      publication: 'Data Science Collective',
      author: 'Vikram Singh',
      date: 'Jun 6',
      title: "The Beginner's Guide to Data Structures: Understanding Arrays and Lists",
      excerpt: "Learn how computers store collections of data. Compare dynamic arrays and linked lists to select the optimal choice for your software logic.",
      initialClaps: 590,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Data structures are the foundation of computer science. Selecting the correct structure is crucial for writing efficient algorithms.",
        "## 1. What is an Array?",
        "An array is a contiguous block of memory. This allows elements to be accessed instantly by index, but makes inserting or deleting elements expensive.",
        "## 2. The Dynamic List",
        "Dynamic lists automatically expand their capacity when filled, handling resizing behind the scenes.",
        "## 3. Real-world Performance Comparison",
        "Choose arrays for fast data reads, and linked lists if you need frequent insertions and deletions at the head or tail."
      ]
    },
    {
      id: 'b7',
      publication: 'Level Up Coding',
      author: 'Sergey Nes',
      date: 'Jun 7',
      title: "How to Get Started with AI: No Complex Math Required",
      excerpt: "Demystifying artificial intelligence. Learn how API keys, prompt operations, and system context let you build custom intelligent chatbots.",
      initialClaps: 680,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Many students think entering AI requires advanced calculus and statistical model training. While that is true for model researchers, AI engineers build products using API services.",
        "## 1. The Power of Large Language Model APIs",
        "OpenAI, Google, and Anthropic expose simple endpoints. You send a text prompt and receive a structured JSON response.",
        "## 2. Crafting System Context",
        "By setting a system prompt, you can define chatbot behavior: e.g., 'You are a patient robotics tutor assisting first-year college students.'",
        "## 3. Next Steps",
        "Build a simple chatbot wrapper using Node.js or Python to practice handling API keys securely."
      ]
    },
    {
      id: 'b8',
      publication: 'Level Up Coding',
      author: 'David Miller',
      date: 'Jun 8',
      title: "Introduction to Version Control: Git & GitHub 101",
      excerpt: "Stop naming files 'final_version_v2_edit.zip'. Master git init, commits, branches, and pushing repositories to GitHub.",
      initialClaps: 710,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Version control tracks edits chronologically. It allows you to roll back changes, debug file conflicts, and collaborate seamlessly on team projects.",
        "## 1. Initializing a Repository",
        "Run `git init` inside your project directory to start tracking revisions.",
        "## 2. The Commits Pipeline",
        "Stages files using `git add` and snapshot edits with `git commit`.",
        "```bash\ngit add .\ngit commit -m \"Initialize student profile layout\"\n```",
        "## 3. Pushing to GitHub",
        "Add a remote origin link and push your repository to store it safely on cloud servers."
      ]
    },
    {
      id: 'b9',
      publication: 'Data Science Collective',
      author: 'Chloe Adams',
      date: 'Jun 9',
      title: "Building Your First UI Design in Figma: A Hands-on Tutorial",
      excerpt: "Learn how to use frame tools, custom colors, auto-layout alignments, and components to design clean layouts.",
      initialClaps: 530,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Figma is the industry standard for UI design. A clean design structure ensures the developer handoff goes smoothly.",
        "## 1. Frame-based Layouts",
        "Always design inside specific frames (e.g., MacBook Pro or iPhone 15) to maintain accurate viewport scaling.",
        "## 2. Using Auto Layout",
        "Auto Layout acts as CSS Flexbox. It automatically positions buttons and cards when content length changes.",
        "## 3. Component Reusability",
        "Create reusable master components for elements like buttons or navigation links to apply design edits globally."
      ]
    },
    {
      id: 'b10',
      publication: 'Level Up Coding',
      author: 'Jessica Pearson',
      date: 'Jun 10',
      title: "A Student's Guide to Tech Networking: How to Connect on LinkedIn",
      excerpt: "Learn to design a professional LinkedIn page, write engaging connection requests, and ask for informational career chats.",
      initialClaps: 620,
      comments: 2,
      commentsList: [...mockComments],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop',
      tags: ['For you', 'Beginner Special'],
      content: [
        "Networking is often the key to finding hidden internship roles. Your digital profile acts as a landing page for recruiters and technical managers.",
        "## 1. Writing a Professional Headline",
        "Instead of just listing 'Student', use descriptive text showing skills and goals: e.g., 'Integrated B.Tech CS Student | AI & Robotics Enthusiast'.",
        "## 2. Sending Personalized Invites",
        "Never send blank connection requests. Write a 2-sentence note stating why you want to connect: e.g., 'Hello Marc, I read your article on full-stack web applications and would love to follow your tech updates.'",
        "## 3. Requesting Informational Chats",
        "Ask questions about their career path to gain valuable tips and insights."
      ]
    }
  ]);

  const [profileArticles, setProfileArticles] = useState(() => {
    const active = getActiveUser();
    if (active && active.profileArticles) return active.profileArticles;
    return [
      {
        id: 'p1',
        category: 'AI Insights',
        author: 'Satyam',
        date: 'May 12',
        title: 'The Future of AI Agents: Why Students Should Care',
        excerpt: 'Autonomous agents are redefining the academic landscape, from research automation to personalized study assistants. We look into the AI tools driving student productivity and breakthroughs.',
        initialClaps: 2400,
        comments: 2,
        commentsList: [...mockComments],
        image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop',
        content: [
          "Autonomous AI agents are set to transform the student experience. Far from being simple text predictors, these agents plan, call APIs, and reason through long-term academic tasks.",
          "## Personalized Tutors",
          "Instead of a static textbook, an agent analyzes your homework code, suggests debugging solutions, and tests your understanding with interactive quizzes.",
          "## Research Automation",
          "Agents can scour scientific databases, summarize relevant papers, and draft literature review structures, saving students hours of research overhead."
        ]
      },
      {
        id: 'p2',
        category: 'Code Academy',
        author: 'Sarah Miller',
        date: 'May 10',
        title: '2024 Web Development Roadmap: From Zero to Full Stack',
        excerpt: 'Mastering modern web development requires a strategic approach. We break down the absolute essentials of HTML, CSS, JavaScript, React, server architectures, and databases for full mastery.',
        initialClaps: 1800,
        comments: 2,
        commentsList: [...mockComments],
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop',
        content: [
          "Web development moves incredibly fast. To avoid tutorial hell, build a systematic learning list mapping out standard web structures.",
          "## Phase 1: Semantic HTML & Vanilla CSS",
          "Master responsive styling, document mapping, flexbox layouts, and grids.",
          "## Phase 2: JavaScript & DOM Manipulation",
          "Understand asynchronous promises, fetch API calls, storage mechanics, and event listeners.",
          "## Phase 3: Frameworks & Deployments",
          "Learn React lifecycle states, routers, custom hooks, and publish application bundles to hosting solutions."
        ]
      },
      {
        id: 'p3',
        category: 'Student Success',
        author: 'Satyam',
        date: 'May 8',
        title: 'How I Landed a FAANG Internship as a Sophomore',
        excerpt: 'Networking, open-source contributions, and the exact resume template that got me past the screening bots at Google and Stripe. Here is the step-by-step sophomore guide.',
        initialClaps: 4200,
        comments: 2,
        commentsList: [...mockComments],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop',
        content: [
          "Landing a sophomore internship at FAANG is tough, but far from impossible. If you focus on building a robust portfolio and networking, you can skip the standard application filters.",
          "## 1. Technical Depth Wins",
          "Don't build basic calculator apps. Build systems that handle multi-user database entries or automate hardware processes.",
          "## 2. Resume Keyword Optimization",
          "Align project blueprint points to job description nouns: e.g., 'Implemented responsive React hooks, decreasing loading latency by 20%'.",
          "## 3. Direct Cold Messaging",
          "Connect with engineering managers, present your open-source projects, and ask for career advice. Often, they will refer you directly."
        ]
      }
    ];
  });

  useEffect(() => {
    if (isLoggedIn && userProfile && userProfile.email) {
      const updatedUser = {
        ...userProfile,
        profileArticles,
        savedArticles,
        followingCreators,
        followers
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Sync users array
      const usersRaw = localStorage.getItem('users');
      if (usersRaw) {
        try {
          const users = JSON.parse(usersRaw);
          const index = users.findIndex(u => u.email.toLowerCase() === userProfile.email.toLowerCase());
          if (index !== -1) {
            users[index] = {
              ...users[index],
              ...updatedUser
            };
            localStorage.setItem('users', JSON.stringify(users));
          }
        } catch (err) {
          console.error("Error syncing to users array:", err);
        }
      }
    }
  }, [isLoggedIn, userProfile, profileArticles, savedArticles, followingCreators, followers]);

  // Synchronize route paths to state
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/story/')) {
      const id = path.split('/').pop();
      const allArticles = [...homeArticles, ...profileArticles, ...savedArticles];
      const found = allArticles.find(a => String(a.id) === String(id));
      if (found) {
        setSelectedArticle(found);
      } else {
        setSelectedArticle({ id });
      }
    } else {
      setSelectedArticle(null);
      if (path === '/profile') setActiveTab('Profile');
      else if (path === '/saved') setActiveTab('Saved');
      else if (path === '/stats') setActiveTab('Stats');
      else if (path === '/following') setActiveTab('Following');
      else if (path === '/followers') setActiveTab('Followers');
      else if (path === '/write') setActiveTab('Write');
      else if (path === '/') setActiveTab('Home');
    }
  }, [location.pathname, homeArticles, profileArticles, savedArticles]);

  const toggleSaveArticle = (article) => {
    setSavedArticles(prev => {
      const exists = prev.some(a => a.id === article.id);
      if (exists) {
        return prev.filter(a => a.id !== article.id);
      } else {
        return [...prev, article];
      }
    });
  };

  const handleAddComment = (articleId, commentText) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: userProfile.name,
      avatar: userProfile.avatar,
      text: commentText,
      date: 'Just now'
    };

    const updateArticles = (list) => 
      list.map(art => {
        if (art.id === articleId) {
          const updatedComments = [newComment, ...(art.commentsList || [])];
          return {
            ...art,
            commentsList: updatedComments,
            comments: updatedComments.length
          };
        }
        return art;
      });

    setHomeArticles(prev => updateArticles(prev));
    setProfileArticles(prev => updateArticles(prev));
    setSavedArticles(prev => updateArticles(prev));

    // Sync selected detailed article if active
    setSelectedArticle(prev => {
      if (prev && prev.id === articleId) {
        const updatedComments = [newComment, ...(prev.commentsList || [])];
        return {
          ...prev,
          commentsList: updatedComments,
          comments: updatedComments.length
        };
      }
      return prev;
    });
  };

  const handlePublishArticle = (draftData) => {
    const newArticle = {
      id: `custom-${Date.now()}`,
      publication: 'Self Published',
      author: userProfile.name,
      date: 'Just now',
      title: draftData.title,
      excerpt: draftData.description,
      content: [draftData.description],
      initialClaps: 0,
      comments: 0,
      commentsList: [],
      initialRepeats: 0,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop',
      tags: draftData.tags.includes('For you') ? draftData.tags : ['For you', ...draftData.tags]
    };

    setHomeArticles(prev => [newArticle, ...prev]);
    setProfileArticles(prev => [
      {
        ...newArticle,
        category: draftData.tags[0] || 'AI Insights'
      },
      ...prev
    ]);

    navigate('/');
  };

  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setIsEditProfileOpen(false);
  };

  const unfollowCreator = (id) => {
    setFollowingCreators(prev => prev.filter(c => c.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Maps author name dynamically so edits propagate immediately everywhere
  const mapUserAuthorName = (articles) => {
    return articles.map(art => {
      if (art.author === 'Satyam' || art.author === userProfile.name || art.publication === 'Self Published') {
        return {
          ...art,
          author: userProfile.name
        };
      }
      return art;
    });
  };

  const handleAuthorClick = (authorName) => {
    setSelectedArticle(null);
    setViewedProfileAuthor(authorName);
    navigate('/profile');
  };

  const handleTabChange = (tab) => {
    setViewedProfileAuthor(null);
    setSelectedArticle(null);
    if (tab === 'Home') navigate('/');
    else if (tab === 'Profile') navigate('/profile');
    else if (tab === 'Saved') navigate('/saved');
    else if (tab === 'Stats') navigate('/stats');
    else if (tab === 'Following') navigate('/following');
    else if (tab === 'Followers') navigate('/followers');
    else if (tab === 'Write') navigate('/write');
  };

  // Helper to resolve profile database details for external creators
  const getAuthorProfile = (authorName) => {
    const defaultBanner = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
    
    const authorsDb = {
      'Sergey Nes': {
        name: 'Sergey Nes',
        avatar: getImagePath('/images/avatar_marc.png'),
        banner: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        headline: 'Staff Software Engineer & AI Researcher | Open Source Maintainer',
        education: 'Stanford University',
        branch: 'M.S. in Computer Science (AI Track)',
        gradYear: '2022',
        collegeLocation: 'Stanford, California, USA',
        skills: 'Python, PyTorch, LangChain, Agents, Node.js, Kubernetes',
        areasOfInterest: 'Autonomous Agents, LLM Reasoning, Vector Databases',
        github: 'https://github.com/sergeynes',
        linkedin: 'https://linkedin.com/in/sergeynes',
        about: 'Sergey is a researcher and staff engineer working on the intersection of AI agents and distributed systems. He designs deterministic agentic feedback loops and maintains multiple open-source automation libraries.'
      },
      'Marina Wyss': {
        name: 'Marina Wyss',
        avatar: getImagePath('/images/avatar_anna.png'),
        banner: 'linear-gradient(135deg, #581c87 0%, #a855f7 100%)',
        headline: 'AI Architect at Hugging Face | Tech Writer | ex-Stripe',
        education: 'MIT',
        branch: 'B.S. in Computer Science',
        gradYear: '2020',
        collegeLocation: 'Cambridge, Massachusetts, USA',
        skills: 'FastAPI, Python, Docker, Transformers, Fine-Tuning, AWS',
        areasOfInterest: 'Deep Learning, Devops for ML, Developer Experience',
        github: 'https://github.com/marinawyss',
        linkedin: 'https://linkedin.com/in/marinawyss',
        about: 'Marina is a developer advocate and AI architect focused on making it easier for traditional software engineers to build, deploy, and scale machine learning models.'
      },
      'Marcus Aurelius': {
        name: 'Marcus Aurelius',
        avatar: getImagePath('/images/avatar_marc.png'),
        banner: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)',
        headline: 'Robotics Software Engineer at Boston Dynamics',
        education: 'Carnegie Mellon University',
        branch: 'M.S. in Robotic Systems',
        gradYear: '2023',
        collegeLocation: 'Pittsburgh, Pennsylvania, USA',
        skills: 'C++, ROS2, Gazebo, LiDAR, SLAM, Control Systems, Python',
        areasOfInterest: 'Autonomous Robots, Path Planning, Embedded Systems',
        github: 'https://github.com/marcusrobotics',
        linkedin: 'https://linkedin.com/in/marcusrobotics',
        about: 'Marcus builds real-time software systems for autonomous mobile robots. He is a ROS2 core contributor and writes guides helping university students enter the field.'
      },
      'Emily Watson': {
        name: 'Emily Watson',
        avatar: getImagePath('/images/avatar_anna.png'),
        banner: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
        headline: 'Senior Python Developer & Educator | PSF Fellow',
        education: 'University of Oxford',
        branch: 'B.S. in Software Engineering',
        gradYear: '2019',
        collegeLocation: 'Oxford, United Kingdom',
        skills: 'Python, Django, Asyncio, Metaprogramming, SQL, Security',
        areasOfInterest: 'Advanced Python Architectures, Web Security, API Design',
        github: 'https://github.com/emilywatson',
        linkedin: 'https://linkedin.com/in/emilywatson',
        about: 'Emily is a professional software developer and trainer. She writes popular Python tutorials and teaches workshops on async architectures and high-performance coding.'
      },
      'David Miller': {
        name: 'David Miller',
        avatar: getImagePath('/images/avatar_marc.png'),
        banner: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)',
        headline: 'Full-Stack Team Lead at Vercel | Tech Blogger',
        education: 'UC Berkeley',
        branch: 'B.S. in Computer Science',
        gradYear: '2021',
        collegeLocation: 'Berkeley, California, USA',
        skills: 'Next.js, React, Node.js, Fastify, PostgreSQL, TailwindCSS',
        areasOfInterest: 'Serverless Tech, Edge Middleware, Database Scaling',
        github: 'https://github.com/davidmiller',
        linkedin: 'https://linkedin.com/in/davidmiller',
        about: 'David leads development teams building modern React frameworks and edge-native serverless backends. He loves mentoring students and hacking prototype ideas.'
      },
      'Chloe Adams': {
        name: 'Chloe Adams',
        avatar: getImagePath('/images/avatar_anna.png'),
        banner: 'linear-gradient(135deg, #831843 0%, #db2777 100%)',
        headline: 'Lead Product Designer at Figma | UI/UX Consultant',
        education: 'Rhode Island School of Design',
        branch: 'BFA in Industrial & UI Design',
        gradYear: '2020',
        collegeLocation: 'Providence, Rhode Island, USA',
        skills: 'UI Design, Figma, CSS, TailwindCSS, Prototyping, Usability',
        areasOfInterest: 'Design Systems, Component Architectures, UX Research',
        github: 'https://github.com/chloeadams',
        linkedin: 'https://linkedin.com/in/chloeadams',
        about: 'Chloe bridges the gap between layout mockups and frontend code. She works at Figma designing tools that enable developers to implement clean design system tokens.'
      },
      'Nathan Drake': {
        name: 'Nathan Drake',
        avatar: getImagePath('/images/avatar_marc.png'),
        banner: 'linear-gradient(135deg, #115e59 0%, #14b8a6 100%)',
        headline: 'Data Scientist at Airbnb | Data Visualization Expert',
        education: 'University of Washington',
        branch: 'B.S. in Statistics & Data Science',
        gradYear: '2021',
        collegeLocation: 'Seattle, Washington, USA',
        skills: 'Pandas, Seaborn, SQL, Tableau, R, A/B Testing, Machine Learning',
        areasOfInterest: 'Product Analytics, Data Storytelling, Predictive Modeling',
        github: 'https://github.com/nathandrake',
        linkedin: 'https://linkedin.com/in/nathandrake',
        about: 'Nathan turns massive, unstructured datasets into interactive graphs and actionable product recommendations. He runs the Campus Dining open-data project.'
      },
      'Sophie Turner': {
        name: 'Sophie Turner',
        avatar: getImagePath('/images/avatar_anna.png'),
        banner: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
        headline: 'Financial Analyst at Goldman Sachs | Economics Tutor',
        education: 'London School of Economics',
        branch: 'B.S. in Economics & Finance',
        gradYear: '2022',
        collegeLocation: 'London, United Kingdom',
        skills: 'Macroeconomics, Excel, Financial Modeling, Python, R',
        areasOfInterest: 'Interest Rate Swaps, Central Bank Policy, Inflation Hedging',
        github: 'https://github.com/sophieturner',
        linkedin: 'https://linkedin.com/in/sophieturner',
        about: 'Sophie is a finance professional who loves explaining complex macroeconomic principles to college students to help them plan their finances and careers.'
      },
      'Jessica Pearson': {
        name: 'Jessica Pearson',
        avatar: getImagePath('/images/avatar_anna.png'),
        banner: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)',
        headline: 'Head of Recruitment at Stripe | Career Coach',
        education: 'Harvard Business School',
        branch: 'MBA in Human Resource Management',
        gradYear: '2018',
        collegeLocation: 'Boston, Massachusetts, USA',
        skills: 'Talent Acquisition, Resume Optimization, ATS Algorithms, Negotiation',
        areasOfInterest: 'Hiring Operations, Interview Prep, Student Career Development',
        github: 'https://github.com/jessicapearson',
        linkedin: 'https://linkedin.com/in/jessicapearson',
        about: 'Jessica is an executive recruiter dedicated to demystifying the corporate hiring process. She guides college seniors through resume parsing optimization and salary negotiations.'
      },
      'Alex Rivera': {
        name: 'Alex Rivera',
        avatar: getImagePath('/images/avatar_marc.png'),
        banner: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
        headline: 'Senior Frontend Engineer at Meta | React Core Enthusiast',
        education: 'Georgia Tech',
        branch: 'B.S. in Computer Science',
        gradYear: '2020',
        collegeLocation: 'Atlanta, Georgia, USA',
        skills: 'React, TypeScript, Jest, Webpack, Performance Tuning, GraphQL',
        areasOfInterest: 'Concurrent Rendering, State Synchronization, Component Lifecycles',
        github: 'https://github.com/alexrivera',
        linkedin: 'https://linkedin.com/in/alexrivera',
        about: 'Alex works on React core optimizations at Meta. He writes detailed deep dives explaining fiber architectures, React 19 server components, and concurrent states.'
      },
      'Vikram Singh': {
        name: 'Vikram Singh',
        avatar: getImagePath('/images/avatar_marc.png'),
        banner: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
        headline: 'Algorithms Professor & Competitive Programmer',
        education: 'IIT Delhi',
        branch: 'Ph.D. in Theoretical Computer Science',
        gradYear: '2017',
        collegeLocation: 'New Delhi, Delhi, India',
        skills: 'C++, Java, Graph Algorithms, Dynamic Programming, DSA, Complexity Theory',
        areasOfInterest: 'Shortest Path Visualizations, NP-Hard Optimization, Teaching',
        github: 'https://github.com/vikramsingh',
        linkedin: 'https://linkedin.com/in/vikramsingh',
        about: 'Vikram is a lecturer and algorithm designer. He creates interactive traversal visualizers to help students build a solid foundation in data structures and complexity analysis.'
      }
    };
    
    return authorsDb[authorName] || {
      name: authorName,
      avatar: getImagePath('/images/avatar_user.png'),
      banner: defaultBanner,
      headline: 'Student & Technology Creator | Scholr Member',
      education: 'Scholr Academy of Tech',
      branch: 'Undergraduate Program',
      gradYear: '2027',
      collegeLocation: 'International Workspace',
      skills: 'JavaScript, HTML, CSS, React, Public Speaking',
      areasOfInterest: 'Software Engineering, Learning & Collaboration',
      github: 'https://github.com',
      linkedin: 'https://linkedin',
      about: 'A passionate learning member of the Scholr platform writing and sharing technology ideas.'
    };
  };

  const renderFeed = () => {
    return (
      <Routes>
        <Route path="/" element={
          <HomeFeed 
            articles={mapUserAuthorName(homeArticles)} 
            selectedTopic={selectedTopic} 
            setSelectedTopic={setSelectedTopic}
            currentUser={userProfile.name}
            searchQuery={searchQuery}
            savedArticles={savedArticles}
            toggleSave={toggleSaveArticle}
            onTitleClick={(art) => navigate(`/story/${art.id}`)}
            onAddComment={handleAddComment}
            onAuthorClick={handleAuthorClick}
          />
        } />
        <Route path="/story/:id" element={
          <ArticleDetailView 
            homeArticles={homeArticles}
            profileArticles={profileArticles}
            savedArticles={savedArticles}
            toggleSave={toggleSaveArticle}
            onAuthorClick={handleAuthorClick}
            currentUser={userProfile.name}
          />
        } />
        <Route path="/profile" element={
          <ProfileFeed 
            articles={mapUserAuthorName(viewedProfileAuthor ? homeArticles.filter(a => a.author === viewedProfileAuthor) : profileArticles)} 
            userProfile={viewedProfileAuthor ? getAuthorProfile(viewedProfileAuthor) : userProfile} 
            onSaveProfile={handleSaveProfile}
            onEditProfileClick={() => setIsEditProfileOpen(true)}
            savedArticles={savedArticles}
            toggleSave={toggleSaveArticle}
            onTitleClick={(art) => navigate(`/story/${art.id}`)}
            onAddComment={handleAddComment}
            currentUser={userProfile.name}
            onAuthorClick={handleAuthorClick}
          />
        } />
        <Route path="/saved" element={
          <SavedFeed 
            savedArticles={mapUserAuthorName(savedArticles)}
            onTitleClick={(art) => navigate(`/story/${art.id}`)}
            toggleSave={toggleSaveArticle}
            setActiveTab={handleTabChange}
            onAuthorClick={handleAuthorClick}
          />
        } />
        <Route path="/stats" element={<StatsView />} />
        <Route path="/following" element={<NetworkView type="Following" users={followingCreators} onUnfollow={unfollowCreator} />} />
        <Route path="/followers" element={<NetworkView type="Followers" users={followers} />} />
        <Route path="/write" element={<WriteView onPublish={handlePublishArticle} />} />
      </Routes>
    );
  };

  const gridColumns = selectedArticle
    ? '1fr'
    : (activeTab === 'Home')
      ? '1fr 340px'
      : (activeTab === 'Write')
        ? '1fr'
        : '240px 1fr';

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && !isLoggedIn ? (
        <AuthView 
          onLoginSuccess={(user) => {
            setIsLoggedIn(true);
            setUserProfile(user);
            setProfileArticles(user.profileArticles || []);
            setSavedArticles(user.savedArticles || []);
            setFollowingCreators(user.followingCreators || []);
            setFollowers(user.followers || []);
          }}
        />
      ) : (
        <motion.div
          className="app-container"
          initial={{ opacity: 0 }}
          animate={!showIntro ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <Header 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            userProfile={userProfile}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onLogout={handleLogout}
          />
          
          <main className="main-content" style={{ gridTemplateColumns: gridColumns }}>
            {!selectedArticle && activeTab !== 'Write' && activeTab !== 'Home' && (
              <SidebarLeft 
                activeTab={activeTab} 
                setActiveTab={handleTabChange} 
                onEditProfileClick={() => setIsEditProfileOpen(true)}
                followingCreatorsCount={followingCreators.length}
                followersCount={followers.length}
                savedArticlesCount={savedArticles.length}
              />
            )}
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderFeed()}
                </motion.div>
              </AnimatePresence>
            </div>

            {activeTab === 'Home' && !selectedArticle && (
              <SidebarRight 
                activeTab={activeTab} 
                selectedTopic={selectedTopic} 
                setSelectedTopic={setSelectedTopic} 
              />
            )}
          </main>

          {/* Edit Profile Modal Dialog */}
          <AnimatePresence>
            {isEditProfileOpen && (
              <EditProfileModal 
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                userProfile={userProfile}
                onSave={handleSaveProfile}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}

export default App;
