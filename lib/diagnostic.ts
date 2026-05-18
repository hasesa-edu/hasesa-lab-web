import type { Subject } from "./lessons";

export type DiagQ = {
  q: string;
  choices: string[];
  answerIndex: number;
  topic: string;
};

export const DIAGNOSTIC: Record<Subject, DiagQ[]> = {
  math: [
    {
      q: "Solve for x: x² − 5x + 6 = 0",
      choices: ["x = 1 or 6", "x = 2 or 3", "x = −2 or −3", "No real solution"],
      answerIndex: 1,
      topic: "Quadratic equations",
    },
    {
      q: "What is sin(30°)?",
      choices: ["0", "1/2", "√2/2", "1"],
      answerIndex: 1,
      topic: "Trig ratios",
    },
  ],
  physics: [
    {
      q: "A car accelerates from 0 to 30 m/s in 6 s. Its average acceleration is:",
      choices: ["5 m/s²", "6 m/s²", "180 m/s²", "0.2 m/s²"],
      answerIndex: 0,
      topic: "Kinematics",
    },
    {
      q: "If F = 20 N and m = 4 kg, what is a?",
      choices: ["0.2 m/s²", "5 m/s²", "16 m/s²", "80 m/s²"],
      answerIndex: 1,
      topic: "Newton's laws",
    },
  ],
  chemistry: [
    {
      q: "How many moles are in 36 g of water (H₂O, M = 18 g/mol)?",
      choices: ["0.5 mol", "1 mol", "2 mol", "18 mol"],
      answerIndex: 2,
      topic: "Mole concept",
    },
    {
      q: "A solution with pH = 3 is:",
      choices: ["Strongly basic", "Weakly basic", "Acidic", "Neutral"],
      answerIndex: 2,
      topic: "Acids and bases",
    },
  ],
  biology: [
    {
      q: "Which organelle is the site of aerobic respiration?",
      choices: ["Nucleus", "Mitochondrion", "Ribosome", "Chloroplast"],
      answerIndex: 1,
      topic: "Cell structure",
    },
    {
      q: "Meiosis produces how many daughter cells from one parent?",
      choices: ["1", "2", "4", "8"],
      answerIndex: 2,
      topic: "Meiosis",
    },
  ],
};
