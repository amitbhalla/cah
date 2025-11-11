# CAH Advisory - Design & Writing Philosophy

## Overview
This document captures the design principles, visual language, and writing philosophy used throughout the CAH Advisory website. It serves as a reference for maintaining consistency across all pages and future updates.

---

## Design Philosophy

### Core Principle: Breaking Monotony Through Variety
**The fundamental rule: No two sections should look alike.** Each section has its own unique visual treatment while maintaining overall brand cohesion.

### Visual Strategy
1. **Avoid Card/Box Repetition**: Never use the same card-based layout pattern repeatedly. Each section demands a unique structural approach.
2. **Layered Depth**: Create visual interest through multiple layers of elements (background icons, decorative elements, primary content).
3. **Asymmetry & Rhythm**: Use staggered grids, alternating layouts, and varied spacing to create dynamic flow.
4. **Subtle to Bold Contrast**: Mix understated sections with visually rich sections to maintain engagement without overwhelming.

---

## Color Palette & Usage

### Primary Colors
- `--navy: #1a2332` - Primary text, headings, authority
- `--gold: #c9a96e` - Accent, CTAs, emphasis, sophistication
- `--gold-light: #d4b883` - Hover states, lighter accents
- `--gold-dark: #b89555` - Deeper emphasis
- `--cream: #faf8f5` - Soft backgrounds, warmth
- `--grey-light: #e8e6e3` - Subtle borders
- `--grey-mid: #6b6b6b` - Secondary text
- `--grey-dark: #2d2d2d` - Body text
- `--white: #ffffff` - Clean backgrounds

### Color Application Rules
- **Navy backgrounds**: Use for hero sections and dark alternate sections (with gold as primary accent)
- **White/Cream backgrounds**: Alternate between sections to create rhythm
- **Gold**: Never overuse - it should feel precious and intentional
- **Opacity variations**: Use rgba for gold/navy at various opacities (4%-20%) for subtle decorative elements

---

## Typography Hierarchy

### Font Families
- **Headings**: 'Playfair Display' (serif) - Classical, authoritative, sophisticated
- **Body**: 'Lato' (sans-serif) - Clean, readable, professional

### Size System
```
Hero H1: 4.5rem (mobile: 2.5rem)
Section H2: 3rem (mobile: 2.25rem)
Section H3: 1.75-2.25rem (mobile: 1.3-1.75rem)
Large Body: 1.3rem (intro paragraphs)
Standard Body: 1.1-1.15rem
Small Body: 1rem
```

### Typography Rules
1. **H1s**: Only in hero sections, always with a gold accent word/phrase
2. **H2s**: Section titles, centered or left-aligned based on section needs
3. **H3s**: Use Playfair Display for subsection headings to maintain elegance
4. **Line Height**: 1.7-1.9 for body text (generous spacing for readability)
5. **Letter Spacing**: Negative for large headings (-0.02em to -0.03em), positive for small caps (0.5px)

---

## Icon System & Usage

### Icon Philosophy: Multi-Scale Layering
Icons serve three purposes at different scales:
1. **Functional/Primary** (3.5-4rem): Direct visual representation of content
2. **Decorative/Background** (5-12rem): Subtle atmospheric elements (4-8% opacity)
3. **Accent/Detail** (2-3.5rem): Small flourishes and embellishments

### Icon Implementation Patterns

#### Pattern 1: Triple-Layer (e.g., "Who I Work With")
```
- Background Icon: 8rem, 4% opacity (scenic/thematic)
- Primary Icon: 4rem, 60% opacity (literal representation)
- Content: Text with strong hierarchy
```

#### Pattern 2: Floating Decorative (e.g., "Stakes")
```
- Large Numbers: 8rem
- Floating Icons: 2-3.5rem positioned absolutely around numbers
- Varied positioning for each item (top-left, bottom-right, etc.)
```

#### Pattern 3: Integrated Number Icons (e.g., "Partnership")
```
- Number: 4rem with icon inside
- Inner Icon: 2rem overlaid on number
- Background Icon: 6rem at 6% opacity behind content
```

#### Pattern 4: Massive Scenic (e.g., "Nature of Work")
```
- Background Icon: 12rem at 5% opacity (creates atmosphere)
- Primary Icon: 3.5rem (functional)
- Positioned to create dramatic visual impact
```

### Icon Selection Guidelines
- **Match conceptually**: Icons should relate to content but not be too literal
- **Vary icon families**: Mix solid (fas) and regular (far) FontAwesome styles
- **Avoid repetition**: Never reuse the same icon in the same section
- **Appropriate abstraction**: Use metaphorical icons (crown, mountain, atom) for sophisticated concepts

