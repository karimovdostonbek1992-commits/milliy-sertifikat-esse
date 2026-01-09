
export interface EvaluationResult {
  rawMarkdown: string;
  totalScore: number;
  breakdown: {
    topic: number;
    logic: number;
    spelling: number;
    punctuation: number;
    style: number;
  };
}

export interface EssayInput {
  topic: string;
  content: string;
}
