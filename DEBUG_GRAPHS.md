# Graph Debugging Guide

## Issue: Training and Function Graphs Not Showing

### Possible Causes:

1. **Recharts SSR Issue** - Recharts may have hydration issues in static exports
2. **Data Not Loading** - Training data or function graph points not populated
3. **CSS/Layout Issue** - Charts rendered but not visible

### Quick Fixes to Test:

#### Fix 1: Ensure Recharts Renders Client-Side Only

The components are already marked as `'use client'`, but we can add a check to ensure they only render after hydration:

```typescript
// In training-section.tsx and function-selector.tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) return null; // or a loading skeleton
```

#### Fix 2: Check Console for Errors

Open browser console (F12) and look for:
- `Cannot read property of undefined`
- `Recharts` errors
- Any red errors

#### Fix 3: Verify Data Structure

Add console.log to check if data is being generated:
```typescript
console.log('Graph data:', hiddenActInfo.graphPoints);
console.log('Training data:', trainingData);
```

### Testing Locally:

```bash
# Build and test locally
npm run build
npx serve out

# Then open http://localhost:3000/SEPT-LLC/builder
```

### Known Issues:

- Recharts 3.x has some SSR issues with Next.js 14+
- May need to downgrade to Recharts 2.x
- Or use dynamic import with ssr: false

