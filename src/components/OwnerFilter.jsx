import PropTypes from 'prop-types';

function OwnerFilter({ ownerOptions, selectedOwners, onSelectOwner }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Owners</h3>
      <div className="max-h-60 overflow-y-auto border border-gray-300 p-2 rounded-lg shadow-sm">
        {ownerOptions.map(owner => (
          <label key={owner} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedOwners.includes(owner)}
              onChange={() => onSelectOwner(owner)}
              className="mr-2"
            />
            {owner}
          </label>
        ))}
      </div>
    </div>
  );
}

OwnerFilter.propTypes = {
  ownerOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOwners: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectOwner: PropTypes.func.isRequired,
};

export default OwnerFilter;
