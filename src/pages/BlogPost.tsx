import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import PageSeo from "@/components/PageSeo";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SocialShareButtons from "@/components/SocialShareButtons";
import { blogPosts, type BlogContentBlock, type BlogInline } from "@/data/blogPosts";

const renderInline = (content: BlogInline[]) => content.map((item, index) =>
  typeof item === "string" ? item : item.href.startsWith("/") && !item.href.startsWith("//") ? (
    <Link key={index} to={item.href} className="text-primary underline underline-offset-4">{item.text}</Link>
  ) : (
    <a key={index} href={item.href} className="text-primary underline underline-offset-4">{item.text}</a>
  ),
);

const ArticleBlock = ({ block }: { block: string | BlogContentBlock }) => {
  if (typeof block === "string") return <p>{block}</p>;

  switch (block.type) {
    case "paragraph":
      return <p>{renderInline(block.content)}</p>;
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3";
      return <Heading id={block.id} className={`scroll-mt-28 font-bold text-foreground ${block.level === 2 ? "text-3xl" : "text-2xl"}`}>{block.text}</Heading>;
    }
    case "list":
      return <ul className="list-disc space-y-2 pl-6">{block.items.map((item, index) => <li key={index}>{renderInline(item)}</li>)}</ul>;
    case "link":
      return <p>{renderInline([block])}</p>;
    case "faq":
      return (
        <section aria-labelledby={block.id}>
          <h3 id={block.id} className="mb-3 scroll-mt-28 text-2xl font-bold text-foreground">{block.question}</h3>
          <p>{renderInline(block.answer)}</p>
        </section>
      );
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const canonical = `https://www.365fitness.ae/blog/${post.slug}`;
  const isWomenStrengthArticle = post.slug === "why-women-should-include-strength-training-in-their-routine";
  const title = isWomenStrengthArticle
    ? "Strength Training for Women: Benefits & Beginner Tips | 365 Fitness"
    : `${post.title} | 365 Fitness`;
  const description = isWomenStrengthArticle
    ? "Learn the benefits of strength training for women, beginner exercises and weekly routine tips. Explore coaching at 365 Fitness in Deira and Muhaisnah."
    : post.excerpt;
  // Preserve the published calendar date without inventing a time or modification date.
  const publishedTime = post.datePublished;
  const relatedPosts = [...new Set(post.relatedSlugs ?? [])]
    .filter((relatedSlug) => relatedSlug !== post.slug)
    .map((relatedSlug) => blogPosts.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate) => candidate !== undefined)
    .slice(0, 3);
  const image = new URL(post.image, canonical).href;
  const sections = post.content.filter(
    (block): block is Extract<BlogContentBlock, { type: "heading" }> =>
      typeof block !== "string" && block.type === "heading" && block.level === 2,
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    headline: post.title,
    description,
    image,
    datePublished: publishedTime,
    articleSection: post.category,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "365 Fitness", url: "https://www.365fitness.ae" },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        type="article"
        publishedTime={publishedTime}
        section={post.category}
        schema={schema}
      />
      <Header />
      <main>
        {/* Hero Image */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            width="1600"
            height="900"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <span className="bg-primary text-background px-4 py-2 rounded-full text-sm font-bold uppercase inline-block mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <time dateTime={post.datePublished}>{post.date}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back to Blog */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold">Back to All Articles</span>
              </Link>

              {/* Article Body */}
              {sections.length > 0 && (
                <nav aria-label="Article contents" className="mb-8 rounded-xl border border-border bg-secondary/30 p-5 text-sm">
                  <details>
                    <summary className="cursor-pointer font-bold">In this article</summary>
                    <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a href={`#${section.id}`} className="text-primary hover:underline">{section.text}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </nav>
              )}
              <article className="prose prose-lg max-w-none">
                <div className="space-y-6 text-foreground/90 leading-relaxed text-lg">
                  {post.content.map((block, index) => (
                    <ArticleBlock key={index} block={block} />
                  ))}
                </div>
              </article>

              {relatedPosts.length > 0 && (
                <section aria-labelledby="related-articles" className="mt-12 border-t border-border pt-8">
                  <h2 id="related-articles" className="mb-4 text-2xl font-bold">Related articles</h2>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <li key={relatedPost.slug}>
                        <Link to={`/blog/${relatedPost.slug}`} className="block h-full rounded-xl border border-border bg-secondary/30 p-4 font-bold text-primary hover:underline">
                          {relatedPost.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="text-xl font-bold mb-4">Share this article</h2>
                <SocialShareButtons title={post.title} url={canonical} />
              </div>

              {/* Navigation to Previous/Next Posts */}
              <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                {previousPost && (
                  <Link
                    to={`/blog/${previousPost.slug}`}
                    className="group p-6 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-all border border-border hover:border-primary/50"
                  >
                    <div className="flex items-start gap-4">
                      <ArrowLeft className="h-6 w-6 text-primary mt-1 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Previous Article</p>
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {previousPost.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="group p-6 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-all border border-border hover:border-primary/50 md:text-right"
                  >
                    <div className="flex items-start gap-4 md:flex-row-reverse">
                      <ArrowRight className="h-6 w-6 text-primary mt-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Next Article</p>
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {nextPost.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* CTA Section */}
              <div className="mt-16 text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-12 border border-primary/20">
                <h2 className="text-4xl font-black text-foreground mb-4">
                  Ready to Transform Your Body?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join 365 Fitness Dubai and get expert guidance from certified coaches
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="bg-primary text-background hover:bg-primary/90 font-black text-lg uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-glow inline-flex items-center justify-center gap-2"
                  >
                    Get Free Trial <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/about"
                    className="bg-secondary text-foreground hover:bg-secondary/80 font-black text-lg uppercase px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
