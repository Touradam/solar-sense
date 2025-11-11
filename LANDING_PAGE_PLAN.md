# SEPT Landing Page - Implementation Plan

## Overview
Create a professional startup landing page for SEPT that showcases the company and its products, with the Neural Network Builder as the flagship tool.

## Site Structure

### Route Organization
```
/ (root)                    → Landing Page (new)
/builder                    → Neural Network Builder (move current app)
/about                      → About SEPT (optional)
/contact                    → Contact page (optional)
```

## Landing Page Sections

### 1. Hero Section
**Purpose**: Immediate impact, clear value proposition

**Content**:
- SEPT Logo (large, prominent)
- Compelling headline: "Empowering Innovation Through AI Education"
- Subheadline: "Build, Train, and Deploy Neural Networks Without Writing Code"
- Primary CTA: "Launch Neural Network Builder" → `/builder`
- Secondary CTA: "Learn More" (scroll to features)
- Hero image/animation: Neural network visualization or abstract tech graphic

**Design**:
- Full-screen height
- Gradient background (consistent with app theme: emerald/teal)
- Modern, clean typography
- Animated elements (subtle)

### 2. Value Proposition Section
**Purpose**: Why SEPT? What problems do we solve?

**Content**:
- 3-4 key value propositions:
  - ✅ "Learn AI Interactively" - Hands-on neural network training
  - ✅ "No Coding Required" - Visual, intuitive interface
  - ✅ "Production Ready" - Export models for real applications
  - ✅ "Educational Focus" - Perfect for students and beginners

**Design**:
- Icon + Title + Description cards
- 2x2 or 4-column grid (responsive)
- Icons: brain, code-off, rocket, graduation-cap

### 3. Product Showcase - Neural Network Builder
**Purpose**: Highlight the main product

**Content**:
- Large screenshot/demo of the Neural Network Builder
- Key features list:
  - Visual network architecture designer
  - Real-time training visualization
  - Multiple data input methods
  - Advanced ML features (dropout, regularization, etc.)
  - Model export and deployment
- "Try It Now" CTA → `/builder`

**Design**:
- Split layout: Image left, content right (or vice versa)
- Screenshot with subtle shadow/border
- Animated feature list (fade in on scroll)

### 4. How It Works (Optional)
**Purpose**: Simple 3-step process

**Content**:
1. **Load Data** - Upload CSV or generate synthetic data
2. **Configure Network** - Choose architecture, hyperparameters
3. **Train & Export** - Watch training, download your model

**Design**:
- Horizontal timeline or vertical steps
- Icons for each step
- Brief descriptions

### 5. Target Audience
**Purpose**: Who is this for?

**Content**:
- Students learning AI/ML
- Educators teaching neural networks
- Researchers prototyping models
- Data scientists exploring architectures
- Anyone curious about AI

**Design**:
- 5 cards with icons and descriptions
- Grid layout

### 6. Features Deep Dive (Optional)
**Purpose**: Technical details for advanced users

**Content**:
- Production-ready features:
  - Multiple activation functions
  - Various optimizers (Adam, SGD, RMSprop, etc.)
  - Regularization techniques
  - Early stopping
  - Data preprocessing
  - Model persistence

**Design**:
- Expandable sections or tabs
- Technical but approachable language

### 7. Call to Action Section
**Purpose**: Drive action

**Content**:
- "Ready to Build Your First Neural Network?"
- Large CTA button: "Get Started Free" → `/builder`
- Supporting text: "No signup required. Start building in seconds."

**Design**:
- Full-width section
- Contrasting background color
- Large, prominent button

### 8. Footer
**Purpose**: Navigation, info, legal

**Content**:
- SEPT logo (small)
- Tagline
- Navigation links:
  - Neural Network Builder
  - About SEPT
  - Documentation
  - Contact
- Social links (if applicable)
- Copyright: "© 2025 SEPT. All rights reserved."
- Optional: Privacy Policy, Terms of Service

