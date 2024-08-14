import PropTypes from 'prop-types';

function Results({ data }) {
  const limitDescription = (description) => {
    const words = description.split(' ');
    return words.length > 30 ? words.slice(0, 30).join(' ') + '...' : description;
  };

  return (
    <div className="container p-4 w-5/6 ml-10">
      <h2 className="text-2xl font-bold mb-4">Search Results for `{data.query}`</h2>
      <p className="text-lg mb-6">Total Results: {data.total}</p>

      {/* Table Headers */}
      <div className="grid grid-cols-4 gap-2 font-semibold text-gray-700 mb-4">
        <div>Mark</div>
        <div>Details</div>
        <div>Status</div>
        <div>Class/Description</div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {data.trademarks.map((trademark, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 transition-colors duration-300" // Added hover effect and transition
            style={{ height: '100px' }} // Adjust height here
          >
            {/* Mark */}
            <div className="flex items-center w-1/4">
              <img
                src="https://via.placeholder.com/50"
                alt="Trademark"
                className="w-16 h-16 rounded-md"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col w-1/4">
              <p className="font-bold">{trademark._source.mark_identification}</p>
              <p>{trademark._source.current_owner}</p>
              <p className="mt-2">
                {trademark._id}
                <br />
                {new Date(trademark._source.filing_date * 1000).toLocaleDateString()}
              </p>
            </div>

            {/* Status */}
            <div className="flex flex-col items-start w-1/4">
              <span 
                className={`flex items-center font-bold 
                  ${trademark._source.status_type.toLowerCase().includes('pending') ? 'text-yellow-500' : ''} 
                  ${trademark._source.status_type.toLowerCase().includes('abandoned') ? 'text-red-500' : ''} 
                  ${trademark._source.status_type.toLowerCase().includes('registered') ? 'text-green-500' : ''}`}
              >
                {trademark._source.status_type}
              </span>
              <p className="text-gray-500 text-sm">
                on {new Date(trademark._source.status_date * 1000).toLocaleDateString()}
              </p>
            </div>

            {/* Class/Description */}
            <div className="flex flex-col w-1/4">
              <p className="line-clamp-3 overflow-hidden">
                {limitDescription(trademark._source.mark_description_description.join("; "))}
              </p>
              <div className="flex items-center mt-2">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7v14" />
                  </svg>
                </span>
                <p className="font-bold">Class {trademark._source.class_codes.join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Results.propTypes = {
  data: PropTypes.shape({
    query: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    trademarks: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        _source: PropTypes.shape({
          mark_identification: PropTypes.string.isRequired,
          current_owner: PropTypes.string.isRequired,
          status_type: PropTypes.string.isRequired,
          status_date: PropTypes.number.isRequired,
          filing_date: PropTypes.number.isRequired,
          class_codes: PropTypes.arrayOf(PropTypes.string).isRequired,
          mark_description_description: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Results;
