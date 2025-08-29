import { useEffect, useRef, useState } from 'react'
import './App.css'
import {AIDropDown, usePrompt} from '../../package/src/index'
import AIWand from './assets/wand';
// import MyApp from 'prompt-my-client-react/src/App'

function App() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Using the usePrompt hook directly
  const { generatePrompt, isLoading, error, result } = usePrompt({
    onSuccess: (response: string) => {
      console.log('Hook success:', response);
      setInput(response);
    },
    onError: (error: string) => {
      console.error('Hook error:', error);
    }
  });

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

  // Function to demonstrate direct hook usage
  const handleDirectPrompt = async () => {
    if (input.trim()) {
      await generatePrompt(
        input, 
        "Make this text more professional and concise", 
        "professional", 
        "concise"
      );
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative', width: 700 }}>
        {/* Direct Hook Usage Demo */}
        <div>

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
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
     <button 
       onClick={handleDirectPrompt}
       disabled={isLoading || !input.trim()}
       style={{
         padding: '10px 20px',
         borderRadius: '20px',
         border: '1px solid #ccc',
         background: isLoading ? '#f0f0f0' : '#fff',
         cursor: isLoading ? 'not-allowed' : 'pointer',
         fontSize: '14px'
       }}
     >
       {isLoading ? 'Processing...' : 'Make Professional (Hook)'}
     </button>
     {error && (
       <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
         Error: {error}
       </div>
     )}
     {result && (
       <div style={{ color: 'green', marginTop: '10px', fontSize: '14px' }}>
         Hook Result: {result.substring(0, 50)}...
       </div>
     )}
   </div>
          </div>
        <div style={{ position: 'absolute', top: '28%', right: 6, transform: 'translateY(-59%)' }}>
          <AIDropDown 
            renderIcon={() => <AIWand color='#000' />} 
            text={input} 
            aiResponseCallback={handleAIResponse} 
            size='38px'
            promptOptions={[]}
          />
        </div>
      </div>
    </div>
  )
}

export default App
