"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/use-i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, User, LayoutDashboard } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const { t } = useI18n();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">AI HUB</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/tools" className="text-sm font-medium hover:text-primary transition-colors">
              {t.categories}
            </Link>
            <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors">
              {t.compare}
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t.searchPlaceholder}
              className="pl-10 h-10 w-full bg-secondary/50 border-none rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/submit">
            <Button variant="ghost" size="icon" title={t.submitTool}>
              <PlusCircle className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <LayoutDashboard className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="default" className="hidden sm:flex rounded-full px-6">
              <User className="mr-2 h-4 w-4" />
              {t.login}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}