import { query as q } from 'faunadb';
import { serverClient } from '@utils/faunaAuth';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  const userId = user.sub;

  if (req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const {
    query: { id },
  } = req;

  const { todo, isComplete } = req.body;

  const existingRecord = await serverClient.query(
    q.Get(q.Ref(q.Collection('todos'), id))
  );

  if (!existingRecord || existingRecord.data.userId !== userId) {
    res.status(404).json({ msg: 'Record not found' });
  }

  try {
    await serverClient.query(
      q.Update(q.Ref(q.Collection('todos'), id), {
        data: {
          todo,
          isComplete,
        },
      })
    );
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
