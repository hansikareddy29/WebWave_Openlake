// src/components/FilterBar.jsx
import React, { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    subject: '',
    condition: '',
    availability: '',
    location: '' // For city/college
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <input
        name="subject"
        value={filters.subject}
        onChange={handleChange}
        placeholder="Filter by Subject (e.g., CSE)"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <select
        name="condition"
        value={filters.condition}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">All Conditions</option>
        <option value="Like New">Like New</option>
        <option value="Good">Good</option>
        <option value="Acceptable">Acceptable</option>
      </select>
      <select
        name="availability"
        value={filters.availability}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">All Availability</option>
        <option value="lend">For Lend</option>
        <option value="giveaway">For Giveaway</option>
      </select>
      <input
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="Filter by College/City"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default FilterBar;