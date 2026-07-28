import { Sun, Moon } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";

const ThemeToggle = ({ positionClass = "fixed bottom-6 right-6 z-50" }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`${positionClass} p-3 rounded-full bg-primary text-white shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all border border-white/20 backdrop-blur-md flex items-center justify-center`}
    >
      {theme === "dark" ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} className="text-white" />}
    </button>
  );
};

export default ThemeToggle;