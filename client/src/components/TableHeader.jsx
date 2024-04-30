import React from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th className="border border-gray-400 px-4 py-2">No</th>
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Position</th>
                <th className="border border-gray-400 px-4 py-2">Salary</th>
            </tr>
        </thead>
    );
}

export default TableHeader
