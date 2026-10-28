# Riesgos, contradicciones y pendientes

**Auditoría documental: 28 de octubre de 2026.** Los puntos siguientes provienen de leer el repositorio y de las decisiones expresas de la usuaria. Un “riesgo” no significa que el fallo ya se haya observado en producción. Compruébalo antes de abrir un incidente. No soluciona automáticamente ningún punto por el hecho de estar documentado.

## Prioridad alta: no inducir a error o exponer datos

### 1. Dirección y reseña “solo para registrados” no están protegidas

El HTML estático de la ficha incluye la dirección escrita, el iframe/URL de mapa y el `PostalAddress` en JSON-LD. `studios.json` también viaja en el código del repositorio público. La capa `.studio-location-gate` difumina el contenido y `updateGates()` la quita al detectar sesión en el cliente. Quien inspeccione el HTML o los metadatos puede leer la dirección sin registrarse. Una futura `review` también se pre-renderizaría y se difuminaría solo visualmente. **No prometas privacidad ni uses este patrón para contenido verdaderamente exclusivo.**

Decisión requerida: si el objetivo es privacidad real, almacenar el contenido fuera del build público, autenticar del lado servidor/datos, limitar acceso mediante políticas, retirar el dato de JSON-LD/SEO y definir qué se muestra a rastreadores. Si el objetivo es solo presentación/registro, ajustar el lenguaje público para no implicar exclusividad técnica.

### 2. Autenticación y favoritos dependen de configuración externa no versionada

El frontend contiene flujos Supabase, pero este repo no muestra esquema SQL ni políticas RLS de `favorites`, configuración de Google OAuth, plantillas de correo ni redirecciones del dashboard. Una clave pública de Supabase solo es segura con políticas correctas. Un agente no debe inferir que el acceso a datos de otras cuentas esté impedido por el filtro `.eq('user_id', ...)` en JavaScript. Auditar en Supabase con cuenta de prueba antes de afirmar seguridad.

### 3. Fotografías: permiso, sede y trazabilidad

La UI usa solo `authorized: true`, pero no existe un registro de consentimiento/licencia completo en el repositorio. Diez estudios no tienen imágenes autorizadas referenciadas; algunos sí tienen archivos físicos. Es fácil que otro agente “arregle” los placeholders vinculando esos archivos sin permiso. La existencia de una foto en capturas, Google, Instagram o `public/` **no** autoriza su publicación. Confirmar titular, uso permitido, sede exacta y capacidad de revocación.

### 4. Reseñas propias inexistentes

La usuaria indicó que se llenarán con el tiempo y prohibió inventarlas. `studio.review` está preparado en la plantilla, pero hoy los registros no contienen reseñas propias. Reseñas de Google o textos comerciales no se pueden reetiquetar como “Nuestra experiencia”. Documentar visita, autor, fecha, observaciones y aprobación editorial antes de añadirlas.

## Prioridad media: datos y experiencia pueden quedar incoherentes

### 5. Proveniencia/frescura incompleta del catálogo

Los 44 registros tienen dirección escrita, pero solo 12 tienen `locationSourceUrl` y `locationVerifiedAt`; el contraste reciente de CDMX con Maps no quedó registrado en esos campos. Solo cinco entradas tienen `verifiedAt`, aunque la interfaz ha usado lenguaje de “estudios verificados”. `firstClassPrice` aparece en 35 fichas, sin fecha/fuente individual uniforme. Horarios y promociones cambian. Añadir estados/fuentes por campo y una política de revalidación antes de expandir promesas de exactitud.

### 6. Copy de zonas obsoleto tras completar direcciones

`src/pages/[city]/[zone].astro` todavía afirma en Polanco que algunas fichas no tienen dirección completa y en Del Valle que no todas tienen dirección completa. Después de la actualización de Maps, eso contradice `studios.json`. Corregir en una tarea de contenido/SEO; revisar también introducciones, FAQ y filtros tras cada cambio masivo de datos. No cambiar automáticamente otras afirmaciones sin cotejarlas.

### 7. Enlace de Maps no usa siempre el enlace directo guardado

En la ficha, `maps` se arma con una búsqueda de nombre+dirección; el botón “Ver ubicación en Google Maps” y el acceso “Directions” usan esa búsqueda/destino. Los 14 `mapsUrl` guardados en Guadalajara/Zapopan no se usan en ese enlace de la ficha porque el componente `StudioMap` está en modo compacto. Si hay nombres duplicados o sedes cercanas, una búsqueda textual podría abrir el resultado incorrecto. Priorizar enlace directo/Place ID verificado donde exista y verificar cada redirección.

