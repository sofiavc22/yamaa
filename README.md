# Yamaa — base de conocimiento del proyecto

Yamaa es un directorio de estudios y clases de yoga en México. El sitio público es [clasedeyoga.com.mx](https://www.clasedeyoga.com.mx/) y este repositorio contiene su código y el catálogo que se publica. La experiencia actual permite descubrir estudios por ciudad, colonia y estilo, abrir una ficha, consultar información disponible, registrarse, guardar favoritos y salir a los canales oficiales de cada estudio. **Yamaa no cobra ni procesa reservas en el sitio.**

> **Fecha de esta fotografía documental:** 28 de octubre de 2026. El código y los datos pueden cambiar; antes de actuar, comprueba el estado actual de `main` y de producción. Este README describe lo observado en el repositorio, no promete que una integración externa esté configurada o que un dato siga vigente.

## Empieza aquí

| Si necesitas… | Lee… |
| --- | --- |
| Instrucciones para un agente nuevo y límites de autoridad | [AGENTS.md](AGENTS.md) |
| Qué se ha decidido para la experiencia y qué sigue abierto | [docs/producto.md](docs/producto.md) |
| Arquitectura, rutas y flujo de datos | [docs/arquitectura.md](docs/arquitectura.md) |
| Cómo editar una ficha y validar contenido, fotos, precios y direcciones | [docs/contenido-y-datos.md](docs/contenido-y-datos.md) |
| Cómo desarrollar, revisar y publicar | [docs/operacion.md](docs/operacion.md) |
| Riesgos, contradicciones y trabajo pendiente | [docs/riesgos-y-pendientes.md](docs/riesgos-y-pendientes.md) |

## Estado comprobado en el repositorio

- Stack: Astro con salida estática, JavaScript/TypeScript en componentes Astro, CSS global, Supabase JS para autenticación y favoritos. `npm run build` genera `dist/`.
- Catálogo: **44 estudios** en `src/data/studios.json`: 30 de CDMX, 13 de Guadalajara y 1 de Zapopan. Cada estudio tiene una ruta `/estudios/[slug]`. La ausencia de `city` significa CDMX en el código actual.
- Contenido: todas las fichas tienen `address` escrito después del contraste de CDMX con Google Maps; esto **no** equivale a verificación permanente ni a un enlace de fuente guardado para todas. Diez estudios no tienen imágenes autorizadas referenciadas en su registro, aunque existan archivos en `public/`.
- Páginas de ciudad: `/cdmx` y `/guadalajara`. Páginas de zona generadas actualmente: `/cdmx/roma-norte`, `/cdmx/polanco`, `/cdmx/del-valle` y `/guadalajara/americana`.
- SEO: `Base.astro` emite title, description, canonical, Open Graph y Twitter; páginas de estudio/ciudad/zona incluyen JSON-LD. `sitemap.xml` se genera a partir del catálogo.
- Publicación: este repositorio tiene remoto `sofiavc22/yamaa`; los cambios recientes se integraron en `main` mediante pull requests y Vercel los desplegó al dominio público. Verifica el despliegue de cada nuevo cambio; no asumas que un commit o una vista previa ya está publicado.

## Lo que NO debes dar por hecho

1. **“Registrarse para ver la dirección” no es seguridad real.** La ficha se pre-renderiza con dirección, mapa y JSON-LD; el difuminado se controla en el navegador. El HTML y `studios.json` siguen exponiendo esos datos. Para privacidad real hace falta un backend con autorización, rediseño del SEO y eliminación de direcciones del bundle público.
2. **“Nuestra experiencia” no contiene reseñas.** Si no existe `review`, la ficha muestra un aviso. Nunca redactes una visita en primera persona a partir de imágenes, reseñas ajenas o marketing del estudio.
3. **“Been here” no se sincroniza.** Usa `localStorage` por identificador de usuario y estudio en ese dispositivo. No existe todavía una tabla persistente de visitas comprobada en este repositorio.
4. **“Verificado por Yamaa” no significa que todo campo de los 44 estudios se revisó hoy.** `verifiedAt` solo está presente en cinco registros; `locationVerifiedAt` en doce. Hay datos sin fuente estructurada.
5. **Una foto existente en `public/` no implica permiso de publicación.** Solo la referencia con `authorized: true` se muestra. Confirma y registra permiso, procedencia y alcance antes de incorporar fotos nuevas.
6. **Los enlaces a estudios no prueban disponibilidad, horarios, tarifa ni servicio vigente.** Confirma en el canal oficial y registra fuente/fecha. No conviertas supuestos en promesas.
7. **La documentación de configuración no prueba que el proveedor esté activo.** Supabase, Google OAuth y Maps dependen de credenciales/configuración externa. No publiques secretos en Git.

## Mapa rápido del repositorio

```text
src/data/studios.json             Catálogo que alimenta listados, fichas, SEO y sitemap
src/data/studioIntroductions.js    Introducciones editoriales de fichas
src/pages/                      Rutas Astro
src/components/                 Tarjetas, mapa y acceso con Google
src/layouts/Base.astro          Marco común, metatags y navegación
src/styles/global.css           Estilos compartidos
public/                         Imágenes y otros recursos estáticos
GOOGLE_MAPS.md                  Nota técnica previa sobre Maps
GOOGLE_SIGN_IN.md               Nota técnica previa sobre OAuth
```

## Regla de mantenimiento

Cuando cambies producto, esquema, datos o despliegue, actualiza en el mismo PR el documento pertinente. Distingue siempre entre **implementado**, **verificado en producción**, **pendiente** e **hipótesis**; añade fecha y fuente cuando un dato externo lo necesite. La base de conocimiento ayuda a actuar, pero **el código actual y la petición vigente del usuario mandan** si alguna nota se quedó obsoleta.
