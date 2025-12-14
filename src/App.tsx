import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  isEditing: boolean;
};

function App () { 
  const [todos, setTodos] = useState<Todo[]>([
    { id:1, text: 'Reactを勉強する', isEditing: false },
    { id:2, text: 'TODOアプリを作る',isEditing: false },
    { id:3, text: 'ちゃんと完成させる', isEditing: false },
  ]);

  const [input, setInput] = useState('');

  const startEdit = (id: number) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, isEditing: true }
          : { ...todo, isEditing: false }
      )
    );
  };

  const updateText = (id: number, text: string) => {setTodos(todos =>
    todos.map(todo =>
      todo.id === id ? { ...todo,text } : todo
    )
  );
};

  const finishEdit = (id: number) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
  };
  return (
    <>
      <h1>React TODO App</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="TODOを入力"
      />

      <button
        onClick={() => {
          if (!input) return;

          setTodos([
            ...todos,
            {
              id: Date.now(),
              text: input,
              isEditing: false,
            },
          ]);
          setInput('');
        }}
      >
        追加
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.isEditing ? (
              <input
                value={todo.text}
                onChange={(e) =>
                  updateText(todo.id, e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    finishEdit(todo.id);
                  }
                }}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => startEdit(todo.id)}>
                {todo.text}
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App