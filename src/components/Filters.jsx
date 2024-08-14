import PropTypes from 'prop-types';
import StatusFilter from './StatusFilter';
import OwnerFilter from './OwnerFilter';
import CategoryFilter from './CategoryFilter';
import AttorneyFilter from './AttorneyFilter';

function Filters({ 
  statusOptions, 
  selectedStatus, 
  onSelectStatus, 
  ownerOptions, 
  selectedOwners, 
  onSelectOwner, 
  categoryOptions, 
  selectedCategories, 
  onSelectCategory, 
  attorneyOptions, 
  selectedAttorneys, 
  onSelectAttorney
}) {
  return (
    <div className="max-h-screen overflow-y-auto border border-gray-300 p-2 rounded-lg shadow-sm">
      <StatusFilter
        statusOptions={statusOptions}
        selectedStatus={selectedStatus}
        onSelectStatus={onSelectStatus}
      />
      <OwnerFilter 
        ownerOptions={ownerOptions}
        selectedOwners={selectedOwners}
        onSelectOwner={onSelectOwner}
      />
      <CategoryFilter 
        categoryOptions={categoryOptions}
        selectedCategories={selectedCategories}
        onSelectCategory={onSelectCategory}
      />
      <AttorneyFilter 
        attorneyOptions={attorneyOptions}
        selectedAttorneys={selectedAttorneys}
        onSelectAttorney={onSelectAttorney}
      />
    </div>
  );
}

Filters.propTypes = {
  statusOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedStatus: PropTypes.string.isRequired,
  onSelectStatus: PropTypes.func.isRequired,
  ownerOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOwners: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectOwner: PropTypes.func.isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  attorneyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAttorneys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectAttorney: PropTypes.func.isRequired
};

export default Filters;
