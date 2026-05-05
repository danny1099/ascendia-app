import { Worker, Job } from "bullmq";
import { connection } from "@/lib/queue";

export const aiWorker = new Worker(
  "ai",
  async (job: Job) => {
    console.log(`Processing AI job ${job.id}...`);
    // Logic for AI Coach and NPC personality will go here
  },
  { connection }
);

aiWorker.on("completed", (job) => {
  console.log(`AI job ${job.id} completed`);
});

aiWorker.on("failed", (job, err) => {
  console.error(`AI job ${job?.id} failed: ${err.message}`);
});
