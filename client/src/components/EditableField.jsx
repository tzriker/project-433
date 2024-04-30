import React from 'react';

const EditableField = ({ isEditing, value, onChange }) => {
  return (
    <td className="border border-gray-400 px-4 py-2">
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        value
      )}
    </td>
  );
};

export default EditableField;