**Design**:
- Dark background
- Multi-column layout
- Clean, organized

## Design System

### Colors
- Primary: Emerald/Teal gradient (matching app)
- Secondary: Purple/Pink accents
- Neutral: Gray scale for text
- Background: White/Light gray
- Dark mode: Support optional

### Typography
- Headings: Bold, modern sans-serif
- Body: Readable, professional
- Sizes: Clear hierarchy (H1 → H6)

### Spacing
- Consistent padding/margins
- Generous white space
- Section separation

### Animations
- Fade in on scroll
- Subtle hover effects
- Smooth transitions
- Performance-optimized

## Technical Implementation

### Tech Stack
- Next.js 14+ (App Router)
- React
- Tailwind CSS
- shadcn/ui components
- Framer Motion (animations, optional)

### Components to Build
1. `LandingHero.tsx` - Hero section
2. `ValuePropositions.tsx` - Value prop cards
3. `ProductShowcase.tsx` - Main product display
4. `HowItWorks.tsx` - Process steps
5. `TargetAudience.tsx` - Audience cards
6. `CTASection.tsx` - Call to action
7. `LandingFooter.tsx` - Footer

### Pages Structure
```
app/
├── page.tsx                    (Landing page - new)
├── builder/
│   └── page.tsx               (Neural Network Builder - move current)
├── about/
│   └── page.tsx               (About page - optional)
└── layout.tsx                 (Root layout - update)
```

## Implementation Phases

### Phase 1: Setup & Structure
- [ ] Create `/builder` directory and move current app
- [ ] Update routing
- [ ] Create landing page layout structure
- [ ] Set up components directory for landing page

### Phase 2: Core Sections
- [ ] Build Hero section
- [ ] Build Value Propositions section
- [ ] Build Product Showcase section
- [ ] Build CTA section

### Phase 3: Additional Content
- [ ] Build How It Works section (optional)
- [ ] Build Target Audience section (optional)
- [ ] Build Features section (optional)

### Phase 4: Footer & Navigation
- [ ] Build footer component
- [ ] Add navigation between pages
- [ ] Test all links

### Phase 5: Polish & Optimization
- [ ] Add animations
- [ ] Optimize images
- [ ] Mobile responsiveness
- [ ] Performance testing
- [ ] SEO metadata

### Phase 6: Content & Copy
- [ ] Refine all copy/text
- [ ] Add images/graphics
- [ ] Proofread
- [ ] Get feedback

## Content Guidelines

### Tone & Voice
- Professional but approachable
- Educational and empowering
- Clear and concise
- Technically accurate but accessible

### Copy Principles
- Benefits over features
- Action-oriented language
- Clear value proposition
- Social proof (if available)

## Assets Needed

### Images
- [ ] SEPT logo (have it)
- [ ] Neural Network Builder screenshots
- [ ] Hero image or abstract background
- [ ] Feature icons
- [ ] Optional: Team photos, customer logos

### Copy
- [ ] Company tagline
- [ ] Product descriptions
- [ ] Feature descriptions
- [ ] About SEPT text
- [ ] Contact information

## SEO & Metadata

### Meta Tags
- Title: "SEPT - AI Education Platform | Neural Network Builder"
- Description: "Learn AI by building and training neural networks with SEPT's interactive platform. No coding required."
- Keywords: AI education, neural networks, machine learning, no-code AI

### Open Graph
- og:title, og:description, og:image
- Twitter card metadata

## Success Metrics (Future)

- Time on landing page
- Click-through rate to `/builder`
- User engagement with sections
- Mobile vs desktop usage
- Conversion rate (if tracking signups later)

## Next Steps

1. Review and approve this plan
2. Gather any specific requirements or preferences
3. Decide on optional sections to include/exclude
4. Begin Phase 1: Setup & Structure

---

*This plan can be adjusted based on feedback and requirements.*

