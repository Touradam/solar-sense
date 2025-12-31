# Neural Network Builder - Separation Guide

This document outlines how to separate the Neural Network Builder from the Solar Sense website into its own independent project.

## Files to Move to Neural Network Builder Project

### App Routes
- `/app/builder/page.tsx` - Main Neural Network Builder application

### Components (Neural Network Builder specific)
- `/components/config-controls.tsx`
- `/components/data-input-section.tsx`
- `/components/data-split-section.tsx`
- `/components/function-graph.tsx`
- `/components/function-selector.tsx`
- `/components/network-config-selector.tsx`
- `/components/network-diagram.tsx`
- `/components/preset-manager.tsx`
- `/components/testing-section.tsx`
- `/components/training-graph.tsx`
- `/components/training-section.tsx`

### Libraries (Neural Network Builder specific)
- `/lib/ml-utils.ts` - TensorFlow.js ML functions
- `/lib/presets.ts` - Built-in configurations
- `/lib/storage-utils.ts` - localStorage management
- `/lib/types.ts` - TypeScript type definitions

### Shared UI Components (Copy to both projects)
- `/components/ui/` - All shadcn/ui components (badge, button, card, etc.)

### Public Assets (Neural Network Builder specific)
- `/public/neural-network-diagram.png`

### Dependencies (Neural Network Builder specific)
The following packages are only needed for the Neural Network Builder:
```json
{
  "@tensorflow/tfjs": "^4.22.0",
  "@types/papaparse": "^5.5.0",
  "papaparse": "^5.5.3",
  "react-dropzone": "^14.3.8",
  "recharts": "^3.4.1"
}
```

## Files to Keep in Solar Sense Website

### App Routes
- `/app/page.tsx` - Landing page
- `/app/layout.tsx` - Root layout
- `/app/globals.css` - Global styles
- `/app/journey/page.tsx` - Company journey
- `/app/plugandplay/page.tsx` - Plug & Play info

### Components (Solar Sense specific)
- `/components/journey/` - All journey components
- `/components/plugandplay/` - All plug and play components
- `/components/ui/` - Shared UI components

### Libraries (Solar Sense specific)
- `/lib/utils.ts` - Utility functions (cn, withBasePath)

### Public Assets (Solar Sense specific)
All images in `/public/` except `neural-network-diagram.png`

### Dependencies (Solar Sense specific)
Core dependencies needed:
```json
{
  "next": "16.0.1",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "lucide-react": "^0.553.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0",
  "@radix-ui/react-*": "..." // All radix UI primitives
}
```

## Steps to Create Neural Network Builder as Separate Project

1. **Create new Next.js project**:
   ```bash
   npx create-next-app@latest neural-network-builder
   cd neural-network-builder
   ```

2. **Copy Neural Network Builder files**:
   - Copy all files listed in "Files to Move" section
   - Copy `/components/ui/` directory
   - Copy `components.json` for shadcn/ui configuration
   - Copy `/lib/utils.ts` (needed for shadcn/ui)

3. **Update package.json**:
   - Add TensorFlow.js and other ML-specific dependencies
   - Keep shadcn/ui dependencies

4. **Update imports**:
   - Change `/app/builder/page.tsx` to `/app/page.tsx`
   - Update any import paths as needed

5. **Update README**:
   - Use the current README.md as a base (it's focused on Neural Network Builder)
   - Update repository name and description

6. **Remove basePath logic** (if not deploying to GitHub Pages):
   - Remove `withBasePath` usage if deploying to root domain

## Steps to Clean Up Solar Sense Website

1. **Delete Neural Network Builder files**:
   ```bash
   rm -rf app/builder
   rm components/config-controls.tsx
   rm components/data-input-section.tsx
   rm components/data-split-section.tsx
   rm components/function-graph.tsx
   rm components/function-selector.tsx
   rm components/network-config-selector.tsx
   rm components/network-diagram.tsx
   rm components/preset-manager.tsx
   rm components/testing-section.tsx
   rm components/training-graph.tsx
   rm components/training-section.tsx
   rm lib/ml-utils.ts
   rm lib/presets.ts
   rm lib/storage-utils.ts
   rm lib/types.ts
   rm public/neural-network-diagram.png
   ```

2. **Update package.json**:
   - Remove unused dependencies (TensorFlow.js, PapaParse, react-dropzone, recharts)
   - Run `npm install` to update lock file

3. **Verify all links removed**:
   - ✅ Removed builder links from main navigation
   - ✅ Removed builder links from mobile menu
   - ✅ Removed builder CTA from "How It Works" section
   - ✅ Removed builder card from contact section
   - ✅ Updated README to focus on Solar Sense

## Post-Separation

After separation, you'll have:

### Project 1: Solar Sense Website
- Focus: Marketing website for Solar Sense product
- URL: sept.energy (or custom domain)
- Features: Product info, company story, team, contact

### Project 2: Neural Network Builder
- Focus: Educational ML tool for building/training neural networks
- URL: builder.sept.energy (or separate domain)
- Features: Visual neural network builder, training, testing

## Benefits of Separation

1. **Clear separation of concerns** - Each project has a single purpose
2. **Independent deployment** - Deploy and update each project separately
3. **Smaller bundle sizes** - Solar Sense site doesn't need TensorFlow.js
4. **Better SEO** - Each site can be optimized for its specific audience
5. **Easier maintenance** - Simpler codebases to understand and modify
6. **Different audiences** - Marketing site vs technical/educational tool

---

**Status**: Solar Sense website has been cleaned (links removed). 
Ready to delete Neural Network Builder files when confirmed.

