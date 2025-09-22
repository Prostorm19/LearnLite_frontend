import React, { useState, useRef } from "react";

export default function UploadForm() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);

    // This function is called when files are selected or dropped
    const onFiles = (files) => {
        // Create a new array of file objects from the FileList
        const newItems = Array.from(files).map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            size: file.size,
        }));
        // Add the new files to the existing state
        setUploadedFiles((currentFiles) => [...currentFiles, ...newItems]);
    };

    // Handles the drag-and-drop functionality
    const handleDrop = (event) => {
        event.preventDefault(); // Prevent the browser from opening the file
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            onFiles(event.dataTransfer.files);
            event.dataTransfer.clearData();
        }
    };

    return (
        <div
            className="upload-form"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()} // Necessary to allow dropping
        >
            <h3>Upload</h3>
            <div
                className="drop-zone"
                onClick={() => fileInputRef.current.click()} // Open file dialog on click
            >
                <p>
                    Drag & drop files or <span className="link">Browse</span>
                </p>
                <small>Supported formats: JPEG, PNG, GIF, MP4, PDF, PPT</small>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    hidden // Hide the default file input
                    onChange={(e) => onFiles(e.target.files)}
                />
            </div>

            <div className="uploaded-files">
                <h4>Uploading ({uploadedFiles.length})</h4>
                <ul>
                    {uploadedFiles.map((file) => (
                        <li key={file.id} className="file-row">
                            <div>
                                <div>{file.name}</div>
                                {/* Convert size from bytes to KB */}
                                <small>{Math.round(file.size / 1024)} KB</small>
                            </div>
                            <span className="uploaded-status">Uploaded</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}