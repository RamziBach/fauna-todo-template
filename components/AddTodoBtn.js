import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const AddTodoBtn = () => {
  const { user, error } = useUser();

  if (error) return <div>Failed to load.</div>;

  if (user) {
    return (
      <Link href="/todos/create">
        <button>
          <a>Add Todos</a>
        </button>
      </Link>
    );
  }

  return <div></div>;
};

export default AddTodoBtn;
