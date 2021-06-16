import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Create = () => {
  const [todo, setTodo] = useState('');
  const inputRef = useRef(null);

  const router = useRouter();

  const handleChange = e => setTodo(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    if (todo.length === 0) return;
    try {
      const res = await fetch('/api/todos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo }),
      });
      if (res.status === 200) {
        router.push('/');
      } else {
        throw new Error('Something went wrong.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Create</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          name="todo"
          id="todo"
          placeholder="Enter todo..."
          autoComplete="off"
          value={todo}
          onChange={handleChange}
          required
        />
        <button>Add todo</button>
      </form>
      <br />
      <Link href="/">
        <button>
          <a>Cancel</a>
        </button>
      </Link>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Create;
