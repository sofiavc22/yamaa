# Catálogo, fuentes y reglas de publicación de contenido

**Corte: 28 de octubre de 2026.** Fuente operativa de la web: `src/data/studios.json`. Este documento no convierte en “verificado” un campo sin evidencia trazable. El proyecto ha usado Google Sheets como insumo en conversaciones anteriores, pero **no hay sincronizador/importador de Sheets en el repositorio**. Antes de editar datos en otra herramienta, confirma cuál es la fuente de verdad de esa tarea.

## Inventario actual

| Métrica leída del JSON | Valor |
| --- | ---: |
| Estudios | 44 |
| Ciudad de México (incluye `city` omitido) | 30 |
| Guadalajara | 13 |
| Zapopan | 1 |
| Registros con `address` no vacío | 44 |
| Con `firstClassPrice` numérico | 35 |
| Con `website` | 14 |
| Con `instagram` | 40 |
| Con `whatsapp` | 41 |
| Con `scheduleUrl` | 7 |
| Con `verifiedAt` | 5 |
| Con `locationVerifiedAt` y `locationSourceUrl` | 12 |
| Imágenes referenciadas y marcadas `authorized: true` | 90 |
| Estudios sin imagen autorizada referenciada | 10 |

Las cifras son una fotografía, no invariantes. Los diez sin foto autorizada referenciada al corte son `apurva-centro-de-yoga`, `khimu-studio-yoga`, `casa-yoga-guadalajara`, `tribu-distrito`, `red-gfu-guadalajara`, `pasaje-yoga`, `kalki`, `arbol-de-yoga`, `sunlight-yoga` y `centro-de-kundalini-yoga`. Puede haber archivos con nombres de estos estudios bajo `public/`; **no** actives una referencia ni marques `authorized` por esa sola razón.

## Contrato práctico de una ficha

`name` y `slug` identifican la ficha. `slug` determina la URL; evita cambios sin redirecciones. `zone` alimenta encabezado, tarjetas, sugerencias de búsqueda y filtros. `city` ausente se interpreta como Ciudad de México; Guadalajara y Zapopan tienen `city` explícito y usan `/guadalajara` como `cityPath`. `state` ausente se interpreta como `CDMX` en la ficha. `type` sigue en datos, pero el subtítulo visible actual es siempre `Yoga en {zone}, {city}`. No confundas estos campos con una dirección postal completa.

`address` es texto para ficha, mapas y JSON-LD. `mapsUrl` existe en 14 fichas de Guadalajara/Zapopan, pero el enlace “Ver ubicación en Google Maps” de la plantilla actualmente construye una búsqueda a partir de nombre/dirección/zona y **no usa `mapsUrl`**; el componente `StudioMap` sí considera `mapsUrl` cuando muestra sus acciones no compactas. Si la usuaria pide un enlace exacto a la ficha de Google Maps, revisa ambos puntos. `locationSourceUrl`/`locationVerifiedAt` solo se registran en 12 entradas. Las direcciones completas de CDMX se contrastaron en Google Maps el 28 de octubre, pero esa fuente/fecha no quedó estructurada en cada registro. Es una brecha de trazabilidad para corregir, no una licencia para escribir fechas retrospectivas sin evidencia de la ficha concreta.

`modalities` alimenta chips y filtros. El primer elemento aparece en “Tu práctica” del resumen. `summary` sustituye la introducción de `studioIntroductions.js`; los textos de ese archivo se escribieron a partir de ubicación y modalidades registradas, **no** de visitas. `review` es un campo opcional que la plantilla está preparada para mostrar difuminado; no hay reseñas propias registradas al corte. No trates `summary`, `studioIntroductions` y `review` como intercambiables.

`firstClassPrice` numérico se formatea en MXN en tarjetas/ficha; `firstClassDonation` indica donativo. `pricingSummary`, `pricingUrl`, `scheduleSummary`, `scheduleUrl`, `bookingUrl` y `beginnerNote` son campos opcionales. `bookingUrl` tiene prioridad en la barra de contacto. Si no hay `scheduleUrl`, la ficha muestra un texto para confirmar horarios, no un calendario propio. Las tarifas y horarios son sensibles al tiempo: registra enlace oficial y fecha de comprobación cuando los añadas o cambies.

