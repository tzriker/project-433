import React, { useState } from 'react';

const SortAndSearch = ({ reverse, nav, onSort, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSort = (key) => {
        onSort(key)
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <div className="flex mb-4 justify-end">
            <div className="mr-4">
                <h4 className="ml-2">Sort by</h4>
                <select onChange={(e) => handleSort(e.target.value)} name="sort" className="ml-2 border rounded px-3 py-1">
                    <option value="createdAt">Time</option>
                    <option value="salary">Salary</option>
                    <option value="name">Name</option>
                    <option value="position">Position</option>
                </select>
                <button onClick={reverse} className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Reverse
                </button>
                <form onSubmit={handleSubmit} className="mr-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Apply
                    </button>
                    <input placeholder='Search by Name' type="text" value={searchQuery} onChange={handleInputChange} className="border rounded px-3 py-1 ml-2" />
                </form>
            </div>
            <div>
                <button onClick={() => nav('..')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Back
                </button>
                <button onClick={() => nav('../add')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add
                </button>
            </div>
        </div>
    );
};

export default SortAndSearch;
