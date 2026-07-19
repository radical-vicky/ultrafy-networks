"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#offerings", label: "What We Offer" },
  { href: "#packages", label: "Packages" },
  { href: "#careers", label: "Careers" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#invest", label: "Invest" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 sm:mx-4 lg:mx-auto">
        <a href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-signal-blue to-signal-green font-display text-lg font-extrabold text-white">
            U
          </span>
          <span className="font-display text-lg font-bold text-ink">
            Ultrafy <span className="text-signal-green">Networks</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink/70 transition hover:text-signal-blue">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:0703199691" className="font-mono text-sm text-ink/70 hover:text-signal-blue">
            0703 199 691
          </a>
          <a
            href="https://wa.me/254703199691"
            target="_blank"
            className="rounded-full bg-signal-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-signal-greendark"
          >
            WhatsApp Us
          </a>
        </div>

        {/* Mobile menu toggle — clear hamburger that animates into an X */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-signal-blue/20 bg-white/80 shadow-sm transition hover:border-signal-blue/40 hover:bg-white lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                open ? "top-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-ink transition-all duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                open ? "top-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={`glass-strong absolute left-4 right-4 top-[76px] rounded-2xl p-3 shadow-glass transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-ink/80 transition hover:bg-white/70 hover:text-signal-blue"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:0703199691"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 font-mono text-sm text-ink/70 hover:bg-white/70"
            >
              0703 199 691
            </a>
            <a
              href="https://wa.me/254703199691"
              target="_blank"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-signal-green px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-signal-greendark"
            >
              WhatsApp Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
          }
          
