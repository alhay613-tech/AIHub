"use client";

import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { PenTool, Image as ImageIcon, Code, Video, GraduationCap, Megaphone, Zap, Laptop } from "lucide-react";

export function CategorySection() {
  const { t } = useI18n();
  
  const categories = [
    { name: t.writing, icon: <PenTool className="h-5 w-5" /> },
    { name: t.imageGen, icon: <ImageIcon className="h-5 w-5" /> },
    { name: t.coding, icon: <Code className="h-5 w-5" /> },
    { name: t.video, icon: <Video className="h-5 w-5" /> },
    { name: t.education, icon: <GraduationCap className="h-5 w-5" /> },
    { name: t.marketing, icon: <Megaphone className="h-5 w-5" /> },
    { name: t.productivity, icon: <Laptop className="h-5 w-5" /> },
    { name: t.automation, icon: <Zap className="h-5 w-5" /> },
  ];

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-8">{t.categories}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((cat, i) => (
          <Button
            key={i}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-3 border-secondary bg-secondary/20 hover:bg-primary/20 hover:border-primary transition-all rounded-xl"
          >
            {cat.icon}
            <span className="text-xs font-semibold">{cat.name}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}