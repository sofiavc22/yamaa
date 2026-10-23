export function authDestination() {
 const next=new URLSearchParams(window.location.search).get('next');
 return next && /^\/estudios\/[a-z0-9-]+$/.test(next) ? next : '/cdmx';
}
