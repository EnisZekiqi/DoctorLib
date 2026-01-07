"use client";

import { CircleQuestionMark, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  const isSearch = path.startsWith("/search");

  if (path === "/login") return null;

  return (
    <header
      className={`
        w-full
        absolute top-0 z-50
        px-3 sm:px-6 py-3
        ${isSearch ? "bg-[#1aa6a4]" : "bg-transparent"}
      `}
    >
      <nav
        className={`
          flex items-center justify-between
          rounded-2xl
          px-3 py-2 sm:px-4 sm:py-3
          ${isSearch ? "text-white" : "text-[#232929]"}
          sm:bg-[#EFF1F1]
        `}
      >
        {/* Left icon */}
        {isSearch ? (
          <Link href="/" className="md:hidden">
            <ChevronLeft size={20} />
          </Link>
        ) : (
          <CircleQuestionMark size={20} className="md:hidden text-[#5e6e6d]" />
        )}

        {/* Logo */}
        <h1 className="text-xl font-medium italic text-center w-full md:w-auto">
          MyDoc
        </h1>

        {/* Right icon (mobile) */}
        <Link href="/login" className="md:hidden">
          <User size={20} className="text-[#5e6e6d]" />
        </Link>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <button className="text-sm text-[#232929] hover:text-[#5e6e6d]">
            Are you a health professional?
          </button>

          <button className="flex items-center gap-1 text-sm text-[#232929] hover:text-[#5e6e6d]">
            <CircleQuestionMark size={18} />
            Help Center
          </button>

          <Link
            href="/login"
            className="flex items-center gap-2 bg-[#1e83fe] hover:bg-[#0169e8] transition-all duration-200 text-white px-2 text-md py-2 rounded-xl"
          >
            <User size={18} />
            Log In
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
