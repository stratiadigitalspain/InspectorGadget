require('dotenv').config();
const { syncProducts } = require('../src/sync');

syncProducts()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
