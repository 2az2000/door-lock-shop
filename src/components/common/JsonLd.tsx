interface JsonLdProps {
  data: object;
}

// Escapes "<" so a stray "</script>" inside any field (title, description, ...)
// can't prematurely close the tag and inject markup into the page.
function serialize(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />
  );
}
