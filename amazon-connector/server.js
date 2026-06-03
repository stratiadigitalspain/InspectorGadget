require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
const { readJson } = require('./src/storage');
const { syncProducts } = require('./src/sync');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DATA_PRODUCTS = path.join(__dirname, 'data', 'products.json');

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mode: process.env.AMAZON_API_MODE || 'mock',
    marketplace: process.env.AMAZON_MARKETPLACE || 'amazon.es'
  });
});

app.get('/api/products', async (req, res) => {
  const products = await readJson(DATA_PRODUCTS, []);
  const category = String(req.query.category || '').trim().toLowerCase();
  const q = String(req.query.q || '').trim().toLowerCase();

  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => String(p.category_slug || p.category || '').toLowerCase() === category);
  }

  if (q) {
    filtered = filtered.filter((p) => {
      const haystack = `${p.title || ''} ${p.brand || ''} ${p.category || ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  res.json({ count: filtered.length, updated_at: products[0]?.last_checked || null, products: filtered });
});

app.post('/api/sync', async (req, res) => {
  const token = req.headers['x-admin-token'];
  if (!process.env.ADMIN_SYNC_TOKEN || token !== process.env.ADMIN_SYNC_TOKEN) {
    return res.status(401).json({ ok: false, error: 'Unauthorized sync request' });
  }

  try {
    const result = await syncProducts();
    res.json({ ok: true, ...result });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`InspectorGadget Amazon connector running on http://localhost:${PORT}`);

  const schedule = process.env.SYNC_SCHEDULE || '0 */6 * * *';
  if (cron.validate(schedule)) {
    cron.schedule(schedule, async () => {
      try {
        const result = await syncProducts();
        console.log('Automatic sync completed:', result);
      } catch (error) {
        console.error('Automatic sync failed:', error.message);
      }
    });
    console.log(`Automatic sync active: ${schedule}`);
  }

  if (String(process.env.SYNC_ON_START || 'true').toLowerCase() === 'true') {
    syncProducts()
      .then((result) => console.log('Initial sync completed:', result))
      .catch((error) => console.error('Initial sync failed:', error.message));
  }
});
