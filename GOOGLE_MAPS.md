# Google Maps in Yamaa

Studio pages include a location card, Google Maps search and directions links. These links work without an API key and do not request browser geolocation; Google Maps handles the starting location when opened.

To display an interactive map inside the studio page, configure `PUBLIC_GOOGLE_MAPS_EMBED_KEY` in the hosting environment and rebuild. Enable Maps Embed API in the Google Cloud project. Restrict the browser key to Maps Embed API and authorized website referrers (`https://www.clasedeyoga.com.mx/*` and the actual preview domains used for testing). The public browser key is embedded in the page by design; do not use an unrestricted server key.

Maps Embed usage is free according to Google's documentation. Google may require billing setup for the Cloud project. Do not enable other billable APIs for this integration.

Locations use the existing name and address from the studio directory, rather than invented coordinates. Confirm the displayed result for each studio once the key is enabled; a verified Google Place ID can be added later to disambiguate matching names.

References:
- https://developers.google.com/maps/documentation/embed/embedding-map
- https://developers.google.com/maps/documentation/embed/usage-and-billing
- https://developers.google.com/maps/documentation/urls/get-started
