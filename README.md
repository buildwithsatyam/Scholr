# 🎓 Medium.AI (formerly Scholr)
### *Stop doomscrolling technical essays. Learn faster, retain deeper, and go touch grass.*

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-emerald?style=for-the-badge&logo=github)](https://buildwithsatyam.github.io/Scholr/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/buildwithsatyam/Scholr)
[![React 19](https://img.shields.io/badge/React_19-Vite_8-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Open Source AI](https://img.shields.io/badge/AI-Llama_3.3_%26_Gemini-FF6F00?style=for-the-badge&logo=meta)](https://groq.com)

---

## 🌿 The Story: The Reality of "Screen Paralysis"

It was 2:00 AM on a Tuesday. My eyes burned, blue light reflecting off my glasses, with 14 browser tabs open—all technical guides, research breakdowns, and tutorials. 

I had been reading for three hours straight. But if someone asked me what the second article was actually about, my mind was a complete blank.

As college students and early-career developers, we’ve all been there:
- You spend your entire evening scrolling through dense essays.
- You highlight random sentences, thinking you're learning.
- By the next morning, 80% of it is gone.
- You feel exhausted, guilty, and trapped inside your room staring at screens all weekend.

Reading shouldn’t feel like serving a prison sentence behind a monitor. Technology was meant to give us our time back—not steal our youth and keep us from stepping outside into the sun.

That frustration became the birth of **Medium.AI**.

I built it with a single conviction: **Give students their lives back.** Transform long, passive reading into immediate, active comprehension in five minutes flat—so you can master the concept, ace your interview or exam, shut the laptop lid, and **go touch grass**.

---

## ✨ What Medium.AI Does

Medium.AI turns any written article into an active, four-part learning companion directly on the reading page:

```
┌─────────────────────────────────────────────────────────────────┐
│                    📖 The Reading Canvas                       │
│     Clean, Medium-inspired typography with distraction-free UI  │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│               ✨ Medium.AI Learning Companion                   │
│                                                                 │
│  [⚡ Summary]   [💡 Explain Simply]   [📝 Quiz]   [📋 Notes]   │
└─────────────────────────────────────────────────────────────────┘
```

### 1. ⚡ Executive Summary & Actionable Takeaways
Condenses 3,000-word deep-dives into 2 clear paragraphs and 3–5 bulleted takeaways that highlight practical applications instead of fluff.

### 2. 💡 Explain Simply (with Analogies)
No more impenetrable jargon. Toggle between **Beginner**, **Intermediate**, and **Advanced** depth:
- **Beginner**: Uses mental models from daily life (*"Think of this architecture like an orchestra conductor..."*).
- **Intermediate**: Explains concrete architectural tradeoffs and industry use-cases.
- **Advanced**: Breaks down edge cases, distributed concurrency, and system bottlenecks.

### 3. 📝 Interactive Practice Quiz
True retention requires active recall. The AI dynamically generates a **5-question multiple-choice quiz** based directly on the story. 
- Real-time scoring & celebratory feedback.
- Detailed explanations for why each answer was right or wrong.
- One-click retry to solidify your understanding.

### 4. 📋 Revision Notes & Cheat Sheets
Generates structured bullet points, key definitions, and practical takeaways. Features a **Copy to Clipboard** button formatted in Markdown, ready to paste into Notion, Obsidian, or your notebook.

---

## 🛠️ The Architecture: Zero-Secret & Cloud Resilient

```
┌──────────────────────────────────────┐
│  React 19 Frontend (GitHub Pages)    │
│  - No secrets in client-side bundle  │
│  - Automatic simulation fallback     │
└──────────────────┬───────────────────┘
                   │ Untrusted article text
                   ▼
┌──────────────────────────────────────┐
│  Server-Side AI Proxy / Edge API     │
│  - Express / Vercel Serverless       │
│  - Delimiter prompt-injection guards │
│  - Strict JSON schema enforcement    │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│  Open-Weight & Free-Tier AI Models   │
│  • Meta Llama 3.3 70B (via Groq)     │
│  • Google Gemini 1.5 Flash           │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│  Supabase Cloud Layer                │
│  - PostgreSQL with Row Level Security│
│  - AI Cache (saves tokens & latency) │
└──────────────────────────────────────┘
```

- **Zero-Secret Static Deployment**: Designed to run securely on GitHub Pages without ever bundling sensitive AI API keys in client-side code.
- **Prompt Injection Defense**: All user-written articles are treated as untrusted text and encapsulated within strict delimiter tags to protect the model from role-override hijacking.
- **Dual-Mode Dev Engine**: Vite dev server includes built-in AI middleware—running `npm run dev` serves both the frontend and the AI endpoints on the exact same port without needing a second terminal.
- **Supabase Cloud Layer**: Open-source PostgreSQL tables for articles, bookmarks, claps, and an **AI caching engine** that saves repeated queries.

---

## 🚀 Quickstart: Run It Locally

### 1. Clone the repository
```bash
git clone https://github.com/buildwithsatyam/Scholr.git
cd Scholr
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure your environment (Optional for live LLM)
```bash
cp .env.example .env
```
Add your free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) or Groq key from [Groq Cloud](https://console.groq.com/keys):
```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-1.5-flash
```
*(If no API key is provided, the platform automatically runs in interactive demo mode so you can test all 4 tools right away!)*

### 4. Start the dev server
```bash
npm run dev
```
Open `http://localhost:5173/Scholr/` in your browser.

---

## 📦 Deployment

### Deploy to GitHub Pages:
```bash
npm run deploy
```

### Deploy Backend to Vercel:
The project includes [vercel.json](vercel.json) and [api/learn.js](api/learn.js). Simply link the repository on [Vercel](https://vercel.com) and add `GEMINI_API_KEY` to your environment variables.

---

## 🤝 Open Source & Contributing

Medium.AI was built during Hacktoberfest with love for students everywhere who just want to understand tech and get back to enjoying life. Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Made with ❤️ by [Satyam](https://github.com/buildwithsatyam) — Go touch some grass today! 🌿**
