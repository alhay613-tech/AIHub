"use client";

import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang('ar')}>العربية (Arabic)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang('fr')}>Français (French)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}