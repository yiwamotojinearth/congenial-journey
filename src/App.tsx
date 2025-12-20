import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  isEditing: boolean;
  completed:boolean;
};

function App () { 
  const [todos, setTodos] = useState<Todo[]>([
    { id:1, text: 'Reactを勉強する', isEditing: false,completed:false },
    { id:2, text: 'TODOアプリを作る',isEditing: false,completed:false },
    { id:3, text: 'ちゃんと完成させる', isEditing: false,completed:false },
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

const deleteTodo = (id: number) => {
  setTodos(todos =>
    todos.filter(todo => todo.id !== id)
  );
};

const toggleComplete = (id: number) => {
  setTodos(todos =>
    todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
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
              completed: false,
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
              <>
              <input
              type = "checkbox"
              checked = {todo.completed}
              onChange={() => toggleComplete(todo.id)}
              />
              
              <span onDoubleClick={() => startEdit(todo.id)}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#aaa' : '#000',
                  marginLeft: '8px',
                }}
              >
                {todo.text}
              </span>
              <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '8px' }}
              >
                削除
              </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App