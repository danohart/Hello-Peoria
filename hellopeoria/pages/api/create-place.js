import { createPlace } from '../../lib/data';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const placeData = req.body;

    // Validate required fields
    if (!placeData.name || !placeData.name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newPlace = await createPlace(placeData);

    return res.status(201).json({
      success: true,
      place: newPlace
    });
  } catch (error) {
    console.error('Create place error:', error);
    return res.status(500).json({ error: error.message });
  }
}
