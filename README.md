# 🧠 Neural Network Builder

[![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen.svg)](https://github.com)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-Powered-orange.svg)](https://www.tensorflow.org/js)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

**A powerful, visual, no-code neural network training platform for students, data scientists, and ML engineers.** Build, train, and deploy neural networks directly in your browser with production-ready machine learning features.

## ✨ Key Features

### 🎯 **Production-Ready for Real Data**
- ✅ **Data Normalization** (MinMax, Standardization, Robust scaling)
- ✅ **Train/Validation/Test Split** (proper 3-way split with stratification)
- ✅ **Regularization** (Dropout, L1/L2, Batch Normalization)
- ✅ **Early Stopping** with patience and minDelta
- ✅ **Class Imbalance Handling** (automatic class weighting)
- ✅ **Learning Rate Scheduling** and gradient clipping
- ✅ **Comprehensive Metrics** (Precision, Recall, F1-Score, Confusion Matrix)

### 🚀 **User-Friendly Interface**
- 📊 **Real-time Training Visualization** with Recharts
- 🎨 **4 Built-in Presets** (Beginner, Standard, Deep Learning, Fast Training)
- 🔧 **30+ Configurable Hyperparameters** across 4 organized tabs
- 📈 **Live Loss & Accuracy Graphs** (training + validation)
- 🎯 **Interactive Predictions** with confidence scores
- 💾 **Model Export** in TensorFlow.js format

### 🧪 **Data Handling**
- 📁 **CSV/Excel Upload** with drag & drop
- ✨ **Synthetic Data Generation** for testing
- 🔄 **Flexible Data Format** (headers, label column position)
- 📊 **Data Preview** with statistics
- 🎛️ **Adjustable Split Ratios** (60/20/20 default)

### 🎓 **Educational**
- 📚 **Formula Display** for activation & loss functions
- 📉 **Interactive Graphs** showing function behavior
- 💡 **Tooltips & Explanations** for all features
- ✅ **Pros/Cons** for each algorithm choice
- 🎯 **Use Case Recommendations**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd huit

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🎯 Your First Neural Network in 3 Steps

1. **Generate Sample Data**
   - Click "Generate Sample Data" button
   - Default: 300 samples, 3 classes, 2 features

2. **Select a Preset**
   - Choose "Standard (Recommended)" preset
   - Or customize your own configuration

3. **Start Training**
   - Click "Start Training" button
   - Watch live training graphs
   - Get comprehensive evaluation metrics

That's it! 🎉

## 📖 Detailed Usage

### Data Input

#### Upload CSV Data
```csv
feature1,feature2,feature3,label
1.2,3.4,5.6,0
2.3,4.5,6.7,1
...
```

- **Headers**: Toggle "First row contains headers"
- **Label Column**: Select position (First/Last)
- **Format**: Automatic validation and preview

#### Generate Synthetic Data
- **Samples**: 50-5000
- **Classes**: 2-10
- **Features**: 2-20
- Creates non-linear decision boundaries for testing

### Configuration

#### Architecture Tab
- **Hidden Layers**: 1-10 layers
- **Neurons per Layer**: 4-512 neurons
- **Epochs**: 10-500 epochs
- **Batch Size**: 4-256
- **Learning Rate**: 0.0001-1.0
- **Random Seed**: For reproducibility

#### Data Preprocessing Tab
- **Normalization**:
  - MinMax (0-1 scaling)
  - Standardization (Z-score normalization)
  - Robust (median/IQR scaling)
- **Class Imbalance**: Auto-weight classes
- **Feature Scaling**: Ensure similar scales

#### Regularization Tab
- **Dropout**: 0-0.5 rate (recommended: 0.2-0.3)
- **Weight Regularization**: L1, L2, or L1+L2
- **Batch Normalization**: Speeds up training
- **Weight Initialization**:
  - GlorotUniform (Xavier) - for Tanh/Sigmoid
  - HeNormal (Kaiming) - for ReLU
  - LeCunNormal - for SELU
- **Gradient Clipping**: Prevent exploding gradients

#### Training Control Tab
- **Early Stopping**:
  - Patience: 3-30 epochs
  - Min Delta: 0.0001-0.01
- **Learning Rate Decay**:
  - Decay Rate: 0.85-0.99
  - Decay Steps: Apply every N steps

### Function Selection

#### Activation Functions
- **ReLU**: Fast, no vanishing gradient (recommended for hidden layers)
- **Sigmoid**: Binary classification output
- **Tanh**: Zero-centered, good for hidden layers
- **Softmax**: Multi-class output (recommended)
- **Linear**: Regression tasks

#### Loss Functions
- **Categorical Cross-Entropy**: Multi-class classification (recommended)
- **MSE**: Regression, penalizes large errors
- **MAE**: Robust to outliers
- **Hinge**: Maximum-margin classification

#### Optimizers
- **Adam**: Best default choice (recommended)
- **SGD**: Simple, memory efficient
- **RMSprop**: Good for RNNs
- **Adadelta**: No learning rate needed
- **Adamax**: More stable for large gradients

### Training

#### Real-time Monitoring
- **Dual Y-Axis Graph**: Loss (left) and Accuracy (right)
- **4 Metrics Lines**:
  - Training Loss (solid red)
  - Validation Loss (dashed orange)
  - Training Accuracy (solid green)
  - Validation Accuracy (dashed blue)
- **Best Epoch Marker**: Purple vertical line
- **Early Stopping Indicator**: Badge when triggered

#### Training Summary
- Final training/validation/test metrics
- Best epoch tracking
- Training time in seconds
- Early stopping status

#### Detailed Metrics
- **Per-Class Performance**:
  - Precision: TP / (TP + FP)
  - Recall: TP / (TP + FN)
  - F1-Score: Harmonic mean of precision & recall
  - Support: Number of samples per class
- **Confusion Matrix**: Color-coded heatmap
  - Green diagonal: Correct predictions
  - Red off-diagonal: Errors

### Testing & Deployment

#### Make Predictions
1. Enter feature values
2. Click "Run Prediction"
3. View predicted class and confidence
4. See probability distribution for all classes

#### Download Model
- Export in TensorFlow.js format
- Includes:
  - Model architecture and weights
  - Normalization parameters
  - Configuration used for training
- Use in browser or Node.js applications

### Preset Management

#### Built-in Presets

**Beginner** 🌱
- 1 hidden layer (16 neurons)
- Standardization enabled
- 50 epochs, simple setup
- Perfect for learning

**Standard (⭐ Recommended)**
- 2 hidden layers (64, 32 neurons)
- Full regularization suite
- Early stopping, class weighting
- Production-ready configuration

**Deep Learning** 🚀
- 4 hidden layers (128, 64, 32, 16)
- Dropout 0.4, L1+L2 regularization
- Learning rate decay
- For complex patterns

**Fast Training** ⚡
- 1 hidden layer (32 neurons)
- 30 epochs, quick results
- Good for rapid prototyping

#### Custom Presets
- Save current configuration
- Add name and description
- Export/import as JSON
- Sync across sessions (localStorage)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router)
- **ML**: TensorFlow.js 4.x
- **UI**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Language**: TypeScript 5.x
- **Data Parsing**: PapaParse
- **File Upload**: react-dropzone

