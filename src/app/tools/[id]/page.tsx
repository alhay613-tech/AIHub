"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, MessageSquare, Share2, Bookmark, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { summarizeToolReviews } from "@/ai/flows/summarize-tool-reviews";

export default function ToolDetailPage() {
  const { id } = useParams();
  const { t } = useI18n();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Mock data for display
  const tool = {
    name: id === 'gpt-4' ? 'ChatGPT' : 'Midjourney',
    category: 'Innovation',
    rating: 4.9,
    reviews: [
      "Life changing tool for my daily productivity.",
      "The best AI I have used so far, very intuitive.",
      "A bit expensive but totally worth the subscription.",
      "Impressive speed and accuracy in responses."
    ],
    description: "This advanced AI tool leverages cutting-edge neural networks to provide unparalleled performance in its category. Whether you're a professional looking to optimize your workflow or a hobbyist exploring the possibilities of generative tech, this is the definitive choice.",
    website: "https://example.com"
  };

  useEffect(() => {
    async function getSummary() {
      setLoadingSummary(true);
      try {
        const result = await summarizeToolReviews({ reviews: tool.reviews });
        setAiSummary(result);
      } catch (e) {
        console.error("Failed to summarize", e);
      } finally {
        setLoadingSummary(false);
      }
    }
    getSummary();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Image and Actions */}
        <div className="lg:col-span-1 space-y-8">
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-secondary shadow-2xl">
            <Image 
              src={`https://picsum.photos/seed/${id}/600/600`} 
              alt={tool.name} 
              fill 
              className="object-cover" 
            />
          </div>
          
          <div className="flex gap-4">
            <Button className="flex-1 h-14 rounded-xl text-lg font-bold" size="lg">
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit Website
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-secondary">
              <Bookmark className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-secondary">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>

          <Card className="bg-secondary/20 border-secondary">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Tool Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Pricing</span>
                  <span className="font-medium">Freemium</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Users</span>
                  <span className="font-medium">10M+</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Released</span>
                  <span className="font-medium">2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Info, Tabs, AI Summary */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/20 text-primary border-primary/20 py-1 px-4">{tool.category}</Badge>
              <div className="flex items-center text-yellow-500 font-bold">
                <Star className="h-5 w-5 fill-current mr-1" />
                {tool.rating}
              </div>
            </div>
            <h1 className="text-5xl font-bold">{tool.name}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {tool.description}
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-secondary/40 p-1 rounded-xl w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview" className="rounded-lg px-8">Overview</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg px-8">Reviews ({tool.reviews.length})</TabsTrigger>
              <TabsTrigger value="faq" className="rounded-lg px-8">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-6 space-y-8">
              {/* AI Summary Section */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-4 text-accent font-bold uppercase tracking-widest text-xs">
                  <Sparkles className="h-4 w-4" />
                  AI Community Summary
                </div>
                <p className="text-lg leading-relaxed italic text-foreground/90">
                  {loadingSummary ? "Analyzing community reviews..." : (aiSummary || "No summary available yet.")}
                </p>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold mb-4">Features & Capabilities</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  {['High precision', 'Global API support', 'Enterprise security', 'Multi-language support'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 bg-secondary/20 p-4 rounded-xl border border-secondary">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6 space-y-6">
              {tool.reviews.map((rev, i) => (
                <Card key={i} className="bg-secondary/10 border-secondary/30">
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">U</div>
                        <div>
                          <p className="font-bold">Verified User</p>
                          <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-500">
                        {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">&quot;{rev}&quot;</p>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full h-14 rounded-xl border-dashed border-2 hover:bg-secondary/20">
                <MessageSquare className="mr-2 h-5 w-5" />
                Write a Review
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
