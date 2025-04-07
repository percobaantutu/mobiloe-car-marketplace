import { Input } from "@/components/ui/input";
import React from "react";
import PropTypes from "prop-types"; // Add prop-type validation

function InputField({ item, onChange, value }) {
  // Changed prop name to onChange
  return (
    <div className="w-full">
      <Input
        type={item?.fieldType || "text"}
        name={item?.name}
        required={item?.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-blue-200"
        placeholder={item?.placeholder}
      />
    </div>
  );
}

// Add prop validation
InputField.propTypes = {
  item: PropTypes.shape({
    fieldType: PropTypes.string,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
