import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import { Sandbox } from "e2b"; // 👈 ማሳሰቢያ፡ 'import { Sandbox }' መሆን አለበት (Destructured)

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "agent/task.created" } },

  async ({ event, step }) => {
    // 1. ሳንድቦክሱን በትክክለኛው የV2 መንገድ መፍጠር
    const sandboxId = await step.run("get-sandbox-id", async () => {
      console.log("🚀 Sandbox ለመፍጠር እየሞከርን ነው...");

      const sandbox = await Sandbox.create({
        template: "6cj2ntoxl2nw0fj8it2h",
        apiKey: process.env.E2B_API_KEY, // API Key በ .env ውስጥ መኖሩን አረጋግጥ
      });

      console.log("🎯 የመነጨው የሳንድቦክስ እውነተኛ ID:", sandbox.id);
      // ⚠️ በE2B V2 ላይ መታወቂያው .id ነው (.sandboxId አይደለም!)
      return sandbox.id;
    });

    // 2. የ AI ኤጀንት ስራን በ step.run ውስጥ ማቀፍ (ከ6 ደቂቃ Timeout ይከላከላል)
    const agentOutput = await step.run("hello-agent", async () => {
      const helloAgent = createAgent({
        name: "hello-agent",
        description: "A simple agent that says hello",
        system: "You are a helpful assistant. Always greet the user nicely.",
        model: gemini({ model: "gemini-2.5-flash" }),
      });

      const { output } = await helloAgent.run("Say Hello to the user!");
      return output[0]?.content || "Hello!";
    });

    // 3. ከሳንድቦክስ ጋር በትክክለኛው ID ተገናኝቶ ፖርት 3000ን ማውጣት
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      // አሁን sandboxId በትክክል ስላለን connect ያደርጋል
      const sandbox = await Sandbox.connect({
        id: sandboxId,
        apiKey: process.env.E2B_API_KEY,
      });

      const host = sandbox.getHost(3000);
      return `https://${host}`; // E2B V2 ፖርቶችን በ HTTPS ነው ፎርዋርድ የሚያደርገው
    });

    // የመጨረሻው የጆብ ውጤት
    return {
      message: agentOutput,
      url: sandboxUrl,
    };
  },
);
