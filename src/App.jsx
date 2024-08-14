import { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import Filters from './components/Filters';

export default function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [ownerOptions, setOwnerOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [attorneyOptions, setAttorneyOptions] = useState([]);
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAttorneys, setSelectedAttorneys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 

  const handleStatusSelect = useCallback((status) => {
    setSelectedStatus(status);
  }, []);

  const handleOwnerSelect = useCallback((owner) => {
    setSelectedOwners(prevOwners => 
      prevOwners.includes(owner) 
        ? prevOwners.filter(o => o !== owner) 
        : [...prevOwners, owner]
    );
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategories(prevCategories => 
      prevCategories.includes(category) 
        ? prevCategories.filter(c => c !== category) 
        : [...prevCategories, category]
    );
  }, []);

  const handleAttorneySelect = useCallback((attorney) => {
    setSelectedAttorneys(prevAttorneys => 
      prevAttorneys.includes(attorney) 
        ? prevAttorneys.filter(a => a !== attorney) 
        : [...prevAttorneys, attorney]
    );
  }, []);

  const handleSearch = useCallback(async (query, filters = {}, page = 1) => {
    setLoading(true);
    const requestBody = {
      input_query: query,
      input_query_type: '',
      sort_by: 'default',
      status: filters.status || selectedStatus ? [selectedStatus] : [],
      exact_match: filters.exact_match || false,
      date_query: filters.date_query || false,
      owners: filters.owners || selectedOwners,
      attorneys: filters.attorneys || selectedAttorneys,
      law_firms: filters.law_firms || [],
      mark_description_description: filters.mark_description_description || [],
      classes: filters.classes || selectedCategories,
      page: page,
      rows: 6,
      sort_order: filters.sort_order || 'desc',
      states: filters.states || [],
      counties: filters.counties || [],
    };

    try {
      const response = await fetch('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.msg === 'ok') {
        setResults({
          query: query,
          total: data.body.hits.total.value,
          trademarks: data.body.hits.hits,
          aggregations: data.body.aggregations,
        });

        setTotalPages(Math.ceil(data.body.hits.total.value / 6)); 

        if (data.body.aggregations) {
          if (data.body.aggregations.current_owners) {
            setOwnerOptions(data.body.aggregations.current_owners.buckets.map(bucket => bucket.key));
          }

          if (data.body.aggregations.class_codes) {
            setCategoryOptions(data.body.aggregations.class_codes.buckets.map(bucket => bucket.key));
          }

          if (data.body.aggregations.attorneys) {
            setAttorneyOptions(data.body.aggregations.attorneys.buckets.map(bucket => bucket.key));
          }
        }
      } else {
        console.error('Unexpected API response format:', data);
        setResults({ query: query, total: 0, trademarks: [] });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults({ query: query, total: 0, trademarks: [] });
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, selectedOwners, selectedCategories, selectedAttorneys]);

  useEffect(() => {
    if (results?.query) {
      handleSearch(results.query, { status: selectedStatus, owners: selectedOwners, classes: selectedCategories, attorneys: selectedAttorneys }, currentPage);
    }
  }, [selectedStatus, selectedOwners, selectedCategories, selectedAttorneys, results?.query, currentPage, handleSearch]);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="flex">
      <div className="w-4/5 ml-10">
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <div className="mt-8 text-lg">Loading...</div>
        ) : (
          results && (
            <>
              <Results data={results} />
              <div className="flex justify-center mt-4">
                <button 
                  onClick={goToFirstPage} 
                  disabled={currentPage === 1}
                  className="bg-gray-300 text-gray-700 px-4 py-2 mx-2 rounded-lg flex items-center"
                >
                  <i className="fas fa-angle-double-left"></i>
                </button>
                <button 
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                  className="bg-gray-300 text-gray-700 px-4 py-2 mx-2 rounded-lg flex items-center"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages}
                  className="bg-blue-500 text-white px-4 py-2 mx-2 rounded-lg flex items-center"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <button 
                  onClick={goToLastPage} 
                  disabled={currentPage === totalPages}
                  className="bg-blue-500 text-white px-4 py-2 mx-2 rounded-lg flex items-center"
                >
                  <i className="fas fa-angle-double-right"></i>
                </button>
              </div>
            </>
          )
        )}
      </div>
      <div className="mr-56 mt-56 flex-none w-64"> 
        <Filters
          statusOptions={[]} 
          selectedStatus={selectedStatus}
          onSelectStatus={handleStatusSelect}
          ownerOptions={ownerOptions}
          selectedOwners={selectedOwners}
          onSelectOwner={handleOwnerSelect}
          categoryOptions={categoryOptions}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
          attorneyOptions={attorneyOptions}
          selectedAttorneys={selectedAttorneys}
          onSelectAttorney={handleAttorneySelect}
        />
    </div>
    </div>
  );
}
