/// <reference path="../.astro/types.d.ts" />
type ThemeMode = 'light' | 'dark' | 'auto';

interface Window {
  setThemeMode: (mode: ThemeMode) => void;
}
