"use client";
import { ChevronDown, CircleCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useChatConfig } from "@/app/context/chat-config-context";

export default function ConfigSection({ domain, chatType }) {
  const { state, dispatch } = useChatConfig();
  const section = state[chatType][domain];
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [showMenu]);

  const options = {
    content: [
      { label: "Add Padding", value: "padding" },
      { label: "Flex Direction", value: "flexDirection" },
    ],
    author: [
      { label: "Background Color", value: "bgColor" },
      { label: "Font Settings", value: "font" },
      { label: "Padding", value: "padding" },
    ],
    message: [
      { label: "Background Color", value: "bgColor" },
      { label: "Font Settings", value: "font" },
      { label: "Padding", value: "padding" },
    ],
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-purple-500">
          {domain.charAt(0).toUpperCase() + domain.slice(1)}
        </h3>
        <button
          ref={buttonRef}
          onClick={() => setShowMenu(!showMenu)}
          className="text-xl text-purple-600"
        >
          +
        </button>
      </div>

      {showMenu && (
        <ul
          ref={menuRef}
          className="absolute bg-secondary border rounded shadow z-10"
        >
          {options[domain].map((opt) => (
            <li key={opt.value}>
              <button
                className={`flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 disabled:opacity-50 ${
                  section.active.includes(opt.value)
                    ? "text-green-400"
                    : "text-gray-200"
                }`}
                disabled={section.active.includes(opt.value)}
                onClick={() => {
                  dispatch({
                    chatType,
                    domain,
                    type: opt.value,
                    payload: [...section.active, opt.value],
                  });
                  setShowMenu(false);
                }}
              >
                {opt.label}
                {section.active.includes(opt.value) && (
                  <CircleCheck size={16} className="ml-2" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* children controls rendered in ConfigWrapper based on state */}
    </div>
  );
}
