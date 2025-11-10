# 🚀 Quick Start Guide

Get your first neural network trained in under 3 minutes!

## Step 1: Generate Data (30 seconds)

1. Look at the **left panel** - find "Data Input" section
2. At the bottom, you'll see synthetic data controls:
   - **Samples**: 300 (default is good)
   - **Classes**: 3 (default is good)
   - **Features**: 2 (default is good)
3. Click the big **"Generate Sample Data"** button
4. ✅ You'll see "Data Loaded Successfully" with sample preview

## Step 2: Configure Network (30 seconds)

1. The **"Standard (Recommended)"** preset is already selected
2. Check the **center panel** - you'll see all configurations
3. **No need to change anything!** The defaults are perfect for learning

### What's already configured:
- ✅ 2 hidden layers (64, 32 neurons)
- ✅ 100 epochs
- ✅ Adam optimizer
- ✅ Data normalization enabled
- ✅ Regularization enabled (Dropout, L2)
- ✅ Early stopping enabled

## Step 3: Train! (2 minutes)

1. Scroll to the **right panel** - find "Training" section
2. Click the big green **"Start Training"** button
3. Watch the magic! You'll see:
   - 📈 Live graph updating every epoch
   - 🔢 Metrics cards updating (loss, accuracy)
   - 🎯 Progress counter

### What to watch:
- **Training Loss** (red line) - should go down
- **Validation Loss** (orange dashed) - should go down too
- **Accuracy** (green/blue lines) - should go up
- Training takes about 30-60 seconds

## Step 4: Check Results (30 seconds)

After training completes, scroll down to see:

### Training Summary
- Final accuracies (train/val/test)
- Best epoch marker
- Training time

### Detailed Metrics
- Precision, Recall, F1-Score for each class
- **Confusion Matrix** (green diagonal = good!)
- Per-class performance

## Step 5: Make Predictions (1 minute)

1. Scroll to **"Testing & Prediction"** section (right panel)
2. Click **"Sample"** button to auto-fill test values
3. Click **"Run Prediction"**
4. See:
   - 🎯 Predicted class (big circle)
   - 📊 Confidence percentage
   - 📈 Probability bars for all classes

## Step 6: Download Model (30 seconds)

1. Scroll to "Export Trained Model" card
2. Click **"Download"** button
3. ✅ Model saved to your Downloads folder!

---

## 🎉 Congratulations!

You just:
- ✅ Generated training data
- ✅ Configured a neural network
- ✅ Trained a model with real-time visualization
- ✅ Evaluated performance with metrics
- ✅ Made predictions on new data
- ✅ Downloaded a trained model

**Total time: ~3 minutes**

---

## 🎓 Next Steps

### Try Different Configurations

**Make it Deeper:**
1. Go to "Network Configuration" → "Architecture" tab
2. Change "Hidden Layers" to 3
3. Train again and compare results!

**Try Different Activation:**
1. Scroll to "Activation Functions" section
2. Change "Hidden Layers Activation" to "Tanh"
3. Train and see the difference!

**Experiment with Data:**
1. Generate new data with different settings:
   - Try 500 samples
   - Try 5 classes
   - Try 10 features
2. See how it affects training!

### Upload Your Own Data

1. Prepare a CSV file with features and labels
2. Click the upload area
3. Drag & drop or browse to select
4. Configure format (headers, label column)
5. Train on your real data!

### Save Your Configuration

1. Find "Configuration Presets" section (left panel)
2. After configuring your network
3. Click "Save Current Configuration"
4. Give it a name
5. Load it anytime!

---

## 💡 Pro Tips

**Tip 1: Watch for Overfitting**
- If validation loss goes UP while training loss goes DOWN
- Model is memorizing, not learning
- Solution: Enable more regularization (dropout, L2)

**Tip 2: Use Early Stopping**
- Already enabled in Standard preset!
- Stops training when validation stops improving
- Saves time and prevents overfitting

**Tip 3: Start Simple**
- Use "Beginner" preset for small datasets
- Use "Standard" for most cases
- Use "Deep Learning" only for complex patterns

**Tip 4: Normalize Your Data**
- ALWAYS use normalization for real data
- Standardization works best in most cases
- Prevents NaN loss and unstable training

---

## ❓ Common Issues

### "Please load data first"
→ Generate or upload data before training

### NaN Loss
→ Enable normalization in "Data Preprocessing" tab

### Low Accuracy
→ Try:
- More epochs (200 instead of 100)
- More neurons (128, 64 instead of 64, 32)
- Different activation (try ReLU vs Tanh)

### Training is Slow
→ Normal! Neural networks take time
- ~1-2 minutes for 100 epochs is expected
- Use "Fast Training" preset for quick tests

---

## 🎮 Fun Experiments

**Experiment 1: Too Simple vs Too Complex**
- Train with 1 layer, 4 neurons (too simple)
- Train with 5 layers, 256 neurons each (too complex)
- Compare with Standard preset (just right)

**Experiment 2: No Regularization**
- Disable dropout
- Set regularization to "none"
- Disable early stopping
- Watch it overfit! (train acc high, val acc low)

**Experiment 3: Learning Rates**
- Try 0.0001 (slow but stable)
- Try 0.01 (fast but might be unstable)
- Try 0.1 (too fast, might diverge!)

---

**Happy Training! 🚀**

Questions? Check the main [README.md](./README.md) for detailed documentation.

