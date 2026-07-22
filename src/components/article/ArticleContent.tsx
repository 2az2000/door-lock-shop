interface ArticleContentProps {
  html: string;
}

export function ArticleContent({ html }: ArticleContentProps) {
  return (
    <div
      className="max-w-none space-y-4 text-base leading-8 text-foreground [&_a]:text-primary [&_a]:underline [&_blockquote]:border-r-2 [&_blockquote]:border-primary/40 [&_blockquote]:pr-4 [&_blockquote]:text-muted-foreground [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_li]:mt-1 [&_ol]:mr-5 [&_ol]:list-decimal [&_p]:text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mr-5 [&_ul]:list-disc"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
