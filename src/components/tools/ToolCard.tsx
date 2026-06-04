"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ToolCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  imageUrl: string;
}

export function ToolCard({ id, name, category, rating, description, imageUrl }: ToolCardProps) {
  return (
    <Card className="overflow-hidden card-hover border-none bg-secondary/30 group">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint="AI Tool screenshot"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="backdrop-blur-md bg-background/50 text-xs uppercase tracking-wider">
            {category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Link href={`/tools/${id}`} className="w-full">
          <Button variant="outline" className="w-full justify-between group/btn">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}