### Project Structure
```
huit/
├── app/
│   ├── page.tsx                 # Main application (integrated)
│   ├── test/page.tsx            # Component testing page
│   └── globals.css              # Global styles
├── components/
│   ├── data-input-section.tsx   # CSV upload & synthetic data
│   ├── data-split-section.tsx   # Train/val/test split controls
│   ├── config-controls.tsx      # 4-tab configuration panel
│   ├── preset-manager.tsx       # Preset loading/saving
│   ├── network-diagram.tsx      # Architecture visualization
│   ├── function-selector.tsx    # Activation/loss/optimizer
│   ├── training-section.tsx     # Training graphs & metrics
│   ├── testing-section.tsx      # Predictions & model download
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── types.ts                 # TypeScript type definitions
│   ├── ml-utils.ts              # TensorFlow.js ML functions
│   ├── presets.ts               # Built-in configurations
│   └── storage-utils.ts         # localStorage management
└── public/
    └── neural-network-diagram.png
```

### Key Components

#### ML Pipeline (`lib/ml-utils.ts`)
- Data normalization with multiple methods
- Stratified train/val/test splitting
- Model creation with advanced features
- Training with callbacks and early stopping
- Comprehensive evaluation metrics

#### Main App (`app/page.tsx`)
- Complete state management (15+ state variables)
- Event handling for all interactions
- TensorFlow.js model lifecycle
- Real-time training updates
- Prediction pipeline with normalization