### 8. Mapa embebido y clave

`StudioMap.astro` intenta Maps Embed API con clave pública restringida o fallback `maps.google.com` sin clave. La nota `GOOGLE_MAPS.md` no describe ese fallback actual. Comprobar en producción/móvil si el iframe carga, qué sede marca, si se envían datos a Google antes de interacción y si la política de privacidad refleja ese comportamiento. No poner una clave sin restricciones ni asumir que el fallback tiene el mismo soporte que la API oficial.

### 9. “Been here” no es dato de cuenta

El botón exige sesión para su UI, pero guarda un marcador en `localStorage` con ID de usuario y slug. No se sincroniza; puede desaparecer al borrar datos del navegador y no debe contarse como visita comprobada. Si se desea persistencia, definir tabla/políticas/privacidad y migración de marcadores locales con consentimiento si procede.

### 10. Filtros y contenido de inicio no escalan solos

Rangos de precio, chips de estilos, zonas destacadas y cuatro rutas SEO de zona están fijados en código. Una colonia nueva sí puede aparecer en autocompletar, pero no obtiene automáticamente landing SEO. Un precio fuera de rango puede ser difícil de encontrar con sliders. El carrusel de CDMX se baraja en cliente; no sirve para priorización editorial estable. Las categorías Retiros, Experiencias y Certificaciones son estados vacíos. Las tres “guías” del inicio enlazan a `/cdmx`, no a artículos independientes.

### 11. SEO puede afirmar más de lo visible

El JSON-LD `SportsActivityLocation` incluye direcciones, teléfonos e imágenes y el sitemap usa `verifiedAt` como `lastmod`. Metatags de estudios solo tienen override en tres registros. Si se quiere ocultar ubicación, el SEO también debe cambiar. No inventar `lastmod` ni multiplicar páginas de zona vacías para “mejorar SEO”. Revisar canonical, indexación real y Search Console cuando se cambien slugs o datos principales.

### 12. Diferencias de lenguaje y diseño

La mayor parte del sitio está en español, pero los accesos de ficha dicen “Web”, “Directions” y “Been here”, por petición de una referencia visual. Decidir si se mantienen como etiquetas de producto o se traducen. La UI móvil fue ajustada por proporciones, pero no hay pruebas automatizadas visuales ni auditoría de accesibilidad; verificar tamaños de toque, foco, contraste, lectores de pantalla y presencia de la barra fija sobre contenido.

## Plan de trabajo sugerido (no aprobado automáticamente)

1. **Aclarar objetivo del registro:** bloqueo visual vs protección real. Es la decisión arquitectónica más importante.
2. **Auditar Supabase y privacidad:** RLS, flujos email/Google, redirecciones, datos técnicos y lenguaje del aviso. No editar el aviso legal a ciegas.
3. **Completar trazabilidad:** fuente y fecha para dirección, tarifas, horarios, fotos y estado de cada sede. Revalidar periódicamente.
4. **Eliminar contradicciones de copy:** empezar por Polanco/Del Valle y textos de “verificado”.
5. **Mejorar exactitud de Maps:** usar enlaces/Place IDs por sede; comprobar los 44 destinos, especialmente inmuebles compartidos y oficina operativa.
6. **Crear flujo editorial de reseñas propias:** notas de visita, edición, aprobación, fecha y política de correcciones. No publicar hasta tener contenido real.
7. **Decidir persistencia de “Been here” y futuro catálogo:** backend/Sheets/repo, sincronización, ownership y cambios de esquema.
8. **Automatizar checks de calidad:** JSON schema, slugs únicos, imágenes autorizadas existentes, enlaces, headings/canonical, build y pruebas de rutas con/sin sesión.

## Preguntas que un agente debe hacer si afectan su tarea

- ¿Este dato proviene de la misma sede que la ficha? ¿Cuál es el enlace/fuente y fecha?
- ¿Se cuenta con permiso para la foto y para el uso concreto en Yamaa?
- ¿La persona usuaria pidió publicar o solo proponer/diagnosticar?
- ¿Hay alguna parte expresamente excluida del cambio, como nombre, fotos o barra fija?
- ¿La nueva información debe ser pública para SEO o privada para miembros? No asumir que ambas cosas son compatibles sin arquitectura adicional.
- ¿El “precio” es primera visita, clase suelta o paquete? ¿Hay condiciones?
- ¿El resultado se probó en producción y en móvil, o solo compiló localmente?
