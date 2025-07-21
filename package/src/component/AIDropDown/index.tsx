import React, { useState, useRef, useEffect } from 'react';
import AIWand from '../../icons/wand';
import '../../css/AIDropDown.css';

type PromptOption = {prompt:string, label:string}
interface AIDropDownProps {
  text: string;
  aiResponseCallback: (response: string) => void;
  dropdownStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
  optionHoverStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  size?: '48px' | '52px';
  promptOptions: PromptOption[]
}

const defaultOptions:PromptOption[] = [
  {
    prompt: 'Fix grammer in the text',
    label: 'Fix Grammar'
  },{
    prompt: 'I need Professional tone',
    label: 'Professional tone'
  },{
    prompt: 'Make it short',
    label: 'Make it short'
  },
];

const defaultDropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '2.5rem',
  left: 0,
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
  promptOptions = []
}: AIDropDownProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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

  const handleSelect = (option: PromptOption) => {
    setOpen(false);
    aiResponseCallback(option.prompt + text); // For now, just return the same text
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
      >
        <AIWand />
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