## 🎓 Best Practices

### Data Preparation
✅ **Always normalize your data** unless you have specific reasons not to
- Use Standardization for most cases (mean=0, std=1)
- Use MinMax when you need 0-1 range
- Use Robust for data with outliers

✅ **Use proper split ratios**
- 60/20/20 (train/val/test) for medium datasets
- 70/15/15 for larger datasets
- Never train on test data!

### Preventing Overfitting
✅ **Use regularization**
- Start with dropout 0.3
- Add L2 regularization (0.001)
- Enable batch normalization

✅ **Enable early stopping**
- Patience: 10-15 epochs
- Min Delta: 0.0001

✅ **Monitor validation loss**
- Should decrease with training loss
- If val loss increases while train decreases: OVERFITTING!

### Handling Class Imbalance
✅ **Enable "Handle Class Imbalance"** when:
- One class has < 10% of samples
- Classes are not evenly distributed
- Minority class is important

### Hyperparameter Tuning
✅ **Start with Standard preset**, then adjust:
- Increase layers/neurons for complex patterns
- Decrease learning rate if loss is unstable
- Increase dropout if overfitting
- Use more epochs for larger datasets

## 🔧 Troubleshooting

### NaN Loss
**Problem**: Loss becomes NaN during training

**Solutions**:
- ✅ Enable data normalization (Standardization)
- ✅ Reduce learning rate (try 0.001 or 0.0001)
- ✅ Enable gradient clipping (value: 1.0)
- ✅ Check data for inf/NaN values
- ✅ Use batch normalization

### Overfitting
**Problem**: Training accuracy high, validation accuracy low

**Solutions**:
- ✅ Enable dropout (0.3-0.4)
- ✅ Add L2 regularization (0.001)
- ✅ Enable early stopping (patience: 10)
- ✅ Reduce model complexity (fewer layers/neurons)
- ✅ Get more training data

### Slow Convergence
**Problem**: Loss decreases very slowly

**Solutions**:
- ✅ Increase learning rate (try 0.01)
- ✅ Enable batch normalization
- ✅ Use Adam optimizer (recommended)
- ✅ Increase batch size
- ✅ Check if data is normalized

### Poor Performance
**Problem**: Low accuracy on all sets

**Solutions**:
- ✅ Increase model complexity (more layers/neurons)
- ✅ Train for more epochs
- ✅ Try different activation functions
- ✅ Ensure data is properly labeled
- ✅ Check if problem is solvable with your features

## 📊 Feature Comparison

### Without Advanced Features ❌
- Training may fail (NaN loss)
- Poor generalization to new data
- Biased predictions on imbalanced data
- Difficult to know when to stop training
- No insight into per-class performance

### With Advanced Features ✅
- Stable training with normalization
- Good generalization with regularization
- Fair predictions with class weighting
- Automatic stopping at optimal point
- Comprehensive evaluation metrics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use in your projects!

## 🙏 Acknowledgments

- **TensorFlow.js Team** - Amazing ML library
- **shadcn/ui** - Beautiful UI components
- **Recharts** - Powerful charting library

## 📞 Support

Need help? Check the:
- [Quick Start Guide](#-quick-start)
- [Troubleshooting Section](#-troubleshooting)
- [Best Practices](#-best-practices)

---

**Built with ❤️ for the ML community**

⭐ If you find this useful, please star the repo!
