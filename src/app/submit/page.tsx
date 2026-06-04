"use client";

import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CloudUpload } from "lucide-react";

export default function SubmitToolPage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <Card className="bg-secondary/20 border-secondary">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Submit Your AI Tool</CardTitle>
          <CardDescription className="text-lg">
            Share your innovation with our global audience. Submissions are reviewed within 48 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Tool Name</Label>
              <Input id="name" placeholder="e.g. AI Masterpiece" className="bg-background/50 border-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category" className="bg-background/50 border-secondary">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="image">Image Generation</SelectItem>
                  <SelectItem value="video">Video Creation</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input id="website" type="url" placeholder="https://yourtool.com" className="bg-background/50 border-secondary" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea id="description" placeholder="A brief overview of what your tool does..." className="bg-background/50 border-secondary min-h-[120px]" />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="border-2 border-dashed border-secondary rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/30">
              <CloudUpload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Drag and drop your tool cover image, or click to browse</p>
              <p className="text-xs text-muted-foreground mt-2">Recommended size: 1200x630px (Max 2MB)</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full h-14 rounded-xl text-lg font-bold">
            Submit for Review
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to our terms of service and creator guidelines.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}