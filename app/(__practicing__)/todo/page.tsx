'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { Trash2, Plus, CheckCircle2, XCircle } from 'lucide-react';

// Types
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  pending?: boolean;
}

type OptimisticAction =
  | { action: 'add'; id: number; text: string }
  | { action: 'delete'; id: number }
  | { action: 'toggle'; id: number };

// Simulated API delay
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock API functions
async function addTodoAPI(text: string): Promise<Todo> {
  await delay(2000);
  if (Math.random() > 0.4) throw new Error('Failed to add todo');
  return { id: Date.now(), text, completed: false };
}

async function deleteTodoAPI(id: number): Promise<{ id: number }> {
  await delay(1500);
  if (Math.random() > 0.9) throw new Error('Failed to delete todo');
  return { id };
}

async function toggleTodoAPI(id: number): Promise<{ id: number }> {
  await delay(1000);
  if (Math.random() > 0.9) throw new Error('Failed to toggle todo');
  return { id };
}

export default function UseOptimisticDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn useOptimistic hook', completed: false },
    { id: 2, text: 'Build a Next.js app', completed: true },
    { id: 3, text: 'Deploy to production', completed: false },
  ]);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], newTodo: OptimisticAction): Todo[] => {
      if (newTodo.action === 'add') {
        return [
          ...state,
          {
            id: newTodo.id,
            text: newTodo.text,
            completed: false,
            pending: true,
          },
        ];
      } else if (newTodo.action === 'delete') {
        return state.filter((todo) => todo.id !== newTodo.id);
      } else if (newTodo.action === 'toggle') {
        return state.map((todo) =>
          todo.id === newTodo.id
            ? { ...todo, completed: !todo.completed }
            : todo
        );
      }
      return state;
    }
  );

  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleAddTodo = async (): Promise<void> => {
    if (!input.trim()) return;

    const tempId = Date.now();
    const todoText = input;
    setInput('');
    setError('');
    setSuccess('');

    startTransition(async () => {
      addOptimisticTodo({ action: 'add', id: tempId, text: todoText });

      try {
        const newTodo = await addTodoAPI(todoText);
        setTodos((prev) => [...prev, newTodo]);
        setSuccess('Todo added successfully!');
        setTimeout(() => setSuccess(''), 2000);
      } catch (err) {
        setError('Failed to add todo. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    });
  };

  const handleDeleteTodo = (id: number): void => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      addOptimisticTodo({ action: 'delete', id });

      try {
        await deleteTodoAPI(id);
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        setSuccess('Todo deleted!');
        setTimeout(() => setSuccess(''), 2000);
      } catch (err) {
        setError('Failed to delete todo. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    });
  };

  const handleToggleTodo = (id: number): void => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      addOptimisticTodo({ action: 'toggle', id });

      try {
        await toggleTodoAPI(id);
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      } catch (err) {
        setError('Failed to update todo. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8" aria-disabled>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            useOptimistic Demo
          </h1>
          <p className="text-gray-600 mb-6">
            Experience instant UI updates with optimistic rendering
          </p>

          {/* Notifications */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              {success}
            </div>
          )}

          {/* Add Todo Form */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new todo..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddTodo}
                disabled={isPending || !input.trim()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add
              </button>
            </div>
          </div>

          {/* Todo List */}
          <div className="space-y-2">
            {optimisticTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg border transition-all ${
                  todo.pending
                    ? 'opacity-50 border-gray-300'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  disabled={isPending}
                  className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span
                  className={`flex-1 text-lg ${
                    todo.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-700'
                  }`}
                >
                  {todo.text}
                </span>
                {todo.pending && (
                  <span className="text-sm text-gray-500 italic">
                    Saving...
                  </span>
                )}
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  disabled={isPending}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {optimisticTodos.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No todos yet. Add one to get started!
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • UI updates instantly when you add, delete, or toggle todos
              </li>
              <li>
                • Changes are shown optimistically while the API request
                processes
              </li>
              <li>• If the API fails, the UI reverts to the previous state</li>
              <li>
                • Try it - notice the instant feedback despite 1-2s API delays
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
