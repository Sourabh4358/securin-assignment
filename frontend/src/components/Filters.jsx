import React from "react";

const Filters = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-md shadow-sm">
      <input
        type="text"
        placeholder="Search Title"
        value={filters.title}
        onChange={(e) => onChange({ ...filters, title: e.target.value })}
        className="px-3 py-2 border rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Cuisine"
        value={filters.cuisine}
        onChange={(e) => onChange({ ...filters, cuisine: e.target.value })}
        className="px-3 py-2 border rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={filters.rating}
        onChange={(e) => onChange({ ...filters, rating: e.target.value })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Ratings</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>

      <select
        value={filters.total_time}
        onChange={(e) => onChange({ ...filters, total_time: e.target.value })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Total Times</option>
        {[15, 30, 45, 60, 90, 120].map((t) => (
          <option key={t} value={t}>
            {t} min
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
