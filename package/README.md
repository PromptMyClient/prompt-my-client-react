# Prompt My Client React

A React component library that provides an AI-powered dropdown interface for text enhancement and transformation. Perfect for applications that need AI assistance with text content.

**Keywords:** AI text enhancement, language translation, grammar correction, text transformation, content optimization, writing assistant, AI-powered editing, text improvement, language processing, content enhancement, writing tools, AI writing helper, text refinement, language correction, content editing, AI text tools, writing enhancement, text optimization, language improvement, content transformation, AI content assistant

## Features

- 🤖 **AI-Powered Text Enhancement** - Transform text with various tones and styles
- 🎨 **Customizable UI** - Fully customizable dropdown and button styles
- 📱 **Responsive Design** - Works seamlessly across different screen sizes
- ⚡ **Easy Integration** - Simple drop-in component for React applications
- 🎯 **Pre-built Prompts** - Comes with common text transformation options
- 🔧 **Extensible** - Add your own custom prompt options

## Installation

```bash
npm install prompt-my-client-react
```

or

```bash
yarn add prompt-my-client-react
```

## Quick Start

```tsx
import { AIDropDown } from 'prompt-my-client-react';

function App() {
  const handleAIResponse = (response: string) => {
    console.log("AI Response:", response);
    // Handle the AI response here
  };

  return (
    <div>
      <textarea placeholder="Type your text here..." />
      <AIDropDown 
        text="Your text content" 
        aiResponseCallback={handleAIResponse} 
      />
    </div>
  );
}
```

## Basic Usage

The `AIDropDown` component provides an AI-powered dropdown that can enhance text based on various prompts. Here's a complete example:

```tsx
import { useState, useRef, useEffect } from 'react';
import { AIDropDown } from 'prompt-my-client-react';

function App() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleAIResponse = (response: string) => {
    if (response) {
      setInput(response);
    }
    console.log("AI Response:", response);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative', width: 700 }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          rows={1}
          style={{
            width: '100%',
            borderRadius: '30px',
            padding: '12px 56px 12px 16px',
            fontSize: '16px',
            border: '1px solid #ccc',
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'none',
            overflow: 'hidden',
            lineHeight: '1.5',
            maxHeight: '200px',
          }}
        />
        <div style={{ position: 'absolute', top: '50%', right: 6, transform: 'translateY(-49%)' }}>
          <AIDropDown 
            text={input} 
            aiResponseCallback={handleAIResponse} 
            size='38px' 
          />
        </div>
      </div>
    </div>
  );
}
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | The text content to be processed by AI |
| `aiResponseCallback` | `(response: string) => void` | Callback function to handle AI responses |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'48px' \| '52px'` | `'48px'` | Size of the AI button |
| `promptOptions` | `PromptOption[]` | Built-in options | Custom prompt options |
| `dropdownStyle` | `React.CSSProperties` | Default styles | Custom dropdown styling |
| `optionStyle` | `React.CSSProperties` | Default styles | Custom option styling |
| `optionHoverStyle` | `React.CSSProperties` | Default styles | Custom hover styling |
| `buttonStyle` | `React.CSSProperties` | Default styles | Custom button styling |

## Default Prompt Options

The component comes with pre-built prompt options:

- **Fix Grammar** - Corrects grammatical errors
- **Professional Tone** - Converts text to professional language
- **Make it Short** - Condenses text while maintaining meaning
- **Make it Detailed** - Expands text with more information
- **Conversational** - Makes text more casual and friendly
- **Creative** - Adds creative flair to the content
- **Persuasive** - Makes text more convincing and compelling

## Custom Prompt Options

You can provide your own custom prompt options:

```tsx
const customPrompts = [
  {
    prompt: 'Translate to Spanish',
    label: 'Spanish',
    tone: 'formal',
    style: 'accurate'
  },
  {
    prompt: 'Make it rhyme',
    label: 'Rhyming',
    tone: 'creative',
    style: 'poetic'
  }
];

<AIDropDown 
  text={input} 
  aiResponseCallback={handleAIResponse}
  promptOptions={customPrompts}
/>
```

## PromptOption Type

```tsx
type PromptOption = {
  prompt: string;      // The actual prompt sent to AI
  label: string;       // Display label in dropdown
  tone?: string;       // Tone modifier (optional)
  style?: string;      // Style modifier (optional)
}
```

## Styling

The component is fully customizable through CSS-in-JS props:

```tsx
<AIDropDown 
  text={input} 
  aiResponseCallback={handleAIResponse}
  dropdownStyle={{
    background: '#2c3e50',
    color: 'white',
    borderRadius: '12px'
  }}
  buttonStyle={{
    background: '#3498db',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  }}
  optionHoverStyle={{
    background: '#34495e',
    color: '#ecf0f1'
  }}
/>
```

## Requirements

- React 18 or higher
- React DOM 18 or higher

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