`website`, `instagram` y `whatsapp` alimentan contacto y JSON-LD; `whatsapp` se espera como número utilizable por `wa.me` sin signos. `seoTitle`/`seoDescription` son overrides excepcionales (tres fichas al corte); la mayoría se generan automáticamente. `verifiedAt` se usa también como `lastmod` en sitemap: no lo cambies solo para refrescar SEO.

Cada objeto de `images` puede tener `url`, `kind` (`cover`/`gallery`), `alt`, `source` y `authorized`. La UI filtra por `authorized && url`; la portada es el primer elemento con `kind: cover` autorizado o, si no lo hay, la primera imagen autorizada. Se cargan desde `public/`. Una foto del estudio correcto pero de la **sede equivocada** también es un error. Conserva los permisos y la trazabilidad cuando reemplaces archivos.

## Procedimiento al añadir o corregir un estudio

1. **Identidad.** Confirmar nombre comercial, sede, ciudad, colonia y que no sea duplicado. Para varias sucursales, usar fichas separadas cuando corresponda y no mezclar fotos/horarios.
2. **Dirección.** Buscar el establecimiento exacto en Google Maps; comprobar coincidencia de nombre y sede, estado de apertura y dirección. Comparar con web/Instagram oficial si hay discrepancia. Si es una oficina administrativa, decirlo. Si no hay certeza, dejar pendiente o pedir aclaración.
3. **Proveniencia.** Guardar `locationSourceUrl` y `locationVerifiedAt` para la comprobación de la dirección. Guardar enlaces oficiales de horarios/precios y fecha si el esquema se amplía. No marcar `verifiedAt` general como sustituto de verificaciones por campo.
4. **Oferta.** Registrar `modalities` solo con evidencia. Evitar términos genéricos que inflen filtros y no prometer niveles, amenities, aforo o beneficios sin fuente.
5. **Precio y horario.** Determinar si el precio es de primera visita, clase suelta, paquete o donativo; no mezclar. Un enlace a calendario oficial es preferible a copiar horas que cambiarán.
6. **Imágenes.** Obtener permiso explícito o licencia aplicable, preservar evidencia fuera de un repositorio público si incluye datos privados y registrar fuente/alcance. Añadir `alt` descriptivo y confirmar sede. Solo entonces `authorized: true`.
7. **Texto.** Escribir `summary`/introducción de forma sobria y factual. `review` solo tras experiencia real de Yamaa; no usar primera persona sin visita.
8. **Validación.** Comprobar JSON, slug único, rutas de imágenes, resultado en ficha/tarjeta/filtros/SEO/sitemap y build. Revisar móvil e invitado/registrado cuando la sección de acceso se vea afectada.

## Precauciones concretas

- **Sat Nam**: la usuaria corrigió la sede a Av. José Vasconcelos 207, San Miguel Chapultepec, CDMX; no asignarla a otra colonia/sucursal. Google Maps añade primer piso y CP en el registro actual.
- **Centro de Kundalini Yoga, Guadalajara**: la dirección disponible corresponde a oficinas operativas; no presentarla como salón confirmado para todas las clases.
- **Apurva/Centro Apurva**: son nombres similares en Guadalajara y pueden representar sedes/entidades distintas; verificar identidad antes de fusionar.
- **Lafontaine 78**: varios estudios de Polanco comparten el inmueble; Google Maps mostró códigos postales distintos para fichas de ese mismo número. No homogeneizarlos por suposición.
- **THE MAT MX**: la dirección de San Luis Potosí 127 coincide con Google Maps y la web oficial; no confundir la ficha con el estudio usado como referencia visual para el calendario.
- **Precios y verificaciones**: algunas tarjetas pueden dar una impresión de precisión sin fuente/fecha individual. No prometer que sean vigentes.
