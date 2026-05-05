import { Worker, Job } from "bullmq";
import { connection } from "@/lib/queue";

export const evaluationWorker = new Worker(
  "evaluation",
  async (job: Job) => {
    console.log(`Processing evaluation job ${job.id}...`);
    // Logic for SimulationEngine evaluation will go here
  },
  { connection }
);

evaluationWorker.on("completed", (job) => {
  console.log(`Evaluation job ${job.id} completed`);
});

evaluationWorker.on("failed", (job, err) => {
  console.error(`Evaluation job ${job?.id} failed: ${err.message}`);
});
