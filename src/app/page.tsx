"use client";

import { useI18n } from "@/hooks/use-i18n";
import { CategorySection } from "@/components/home/CategorySection";
import { ToolCard } from "@/components/tools/ToolCard";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Award } from "lucide-react";

const SAMPLE_TOOLS = [
  {
    id: "gpt-4",
    name: "ChatGPT",
    category: "Writing",
    rating: 4.9,
    description: "Versatile AI conversational model for text generation, coding, and creative work.",
    imageUrl: "https://picsum.photos/seed/tool-gpt/400/300"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "Image Generation",
    rating: 4.8,
    description: "High-quality AI image generation tool known for its artistic and detailed results.",
    imageUrl: "https://picsum.photos/seed/tool-mj/400/300"
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Coding",
    rating: 4.9,
    description: "The AI-first code editor designed to pair program with you efficiently.",
    imageUrl: "https://picsum.photos/seed/tool-cursor/400/300"
  },
  {
    id: "canva-magic",
    name: "Canva Magic",
    category: "Design",
    rating: 4.7,
    description: "AI-powered design suite to create professional visuals in seconds.",
    imageUrl: "https://picsum.photos/seed/tool-canva/400/300"
  }
];

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 md:py-32 flex flex-col items-center text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 text-xs font-semibold tracking-widest uppercase text-accent animate-pulse">
          <Sparkles className="h-4 w-4" />
          The Future of Intelligence is Here
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tight max-w-4xl">
          {t.tagline} <span className="gradient-text">Across the Globe</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Access a curated list of over 5,000 AI tools. Compare performance, read reviews, and find your next game-changer.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-lg shadow-primary/20">
            Explore All Tools
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg border-secondary bg-transparent hover:bg-secondary/30">
            Get Recommendations
          </Button>
        </div>
      </section>

      {/* Categories */}
      <CategorySection />

      {/* Featured Tools */}
      <section className="py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-xs">
              <Award className="h-4 w-4" />
              Editor's Choice
            </div>
            <h2 className="text-3xl font-bold">{t.featured}</h2>
          </div>
          <Button variant="link" className="text-accent hover:text-accent/80 font-bold p-0">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SAMPLE_TOOLS.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 border-t border-secondary/20">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold">{t.trending}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...SAMPLE_TOOLS].reverse().map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 mb-20">
        <div className="bg-gradient-to-br from-secondary/40 to-primary/10 border border-secondary p-12 rounded-[2rem] text-center max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Built an amazing AI Tool?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Get listed on AI Hub and reach millions of users worldwide looking for the latest in technology.
          </p>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
            Submit Your Tool Now
          </Button>
        </div>
      </section>
    </div>
  );
}