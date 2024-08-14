import PropTypes from 'prop-types';

function CategoryFilter({ categoryOptions, selectedCategories, onSelectCategory }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Categories</h3>
      <div className="max-h-60 overflow-y-auto border border-gray-300 p-2 rounded-lg shadow-sm">
        {categoryOptions.map(category => (
          <label key={category} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onSelectCategory(category)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categoryOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
