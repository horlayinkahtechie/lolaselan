"use client";
import React from "react";

export default function SizeGuide() {
  const sizes = [
    {
      category: "Small (S)",
      uk: 6,
      bust: "31.5",
      waist: "24.5",
      hips: "34",
    },
    {
      category: "",
      uk: 8,
      bust: "33",
      waist: "25.5",
      hips: "36",
    },
    {
      category: "Medium (M)",
      uk: 10,
      bust: "35",
      waist: "27.5",
      hips: "38",
    },
    {
      category: "",
      uk: 12,
      bust: "37",
      waist: "29.5",
      hips: "40",
    },
    {
      category: "Large (L)",
      uk: 14,
      bust: "39",
      waist: "31.5",
      hips: "42",
    },
    {
      category: "",
      uk: 16,
      bust: "41",
      waist: "33.5",
      hips: "44",
    },
    {
      category: "Extra Large (XL)",
      uk: 18,
      bust: "43",
      waist: "36",
      hips: "46",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-center text-white text-2xl font-bold mb-6">
          Size Guide
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-center border-collapse bg-gray-800 text-gray-100">
            <thead className="bg-gray-700 text-sm uppercase">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">UK Size</th>
                <th className="p-3">Bust (inches)</th>
                <th className="p-3">Waist (inches)</th>
                <th className="p-3">Hips (inches)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  }`}
                >
                  <td className="p-3">{size.category}</td>
                  <td className="p-3">{size.uk}</td>
                  <td className="p-3">{size.bust}</td>
                  <td className="p-3">{size.waist}</td>
                  <td className="p-3">{size.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
