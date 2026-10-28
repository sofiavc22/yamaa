# Instrucciones para agentes que trabajen en Yamaa

Lee [README.md](README.md) y el documento específico del área antes de editar. Estas reglas son contexto del proyecto, no amplían la autorización concedida por la persona usuaria en cada tarea. En caso de conflicto, respeta la petición actual, las instrucciones de nivel superior y los permisos reales del entorno.

## Antes de cualquier cambio

1. Inspecciona `git status`, la rama actual y `origin/main`. No sobrescribas trabajo ajeno ni edites copias sincronizadas de solo lectura.
2. Define el alcance exacto. Una solicitud sobre una ficha no autoriza cambiar nombres, fotos, precios, navegación, SEO, privacidad o todas las fichas salvo que sea necesario y esté dentro de lo pedido.
3. Lee los campos del estudio y el código que los consume. `studios.json` alimenta la interfaz, datos estructurados, búsqueda, filtros y sitemap; un cambio pequeño puede tener varios efectos.
4. Separa observación de inferencia. No inventes reseñas propias, visitas, permisos de imágenes, horarios, precios, beneficios, disponibilidad ni confirmaciones de sedes.
5. Mantén secretos fuera de Git y de las respuestas. Las variables con prefijo `PUBLIC_` se entregan al navegador; no coloques ahí claves de servidor.

## Reglas editoriales y de datos

- Nombre y slug: el nombre es identidad editorial; el slug es una URL pública. No renombres slugs sin plan de redirecciones, canonical y Search Console.
- Encabezado de ficha: bajo el nombre se muestra `Yoga en [zona], [ciudad]`; no agregues otra vez tipos o modalidades en esa línea por deducción. Los estilos viven en “Clases y estilos”.
- Reseñas de Yamaa: solo con notas de una visita real proporcionadas o verificadas por el equipo. Si no hay experiencia, deja el estado pendiente; no “completes” el campo a partir de reseñas de terceros.
- Ubicaciones: identifica el lugar exacto y la sede antes de copiar una dirección de Google Maps. Guarda URL y fecha de comprobación cuando actualices la ficha. Una dirección de oficina no necesariamente es la sede de clase; el Centro de Kundalini Yoga en Guadalajara es un caso explícito.
- Fotos: comprueba autorización, fuente, estudio/sede y `alt`; `authorized: true` solo después de evidencia de permiso. No reutilices una imagen por parecido visual ni tomes la presencia del archivo como permiso.
- Horarios, precios, promociones y enlaces: son temporales. Prioriza fuente oficial, fecha y lenguaje prudente; no presentes un calendario externo como calendario propio o en tiempo real.
- El catálogo no viene automáticamente de Google Sheets. La web actual lee `src/data/studios.json`. No supongas sincronización bidireccional ni subas cambios a una hoja sin solicitud y comprobación.
- Si se modifica el aviso de privacidad, autenticación o acceso a información, revisa consecuencias legales/técnicas y verifica que la descripción pública coincida con lo implementado.

## Seguridad y producto

- El bloqueo actual de dirección/reseña es **solo visual**. No lo describas como contenido protegido. Cambiar a protección real exige mover el dato fuera de HTML, JSON-LD y bundle público y aplicar control de acceso del lado servidor/datos.
- Los enlaces externos pueden redirigir a `/login` si no hay sesión. Ello no implica que una URL subyacente esté cifrada ni que el estudio exija registro.
- Favoritos usan Supabase; “Been here” usa `localStorage`. No confundas almacenamiento local con sincronización de cuenta.
- No cambies la barra fija de precio/contacto, el nombre, la línea `Yoga en…` ni las fotos cuando el usuario haya excluido expresamente esas áreas.

## Validación y entrega

- Ejecuta `npm run build` y `git diff --check` para cambios de código/datos; además comprueba al menos una página representativa por ciudad o funcionalidad afectada. No hay una suite de tests automatizados en `package.json` al momento de escribir esto.
- Para cambios de datos, comprueba JSON válido, slugs únicos, URLs correctas y que las imágenes autorizadas referenciadas existan. Verifica el resultado de cada nuevo campo en ficha, listados, metatags y mapa según corresponda.
- Para contenido con registro, prueba visitante y sesión iniciada; no basta revisar HTML estático. Si no puedes probar una de las dos, indícalo.
- Un build exitoso no equivale a despliegue. Si la tarea incluye publicar, comprueba PR/merge, estado de Vercel y URL pública. Adjunta el PR al trabajo cuando la herramienta lo requiera.
- Actualiza documentación si cambias decisiones, contratos de datos o riesgos. No conviertas esta fotografía del proyecto en una verdad permanente; revisa [docs/riesgos-y-pendientes.md](docs/riesgos-y-pendientes.md).
