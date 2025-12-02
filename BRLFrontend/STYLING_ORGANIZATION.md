# BRL Frontend - CSS Organization

This document outlines how the styling has been organized across the BRL Frontend project.

## Directory Structure

```
src/
├── assets/
│   ├── base.css              # Base styles and CSS variables (existing)
│   ├── main.css              # Main imports and global app styles (updated)
│   ├── animations.css        # Shared animations (NEW)
│   └── buttons.css           # Shared button styles (NEW)
├── components/
│   ├── LayoutWrapper.vue     # Updated with @import
│   └── styles/
│       └── LayoutWrapper.css # Layout-specific styles (NEW)
└── views/
    ├── HomeView.vue          # Updated with @imports
    ├── CreateResourceView.vue # Updated with @imports
    ├── ViewResourcesView.vue  # Updated with @imports
    └── styles/
        ├── HomeView.css              # Home page styles (NEW)
        ├── CreateResourceView.css    # Create resource form styles (NEW)
        └── ViewResourcesView.css     # View resources/filtering styles (NEW)
```

## CSS Files Organization

### Shared/Global Styles (`src/assets/`)

#### `main.css`
- **Purpose**: Main entry point for all styles
- **Contents**: 
  - Imports from `base.css`, `animations.css`, and `buttons.css`
  - Global app styles for links and color theming
  
#### `base.css`
- **Purpose**: Base CSS variables and defaults (existing file)
- **Contents**: 
  - CSS custom properties for colors and theming
  - Global font, box-sizing, and layout resets

#### `animations.css` (NEW)
- **Purpose**: Shared animations used across multiple components
- **Contents**: 
  - `@keyframes fadeIn` animation
  - `.fade-in` utility class

#### `buttons.css` (NEW)
- **Purpose**: Reusable button styles
- **Contents**: 
  - `.btn` base button class
  - `.btn-primary` primary button variant
  - `.btn-secondary` secondary button variant
  - `.btn-sm` and `.btn-lg` size variants

### Component-Specific Styles

#### `src/components/styles/LayoutWrapper.css` (NEW)
- **Purpose**: Styling for the main layout wrapper component
- **Components Affected**: LayoutWrapper.vue
- **Contents**: 
  - Header styling (`.header`, `.title`)
  - Navigation bar styling (`.navbar`, `.nav-link`, `.search-*`)
  - Footer styling (`.footer`, `.footer-*`)
  - Main content area styling (`.main-content`)
  - Responsive design rules

#### `src/views/styles/HomeView.css` (NEW)
- **Purpose**: Styling for the home/landing page
- **Components Affected**: HomeView.vue
- **Contents**: 
  - Welcome section styling (`.welcome-section`)
  - Features grid styling (`.features-section`, `.feature-card`)
  - Quick start section styling (`.quick-start`)
  - Animation and hover effects

#### `src/views/styles/CreateResourceView.css` (NEW)
- **Purpose**: Styling for the create resource form
- **Components Affected**: CreateResourceView.vue
- **Contents**: 
  - Form layout and styling (`.resource-form`, `.form-group`, `.form-row`)
  - Input/textarea/select styling and focus states
  - Tag input and management styling (`.tag-*`, `.selected-tags`)
  - File upload container styling (`.file-upload-*`)
  - Form action buttons styling
  - Responsive design rules

#### `src/views/styles/ViewResourcesView.css` (NEW)
- **Purpose**: Styling for the resources viewing and filtering page
- **Components Affected**: ViewResourcesView.vue
- **Contents**: 
  - Filter section styling (`.filters-section`, `.filter-group`)
  - Search box styling (`.search-box`, `.search-input`)
  - Tags filter styling (`.tags-filter`, `.tag-filter-btn`)
  - Resource card styling (`.resource-card`, `.resource-*`)
  - Category badges with color variants (`.category-education`, `.category-research`, etc.)
  - Resource metadata and actions styling
  - No results state styling
  - Responsive design rules

## Import Structure

### In Vue Components

#### LayoutWrapper.vue
```vue
<style scoped>
@import './styles/LayoutWrapper.css';
</style>
```

#### HomeView.vue
```vue
<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/HomeView.css';
</style>
```

#### CreateResourceView.vue
```vue
<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/CreateResourceView.css';
</style>
```

#### ViewResourcesView.vue
```vue
<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/ViewResourcesView.css';
</style>
```

## Benefits of This Organization

1. **Separation of Concerns**: Each component has its own CSS file
2. **Code Reusability**: Shared styles (buttons, animations) are not duplicated
3. **Maintainability**: Easier to find and update specific component styles
4. **Scalability**: New components can follow the same pattern
5. **Performance**: No unused CSS in component files
6. **Readability**: CSS is organized logically by feature/page

## Style Sharing Strategy

### Shared Across Multiple Pages
- **Animations** (`fadeIn`) → `animations.css`
- **Button Styles** → `buttons.css`

### Single Page/Component
- All other styles kept in component-specific CSS files

### Global/Base
- Base CSS variables, resets, and fundamental styles in `base.css`

## Adding New Components

1. Create a new `.vue` file in the appropriate directory
2. If it needs styling, create a corresponding `.css` file in a `styles/` subdirectory
3. Import shared styles if needed (animations, buttons, etc.)
4. Import the component-specific CSS file
5. Use scoped styles in the component

Example:
```vue
<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/YourNewComponent.css';
</style>
```

