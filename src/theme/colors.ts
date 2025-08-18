// Theme configuration - Change these values to update your entire app's theme!
export const THEME_CONFIG = {
  // Primary color (Orange) - Used for main actions, buttons, active states
  primary: {
    light: {
      50: 'rgb(254, 247, 242)',
      100: 'rgb(254, 237, 220)',
      200: 'rgb(253, 224, 193)',
      300: 'rgb(252, 198, 143)',
      400: 'rgb(251, 168, 85)',
      500: 'rgb(234, 116, 14)', // Main primary color
      600: 'rgb(202, 95, 8)',
      700: 'rgb(169, 77, 10)',
      800: 'rgb(138, 63, 14)',
      900: 'rgb(115, 53, 15)',
    },
    dark: {
      50: 'rgb(67, 29, 7)',
      100: 'rgb(115, 53, 15)',
      200: 'rgb(138, 63, 14)',
      300: 'rgb(169, 77, 10)',
      400: 'rgb(202, 95, 8)',
      500: 'rgb(249, 142, 47)', // Main primary color for dark mode
      600: 'rgb(251, 168, 85)',
      700: 'rgb(252, 198, 143)',
      800: 'rgb(253, 224, 193)',
      900: 'rgb(254, 237, 220)',
    }
  },

  // Secondary color (Green) - Used for success states, nature-related content
  secondary: {
    light: {
      50: 'rgb(248, 252, 247)',
      100: 'rgb(240, 249, 235)',
      200: 'rgb(220, 242, 207)',
      300: 'rgb(187, 229, 162)',
      400: 'rgb(146, 213, 110)',
      500: 'rgb(65, 163, 32)', // Main secondary color
      600: 'rgb(52, 137, 27)',
      700: 'rgb(43, 107, 26)',
      800: 'rgb(38, 85, 26)',
      900: 'rgb(34, 70, 24)',
    },
    dark: {
      50: 'rgb(17, 39, 12)',
      100: 'rgb(34, 70, 24)',
      200: 'rgb(38, 85, 26)',
      300: 'rgb(43, 107, 26)',
      400: 'rgb(52, 137, 27)',
      500: 'rgb(101, 191, 60)', // Main secondary color for dark mode
      600: 'rgb(146, 213, 110)',
      700: 'rgb(187, 229, 162)',
      800: 'rgb(220, 242, 207)',
      900: 'rgb(240, 249, 235)',
    }
  },

  // Tertiary color (Purple) - Used for special features, premium content
  tertiary: {
    light: {
      50: 'rgb(252, 248, 255)',
      100: 'rgb(247, 237, 255)',
      200: 'rgb(237, 208, 255)',
      300: 'rgb(217, 158, 255)',
      400: 'rgb(196, 105, 255)',
      500: 'rgb(147, 51, 234)', // Main tertiary color
      600: 'rgb(126, 34, 206)',
      700: 'rgb(107, 33, 168)',
      800: 'rgb(88, 28, 135)',
      900: 'rgb(74, 29, 111)',
    },
    dark: {
      50: 'rgb(49, 15, 74)',
      100: 'rgb(74, 29, 111)',
      200: 'rgb(88, 28, 135)',
      300: 'rgb(107, 33, 168)',
      400: 'rgb(126, 34, 206)',
      500: 'rgb(177, 56, 255)', // Main tertiary color for dark mode
      600: 'rgb(196, 105, 255)',
      700: 'rgb(217, 158, 255)',
      800: 'rgb(237, 208, 255)',
      900: 'rgb(247, 237, 255)',
    }
  }
};

// To change your theme colors in the future:
// 1. Update the RGB values in THEME_CONFIG above
// 2. The entire app will automatically use the new colors
// 3. No need to change hardcoded colors throughout the app

// Example: Want a blue theme instead of orange?
// Change primary.light[500] from 'rgb(234, 116, 14)' to 'rgb(59, 130, 246)'
// Change primary.dark[500] from 'rgb(249, 142, 47)' to 'rgb(96, 165, 250)'
