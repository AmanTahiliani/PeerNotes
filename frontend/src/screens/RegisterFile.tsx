import "../styles/RegisterFile.css";
import { RegisteredFile } from "../types/types";
import { useState, useEffect } from "react";

export default function RegisterFile() {
  const [registeredFiles, setRegisteredFiles] = useState<RegisteredFile[]>([]);

  useEffect(() => {
    fetchRegisteredFiles();
  }, [])
  const fetchRegisteredFiles = () => {
    return
    fetch("http://localhost:5000/files") // replace with local api endpoint
      .then(response => response.json())
      .then(data => {
          setRegisteredFiles(data);
      })
      .catch(error => console.error(error));
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle file upload
    const formData = new FormData(event.target as HTMLFormElement);
    const file = formData.get('file');
    console.log(file, typeof file)

  }
    return (
        <div className="container">
          <div className="file-upload-card">
              <h1>Upload a File</h1>
              <p>Host a local file for the GT community!</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="file">File</label>
              <input type="file" name="file" id="file" />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
          <div>
          <h1>Registered Files</h1>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Original Author</th>
                <th>Professor</th>
                <th>Semester</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {registeredFiles.map((file) => (
                <tr key={file.id}>
                  <td>{file.filename}</td>
                  <td>{file.original_author.username}</td>
                  <td>{file.professor.name}</td>
                  <td>{file.semester.name}</td>
                  <td>{file.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
    )
}