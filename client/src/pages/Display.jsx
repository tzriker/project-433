import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../utils/Urls';
import TableHeader from '../components/TableHeader';
import EmployeeRows from '../components/EmployeeRows';
import SortAndSearch from '../components/SortAndSearch';
import { inputValidation } from '../services/InputValidation';
import { ZodError } from 'zod';
import { sortByKey } from '../services/SortingArray';

const Display = () => {

    const nav = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [editData, setEditData] = useState({});
    const [displayedData, setDisplayedData] = useState([])

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = async () => {
        try {
            const response = await axios.get(BASE_URL);
            setEmployees(response.data);
            setDisplayedData(response.data)
        } catch (error) {
            console.error("Error while fetching:", error);
        }
    };
    const reverse = () => {
        const reverseArray = [...displayedData].reverse()
        setDisplayedData(reverseArray)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setDisplayedData(employees.filter(employee => employee.id !== id)); // Remove deleted employee from state
            console.log("Item deleted:", id);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleEdit = async (id) => {
        setEditData({ ...employees.find(employee => employee.id === id) });
    };

    const handleInputChange = (e, fieldName) => {
        // Update the editData state with the changed value
        setEditData({ ...editData, [fieldName]: e.target.value });
    };

    const handleSave = async (id) => {
        try {
            editData.salary = String(editData.salary)
            const validateData = inputValidation.parse(editData)
            const finalData = { ...editData, ...validateData };
            await axios.put(`${BASE_URL}/${id}`, finalData);
            setEditData({}); // Clear editData after saving
            getAllEmployees()
            console.log("Item updated:", id);
        } catch (error) {
            if (error instanceof ZodError) {
                console.error("validation Error", error.errors);
            }
            else
                console.error("Error updating item:", error);
        }
    };
    const handleSort = (key) => {
        const sortedEmployees = sortByKey(displayedData, key);
        setDisplayedData(sortedEmployees);
    }
    const handleSearch = (query) => {
        // Perform filtering logic based on the search query
        const filtered = employees.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedData(filtered);
    };

    return (
        <div className="p-4">
            <SortAndSearch
                employees={displayedData}
                setEmployees={setDisplayedData}
                reverse={reverse}
                nav={nav}
                onSearch={handleSearch}
                onSort={handleSort}
            />
            <div>
                <table className="border-collapse border border-gray-400">
                    <TableHeader />
                    <tbody>
                        {displayedData.map((employee, index) => (
                            <EmployeeRows
                                key={employee.id}
                                employee={employee}
                                editData={editData}
                                handleEdit={handleEdit}
                                handleInputChange={handleInputChange}
                                handleSave={handleSave}
                                handleDelete={handleDelete}
                                index={index}
                                setEditData={setEditData}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Display;
