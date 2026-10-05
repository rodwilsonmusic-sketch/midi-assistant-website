// midiassistant.com is the permanent home of the product site (decided 2026-10-05).
// The old subdomain's DNS lives at GoDaddy, beside the Exchange mail records, so a
// Cloudflare redirect rule cannot reach it: the redirect has to happen here.
// Path and query string are kept, so affiliate links (?aff=) survive the hop.
const CANONICAL_HOST = "midiassistant.com";
const REDIRECT_HOSTS = new Set([
  "midiassistant.rodwilsonmusic.com",
  "www.midiassistant.com",
]);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
