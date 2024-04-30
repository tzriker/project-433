import React from 'react'

const EmployeeRows = ({ employee, editData, handleEdit, handleInputChange, handleSave, handleDelete, index, setEditData }) => {

    const isEditing = employee.id === editData.id
    return (
        <tr key={employee.id}>
            <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-400 px-4 py-2">{employee.id}</td>

            <td className="border border-gray-400 px-4 py-2">
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                    />
                ) : (
                    employee.name
                )}
            </td>

            <td className="border border-gray-400 px-4 py-2">
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.position}
                        onChange={(e) => handleInputChange(e, 'position')}
                    />
                ) : (
                    employee.position
                )}
            </td>

            <td className="border border-gray-400 px-4 py-2">
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.salary}
                        onChange={(e) => handleInputChange(e, 'salary')}
                    />
                ) : (
                    employee.salary
                )}
            </td>


            <td className='border '>
                {isEditing ? (
                    <>
                        <button className='border-2' onClick={() => handleSave(employee.id)}>Save</button>
                        <button className='border-2' onClick={() => setEditData({})}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className='border-2' onClick={() => handleEdit(employee.id)}>Edit</button>
                        <button className='border-2' onClick={() => handleDelete(employee.id)}>Delete</button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default EmployeeRows