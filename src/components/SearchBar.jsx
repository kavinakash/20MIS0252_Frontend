import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    await onSearch(query, {});
  };

  return (
    <div className="flex items-center justify-between h-[70px] w-[1400px] mx-8 my-3 p-6">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src="src/assets/Logo.svg" alt="Logo" className="h-6 mx-4" />
      </div>

      {/* Search Input and Button */}
      <div className="flex items-center flex-grow mx-4">
        <div className="relative w-3/5">
          <input
            type="text"
            className="w-full h-14 px-10 py-2 border border-gray-300 rounded-xl focus:outline-slate-300"
            placeholder="Search trademarks here e.g., Mickey Mouse"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <button
          onClick={handleSearch}
          className="h-14 px-10 ml-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 font-bold"
        >
          Search
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
