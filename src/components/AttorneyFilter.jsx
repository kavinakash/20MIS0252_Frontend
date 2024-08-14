import PropTypes from 'prop-types';

function AttorneyFilter({ attorneyOptions, selectedAttorneys, onSelectAttorney }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Attorneys</h3>
      <div className="max-h-60 overflow-y-auto border border-gray-300 p-2 rounded-lg shadow-sm">
        {attorneyOptions.map(attorney => (
          <label key={attorney} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedAttorneys.includes(attorney)}
              onChange={() => onSelectAttorney(attorney)}
              className="mr-2"
            />
            {attorney}
          </label>
        ))}
      </div>
    </div>
  );
}

AttorneyFilter.propTypes = {
  attorneyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAttorneys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectAttorney: PropTypes.func.isRequired,
};

export default AttorneyFilter;
