import { useState, useCallback } from 'react';
import { getPromptResponse } from '../api/prompt';

interface UsePromptOptions {
  onSuccess?: (response: string) => void;
  onError?: (error: string) => void;
}

interface UsePromptReturn {
  generatePrompt: (text: string, prompt: string, tone?: string, style?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  result: string | null;
  reset: () => void;
}

export const usePrompt = (options: UsePromptOptions = {}): UsePromptReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const generatePrompt = useCallback(async (
    text: string, 
    prompt: string, 
    tone?: string, 
    style?: string
  ) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getPromptResponse(text, prompt, tone, style);
      const responseText = response.result || 'No response received';
      
      setResult(responseText);
      options.onSuccess?.(responseText);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
    setIsLoading(false);
  }, []);

  return {
    generatePrompt,
    isLoading,
    error,
    result,
    reset
  };
};
