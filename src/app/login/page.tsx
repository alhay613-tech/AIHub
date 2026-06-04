"use client";

import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const { t } = useI18n();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container mx-auto px-4 py-32 flex justify-center items-center">
      <Card className="w-full max-w-md bg-secondary/20 border-secondary">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">{isLogin ? t.login : t.register}</CardTitle>
          <CardDescription>
            {isLogin ? "Welcome back to the global AI community" : "Join the largest AI tool platform today"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full h-12 border-secondary bg-background/50 flex items-center justify-center gap-3">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </Button>
          
          <div className="flex items-center gap-4 py-2">
            <Separator className="flex-1 bg-secondary" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">or email</span>
            <Separator className="flex-1 bg-secondary" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" className="pl-10 bg-background/50 border-secondary" placeholder="name@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" className="pl-10 bg-background/50 border-secondary" placeholder="••••••••" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-6">
          <Button className="w-full h-12 text-lg font-bold">
            <LogIn className="mr-2 h-5 w-5" />
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-2 text-primary font-bold hover:underline"
            >
              {isLogin ? "Register Now" : "Sign In Here"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}