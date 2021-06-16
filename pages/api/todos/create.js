import { query as q } from 'faunadb';
import { serverClient } from '@utils/faunaAuth';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  const userId = user.sub;

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { todo } = req.body;

  try {
    await serverClient.query(
      q.Create(q.Collection('todos'), {
        data: {
          todo,
          isComplete: false,
          userId,
        },
      })
    );
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
