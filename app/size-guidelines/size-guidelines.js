"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SizeGuidelines() {
  return (
    <div className="max-w-5xl mx-auto p-6 pt-35 pb-20">
      <h1 className="text-3xl font-bold text-center mb-6">Size Guidelines</h1>

      {/* Size Chart */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-3">Size</th>
              <th className="border p-3">Bust (inches)</th>
              <th className="border p-3">Waist (inches)</th>
              <th className="border p-3">Hips (inches)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-3 text-center">S</td>
              <td className="border p-3 text-center">31.5 - 33</td>
              <td className="border p-3 text-center">24.5 - 25.5</td>
              <td className="border p-3 text-center">34 - 36</td>
            </tr>
            <tr>
              <td className="border p-3 text-center">M</td>
              <td className="border p-3 text-center">35 - 37</td>
              <td className="border p-3 text-center">27.5 - 29.5</td>
              <td className="border p-3 text-center">38 - 40</td>
            </tr>
            <tr>
              <td className="border p-3 text-center">L</td>
              <td className="border p-3 text-center">39 - 41</td>
              <td className="border p-3 text-center">31.5 - 33.5</td>
              <td className="border p-3 text-center">42 - 44</td>
            </tr>
            <tr>
              <td className="border p-3 text-center">XL</td>
              <td className="border p-3 text-center">43</td>
              <td className="border p-3 text-center">36</td>
              <td className="border p-3 text-center">46</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-10 text-sm text-gray-600">
        <p>
          ⚠ Sizes may vary slightly depending on fabric and style. For the best
          fit, we recommend measuring your favorite clothing and comparing with
          our chart.
        </p>
      </div>
    </div>
  );
}
