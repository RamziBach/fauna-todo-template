import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const EditForm = ({ todoProp, isCompleteProp, id }) => {
  const router = useRouter();
  const [todo, setTodo] = useState(todoProp);
  const [isComplete, setIsComplete] = useState(isCompleteProp);
  const inputRef = useRef(null);

  const handleChange = e => setTodo(e.target.value);

  const handleIsComplete = () => setIsComplete(prevState => !prevState);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/todos/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo, isComplete }),
      });
      if (res.status === 200) {
        router.push('/');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        name="todo"
        id="todo"
        placeholder="todo"
        autoComplete="off"
        value={todo}
        onChange={handleChange}
        required
      />
      <h3>{isComplete.toString()}</h3>
      <input
        type="checkbox"
        name="isComplete"
        id="isComplete"
        checked={isComplete}
        onChange={handleIsComplete}
      />
      <div>
        <button>Update todo</button>
      </div>
    </form>
  );
};

export default EditForm;
