import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const fetcher = url => fetch(url).then(r => r.json());

const Todo = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/todos/${id}`, fetcher);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/todos/${id}/delete`, {
        method: 'DELETE',
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

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>loading...</div>;
  if (!data.todo) return <div>Page does not exist</div>;

  return (
    <div>
      <h1>Todo</h1>
      <Link href={`/todos/${id}/update`}>
        <button>
          <a>Update</a>
        </button>
      </Link>
      <hr />
      <p>
        {data.todo} - {data.isComplete.toString()}
      </p>
      <button onClick={handleDelete}>DELETE</button>
      <Link href="/">
        <a>go back</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Todo;
