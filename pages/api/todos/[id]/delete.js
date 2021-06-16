import { query as q } from 'faunadb';
import { serverClient } from '@utils/faunaAuth';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  const userId = user.sub;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const {
    query: { id },
  } = req;

  const existingRecord = await serverClient.query(
    q.Get(q.Ref(q.Collection('todos'), id))
  );

  if (!existingRecord || existingRecord.data.userId !== userId) {
    res.status(404).json({ msg: 'Record not found' });
  }

  try {
    await serverClient.query(q.Delete(q.Ref(q.Collection('todos'), id)));
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
