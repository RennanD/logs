import { useContext, createContext, ReactNode, useState } from 'react';

type Theme = 'light' | 'dark';
type CustomThemeContextData = {
  activeTheme: Theme;
  changeTheme: (theme: Theme) => void;
};
type CustomThemeProviderProps = {
  children: ReactNode;
};

type KeyTheme =
  | 'heading'
  | 'paragraphy'
  | 'description'
  | 'legend'
  | 'sidebarColor'
  | 'backgroundColor'
  | 'backgroundCard'
  | 'borderColor'
  | 'primary90';

const CustomThemeContext = createContext({} as CustomThemeContextData);

const html = document.querySelector('html');
function getElementStyle(element: HTMLHtmlElement, style: string): string {
  return window.getComputedStyle(element).getPropertyValue(style);
}

export const themes = {
  dark: {
    heading: getElementStyle(html!, '--heading'),
    paragraphy: getElementStyle(html!, '--paragraphy'),
    description: getElementStyle(html!, '--description'),
    legend: getElementStyle(html!, '--legend'),
    // button: getElementStyle(html!, '--button'),
    backgroundColor: getElementStyle(html!, '--background-color'),
    sidebarColor: getElementStyle(html!, '--sidebar-color'),
    backgroundCard: getElementStyle(html!, '--background-card'),
    borderColor: getElementStyle(html!, '--border-color'),
    primary90: getElementStyle(html!, '--primary90'),
    // primary50: getElementStyle(html!, '--primary50'),
  },
  light: {
    heading: '#272727',
    paragraphy: '#3C3C4399',
    description: '#666666',
    legend: '#0C1A32',
    sidebarColor: '#FFFFFF',
    // button: '',
    backgroundColor: '#F2F3F9',
    backgroundCard: '#FFFFFF',
    borderColor: '#ECE9F1',
    primary90: '#0052CC',
    // primary50: '',
  },
};

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [activeTheme, setActiveTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('@log-monitor:theme') as Theme;

    return storagedTheme || 'dark';
  });
  function transformKey(key: string) {
    return `--${key.replace(/([A-Z])/, '-$1').toLowerCase()}`;
  }

  function handleChangeCustomTheme(theme: Theme) {
    const colors = themes[theme];

    Object.keys(themes[theme]).forEach(key => {
      html?.style.setProperty(transformKey(key), colors[key as KeyTheme]);
    });

    setActiveTheme(theme);
  }

  return (
    <CustomThemeContext.Provider
      value={{ activeTheme, changeTheme: handleChangeCustomTheme }}
    >
      {children}
    </CustomThemeContext.Provider>
  );
}

export function useTheme(): CustomThemeContextData {
  const context = useContext(CustomThemeContext);

  if (!context) {
    throw new Error('useCustomTheme must be used within CustomThemeProvider');
  }

  return context;
}
