import { ChatSession } from "./chat_do.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/chat") {
      try {
        const body = await request.json();
        const sessionId = body.sessionId || "default";

    
        const id = env.CHAT_DO.idFromName(sessionId);
        const stub = env.CHAT_DO.get(id);

    
        const model = body.model || "@cf/meta/llama-3-8b-instruct";


        const doResp = await stub.fetch(new Request(url.origin + "/do/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userMessage: body.userMessage,
            systemPrompt: body.systemPrompt,
            model
          })
        }));

        return new Response(await doResp.text(), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

   
    if (request.method === "GET" && url.pathname === "/api/history") {
      try {
        const sessionId = url.searchParams.get("sessionId") || "default";

        const id = env.CHAT_DO.idFromName(sessionId);
        const stub = env.CHAT_DO.get(id);

        const doResp = await stub.fetch(url.origin + "/do/history");
        return new Response(await doResp.text(), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};


export { ChatSession } from "./chat_do.js";
