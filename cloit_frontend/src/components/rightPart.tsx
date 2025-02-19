"use client";
import { useState } from "react";
import MenuItem from "../menuItem";

type Props = {
  menuItems: MenuItem[];
};

const MenuComponent: React.FC<Props> = ({ menuItems }) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelect = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const renderMenuTree = (parentId: number | null, depth = 0) => {
    return menuItems
      .filter((item) => item.parentId === parentId)
      .map((item) => (
        <div key={item.id} className="ml-4">
          <button
            onClick={() => toggleExpand(item.id)}
            className="font-bold text-gray-700 hover:text-black"
          >
            {expandedItems.includes(item.id) ? "▼" : "▶"} {item.name}
          </button>
          <button
            onClick={() => handleSelect(item)}
            className={`ml-2 px-2 py-1 border rounded ${
              selectedItem?.id === item.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Select
          </button>
          {expandedItems.includes(item.id) && (
            <div className="ml-4">{renderMenuTree(item.id, depth + 1)}</div>
          )}
        </div>
      ));
  };

  return (
    <div className="flex space-x-6 p-6 bg-white">
      {/* Menu List */}
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-xl font-semibold">Menus</h2>
        <div className="flex gap-2 my-2">
          <button
            onClick={() => setExpandedItems(menuItems.map((m) => m.id))}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedItems([])}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Collapse All
          </button>
        </div>
        <div>{renderMenuTree(null)}</div>
      </div>

      {/* Edit Section */}
      {selectedItem && (
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-semibold mb-2">Edit Menu</h3>
          <div className="mb-2">
            <label className="block text-sm font-medium">Menu ID</label>
            <input
              type="text"
              value={selectedItem.id}
              disabled
              className="w-full border px-3 py-1 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Depth</label>
            <input
              type="text"
              value={selectedItem.depth}
              disabled
              className="w-full border px-3 py-1 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Parent</label>
            <input
              type="text"
              value={
                menuItems.find((m) => m.id === selectedItem.parentId)?.name ||
                "None"
              }
              disabled
              className="w-full border px-3 py-1 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={selectedItem.name}
              disabled
              className="w-full border px-3 py-1 rounded"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded mt-3">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
