import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropTypes from "prop-types"; // Add prop-type validation

function DropdownField({ item, onChange, value }) {
  // Changed prop name to onChange
  return (
    <div className="w-full">
      <Select
        onValueChange={(value) => onChange(value)} // Simplified parameter
        required={item.required}
        value={value}
      >
        <SelectTrigger className="w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-blue-200">
          <SelectValue placeholder={item.placeholder || `Select ${item.label}`} />
        </SelectTrigger>
        <SelectContent>
          {item.options.map((option, index) => (
            <SelectItem
              value={option}
              key={option + index} // Better key strategy
              className="hover:bg-gray-100"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Add prop validation
DropdownField.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownField;
