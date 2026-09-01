import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

// const model = gemini({ model: "gemini-1.5-flash" });

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "agent/task.created" } },

  async ({ event, step }) => {
    const helloAgent = createAgent({
      name: "hello-agent",
      description: "A simple agent taht say hello",
      system: "You are a helpful assistant. Always greet",
      model: gemini({ model: "gemini-2.5-flash" }),
    });

    const { output } = await helloAgent.run("Say Hello to the user!");

    return {
      message: output[0].content,
    };
  },
);
