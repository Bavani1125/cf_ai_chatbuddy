# cf_ai_chatbuddy

AI-powered chat application built with **Cloudflare Workers**, **Durable Objects**, and **Workers AI**.  
This project demonstrates the integration of Large Language Models (LLMs) with session memory and a simple web-based chat UI.  

## 🌐 Live Demo
👉 [Click here to try the deployed app](https://cf-ai-chatbuddy.bavanikarthikeyan11.workers.dev)


## 🚀 Features
- **LLM Integration** – Uses Cloudflare Workers AI (Llama 3.1) for natural language responses.  
- **Session Memory** – Powered by Durable Objects to maintain state across conversations.  
- **Web UI** – Simple chat interface served from `public/index.html`.  
- **Serverless Deployment** – Runs entirely on Cloudflare’s global edge network.  

---

## 🛠 Tech Stack
- **Cloudflare Workers** – Serverless backend  
- **Durable Objects** – Per-session state management  
- **Workers AI** – LLM inference (`@cf/meta/llama-3.1-8b-instruct`)  
- **HTML/CSS/JS** – Frontend chat interface  

---

## 📂 Project Structure
```
cf_ai_chatbuddy/
├── public/             # Static frontend files
│   └── index.html      # Chat UI
├── src/                # Worker source code
│   ├── index.js        # Main Worker entry point
│   └── chat_do.js      # Durable Object for session memory
├── wrangler.jsonc      # Cloudflare config
├── package.json        # Dependencies & scripts
└── README.md           # Project documentation
```

---

## ⚙️ Setup

### 1. Clone this repository
```bash
git clone https://github.com/your-username/cf_ai_chatbuddy.git
cd cf_ai_chatbuddy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Log in to Cloudflare
```bash
wrangler login
```

### 4. Run locally
```bash
npm run start
```
App runs at: `http://localhost:8787`

---

## 🌐 Deploy to Cloudflare
```bash
npm run deploy
```
After deployment, you’ll receive a live Cloudflare URL (e.g. `https://cf-ai-chatbuddy.yourname.workers.dev`).

---

## System Design 
<img src="System Architecture – Cloudflare AI ChatBuddy.png" width="800"/>

## Screenshots
<img src="Screenshot 1.png" width="800"/>
<img src="Screenshot 2.png" width="800"/>
