import { useState } from 'react'
import './App.css'
import {AIDropDown} from 'prompt-my-client-react'
// import MyApp from 'prompt-my-client-react/src/App'

function App() {
  const [input, setInput] = useState('');

  // Dummy callback for AIDropDown
  const handleAIResponse = (response: string) => {
    // You can update this to do something with the response
    alert('AI Response: ' + response);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative', width: 400 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type here..."
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '30px',
            padding: '12px 56px 12px 16px', // right padding for button
            fontSize: '16px',
            border: '1px solid #ccc',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ position: 'absolute', top: '50%', right: 7, transform: 'translateY(-42%)' }}>
          <AIDropDown text={input} aiResponseCallback={handleAIResponse} size='38px' />
        </div>
      </div>
    </div>
  )
}

export default App
