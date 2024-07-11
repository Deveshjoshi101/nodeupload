import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const onFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

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
      setMessage("File uploaded successfully");
      fetchFiles();
    } catch (err) {
      setMessage("Error uploading file");
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/files/list`
      );
      setFiles(res.data);
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
          <div className="mb-5">
            <label
              htmlFor="fileName"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              File Name
            </label>
            <input
              type="text"
              name="fileName"
              id="fileName"
              placeholder="File Name"
              value={fileName}
              onChange={onFileNameChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload File
            </label>

            <div className="mb-5">
              <input
                type="file"
                name="file"
                id="file"
                onChange={onFileChange}
                className="sr-only"
              />
              <label
                htmlFor="file"
                className="relative flex min-h-[150px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    {fileName || "Drop files here"}
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
          </div>

          <div>
            <button
              onClick={onUpload}
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit File
            </button>
          </div>
          <p>{message}</p>
          <h2 className="mt-6 text-xl font-semibold text-[#07074D]">
            Uploaded Files
          </h2>
          <ul>
            {files.map((file) => (
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
