# Operación, verificación y publicación

**Corte: 28 de octubre de 2026.** Este es el flujo observado para el repositorio actual. Las cuentas externas pueden cambiar de configuración sin reflejarse aquí.

## Entorno local

Requisitos: Node.js/npm compatibles con la versión de Astro resuelta por `package-lock.json`. Usa `npm ci` si no están instaladas las dependencias; `npm run dev` para desarrollo, `npm run build` para generar `dist/` y `npm run preview` si se necesita revisar el build. No hay script de tests/lint ni cobertura automatizada declarada en `package.json`. La compilación por sí sola no comprueba exactitud editorial, permisos de imágenes, login real ni que un mapa apunte a la sede correcta.

Variables previstas en `.env.example`:

| Variable | Uso y cuidado |
| --- | --- |
| `PUBLIC_SUPABASE_URL` | URL pública del proyecto de Supabase. Necesaria para cuenta/favoritos. |
| `PUBLIC_SUPABASE_ANON_KEY` | Clave pública del cliente, no `service_role`; requiere políticas de acceso apropiadas en Supabase. |
| `PUBLIC_GOOGLE_MAPS_EMBED_KEY` | Opcional para Maps Embed API. Restringir a API y dominios autorizados. |

No registres valores reales en Git, logs compartidos, documentación o capturas. Un prefijo `PUBLIC_` significa visible en el frontend. `GOOGLE_SIGN_IN.md` describe pasos de OAuth; no prueba que el proveedor esté activado. `GOOGLE_MAPS.md` fue escrito antes del fallback sin clave que hoy aparece en `StudioMap.astro`; contrasta siempre con el código actual.

## Proceso de cambio recomendado

1. Confirmar petición y restricciones expresas del usuario. Inspeccionar `git status`, rama y diferencia con `origin/main`. Trabajar sobre una rama nueva basada en `main` cuando se vaya a publicar; preservar cambios ajenos.
2. Leer rutas y campos afectados. Para un cambio en `studios.json`, pensar en tarjeta, ficha, filtro, mapa, SEO y sitemap, no solo en el componente que se ve en pantalla.
3. Hacer cambios pequeños y trazables. Separar contenido verificado de diseño/funcionalidad cuando un PR único dificultaría revisión. Documentar fuentes de datos temporales.
4. Ejecutar `npm run build`, `git diff --check` y controles específicos. Ejemplos: contar slugs únicos, comprobar rutas de imágenes autorizadas, inspeccionar HTML generado de estudios de ambas ciudades, revisar canonical/JSON-LD/sitemap si cambia SEO.
5. Probar interacción en navegador cuando sea posible: móvil/escritorio, invitado/registrado, enlaces externos, favoritos, login y “Been here”. Si el entorno impide navegador o cuenta de prueba, declarar esa limitación en el informe/PR.
6. Subir rama y abrir PR dirigido a `main`; adjuntar el PR al trabajo si la interfaz lo requiere. Esperar a que Vercel/controles estén en verde antes de integrar, y comprobar que el hash final de `main` llegó a producción.
7. Leer la URL pública afectada **después** del despliegue. Una vista previa o un build correcto no demuestra que el usuario vea el cambio. En cambios visuales, comprobar la interfaz, no solo buscar una cadena en HTML.
8. Comunicar qué se publicó, qué queda pendiente y qué comprobaciones no se pudieron realizar. No decir “ya está” si solo existe una rama o una vista previa.

La publicación no debe ampliar el alcance de una petición de solo diagnóstico o propuesta. Si la persona pide únicamente evaluar o planear, no publiques cambios. Si una acción exige acceso a cuentas externas, secretos, derechos de imágenes o decisiones de producto no proporcionadas, pide lo mínimo necesario.

## Checks de contenido sugeridos

- JSON parseable; `slug` no vacío y único; ciudades y `cityPath` coherentes.
- `images[*].url` usado por una imagen autorizada debe existir en `public/`, con `alt` y permiso/documentación suficientes.
- Dirección que se muestra corresponde al mismo estudio/sede que la foto y el enlace de Maps; no solo a una calle parecida.
- Precio de primera visita y moneda no se presentan como precio universal; enlaces de horarios/precios abren la página oficial correcta.
- Introducción no contradice datos nuevos (por ejemplo, “falta dirección” después de agregarla). Zonas/FAQ/sitemap tampoco deben quedar obsoletos.
- Headings, metatags, JSON-LD y enlaces internos correctos tras cambiar nombre, zona o slug.
- Registro/inicio de sesión y CTA de contenido difuminado llevan de vuelta a la ficha; si no hay sesión, los enlaces externos se redirigen según el comportamiento acordado.
- Sin fotos no debe haber imagen rota ni alt inventado; la tarjeta usa placeholder.

## Qué verificar fuera del repositorio

- Configuración de despliegue, dominio, variables, protección de previews y logs en Vercel.
- Proyecto Supabase: proveedores, URLs de redirección, plantilla de confirmación de correo, esquema `favorites`, índices y políticas RLS. Ninguna migración SQL de esos recursos está versionada aquí.
- OAuth de Google y dominio autorizado. No se deduce su estado de la existencia del botón.
- Search Console: propiedad, sitemap, indexación y errores. El hecho de enviar una URL no garantiza indexación.
- Google Maps/estudios: dirección, sede y estado actual; un resultado puede cambiar o estar desactualizado.
- Permisos de imágenes guardados por el equipo. La bandera de JSON no contiene la prueba legal completa.

## Recuperación/rollback

La rama `main` y los PR preservan historial. Si un dato incorrecto llega a producción, corrígelo en un PR específico y vuelve a verificar despliegue y URL pública. Si hay impacto amplio o urgente, considera rollback en Vercel solo con autorización y conocimiento del estado actual de producción. No uses `git reset --hard` para borrar trabajo local ni reescribas historia compartida por comodidad. Para una ficha con sede dudosa, es preferible retirar el dato incorrecto y marcar pendiente que dejar una dirección falsa.
