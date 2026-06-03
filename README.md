# InspectorGadget.com

Web inicial para **InspectorGadget.com**: reviews, rankings y comparativas de gadgets con enfoque de afiliación.

## Estado

- Home estática lista para publicar.
- Diseño editorial/tech responsive.
- Enlaces preparados para Amazon Afiliados mediante ASIN + tag.
- Aviso básico de afiliación incluido en la página.
- Sin uso de personajes, frases o estética oficial de ninguna franquicia.

## Cómo conectar Amazon Afiliados en la home

En `index.html`, busca:

```js
const AMAZON_TAG = 'TU-ID-AFILIADO-21';
```

Sustitúyelo por tu tag real de Amazon Afiliados España, por ejemplo:

```js
const AMAZON_TAG = 'tutienda-21';
```

Después cambia los ASIN de ejemplo:

```html
data-asin="B0PLACEHOLD1"
```

Por ASIN reales de Amazon.

La web generará enlaces con este formato:

```txt
https://www.amazon.es/dp/ASIN?tag=TU-ID-AFILIADO-21
```

## Importante sobre precios e imágenes de Amazon

No pongas claves privadas de Amazon en HTML, CSS o JavaScript público.

Para mostrar automáticamente imágenes, precios, disponibilidad o fichas actualizadas de Amazon, usa un backend intermedio autorizado. He añadido una carpeta `amazon-connector/` con una base Node.js para hacerlo de forma segura.

## Publicar en hosting

Opciones fáciles:

1. GitHub Pages: sirve `index.html` directamente.
2. Netlify: conecta este repo y publica la raíz.
3. Vercel: conecta este repo y publica como sitio estático.
4. Hosting tradicional: sube `index.html`.

## Siguiente paso recomendado

Antes de lanzar tráfico:

- Cambiar tag de afiliado.
- Cambiar ASIN reales.
- Añadir páginas legales completas: aviso legal, privacidad, cookies y afiliados.
- Crear al menos 5 artículos SEO reales.
- Configurar Search Console y Analytics.
