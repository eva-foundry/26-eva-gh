import React from 'react';

export interface LayoutSection {
  id: string;
  type: string;
  props?: Record<string, any>;
}

export interface Layout {
  pageId: string;
  version?: string;
  sections: LayoutSection[];
}

interface LayoutRendererProps {
  layout: Layout;
  components: Record<string, React.ComponentType<any>>;
}

/**
 * Generic layout renderer.
 * Feed it a `layout` (JSON) and a `components` registry.
 * For each section, it looks up the component by `type` and renders it with `props`.
 */
export const LayoutRenderer: React.FC<LayoutRendererProps> = ({ layout, components }) => {
  return (
    <div aria-label={layout.pageId}>
      {layout.sections.map((section) => {
        const Comp = components[section.type];
        if (!Comp) {
          console.warn(`[LayoutRenderer] Unknown section type: ${section.type}`);
          return null;
        }
        return <Comp key={section.id} {...(section.props || {})} />;
      })}
    </div>
  );
};