### Icon Color & Opacity Guide
```
Primary functional icons: var(--gold), 60-100% opacity
Background decorative icons: rgba(201, 169, 110, 0.04-0.08)
Accent decorative icons: var(--gold), 20-30% opacity
Interactive icons: Increase opacity/scale on hover
```

---

## Section Layout Patterns

### 1. Staggered Grid (Challenge Section)
```css
grid-template-columns: repeat(2, 1fr);
nth-child(even): margin-top: 3rem;
```
**Use when**: Presenting 4-6 items that need individual focus
**Key feature**: Diagonal skewed gradient background on hover

### 2. Alternating Asymmetric (Stakes Section)
```css
Item 1, 3: grid-template-columns: 250px 1fr;
Item 2, 4: grid-template-columns: 1fr 250px;
```
**Use when**: Creating visual flow and preventing visual monotony
**Key feature**: Large decorative numbers with floating icons

### 3. Horizontal Timeline (Partnership Section)
```css
grid-template-columns: 120px 1fr;
Items separated by borders
Animated underline on hover
```
**Use when**: Sequential or ordered information
**Key feature**: Numbers with embedded icons

### 4. Side-by-Side Split (Nature Section)
```css
grid-template-columns: 1fr 1fr;
gap: 8rem;
Large spacing, minimal items
```
**Use when**: Two major concepts need equal weight
**Key feature**: Massive background icons for drama

### 5. Bordered Grid (Services Section)
```css
grid-template-columns: repeat(2, 1fr);
gap: 0;
Shared borders between cells
```
**Use when**: Multiple items need equal hierarchy
**Key feature**: White background fades in on hover

### 6. Vertical Clean List (Who Section)
```css
grid-template-columns: repeat(3, 1fr);
No backgrounds, icon-first
Minimal styling with animated underlines
```
**Use when**: 3-4 clear categories
**Key feature**: Triple icon layering (background + primary + content)

---

## Interactive States & Animations

### Hover Philosophy
Every interactive element should have a **purposeful, smooth transition** (0.3-0.5s duration).

### Common Hover Patterns

#### 1. Background Reveal
```css
::before element with opacity: 0
On hover: opacity: 1
Background: gradient or solid color
```

#### 2. Icon Transform
```css
transform: scale(1.1) or rotate(10deg)
opacity increase
transition: 0.4-0.5s ease
```

#### 3. Underline/Border Animation
```css
width: 0 → width: 100% (or fixed length)
Background: var(--gold)
transition: width 0.4s ease
```

#### 4. Elevation Shift
```css
transform: translateY(-5px) or translateX(5px)
box-shadow increase
Combined with background color change
```

### Animation Timing
- **Fast**: 0.3s (small UI elements, underlines)
- **Medium**: 0.4s (cards, icons)
- **Slow**: 0.5s (large backgrounds, complex transforms)
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, professional feel

---

## Spacing & Rhythm

### Section Padding
```
Desktop: 6-7rem vertical
Mobile: 4-5rem vertical
```

### Container Max-Widths
```
Hero content: 1400px
Standard sections: 1320px
Text-focused: 900-1100px
Narrow content: 800-850px
```

### Gap System
```
Tight: 1.5-2rem (mobile, compact lists)
Standard: 3-4rem (grid items)
Loose: 5-6rem (section spacing)
Extra Loose: 8rem (dramatic separation, Nature section)
```

### Vertical Rhythm
Alternate between:
- Dense sections (Challenge - 4 items in 2 columns)
- Sparse sections (Nature - 2 large items)
- Medium sections (Stakes - 4 items, vertical flow)

---

## Responsive Design Strategy

### Breakpoints
```css
Desktop: Default (1200px+)
Tablet: @media (max-width: 1200px)
Mobile: @media (max-width: 768px)
```

### Mobile Transformation Rules

#### 1. Grid Collapse
```
All multi-column grids → 1 column
Remove alternating patterns
Reset margin-top offsets
```

#### 2. Icon Scaling
```
Background decorative icons (8rem+): Hide or reduce to 5rem
Primary icons (4rem): Reduce to 3rem
Functional icons (1.5rem): Keep or slight reduction
```

#### 3. Typography Scale
```
Reduce all font sizes by ~30-40%
Maintain line-height ratios
Reduce padding/spacing by ~30%
```

#### 4. Animation Simplification
```
Keep simple transitions
Remove complex transforms
Hide purely decorative elements
```

