import type {Metadata} from 'next';
import './globals.css';
import { I18nProvider } from '@/hooks/use-i18n';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'AI Hub | Global AI Tools Platform',
  description: 'Discover, compare, and review the best AI tools worldwide for writing, coding, image generation, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <I18nProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
          <footer className="border-t py-12 bg-secondary/10">
            <div className="container mx-auto px-4 text-center">
              <span className="text-2xl font-bold gradient-text block mb-4">AI HUB</span>
              <p className="text-sm text-muted-foreground">© 2026 AI Hub. Your global gateway to intelligence.</p>
            </div>
          </footer>
        </I18nProvider>
      </body>
    </html>
  );
}