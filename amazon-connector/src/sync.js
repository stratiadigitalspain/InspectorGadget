const path = require('path');
const { readJson, writeJson } = require('./storage');

const ROOT = path.join(__dirname, '..');
const ASINS_FILE = path.join(ROOT, 'data', 'asins.json');
const PRODUCTS_FILE = path.join(ROOT, 'data', 'products.json');

function slugify(text) {
  return String(text || 'general')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildUrl(asin) {
  const marketplace = process.env.AMAZON_MARKETPLACE || 'amazon.es';
  const tag = process.env.AMAZON_ASSOCIATE_TAG || '';
  const suffix = tag ? `?tag=${encodeURIComponent(tag)}` : '';
  return `https://www.${marketplace}/dp/${asin}${suffix}`;
}

async function syncProducts() {
  const rows = await readJson(ASINS_FILE, []);
  const products = rows
    .filter((row) => row.asin)
    .map((row) => ({
      asin: row.asin,
      title: row.title || `Producto Amazon ${row.asin}`,
      category: row.category || 'General',
      category_slug: row.category_slug || slugify(row.category || 'General'),
      affiliate_url: buildUrl(row.asin),
      note: 'Completa imagen, precio y descripción desde una API autorizada de Amazon o manualmente.',
      last_checked: new Date().toISOString()
    }));

  await writeJson(PRODUCTS_FILE, products);
  return { total: products.length, products_file: PRODUCTS_FILE, synced_at: new Date().toISOString() };
}

module.exports = { syncProducts };
