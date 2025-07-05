import { useState, useEffect } from "react";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

const Darkmode = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.body.classList.remove("dark");
    if (isDark) {
      document.body.classList.add("dark");
    }
  }, [isDark]);

  return (
    <button
      className="px-3 py-3 bg-[var(--text)] rounded-3xl cursor-pointer hover:bg-[var(--accent)] duration-[0.3s]"
      onClick={toggleTheme}
    >
      {isDark ? (
        <IconSunFilled color="var(--bg)" size={20} />
      ) : (
        <IconMoonFilled color="var(--bg)" size={20} />
      )}
    </button>
  );
};

export default Darkmode;
