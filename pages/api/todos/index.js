import { query as q } from 'faunadb';
import { serverClient } from '@utils/faunaAuth';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

// Get todos
export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  const userId = user.sub;

  if (req.method !== 'GET') {
    return res.status(405);
  }

  try {
    const todos = await serverClient.query(
      q.Map(q.Paginate(q.Match(q.Index('userId_todos'), userId)), ref =>
        q.Get(ref)
      )
    );
    res.status(200).json(todos.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