### Mobile-First Considerations
- **Touch targets**: Minimum 44x44px
- **Reading width**: Max 850px for comfortable reading
- **No hover states**: Hide hover-only decorative elements on mobile

---

## Writing Style Philosophy

### Voice & Tone
**Sophisticated, Direct, Thoughtful** - Chris Howe's voice reflects senior-level executive experience without unnecessary corporate jargon.

### Writing Principles

#### 1. Precision Over Fluff
❌ "We provide comprehensive, holistic, end-to-end solutions"
✅ "Working through decisions where the analytical answer is clear but the organizational reality requires careful navigation"

#### 2. Specificity
❌ "Many years of experience"
✅ "Twenty years at Boston Consulting Group—building businesses, leading transformations"

#### 3. Active Construction
❌ "Services are provided to help leaders"
✅ "I work with senior leaders who understand..."

#### 4. Authentic Complexity
Don't dumb down concepts. The audience is C-suite executives who appreciate nuance:
- "Pattern recognition across complexity"
- "Organizational reality requires careful navigation"
- "Decisions where multiple valid paths exist"

#### 5. No Superlatives
Avoid: amazing, incredible, revolutionary, game-changing, best-in-class
Use: effective, thoughtful, sustained, considered, consequential

### Content Structure Patterns

#### Section Headers
Format: `[Concept] [Emphasis]`
- "The Questions You're **Holding**"
- "Why This **Matters**"
- "Working **Together**"
- "Areas of **Focus**"

#### Paragraph Length
- Intro paragraphs: 2-3 sentences (40-60 words)
- Body paragraphs: 3-4 sentences (60-80 words)
- Never exceed 100 words per paragraph
- Use em dashes for thoughtful pauses—like this

#### List Items
When listing challenges/services:
- **Bold heading**: 2-4 words
- **Description**: 2-3 sentences
- Start with context, end with implication

### Vocabulary Guidelines

#### Preferred Terms
- Navigate (not "solve")
- Complexity (not "challenges")
- Sustained (not "consistent")
- Consequential (not "important")
- Trajectory (not "path")
- Capacity (not "ability")
- Tenure (not "time")

#### Avoid Business Clichés
- Low-hanging fruit
- Move the needle
- Synergy
- Leverage (as verb)
- Circle back
- Deep dive
- At the end of the day

---

## Component Design Specifications

### Buttons/CTAs

#### Primary Button
```css
background: var(--gold)
padding: 1.1rem 2.8rem
border-radius: 2px (subtle, not rounded)
box-shadow: 0 6px 20px rgba(201, 169, 110, 0.25)
Hover: translateY(-2px) + darker gold
```

#### Secondary Button
```css
background: transparent
border: 1px solid rgba(250, 248, 245, 0.3)
On navy background: cream text
Hover: gold border + gold text
```

### Navigation
```css
Fixed position, transparent → solid on scroll
Blur backdrop: backdrop-filter: blur(12px)
Links: Underline animation from center
Mobile: Slide-in drawer from right (280px width)
```

### Credentials Banner
```css
Background: var(--navy)
Grid: 5 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
Icons: 50px, rounded squares (not circles)
Borders: Subtle dividers between items
```

### Stats Display
```css
Numbers: 'Playfair Display', 3.5rem, var(--gold)
Labels: 1.05rem, grey-dark
Layout: Horizontal row, centered
No backgrounds, pure typography
```

---

## Dark Section (Navy Background) Guidelines

### When to Use
- Hero sections (establish authority immediately)
- "Nature of This Work" (create drama/contrast)
- "Who I Work With" (emphasize exclusivity)

### Dark Section Rules
```css
background: var(--navy) or gradient
Text: var(--cream) or rgba(250, 248, 245, 0.85)
Headings: var(--cream)
Accent headings: var(--gold)
Links: var(--gold)
Add subtle glow: radial-gradient with gold at 4-8%
Border accents: rgba(201, 169, 110, 0.15-0.3)
```

### Readability Considerations
- Use slightly larger font sizes on dark backgrounds
- Increase line-height by 0.1
- Avoid pure white text (use cream/85% opacity whites)
- Ensure gold accents have enough contrast (AAA rating)

---

## Page Structure Template

