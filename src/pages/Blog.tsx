import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[400px] bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,204,0,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,204,0,0.05),transparent_50%)]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 uppercase">
              Fitness Blog
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Expert insights on fitness, nutrition, and wellness from 365 Fitness Dubai
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-secondary/30 rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
                >
                  {/* Image */}
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-background px-4 py-2 rounded-full text-sm font-bold uppercase">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold group/link"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center max-w-3xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-12 border border-primary/20">
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
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
