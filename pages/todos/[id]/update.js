import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import EditForm from '@components/EditForm';

const fetcher = url => fetch(url).then(r => r.json());

const Update = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/todos/${id}`, fetcher);

  if (error) return <div>Failed to load</div>;

  return (
    <div>
      <h1>Update</h1>
      <hr />
      {data ? (
        <EditForm
          todoProp={data.todo}
          isCompleteProp={data.isComplete}
          id={id}
        />
      ) : (
        <div>Loading...</div>
      )}
      <br />
      <Link href="/">
        <a>Go back</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Update;
