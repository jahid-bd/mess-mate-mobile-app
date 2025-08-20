# 🎨 Theme Customization Guide

This document explains how to easily change your app's theme colors in the future.

## 🎯 Quick Theme Change

### To change your entire app's color scheme:

1. **Open the theme configuration file:**
   ```
   src/theme/colors.ts
   ```

2. **Update the colors in `THEME_CONFIG`:**
   ```typescript
   // Example: Change from Orange to Blue theme
   primary: {
     light: {
       500: 'rgb(59, 130, 246)', // Blue instead of orange
       // ... update other shades
     },
     dark: {
       500: 'rgb(96, 165, 250)', // Lighter blue for dark mode
       // ... update other shades
     }
   }
   ```

3. **Save the file** - Your entire app will automatically update!

## 🌈 Color System

### Primary Colors (Main Brand Color)
- **Current:** Orange (`rgb(234, 116, 14)`)
- **Used for:** Main buttons, active tabs, primary actions
- **Location:** `THEME_CONFIG.primary`

### Secondary Colors (Accent Color)
- **Current:** Green (`rgb(65, 163, 32)`)
- **Used for:** Success states, secondary buttons, nature content
- **Location:** `THEME_CONFIG.secondary`

### Tertiary Colors (Special Features)
- **Current:** Purple (`rgb(147, 51, 234)`)
- **Used for:** Special features, premium content, highlights
- **Location:** `THEME_CONFIG.tertiary`

## 🛠️ How It Works

### Dynamic Color System
- All colors are centralized in `src/theme/colors.ts`
- Components use `useThemeColors()` hook to get current colors
- Colors automatically adapt to light/dark mode
- No hardcoded colors in components

### Components Using Dynamic Colors
- ✅ Tab navigation
- ✅ All buttons and icons
- ✅ Dashboard statistics
- ✅ Profile screen
- ✅ Meals and expenses screens

## 🎨 Pre-made Theme Examples

### Blue Theme (Professional)
```typescript
primary: {
  light: { 500: 'rgb(59, 130, 246)' },  // Blue
  dark: { 500: 'rgb(96, 165, 250)' }
}
```

### Red Theme (Energetic)
```typescript
primary: {
  light: { 500: 'rgb(239, 68, 68)' },   // Red
  dark: { 500: 'rgb(248, 113, 113)' }
}
```

### Emerald Theme (Natural)
```typescript
primary: {
  light: { 500: 'rgb(16, 185, 129)' },  // Emerald
  dark: { 500: 'rgb(52, 211, 153)' }
}
```

### Purple Theme (Creative)
```typescript
primary: {
  light: { 500: 'rgb(147, 51, 234)' },  // Purple
  dark: { 500: 'rgb(168, 85, 247)' }
}
```

## 🚀 Best Practices

### Color Accessibility
- Ensure sufficient contrast between text and background
- Test both light and dark modes
- Consider color-blind users

### Shade Guidelines
- **50-100:** Very light backgrounds
- **200-300:** Light accents and borders
- **400-500:** Main colors for buttons and icons
- **600-700:** Hover and active states
- **800-900:** Dark text and strong emphasis

### Testing Your Changes
1. Change colors in `src/theme/colors.ts`
2. Test in both light and dark modes
3. Check all screens: Dashboard, Meals, Expenses, Profile
4. Verify readability and contrast

## 📱 Component Coverage

All these components use dynamic colors:
- Navigation tabs
- Buttons (all variants)
- Icons (Lucide React Native)
- Status indicators
- Statistics cards
- Theme toggle
- Profile settings

## 🔄 Future-Proofing

This system ensures:
- **Easy maintenance:** Change colors in one place
- **Consistency:** All components use the same color system
- **Scalability:** Easy to add new colors or themes
- **Dark mode support:** Automatic light/dark variants

---

**Need help?** The color system is designed to be simple. Just update `src/theme/colors.ts` and watch your entire app transform! 🎨
