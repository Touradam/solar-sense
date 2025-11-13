# Testing Graphs Locally

## 1. Start Dev Server

The 404 issue is now fixed! Run:

```bash
npm run dev
```

Then open: **http://localhost:3000/** (no `/SEPT-LLC` needed!)

## 2. Test the Neural Network Builder

Go to: **http://localhost:3000/builder**

### Test Training Graph:
1. Click "Generate Sample Data"
2. Click "Start Training"
3. Watch for the graph to appear and update in real-time

### Test Function Graphs:
1. Scroll down to "Functions & Hyperparameters"
2. Click "Activation Functions" to expand
3. Try changing from ReLU → Sigmoid → Tanh
4. Look for the graph showing the function curve

### Test Loss Function Graphs:
1. Click "Loss Function" to expand
2. Try changing from Categorical Cross-Entropy → Mean Squared Error
3. Look for the graph showing the loss curve

## 3. Open Browser Console

Press `F12` or `Cmd+Option+I` (Mac) to open DevTools

### Check for errors:
- Any red error messages?
- Any warnings about Recharts?
- Any "Failed to load" messages?

### Check Network tab:
- Are the dynamic chunks loading? Look for:
  - `training-graph-[hash].js`
  - `function-graph-[hash].js`
- Do they show 200 OK or 404?

## 4. If Graphs Still Don't Show

**Screenshot and share:**
1. The console errors (if any)
2. The Network tab showing chunk files
3. What you see on screen (blank space? loading message?)

## 5. Alternative: Build and Test Locally

```bash
# Build for production
npm run build

# Serve the built files
npx serve out

# Open http://localhost:3000/SEPT-LLC/builder
```

This tests the EXACT same build that goes to GitHub Pages!

