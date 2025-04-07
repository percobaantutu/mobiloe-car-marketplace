import React from "react";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";

function TextAreaField({ item, onChange, change, value }) {
  // Changed prop name to onChange
  return (
    <div className="w-full">
      <Textarea
        onChange={(e) => onChange(e.target.value)}
        required={item.required}
        value={value}
        placeholder={item.placeholder || `Enter ${item.label}`}
        className="min-h-[100px] rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}

TextAreaField.propTypes = {
  item: PropTypes.shape({
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
