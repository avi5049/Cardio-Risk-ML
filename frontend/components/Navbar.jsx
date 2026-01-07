"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 32C18 32 30 24 30 14C30 10.287 27.3137 7 24 7C21.6 7 19.5 8.5 18 10.5C16.5 8.5 14.4 7 12 7C8.68629 7 6 10.287 6 14C6 24 18 32 18 32Z"
              fill="url(#heart-gradient)"
              stroke="#6366f1"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="heart-gradient"
                x1="6"
                y1="7"
                x2="30"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ef4444" />
                <stop offset="1" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </svg>
          <span>CardioRisk</span>
        </Link>

        {/* Navigation Links - Reordered: Assessment before About */}
        <div className="navbar-links">
          <Link
            href="/"
            className={`navbar-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/assess"
            className={`navbar-link ${isActive("/assess") ? "active" : ""}`}
          >
            Assessment
          </Link>
          <Link
            href="/about"
            className={`navbar-link ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <Link href="/assess" className="btn btn-primary navbar-cta">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-controls">
          <button
            onClick={toggleTheme}
            className="theme-toggle mobile"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button className="mobile-menu-btn" aria-label="Toggle menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
