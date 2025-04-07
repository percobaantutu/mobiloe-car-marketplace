import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import PropTypes from "prop-types";

const sanitizeFilename = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-.]/g, "")
    .replace(/-+/g, "-");
};

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_MB = 5;

function UploadImages({ selectedFiles, setSelectedFiles, isUploading, existingImages }) {
  const onFileSelected = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => ALLOWED_MIME_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024);

    if (validFiles.length !== files.length) {
      alert(`Only ${ALLOWED_MIME_TYPES.join(", ")} files under ${MAX_FILE_SIZE_MB}MB allowed`);
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const onImageRemove = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Upload Car Images</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {existingImages?.map((imageUrl, index) => (
          <div key={`existing-${index}`} className="relative group">
            <img src={imageUrl} alt="Existing" className="w-full h-32 object-cover rounded-lg border-2 border-gray-200" />
          </div>
        ))}

        {selectedFiles.map((image, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <IoMdCloseCircle className="text-red-500 text-2xl cursor-pointer hover:text-red-600" onClick={() => onImageRemove(index)} />
            </div>

            <img src={URL.createObjectURL(image)} alt="Upload preview" className="w-full h-32 object-cover rounded-lg border-2 border-gray-200" />
          </div>
        ))}

        <label htmlFor="upload-images" className="cursor-pointer hover:bg-blue-50 transition-colors rounded-lg border-2 border-dashed border-green-400 flex items-center justify-center min-h-[128px]">
          <div className="text-center p-4">
            <div className="text-3xl text-green-500 mb-2">+</div>
            <div className="text-sm text-gray-600">Click to upload images</div>
            <div className="text-xs text-gray-500 mt-1">Max {MAX_FILE_SIZE_MB}MB each</div>
          </div>
        </label>

        <input type="file" multiple id="upload-images" className="hidden" onChange={onFileSelected} accept={ALLOWED_MIME_TYPES.join(",")} disabled={isUploading} />
      </div>

      {isUploading && <div className="mt-4 text-center text-green-600">Images will upload with form submission...</div>}
    </div>
  );
}

UploadImages.propTypes = {
  selectedFiles: PropTypes.array,
  setSelectedFiles: PropTypes.func,
  isUploading: PropTypes.bool,
  existingImages: PropTypes.array,
};

export default UploadImages;
