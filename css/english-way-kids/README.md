# English Way Kids - Modular CSS Structure

This folder contains the modularized CSS files for the English Way Kids website, organized for better maintainability and organization.

## 📁 File Structure

```
css/english-way-kids/
├── main.css           # Main file that imports all modules
├── variables.css      # CSS custom properties and variables
├── colors.css         # Color system and theme overrides
├── buttons.css        # Button styles and interactions
├── navbar.css         # Navigation and sticky navbar
├── hero.css           # Hero section and background animations
├── animations.css     # Keyframes and animation definitions
├── modals.css         # Modal and form styles
├── sections.css       # General section-specific styles
├── faq.css            # FAQ section styles
├── footer.css         # Footer and sky blue theme
├── astronaut.css      # Astronaut GIF animations
├── responsive.css     # Media queries and responsive design
└── README.md          # This documentation file
```

## 🎨 CSS Modules Overview

### 1. **variables.css**
- CSS custom properties (CSS variables)
- Brand colors and theme definitions
- Bootstrap variable overrides

### 2. **colors.css**
- Text, background, and border color utilities
- Color system overrides
- Theme consistency rules

### 3. **buttons.css**
- Primary, secondary, and outline button styles
- Social media buttons
- WhatsApp CTA button
- Hover and interaction states

### 4. **navbar.css**
- Logo styling
- Navbar pill design
- Sticky navbar animations
- Scroll progress bar
- Navigation active states

### 5. **hero.css**
- Hero background animations
- Image overlay effects
- Logo styling within hero
- Text shadow for readability

### 6. **animations.css**
- All `@keyframes` definitions
- Animation utilities
- Floating, sliding, and rotation effects

### 7. **modals.css**
- Modal dialog styling
- Form controls and validation
- WhatsApp contact modal
- Responsive modal design

### 8. **sections.css**
- General section styles
- Program cards and icons
- About section highlight box
- Shape dividers
- Education GIF animations

### 9. **faq.css**
- Complete FAQ section redesign
- Card layouts and interactions
- Purple gradient backgrounds
- CTA buttons and icons

### 10. **footer.css**
- Sky blue gradient theme
- Cloud animations
- Glass morphism effects
- Footer content styling

### 11. **astronaut.css**
- Floating astronaut animations
- Navbar astronaut styling
- Position adjustments for sticky navbar

### 12. **responsive.css**
- All media queries
- Mobile and tablet adaptations
- Responsive breakpoints
- Device-specific optimizations

## 🔧 Usage

The main CSS file (`main.css`) imports all modules in the correct order:

```css
@import url('variables.css');
@import url('colors.css');
@import url('buttons.css');
/* ... and so on */
```

## ✅ Benefits

1. **🗂️ Organization**: Each file has a specific purpose
2. **🔧 Maintainability**: Easy to find and edit specific styles
3. **🔄 Reusability**: Modules can be reused or removed independently
4. **👥 Team Work**: Multiple developers can work on different modules
5. **📱 Responsive**: Clear separation of responsive styles
6. **🎨 Theme Management**: Variables centralized for easy theme changes

## 🚀 Development Workflow

1. **Edit specific modules** based on the feature you're working on
2. **Use variables.css** for consistent theming
3. **Test responsive.css** changes across devices
4. **Keep animations.css** for all keyframe definitions
5. **Document changes** in this README when adding new modules

## 📝 Notes

- All files use relative imports
- Variables should be defined in `variables.css`
- Keep animations in `animations.css` for better organization
- Use semantic class names following BEM methodology where possible
- Maintain consistent indentation and commenting 