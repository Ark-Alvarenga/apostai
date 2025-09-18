"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Para detectar a página atual
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface MenuItem {
  label: string;
  link: string;
  items?: MenuItem[]; // Subitens opcionais
}

export const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Pega o caminho da URL atual

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menu: MenuItem[] = [
    { label: "Próximos Jogos", link: "/nextGames" },
    { label: "Assistente AI", link: "/feature" },
  ];

  return (
    <header className=" text-white font-nunito">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          {menu.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                href={item.link}
                className={`relative z-10 px-2 py-1 rounded-md transition-all ${
                  pathname === item.link
                    ? "bg-primary-600  text-black"
                    : "hover:text-primary-600"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 bg-background-medium-800 right-4 rounded-lg w-64 md:hidden shadow-lg border border-background-light-300">
          <ul className="flex flex-col gap-4 p-4">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`block py-2 px-4 rounded-md transition-all ${
                    pathname === item.link
                      ? "bg-primary-600  text-black"
                      : "hover:text-primary-600"
                  }`}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
