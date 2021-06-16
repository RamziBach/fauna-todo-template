import Link from 'next/link';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

const GetTodos = () => {
  const { data, error } = useSWR('/api/todos', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  if (data.length === 0) return <div>You have 0 todos</div>;

  return data.map(d => (
    <div key={d.ref['@ref'].id}>
      <Link href={`/todos/${d.ref['@ref'].id}`}>
        <a>
          {d.data.todo} - {d.data.isComplete.toString()}
        </a>
      </Link>
    </div>
  ));
};

export default GetTodos;
