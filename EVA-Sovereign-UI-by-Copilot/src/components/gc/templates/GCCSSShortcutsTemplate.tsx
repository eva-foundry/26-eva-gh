import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GCHeading, GCText, GCBadge } from '@/components/gc';
import { Code } from '@phosphor-icons/react';

export function GCCSSShortcutsTemplate() {
  return (
    <div className="space-y-8">
      <div>
        <GCHeading level={1}>CSS Shortcuts Overview</GCHeading>
        <GCText variant="lead" className="mt-4">
          Government of Canada Design System utility classes for rapid development
        </GCText>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Defaults</CardTitle>
          <CardDescription>Base styling utilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-font-sans</div>
                <GCText>Default sans-serif font family (Noto Sans)</GCText>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-font-serif</div>
                <GCText>Serif font family for headings (Lato)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-font-mono</div>
                <GCText>Monospace font for code</GCText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conditional Styling</CardTitle>
          <CardDescription>State-based utility classes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-hover:*</div>
                <GCText>Apply styles on hover state</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-focus:*</div>
                <GCText>Apply styles on focus state</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-active:*</div>
                <GCText>Apply styles on active state</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-disabled:*</div>
                <GCText>Apply styles when disabled</GCText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
          <CardDescription>Positioning and display utilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-container</div>
                <GCText>Max-width container with responsive padding</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-block, .gc-inline, .gc-inline-block</div>
                <GCText>Display property utilities</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-hidden, .gc-visible</div>
                <GCText>Visibility utilities</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-relative, .gc-absolute, .gc-fixed, .gc-sticky</div>
                <GCText>Positioning utilities</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-overflow-hidden, .gc-overflow-auto, .gc-overflow-scroll</div>
                <GCText>Overflow behavior</GCText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Text styling and formatting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-text-xs, .gc-text-sm, .gc-text-base, .gc-text-lg, .gc-text-xl, .gc-text-2xl</div>
                <GCText>Font size scale</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-font-normal, .gc-font-medium, .gc-font-semibold, .gc-font-bold</div>
                <GCText>Font weight variations</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-text-left, .gc-text-center, .gc-text-right, .gc-text-justify</div>
                <GCText>Text alignment</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-uppercase, .gc-lowercase, .gc-capitalize</div>
                <GCText>Text transformation</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-leading-tight, .gc-leading-normal, .gc-leading-relaxed</div>
                <GCText>Line height control</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-tracking-tight, .gc-tracking-normal, .gc-tracking-wide</div>
                <GCText>Letter spacing</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-truncate, .gc-text-ellipsis, .gc-text-clip</div>
                <GCText>Text overflow handling</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-max-line-length</div>
                <GCText>65 character max line length for optimal readability</GCText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spacing</CardTitle>
          <CardDescription>Padding and margin utilities based on 8px grid</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-p-0, .gc-p-1, .gc-p-2, .gc-p-3, .gc-p-4, .gc-p-5, .gc-p-6, .gc-p-8</div>
                <GCText>Padding on all sides (0, 8px, 16px, 24px, 32px, 40px, 48px, 64px)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-px-*, .gc-py-*</div>
                <GCText>Horizontal (x-axis) and vertical (y-axis) padding</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-pt-*, .gc-pr-*, .gc-pb-*, .gc-pl-*</div>
                <GCText>Individual side padding (top, right, bottom, left)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-m-0, .gc-m-1, .gc-m-2, .gc-m-3, .gc-m-4, .gc-m-5, .gc-m-6, .gc-m-8</div>
                <GCText>Margin on all sides (0, 8px, 16px, 24px, 32px, 40px, 48px, 64px)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-mx-*, .gc-my-*</div>
                <GCText>Horizontal and vertical margins</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-mt-*, .gc-mr-*, .gc-mb-*, .gc-ml-*</div>
                <GCText>Individual side margins (top, right, bottom, left)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-space-x-*, .gc-space-y-*</div>
                <GCText>Gap between child elements</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-gap-*, .gc-gap-x-*, .gc-gap-y-*</div>
                <GCText>Grid and flexbox gap utilities</GCText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flexbox and Grid</CardTitle>
          <CardDescription>Layout system utilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-flex</div>
                <GCText>Enable flexbox layout</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-flex-row, .gc-flex-col, .gc-flex-row-reverse, .gc-flex-col-reverse</div>
                <GCText>Flex direction</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-flex-wrap, .gc-flex-nowrap</div>
                <GCText>Flex wrapping behavior</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-justify-start, .gc-justify-center, .gc-justify-end, .gc-justify-between, .gc-justify-around</div>
                <GCText>Horizontal alignment (main axis)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-items-start, .gc-items-center, .gc-items-end, .gc-items-stretch</div>
                <GCText>Vertical alignment (cross axis)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-flex-1, .gc-flex-auto, .gc-flex-none</div>
                <GCText>Flex grow/shrink behavior</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-grid</div>
                <GCText>Enable CSS grid layout</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-grid-cols-1, .gc-grid-cols-2, .gc-grid-cols-3, .gc-grid-cols-4, .gc-grid-cols-12</div>
                <GCText>Grid column definitions</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-col-span-1 through .gc-col-span-12</div>
                <GCText>Grid column spanning</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-grid-rows-* , .gc-row-span-*</div>
                <GCText>Grid row definitions and spanning</GCText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Background and Border</CardTitle>
          <CardDescription>Styling utilities for backgrounds and borders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-bg-transparent, .gc-bg-white, .gc-bg-gray-*</div>
                <GCText>Background color utilities</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-border, .gc-border-t, .gc-border-r, .gc-border-b, .gc-border-l</div>
                <GCText>Border presence utilities</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-border-0, .gc-border-2, .gc-border-4</div>
                <GCText>Border width</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-border-solid, .gc-border-dashed, .gc-border-dotted</div>
                <GCText>Border style</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-border-gray-*, .gc-border-primary, .gc-border-danger</div>
                <GCText>Border color utilities</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-rounded-none, .gc-rounded-sm, .gc-rounded, .gc-rounded-md, .gc-rounded-lg, .gc-rounded-full</div>
                <GCText>Border radius utilities</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-shadow-sm, .gc-shadow, .gc-shadow-md, .gc-shadow-lg</div>
                <GCText>Box shadow utilities</GCText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Icon and Image</CardTitle>
          <CardDescription>Media element utilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-icon-sm, .gc-icon-md, .gc-icon-lg</div>
                <GCText>Icon size utilities (16px, 24px, 32px)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-img-responsive</div>
                <GCText>Responsive image (max-width: 100%, height: auto)</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-object-cover, .gc-object-contain, .gc-object-fill</div>
                <GCText>Image object-fit utilities</GCText>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
              <Code size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-aspect-square, .gc-aspect-video, .gc-aspect-4/3</div>
                <GCText>Aspect ratio utilities</GCText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>User interaction utilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <GCHeading level={3} className="mb-4">Cursor</GCHeading>
            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-cursor-auto</div>
                  <GCText>Default cursor behavior</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-cursor-pointer</div>
                  <GCText>Pointer cursor for clickable elements</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-cursor-not-allowed</div>
                  <GCText>Disabled/not-allowed cursor</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-cursor-wait</div>
                  <GCText>Loading/wait cursor</GCText>
                </div>
              </div>
            </div>
          </div>

          <div>
            <GCHeading level={3} className="mb-4">Pointer Events</GCHeading>
            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-pointer-events-none</div>
                  <GCText>Disable pointer events</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-pointer-events-auto</div>
                  <GCText>Enable pointer events</GCText>
                </div>
              </div>
            </div>
          </div>

          <div>
            <GCHeading level={3} className="mb-4">Transition</GCHeading>
            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-transition</div>
                  <GCText>Default transition for common properties</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-transition-colors</div>
                  <GCText>Color transition only</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-transition-opacity</div>
                  <GCText>Opacity transition only</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-transition-transform</div>
                  <GCText>Transform transition only</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-duration-150, .gc-duration-200, .gc-duration-300, .gc-duration-500</div>
                  <GCText>Transition duration control</GCText>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded">
                <Code size={24} className="text-primary shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">.gc-ease-linear, .gc-ease-in, .gc-ease-out, .gc-ease-in-out</div>
                  <GCText>Transition timing functions</GCText>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>Common patterns using CSS shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <GCHeading level={3}>Card Layout</GCHeading>
            <div className="mt-3 p-4 bg-muted/30 rounded font-mono text-sm">
              &lt;div className="gc-p-4 gc-bg-white gc-border gc-border-gray-300 gc-rounded-lg gc-shadow-sm"&gt;<br />
              &nbsp;&nbsp;&lt;h2 className="gc-text-2xl gc-font-bold gc-mb-2"&gt;Title&lt;/h2&gt;<br />
              &nbsp;&nbsp;&lt;p className="gc-text-base gc-max-line-length"&gt;Content&lt;/p&gt;<br />
              &lt;/div&gt;
            </div>
          </div>

          <div>
            <GCHeading level={3}>Responsive Grid</GCHeading>
            <div className="mt-3 p-4 bg-muted/30 rounded font-mono text-sm">
              &lt;div className="gc-grid gc-grid-cols-1 md:gc-grid-cols-2 lg:gc-grid-cols-3 gc-gap-4"&gt;<br />
              &nbsp;&nbsp;&lt;div&gt;Item 1&lt;/div&gt;<br />
              &nbsp;&nbsp;&lt;div&gt;Item 2&lt;/div&gt;<br />
              &nbsp;&nbsp;&lt;div&gt;Item 3&lt;/div&gt;<br />
              &lt;/div&gt;
            </div>
          </div>

          <div>
            <GCHeading level={3}>Interactive Button</GCHeading>
            <div className="mt-3 p-4 bg-muted/30 rounded font-mono text-sm">
              &lt;button className="gc-px-4 gc-py-2 gc-bg-primary gc-text-white gc-rounded gc-font-semibold gc-transition gc-duration-200 gc-hover:gc-bg-primary-dark gc-focus:gc-outline-ring"&gt;<br />
              &nbsp;&nbsp;Click Me<br />
              &lt;/button&gt;
            </div>
          </div>

          <div>
            <GCHeading level={3}>Centered Content</GCHeading>
            <div className="mt-3 p-4 bg-muted/30 rounded font-mono text-sm">
              &lt;div className="gc-flex gc-items-center gc-justify-center gc-min-h-screen"&gt;<br />
              &nbsp;&nbsp;&lt;div className="gc-text-center"&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1 className="gc-text-4xl gc-font-bold gc-mb-4"&gt;Welcome&lt;/h1&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;p className="gc-text-lg gc-max-line-length"&gt;Description&lt;/p&gt;<br />
              &nbsp;&nbsp;&lt;/div&gt;<br />
              &lt;/div&gt;
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded">
        <GCHeading level={3} className="mb-2">Design System Note</GCHeading>
        <GCText>
          These CSS shortcuts follow the Government of Canada Design System standards including the 8px spacing grid, 
          official color palette, and accessibility requirements. All utilities are designed to work seamlessly with GC components 
          and templates.
        </GCText>
      </div>
    </div>
  );
}