### Standard Page Flow
1. **Hero** (navy, dramatic, with image or centered text)
2. **Light intro section** (white/cream, centered text)
3. **Content section 1** (white, unique layout)
4. **Content section 2** (cream or gradient, different layout)
5. **Alternate dark section** (navy)
6. **Content section 3** (white/cream)
7. **CTA section** (navy, centered, bold)
8. **Footer** (darker navy #151b26)

### Maintaining Flow
- Never have two similar sections adjacent
- Alternate between dense and sparse layouts
- Vary text alignment (centered → left → centered)
- Change visual weight (light → heavy → light)

---

## Accessibility Standards

### Color Contrast
- Body text on white: Minimum 7:1 (AAA)
- Body text on navy: Minimum 7:1
- Gold on white: Minimum 4.5:1 (AA Large)
- Gold on navy: Test and adjust if needed

### Keyboard Navigation
- All interactive elements must be focusable
- Focus states: 2px gold outline
- Skip to content link (visually hidden until focused)
- Logical tab order

### Screen Readers
- Semantic HTML (nav, section, article, aside)
- Alt text for all decorative icons: `aria-hidden="true"`
- Descriptive link text (no "click here")
- Heading hierarchy (no skipping levels)

### Motion & Animation
- Respect `prefers-reduced-motion`
- Provide non-animated fallbacks
- Keep animations under 0.5s
- No auto-playing animations longer than 5s

---

## File Organization

### CSS Organization
```
1. CSS Variables
2. Reset/Base Styles
3. Typography
4. Navigation
5. Hero Section
6. Content Sections (in page order)
7. Components (buttons, cards)
8. Responsive (@media queries at end)
```

### Naming Conventions
```
Sections: .section-name (e.g., .challenge-section)
Containers: .section-container
Grid layouts: .section-grid
Cards/Items: .section-item or .section-card
Icons: .section-icon (with modifiers like -large, -decorative)
```

### Comment Structure
```css
/* Main Section Name */
.section { }

/* Subsection or Component */
.subsection { }
```

---

## Brand Personality Through Design

### What We're Communicating
1. **Authority**: Through serif typography, navy backgrounds, generous spacing
2. **Sophistication**: Through gold accents, subtle animations, restrained color palette
3. **Thoughtfulness**: Through varied layouts, purposeful iconography, careful hierarchy
4. **Approachability**: Through warm cream tones, clear typography, human-centered copy

### What We're Avoiding
1. **Corporate sterility**: No blue + white, no stock imagery, no corporate speak
2. **Tech startup energy**: No bright colors, no playful fonts, no casual tone
3. **Consulting firm blandness**: No generic imagery, no vague value props, no buzzwords
4. **Luxury brand pretension**: No excessive gold, no script fonts, no exclusionary tone

---

## Testing Checklist

### Visual Testing
- [ ] All icons load correctly (FontAwesome CDN)
- [ ] Spacing is consistent within sections
- [ ] No orphaned words in headings
- [ ] Hover states work on all interactive elements
- [ ] No layout shift on page load
- [ ] Images load with appropriate lazy loading

### Responsive Testing
- [ ] Test at 1920px, 1440px, 1200px, 768px, 375px
- [ ] All grids collapse appropriately
- [ ] Text remains readable at all sizes
- [ ] Touch targets are adequate on mobile
- [ ] Navigation works on mobile

### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (especially backdrop-filter support)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Performance
- [ ] Page load under 3 seconds
- [ ] No render-blocking resources
- [ ] Fonts load with swap or optional
- [ ] Smooth animations (60fps)

---

## Future Design Considerations

### Scaling the System
When adding new pages:
1. Choose a layout pattern that hasn't been used yet
2. Select a new icon combination/scale
3. Maintain color palette and typography
4. Keep the same level of sophistication
5. Reference this document for consistency

### Adding New Sections
1. Review existing sections to avoid repetition
2. Sketch layout on paper first
3. Choose appropriate icon scale
4. Test responsiveness early
5. Ensure accessibility compliance

### Evolution Over Time
- Keep design fresh but don't chase trends
- Update content more frequently than design
- Test with real users (executives)
- Maintain sophisticated, timeless aesthetic
- Document any deviations from this guide

---

## Quick Reference: Apply This Philosophy

### When designing a new section, ask:
1. Does this layout look like any other section? (If yes, change it)
2. What scale of icons fits this content? (Functional, decorative, or atmospheric?)
3. Is the hover interaction meaningful and smooth?
4. Does the spacing create the right rhythm?
5. Can I read this easily in 3 seconds?

### When writing new content, ask:
1. Would a C-suite executive find this precise and respectful?
2. Have I avoided buzzwords and superlatives?
3. Is this specific enough to be credible?
4. Does this sound like how Chris Howe would speak?
5. Is every word earning its place?

---

**Last Updated**: January 2025
**Maintained By**: Design system for CAH Advisory
**Version**: 1.0
