(() => {
  // Root element (<html>) — where you store the data-theme attribute
  const root = document.documentElement;
  // The toggle button in your nav
  const btn = document.getElementById("theme-toggle");
  // LocalStorage key for persisting the theme choice
  const storageKey = "theme"; // "light" | "dark"

  const getPreferredTheme = () => {
    // Reads previously saved theme choice
    const saved = localStorage.getItem(storageKey);
    // If saved is valid, use it
    if (saved === "light" || saved === "dark") return saved;

    // Otherwise, detect OS/browser preference
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Fall back to system preference
    return prefersDark ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    // Applies theme by setting attribute used in CSS :root[data-theme="dark"]
    root.setAttribute("data-theme", theme);
    // Updates button label so it shows the action the user can take next
    if (btn) btn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  };

  const setTheme = (theme) => {
    // Persists theme choice and applies it immediately
    localStorage.setItem(storageKey, theme);
    applyTheme(theme);
  };

  // Apply theme on page load
  applyTheme(getPreferredTheme());

  // Optional chaining prevents errors if button is missing
  btn?.addEventListener("click", () => {
    // Reads current theme from attribute (defaults to "light" if missing)
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    // Toggles theme and saves it
    setTheme(current === "dark" ? "light" : "dark");
  });
})();
