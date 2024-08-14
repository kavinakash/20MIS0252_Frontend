import PropTypes from 'prop-types';

function StatusFilter({ selectedStatus, onSelectStatus }) {
  const statuses = [
    { label: 'All', value: '' },
    { label: 'Registered', value: 'registered' },
    { label: 'Pending', value: 'pending' },
    { label: 'Abandoned', value: 'abandoned' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <div className="w-1/4 p-4">
      <h3 className="text-lg font-bold mb-2">Status</h3>
      <div className="space-y-2">
        {statuses.map((status) => (
          <button
            key={status.value}
            className={`flex items-center px-4 py-2 rounded-full border ${
              selectedStatus === status.value ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-700'
            }`}
            onClick={() => onSelectStatus(status.value)}
          >
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                status.value === 'registered' ? 'bg-green-500' :
                status.value === 'pending' ? 'bg-yellow-500' :
                status.value === 'abandoned' ? 'bg-red-500' :
                status.value === 'other' ? 'bg-blue-500' : 'bg-gray-400'
              }`}
            ></span>
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}

StatusFilter.propTypes = {
  selectedStatus: PropTypes.string.isRequired,
  onSelectStatus: PropTypes.func.isRequired,
};

export default StatusFilter;
