"use client";
import { useState, useEffect } from "react";
import Logo from "./logo";
import Togle from "./toggle";
import MenuItem from "@/menuItem";
import RootD from "./rootDirectories";
import SubD from "./subDirecotires";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [directories, setDirectories] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu");
        const data: MenuItem[] = await response.json();
        setDirectories(data);
      } catch (error) {
        console.error("Failed to fetch directories:", error);
      }
    };
    fetchDirectories();
  }, []);

  // Ensure unique keys even if IDs are duplicated
  const getUniqueKey = (dir: MenuItem) => `${dir.id}-${dir.parentId || "root"}`;

  return (
    <div className="flex">
      {isOpen && (
        <aside className="hidden md:flex flex-col w-64 h-screen bg-gray-900 text-white p-4">
          <div className="flex justify-between mb-6">
            <Logo />
            <button onClick={() => setIsOpen(false)}>
              <Togle />
            </button>
          </div>

          <nav className="space-y-2">
            {/* Root Directories */}
            <ul className="space-y-2">
              {directories
                .filter((dir) => !dir.parentId)
                .map((dir) => (
                  <li
                    key={getUniqueKey(dir)} // 👈 Unique key
                    className="text-xl font-bold flex gap-3"
                  >
                    <span>
                      <RootD />
                    </span>
                    {dir.name}
                  </li>
                ))}
            </ul>

            {/* Sub Directories */}
            <ul className="space-y-2">
              {directories
                .filter((dir) => dir.parentId)
                .map((dir) => (
                  <li
                    key={getUniqueKey(dir)} // 👈 Unique key
                    className="text-xl font-bold flex gap-3"
                  >
                    <span>
                      <SubD />
                    </span>
                    {dir.name}
                  </li>
                ))}
            </ul>

            {/* Other Section */}
            <h2 className="mt-4 text-sm font-bold">Other</h2>
            <ul className="space-y-2">
              <li key="users" className="flex items-center gap-2 text-gray-400">
                <span>📂</span> Users & Group
              </li>
              <li
                key="competition"
                className="flex items-center gap-2 text-gray-400"
              >
                <span>📂</span> Competition
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}
