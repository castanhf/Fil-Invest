const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');
const themeToggle = document.getElementById('themeToggle');
const themeState = document.getElementById('themeState');
const yearTarget = document.getElementById('year');
const STORAGE_KEY = 'fil-invest-ui-theme';
const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const closeMenu = () => {
  if (!settingsMenu || !settingsButton) return;
  settingsMenu.setAttribute('aria-hidden', 'true');
  settingsButton.setAttribute('aria-expanded', 'false');
};

const openMenu = () => {
  if (!settingsMenu || !settingsButton) return;
  settingsMenu.setAttribute('aria-hidden', 'false');
  settingsButton.setAttribute('aria-expanded', 'true');
};

const toggleMenu = () => {
  const expanded = settingsButton?.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    closeMenu();
  } else {
    openMenu();
  }
};

const applyTheme = (theme) => {
  const body = document.body;
  const useDark = theme === 'dark';
  body.classList.toggle('theme-dark', useDark);
  body.classList.toggle('theme-light', !useDark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-checked', useDark ? 'true' : 'false');
    themeToggle.setAttribute('aria-label', `Night mode ${useDark ? 'on' : 'off'}`);
  }
  if (themeState) {
    themeState.textContent = useDark ? 'On' : 'Off';
  }
};

const getInitialTheme = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return systemPreference.matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
  applyTheme(theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
};

if (settingsButton && settingsMenu) {
  settingsButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', (event) => {
    if (!settingsMenu.contains(event.target) && event.target !== settingsButton) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const useDark = themeToggle.getAttribute('aria-checked') !== 'true';
    setTheme(useDark ? 'dark' : 'light');
  });
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

if (!window.localStorage.getItem(STORAGE_KEY)) {
  const handleSystemThemeChange = (event) => {
    applyTheme(event.matches ? 'dark' : 'light');
  };

  if (typeof systemPreference.addEventListener === 'function') {
    systemPreference.addEventListener('change', handleSystemThemeChange);
  } else if (typeof systemPreference.addListener === 'function') {
    systemPreference.addListener(handleSystemThemeChange);
  }
}

// Close menu when focus leaves the menu entirely
if (settingsMenu) {
  settingsMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      setTimeout(() => {
        if (!settingsMenu.contains(document.activeElement)) {
          closeMenu();
        }
      }, 0);
    }
  });
}
