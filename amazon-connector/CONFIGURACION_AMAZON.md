# Configuración Amazon Connector

Crea un archivo local llamado `.env` dentro de `amazon-connector/` con estos valores:

```txt
AMAZON_API_MODE=mock
PORT=3000
PUBLIC_SITE_URL=http://localhost:3000
AMAZON_MARKETPLACE=amazon.es
AMAZON_ASSOCIATE_TAG=TU-TAG-21
AMAZON_LOCALE=es_ES
AMAZON_CURRENCY=EUR
AMAZON_CREATORS_BASE_URL=
AMAZON_CREATORS_SEARCH_PATH=/search
AMAZON_CREATORS_ITEMS_PATH=/items
SYNC_SCHEDULE=0 */6 * * *
SYNC_ON_START=true
MAX_PRODUCTS_PER_CATEGORY=12
ADMIN_SYNC_TOKEN=cambia-esto
```

Añade también la variable privada de autorización que te facilite Amazon Creators API. No la subas nunca al repositorio.

## Modo seguro

- `mock`: genera productos de prueba.
- `creators`: usa el backend para consultar Amazon.

El frontend público nunca debe contener claves privadas.
