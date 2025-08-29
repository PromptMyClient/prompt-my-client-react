export type PromptOption = {
  prompt: string;
  label: string;
  tone?: string;
  style?: string;
};

export const DEFAULT_PROMPT_OPTIONS: PromptOption[] = [
  {
    prompt: 'Fix grammer in the text',
    label: 'Fix Grammar',
    tone: 'professional',
    style: 'concise'
  },
  {
    prompt: 'I need Professional tone',
    label: 'Professional tone',
    tone: 'professional',
    style: 'formal'
  },
  {
    prompt: 'Make it short',
    label: 'Make it short',
    tone: 'friendly',
    style: 'concise'
  },
  {
    prompt: 'Make it more detailed',
    label: 'Make it detailed',
    tone: 'professional',
    style: 'detailed'
  }
];
