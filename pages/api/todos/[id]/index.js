import { query as q } from 'faunadb';
import { serverClient } from '@utils/faunaAuth';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  const userId = user.sub;

  const {
    query: { id },
  } = req;

  if (req.method !== 'GET') {
    return res.status(405);
  }

  try {
    const todo = await serverClient.query(
      q.Get(q.Ref(q.Collection('todos'), id))
    );
    if (!todo || todo.data.userId !== userId) {
      res.status(404).json({ msg: 'Record not found' });
    }
    res.status(200).json(todo.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
