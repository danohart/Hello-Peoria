import { checkDuplicatePlace } from '../../lib/data';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { googlePlaceID, name } = req.body;

    if (!googlePlaceID && !name) {
      return res.status(400).json({ error: 'googlePlaceID or name is required' });
    }

    const result = await checkDuplicatePlace(googlePlaceID, name);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Check duplicate error:', error);
    return res.status(500).json({ error: error.message });
  }
}
