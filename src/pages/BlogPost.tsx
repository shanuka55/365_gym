import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SocialShareButtons from "@/components/SocialShareButtons";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Image */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
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
                  <span>{post.date}</span>
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
              <article className="prose prose-lg max-w-none">
                <div className="space-y-6 text-foreground/90 leading-relaxed text-lg">
                  {post.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </article>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-xl font-bold mb-4">Share this article</h3>
                <SocialShareButtons title={post.title} url={window.location.href} />
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
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {previousPost.title}
                        </h4>
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
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {nextPost.title}
                        </h4>
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
