import { useState } from 'react';

function App () { 
  const [todos, setTodos] = useState<string[]>([
    'Reactを勉強する',
    'TODOアプリを作る',
    'ちゃんと完成させる'
  ]);

  const [input, setInput] = useState('');

  return (
    <>
    <h1>React TODO App</h1>
    <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder = "TODOを入力"
    />
    <button
      onClick={() => {
        if(!input) return;

        setTodos([...todos, input]);
        setInput('');
      }}
      >
        追加 </button>
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
    </>
  );
}

export default App