import React, { useState, useEffect } from "react";
import "../../styles/global.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav className="navbar">
        <a href="/" onClick={scrollToTop} className="nav-link">
          Back to top
        </a>
        <a href="https://www.carolinecah.com" className="nav-link">
          About me
        </a>
      </nav>
    </header>
  );
}
