'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Scheme = {
  id: string;
  name: string;
  hindiName: string;
};

export default function ManualApply() {
  const router = useRouter();

  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filtered, setFiltered] = useState<Scheme[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [showSection, setShowSection] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* 🔹 Fetch schemes */
  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
fetch(`${API}/schemes`)

      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSchemes(data);
          setFiltered(data);
        }
      })
      .catch(err => console.error("Scheme load failed", err));
  }, []);

  /* 🔎 Filter schemes */
  useEffect(() => {
    const result = schemes.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.hindiName.includes(search)
    );
    setFiltered(result);
  }, [search, schemes]);

  /* 🔒 Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    if (!selected) {
      alert("Please select a scheme");
      return;
    }
    router.push(`/apply/${selected}`);
  };

  const selectedScheme = schemes.find(s => s.id === selected);

  return (
    <div className="w-full max-w-md mt-6 bg-white p-6 rounded-2xl shadow-lg border border-green-100">

      {/* Toggle Button */}
      <button
        onClick={() => setShowSection(!showSection)}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
      >
        📝 Apply Manually
      </button>

      {showSection && (
        <div className="mt-6 space-y-4">

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search scheme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Custom Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="text-sm font-medium text-gray-600">
              📋 Choose Your Scheme
            </label>

            {/* Selected Box */}
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 bg-white shadow-sm cursor-pointer hover:border-blue-400 transition"
            >
              {selectedScheme ? (
                <>
                  <p className="font-semibold text-green-700">
                    {selectedScheme.hindiName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedScheme.name}
                  </p>
                </>
              ) : (
                <span className="text-gray-500">
                  -- Select Scheme --
                </span>
              )}
            </div>

            {/* Dropdown List */}
            {dropdownOpen && (
              <div className="absolute z-30 w-full mt-2 max-h-60 overflow-y-auto rounded-xl shadow-xl border bg-white">

                {filtered.length === 0 && (
                  <div className="p-3 text-sm text-gray-500">
                    No schemes found
                  </div>
                )}

                {filtered.map((scheme) => (
                  <div
                    key={scheme.id}
                    onClick={() => {
                      setSelected(scheme.id);
                      setDropdownOpen(false);
                    }}
                    className="p-3 hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 cursor-pointer border-b last:border-b-0 transition"
                  >
                    <p className="font-semibold text-green-700">
                      {scheme.hindiName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {scheme.name}
                    </p>
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleApply}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
          >
            🚀 Continue to Application
          </button>

        </div>
      )}
    </div>
  );
}