import React, { useState, useRef, useEffect } from 'react';
import '../../css/AIDropDown.css';
import { usePrompt } from '../../hooks/usePrompt';

type PromptOption = {
  prompt: string, 
  label: string, 
  tone?: string, 
  style?: string
}
interface AIDropDownProps {
  text: string;
  aiResponseCallback: (response: string) => void;
  dropdownStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
  optionHoverStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  size?: string;
  renderIcon?: () => React.ReactNode;
  promptOptions: PromptOption[]
}

const defaultOptions:PromptOption[] = [
  {
    prompt: 'Fix grammer in the text',
    label: 'Fix Grammar',
    tone: 'professional',
    style: 'concise'
  },{
    prompt: 'I need Professional tone',
    label: 'Professional tone',
    tone: 'professional',
    style: 'formal'
  },{
    prompt: 'Make it short',
    label: 'Make it short',
    tone: 'friendly',
    style: 'concise'
  },{
    prompt: 'Make it more detailed',
    label: 'Make it detailed',
    tone: 'professional',
    style: 'detailed'
  },{
    prompt: 'Make it conversational',
    label: 'Conversational',
    tone: 'friendly',
    style: 'conversational'
  },{
    prompt: 'Make it creative',
    label: 'Creative',
    tone: 'enthusiastic',
    style: 'creative'
  },{
    prompt: 'Make it persuasive',
    label: 'Persuasive',
    tone: 'confident',
    style: 'persuasive'
  }
];

const defaultDropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '2.6rem',
  left: '-65px',
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(15,15,15,0.12)',
  minWidth: '180px',
  zIndex: 1000,
  padding: '0.5rem 0',
};

const defaultOptionStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '15px',
  color: '#37352f',
  border: 'none',
  background: 'none',
  textAlign: 'left',
};

const defaultOptionHoverStyle: React.CSSProperties = {
  ...defaultOptionStyle,
  background: '#f7f6f3',
};

const defaultButtonStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '50%',
  border: '1px solid #e3e2e0',
  // background: '#fff',
  fontSize: '15px',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
};

export default function AIDropDown({
  text,
  aiResponseCallback,
  dropdownStyle,
  optionStyle,
  optionHoverStyle,
  buttonStyle,
  size = '48px',
  renderIcon,
  promptOptions = []
}: AIDropDownProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { generatePrompt, isLoading } = usePrompt({
    onSuccess: (response) => {
      aiResponseCallback(response);
    },
    onError: (error) => {
      aiResponseCallback(`Error: ${error}`);
    }
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]); 
  const handleSelect = async (option: PromptOption) => {
    setOpen(false);
    
    try {
      // Use the hook instead of direct API call
      await generatePrompt(text, option.prompt, option.tone, option.style);
    } catch (error) {
      console.error('Error getting AI response:', error);
      aiResponseCallback('Error: Unable to get AI response');
    }
  };

  const renderTrigger = () => {
    return (
      <button
        className='ai-dropdown-trigger'
        style={{
          ...defaultButtonStyle,
          height: size,
          width: size,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...(open ? { boxShadow: '0 2px 8px rgba(15,15,15,0.08)' } : {}),
          ...buttonStyle,
        }}
        onClick={() => setOpen((o) => !o)}
        disabled={isLoading}
      >
        {isLoading ? (
          <div style={{ 
            width: '16px', 
            height: '16px', 
            border: '2px solid #e3e2e0', 
            borderTop: '2px solid #37352f', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }} />
        ) : (
          renderIcon?.()
        )}
      </button>
    );
  };

  const OPTIONS = (promptOptions ?? []).length > 0 ? promptOptions : defaultOptions

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={ref}>
      {renderTrigger()}
      {open && (
        <div style={{ ...defaultDropdownStyle, ...dropdownStyle }}>
          {OPTIONS.map((option: PromptOption, idx: number) => (
            <div
              key={option.label + idx}
              style={
                hovered === idx
                  ? { ...defaultOptionHoverStyle, ...optionHoverStyle }
                  : { ...defaultOptionStyle, ...optionStyle }
              }
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}