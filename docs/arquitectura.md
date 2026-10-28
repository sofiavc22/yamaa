# Arquitectura y flujo de datos

**Corte documental: 28 de octubre de 2026.** Esta descripción se verificó contra archivos del repositorio; no es un diagrama de infraestructura externa validado en las cuentas de Vercel, Supabase o Google.

## Ejecución

Astro está configurado con `output: 'static'` y `site: 'https://www.clasedeyoga.com.mx'` en `astro.config.mjs`. El build crea HTML estático en `dist/`. No hay un backend propio, API de Yamaa ni base de datos de estudios en este repositorio. El catálogo se importa en tiempo de compilación desde `src/data/studios.json`; para actualizar lo publicado hay que cambiar el archivo y volver a desplegar. La interactividad (filtros, carruseles, favoritos, sesión y bloqueo visual) se ejecuta en el navegador.

```text
studios.json ──> Astro build ──> HTML de inicio, ciudades, zonas y 44 fichas
       │                              ├─ metatags y JSON-LD
       └──────────────────────────────└─ sitemap.xml

Navegador ──> Supabase Auth / tabla favorites (si están configurados)
          └─ localStorage para “Been here”
```

## Rutas actuales

| Ruta | Archivo | Comportamiento |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Inicio, búsqueda por ciudad/colonia, tarjetas de CDMX y Guadalajara/Zapopan, categorías aún vacías y enlaces de zona. |
| `/cdmx` | `src/pages/cdmx/index.astro` | Listado filtrable de estudios de CDMX. Incluye FAQ y JSON-LD. |
| `/guadalajara` | `src/pages/guadalajara/index.astro` | Listado filtrable que incluye Guadalajara **y Zapopan**. |
| `/cdmx/{roma-norte,polanco,del-valle}` | `src/pages/[city]/[zone].astro` | Tres zonas de CDMX predefinidas; no hay una página SEO para cada zona del JSON. |
| `/guadalajara/americana` | mismo archivo | Zona Americana. El filtro de esta ruta usa `city === 'Guadalajara'`, no Zapopan. |
| `/estudios/[slug]` | `src/pages/estudios/[slug].astro` | Una ficha generada por estudio; nombre, galería, reseña pendiente, ubicación, estilos, información de visita, barra fija de precio/contacto. |
| `/login`, `/registro`, `/auth/callback` | `src/pages/` | Autenticación con Supabase por correo/contraseña y componente de Google OAuth; callback para confirmación de correo. |
| `/favoritos` | `src/pages/favoritos.astro` | Tarjetas pre-renderizadas que el navegador muestra u oculta según los favoritos leídos de Supabase. |
| `/privacidad` | `src/pages/privacidad.astro` | Aviso público de privacidad; cualquier cambio funcional de datos personales exige revisión de coherencia. |
| `/sitemap.xml`, `/robots.txt` | `src/pages/*.js` | Generación estática. Login/registro/auth están excluidos de robots según el archivo actual. |

## Componentes y dependencias entre ellos

- `src/layouts/Base.astro`: HTML base, canonical sin slash final salvo `/`, OG/Twitter, JSON-LD recibido como prop, navegación de escritorio/móvil y estado de sesión. Importa `src/styles/global.css`.
- `src/components/StudioCard.astro`: tarjeta para inicio/listados/zonas y botón de favoritos. Toma imagen de portada autorizada y `firstClassPrice`; la interacción de favoritos usa Supabase si hay sesión.
- `src/components/StudioMap.astro`: construye mapa embebido a partir de nombre/dirección/zona/ciudad. Si hay `PUBLIC_GOOGLE_MAPS_EMBED_KEY`, usa Maps Embed API; en el código actual, sin clave intenta un iframe de `maps.google.com` cuando hay dirección. El modo `compact` omite dirección y botones duplicados. No des por garantizado que el iframe funcione en todos los navegadores o que una búsqueda por texto sea inequívoca.
- `src/components/GoogleSignIn.astro`: botón y flujo Google OAuth de Supabase. Que exista el componente no confirma que el proveedor esté activo en las cuentas externas.
- `src/data/studioIntroductions.js`: textos editoriales de respaldo. `studio.summary` en JSON tiene preferencia sobre esta introducción.
- `src/lib/supabase.js`: cliente público de Supabase. `src/lib/authDestination.js`: limita `next` a rutas `/estudios/[slug]`, con `/cdmx` como destino por defecto.

## Flujo de descubrimiento y filtros

La búsqueda del inicio ofrece opciones solo cuando se escribe al menos una letra; busca coincidencias por nombre y algunos alias. Las colonias derivan de `zone` del catálogo. Elegir colonia lleva al listado de la ciudad con `?zona=...`, no necesariamente a una página de zona SEO. Los listados filtran en el navegador por zona, modalidad, nombre y precio; la URL puede incluir `zona`, `estilo`, `q`, `min`, `max` y en CDMX `donativo`. Los rangos de precio de las hojas de filtros están fijados en código (CDMX 150–420 MXN; Guadalajara 90–310 MXN), por lo que precios fuera de rango podrían requerir ajustes de interfaz. El inicio baraja las tarjetas de CDMX en el navegador y muestra seis; no supone un orden editorial estable.

## Autenticación y datos personales

`PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` están previstos en `.env.example`. La autenticación usa Supabase en el cliente. `Base.astro` actualiza controles de invitado/miembro al recibir sesión. Login y registro por email se implementan en las rutas correspondientes; Google usa `signInWithOAuth`. La tabla `favorites` se consulta/escribe con `user_id` y `studio_slug`; **el esquema, las políticas RLS y la configuración de proveedores no están versionados aquí**. Antes de afirmar que un flujo está seguro o funcionando, compruébalo en el entorno correspondiente. No publiques identificadores ni credenciales reales.

En fichas, `updateAccess()` cambia el destino de enlaces externos para invitados a `/login?next=...`; con sesión restaura el destino. Los bloques con `data-studio-gate` se muestran difuminados y se desbloquean en el DOM con la sesión. Esta lógica no constituye autorización de datos. “Been here” guarda `yamaa-visited:{user.id}:{slug}` en `localStorage`, solo en el navegador actual; favoritos sí intentan persistir en Supabase.

## SEO y rastreo

- El sitio estático emite canonical, title, description, OG/Twitter desde `Base.astro`.
- La ficha arma el title/description a partir de datos o overrides `seoTitle`/`seoDescription`; el JSON-LD usa `SportsActivityLocation`, `PostalAddress`, `image`, `sameAs` y breadcrumbs. Por eso cambiar dirección, imagen o contacto también modifica información que ven rastreadores.
- Ciudad/zona incluyen `CollectionPage`, `ItemList`, breadcrumbs y FAQ donde aplica.
- `sitemap.xml` incluye home, ciudades, cuatro zonas y todas las fichas. `lastmod` solo se emite si el estudio tiene `verifiedAt`; no se debe falsificar esta fecha para forzar indexación.
- `robots.txt` permite rastreo general pero excluye `/auth/`, `/login` y `/registro`. Revisa coherencia de indexación cuando se creen rutas nuevas o redirecciones.

## Despliegue y entorno

La historia reciente usa GitHub (`sofiavc22/yamaa`, rama `main`) y Vercel para producción. El repositorio no contiene un `vercel.json` ni un pipeline CI propio visible; comprueba la configuración en Vercel antes de cambiarla. `.env.example` documenta nombres de variables, no valores. `dist/` y `node_modules/` son artefactos locales ignorados y no fuentes de verdad.
