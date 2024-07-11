import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onFileChange = (e) => {
    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Files uploaded successfully");
      setFiles([]);
      fetchFiles();
    } catch (err) {
      setMessage("Error uploading files");
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/files/list`
      );
      setUploadedFiles(res.data);
    } catch (err) {
      setMessage("Error fetching files");
    }
  };

  const onDownload = async (id, name) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/files/${id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setMessage("Error downloading file");
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/files/${id}`);
      setMessage("File deleted successfully");
      fetchFiles();
    } catch (err) {
      setMessage("Error deleting file");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-4 px-9" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload Files
            </label>

            <div className="mb-5">
              <input
                type="file"
                name="files"
                id="files"
                multiple
                onChange={onFileChange}
                className="sr-only"
              />
              <label
                htmlFor="files"
                className="relative flex min-h-[150px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    {files.length > 0
                      ? files.map((file) => file.name).join(", ")
                      : "Drop files here"}
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
                </div>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mb-4">
                <ul>
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between mb-2"
                    >
                      <span className="text-base font-medium text-[#07074D]">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-[#FF0000] font-semibold"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={onUpload}
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit Files
            </button>
          </div>
          <p>{message}</p>
          <h2 className="mt-6 text-xl font-semibold text-[#07074D]">
            Uploaded Files
          </h2>
          <ul>
            {uploadedFiles.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between mb-4"
              >
                <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                  {file.name} - {new Date(file.createdAt).toLocaleString()}
                </span>
                <div className="flex space-x-2">
                  <button
                    className="text-[#07074D] bg-[#F5F7FB] py-1 px-3 rounded-md"
                    onClick={() => onDownload(file.id, file.name)}
                  >
                    Download
                  </button>
                  <button
                    className="text-[#07074D] bg-[#F5F7FB] py-1 px-3 rounded-md"
                    onClick={() => onDelete(file.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
