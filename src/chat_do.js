export class ChatSession {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async getHistory() {
    return (await this.state.storage.get("history")) || [];
  }

  async setHistory(history) {
    await this.state.storage.put("history", history.slice(-20)); // keep last 20 turns
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname.endsWith("/history")) {
      const history = await this.getHistory();
      return new Response(JSON.stringify({ history }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (request.method === "POST" && url.pathname.endsWith("/chat")) {
      const { userMessage, systemPrompt, model } = await request.json();

      const history = await this.getHistory();
      const messages = [
        { role: "system", content: systemPrompt || "You are a concise, helpful assistant." },
        ...history,
        { role: "user", content: userMessage || "" }
      ];

      const aiResp = await this.env.AI.run(model, { messages });
      const text =
        aiResp?.response || aiResp?.output_text || JSON.stringify(aiResp);

      const newHistory = [
        ...history,
        { role: "user", content: userMessage },
        { role: "assistant", content: text }
      ];
      await this.setHistory(newHistory);

      return new Response(JSON.stringify({ reply: text }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  }
}
