"use client"; // Next.js 13+ App Router에서 클라이언트 컴포넌트로 설정

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* 로고 */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            NorDap
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          {/* 데스크톱 메뉴 */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 모바일 메뉴 */}
        {isOpen && (
          <ul className="md:hidden flex flex-col space-y-2 py-2">
            <li>
              <Link href="/" className="block text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="block text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
