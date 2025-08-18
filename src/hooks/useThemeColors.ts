import { useTheme } from '../contexts/ThemeContext';
import { THEME_CONFIG } from '../theme/colors';

// Dynamic colors that change based on theme
export function useThemeColors() {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  const primaryColors = isDark ? THEME_CONFIG.primary.dark : THEME_CONFIG.primary.light;
  const secondaryColors = isDark ? THEME_CONFIG.secondary.dark : THEME_CONFIG.secondary.light;
  const tertiaryColors = isDark ? THEME_CONFIG.tertiary.dark : THEME_CONFIG.tertiary.light;

  return {
    // Primary colors
    primary: primaryColors,
    
    // Secondary colors (green)
    secondary: secondaryColors,
    
    // Tertiary colors (purple)
    tertiary: tertiaryColors,
    
    // Semantic colors
    success: {
      50: isDark ? 'rgb(228, 255, 244)' : 'rgb(228, 255, 244)',
      100: isDark ? 'rgb(202, 255, 232)' : 'rgb(202, 255, 232)',
      500: isDark ? 'rgb(72, 151, 102)' : 'rgb(52, 131, 82)',
      600: isDark ? 'rgb(52, 131, 82)' : 'rgb(42, 121, 72)',
      700: isDark ? 'rgb(42, 121, 72)' : 'rgb(32, 111, 62)',
    },
    
    warning: {
      50: isDark ? 'rgb(255, 249, 245)' : 'rgb(255, 249, 245)',
      100: isDark ? 'rgb(255, 244, 236)' : 'rgb(255, 244, 236)',
      500: isDark ? 'rgb(251, 149, 75)' : 'rgb(231, 120, 40)',
      600: isDark ? 'rgb(231, 120, 40)' : 'rgb(215, 108, 31)',
      700: isDark ? 'rgb(215, 108, 31)' : 'rgb(180, 90, 26)',
    },
    
    error: {
      50: isDark ? 'rgb(254, 233, 233)' : 'rgb(254, 233, 233)',
      100: isDark ? 'rgb(254, 226, 226)' : 'rgb(254, 226, 226)',
      500: isDark ? 'rgb(239, 68, 68)' : 'rgb(230, 53, 53)',
      600: isDark ? 'rgb(230, 53, 53)' : 'rgb(220, 38, 38)',
      700: isDark ? 'rgb(220, 38, 38)' : 'rgb(185, 28, 28)',
    },
    
    // Typography
    text: {
      primary: isDark ? 'rgb(254, 254, 255)' : 'rgb(23, 23, 23)',
      secondary: isDark ? 'rgb(163, 163, 163)' : 'rgb(115, 115, 115)',
      tertiary: isDark ? 'rgb(140, 140, 140)' : 'rgb(140, 140, 140)',
      inverse: isDark ? 'rgb(23, 23, 23)' : 'rgb(254, 254, 255)',
    },
    
    // Background
    background: {
      primary: isDark ? 'rgb(18, 18, 18)' : 'rgb(255, 255, 255)',
      secondary: isDark ? 'rgb(39, 38, 37)' : 'rgb(246, 246, 246)',
    },
    
    // Icon colors
    icon: {
      primary: isDark ? 'rgb(249, 142, 47)' : 'rgb(234, 116, 14)',
      secondary: isDark ? 'rgb(101, 191, 60)' : 'rgb(65, 163, 32)',
      tertiary: isDark ? 'rgb(177, 56, 255)' : 'rgb(147, 51, 234)',
      muted: isDark ? 'rgb(163, 163, 163)' : 'rgb(107, 114, 126)',
      inverse: isDark ? 'rgb(23, 23, 23)' : 'rgb(255, 255, 255)',
      danger: isDark ? 'rgb(239, 68, 68)' : 'rgb(230, 53, 53)',
    },
    
    // Border colors
    border: {
      primary: isDark ? 'rgb(64, 64, 64)' : 'rgb(229, 229, 229)',
      secondary: isDark ? 'rgb(82, 82, 82)' : 'rgb(212, 212, 212)',
      focus: isDark ? 'rgb(249, 142, 47)' : 'rgb(234, 116, 14)',
    }
  };
}
