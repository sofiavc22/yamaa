# Producto, experiencia y decisiones conocidas

**Corte: 28 de octubre de 2026.** Separamos lo pedido por la fundadora, lo implementado y lo que aún requiere decisión o verificación. Esta guía no sustituye una especificación futura.

## Propósito y alcance actual

Yamaa ayuda a descubrir y comparar dónde practicar yoga. La experiencia actual cubre CDMX, Guadalajara y Zapopan. Las fichas enlazan a sitios, Instagram, mapas, calendarios o contacto de los estudios; **no** contienen un checkout ni un sistema propio de reservas. La frase en la barra de ficha indica que Yamaa conecta al visitante directamente con el estudio y no procesa cobros ni reservas. Retiros, experiencias y certificaciones aparecen como categorías en inicio, pero por ahora muestran un estado vacío, no un catálogo operativo.

No hay en el repositorio una definición confirmada de ingresos, membresía de pago, comisión, moderación de reseñas de usuarios ni contratación con estudios. No la infieras.

## Decisiones de UI expresadas por la usuaria

- La página de Guadalajara/Zapopan debe mantener paridad visual con CDMX. No convertirla en una experiencia secundaria o un simple “próximamente”.
- En móvil se buscan proporciones compactas de exploración y tarjetas similares en escala a una experiencia de marketplace; se usó Airbnb solo como referencia visual, no como licencia para copiar marca o componentes.
- La búsqueda del inicio acepta ciudad **o colonia**; no abre la lista completa al enfocar. Muestra coincidencias solo después de escribir.
- Cada ficha conserva el nombre y debajo una única línea `Yoga en [colonia], [ciudad]`; no volver a colocar “Hot yoga / Pilates” o una segunda línea de modalidades en ese encabezado.
- En la iteración de ficha inspirada por una captura móvil de The Infatuation, la usuaria pidió **no tocar** el nombre, la línea `Yoga en…`, las fotos ni la barra fija con precio/contacto. El contenido bajo el encabezado sigue el orden: experiencia editorial, ubicación, enlaces/acciones, estilos e información de visita. Una referencia visual no autoriza reproducir textos, logos o activos ajenos.
- La usuaria quiere una reseña corta de **experiencia propia de Yamaa**, difuminada para invitados, con botón de registro. Aclaró expresamente que esas reseñas se llenarán con el tiempo y que **no se deben inventar**. Actualmente el sistema muestra un aviso de “aún no publicada” si el campo no existe.
- La ubicación debe mostrar dirección completa escrita, enlace “Ver ubicación en Google Maps” y accesos Web, Directions, Instagram y Been here. Se solicitó que la dirección/mapa solo se vean para registrados, pero la implementación actual es **visual, no una restricción técnica verdadera**; véase riesgos.
- Para direcciones, usar la ficha correcta de Google Maps y no adjudicar sedes ambiguas. Las direcciones de CDMX se contrastaron en la sesión del 28 de octubre; Guadalajara/Zapopan ya tenían enlaces `mapsUrl`. El catálogo no conserva URL/fecha de fuente para todas las comprobaciones.
- El texto de precio de primera visita en tarjetas usa “Tu primera vez por…”. No reintroducir “Tu primera clase…” sin pedirlo.
- Hay intención de revisar SEO/metatags y enriquecer las fichas. No confundir esa intención con aprobación de datos, reseñas o tarifas concretas.

## Comportamiento que sí existe

**Inicio.** Búsqueda por ciudad/colonia con autocompletar; selector de estilo; carruseles; enlaces a zonas; categorías vacías salvo Estudios. El catálogo de CDMX se baraja en el navegador, lo que puede cambiar el orden entre cargas.

**Listados.** CDMX y Guadalajara/Zapopan tienen layout y filtros análogos. Mostrar un estilo depende de `modalities` como texto; precios ausentes no son cero. Los filtros operan localmente con parámetros en la URL. Los chips de colonias de inicio no cubren todas las zonas; las páginas de zona SEO son solo cuatro.

**Ficha.** Galería únicamente con imágenes marcadas `authorized`, botones compartir/favorito, nombre, línea de ubicación, hechos rápidos, bloque de experiencia pendiente o futura reseña, ubicación, estilos, introducción editorial, horarios/precios/enlaces y barra fija de contacto. Un estudio puede tener `scheduleUrl` oficial sin calendario embebido. La barra usa `bookingUrl`, luego WhatsApp, web, Instagram o ancla de ubicación según disponibilidad.

**Cuenta.** Login/registro por correo y Google mediante Supabase JS, sujetos a configuración externa. Favoritos intentan persistir en Supabase. “Been here” se marca localmente y puede perderse al cambiar de navegador, dispositivo o borrar almacenamiento.

## Términos que deben usarse con cuidado

- **“Verificado”**: especifica exactamente qué se verificó (dirección, horario, fuente oficial, permiso de imagen) y cuándo. No uses un sello global para deducir que todo el perfil está actualizado.
- **“Nuestra experiencia”**: visita real de Yamaa, no resumen de Google Reviews, fotos o texto promocional.
- **“Precio”**: `firstClassPrice` es un dato registrado para primera visita; puede cambiar o depender de condiciones. Nunca lo llames tarifa garantizada si no hay fuente/fecha actual.
- **“Horario”**: `scheduleSummary` puede ser orientativo; no equivale a disponibilidad en tiempo real. El enlace oficial tiene prioridad para confirmar.
- **“Registrado”**: sesión de Supabase detectada en navegador; no equivale a una autorización servidor para datos de la ficha.
- **“Foto autorizada”**: bandera editorial en JSON; para nuevas fotos se requiere evidencia de licencia/permiso y sede correcta.

## Preguntas abiertas para producto

1. ¿Se quiere realmente proteger la dirección como dato privado, o solo incentivar el registro con una presentación visual? La respuesta cambia arquitectura y SEO.
2. ¿Dónde se almacenarán las futuras reseñas propias, quién las aprueba y cómo se fecha la visita? ¿Serán visibles para buscadores?
3. ¿“Been here” debe sincronizarse entre dispositivos y verse en perfil? Hoy no.
4. ¿Qué constituye un estudio “verificado” y cada cuánto se revalida cada campo?
5. ¿Quién actualiza el catálogo: repositorio, Google Sheet u otra herramienta? No hay importador automático visible.
6. ¿Cómo se mostrará Zapopan en páginas de zona y resultados SEO? Actualmente forma parte del listado Guadalajara/Zapopan, pero su `city` sigue siendo Zapopan.
7. ¿Qué se hará con retiros/experiencias/certificaciones y con las guías del inicio, que hoy enlazan a `/cdmx`?
