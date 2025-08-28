import { useEffect, useRef, useState } from 'react'
import './App.css'
import {AIDropDown} from 'prompt-my-client-react'
import AIWand from './assets/wand';
// import MyApp from 'prompt-my-client-react/src/App'

function App() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Set to scrollHeight
    }
  }, [input]);

  // Dummy callback for AIDropDown
  const handleAIResponse = (response: string) => {
    // You can update this to do something with the response
    if(response){
      setInput(response)
    }
    console.log("AI_RESPONSE", response)
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative', width: 700 }}>
      <textarea
          ref={textareaRef}
          value={input}
          onChange={ (e) => setInput(e.target.value)}
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
          <AIDropDown renderIcon={() => <AIWand color='#000' />} iconColor='#000' text={input} aiResponseCallback={handleAIResponse} size='38px' />
        </div>
      </div>
    </div>
  )
}

export default App
