import AddTodoBtn from '@components/AddTodoBtn';
import GetTodos from '@components/GetTodos';
import { useUser } from '@auth0/nextjs-auth0';

const Home = () => {
  const { user } = useUser();

  return (
    <main>
      <AddTodoBtn />
      <hr />
      {user ? <GetTodos /> : <div>You must be logged in.</div>}
    </main>
  );
};

export default Home;
