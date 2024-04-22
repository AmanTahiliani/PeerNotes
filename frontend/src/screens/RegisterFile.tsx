import "../styles/RegisterFile.css";
import { RegisteredFile, Status } from "../types/types";
import { useState, useEffect } from "react";
import { getAuthHeaders } from "../utils/getAuthHeaders";

export default function RegisterFile() {
  const [serverFiles, setServerFiles] = useState<RegisteredFile[]>([]);
  const [registeredFiles, setRegisteredFiles] = useState<RegisteredFile[]>([]);

  useEffect(() => {
    fetchServerFiles();
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8080/files`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const files: string[] = data.files
        setRegisteredFiles(
          serverFiles.map((file) => {
            if (files.includes(file.filename)) {
              file.status = Status.HOSTED;
              return file;
            }
            file.status = Status.PRIVATE;
            return file;
          })
        )
      })
  }, [serverFiles])

  const fetchServerFiles = () => {
    fetch(`http://localhost:8000/api/files/filter?peer_id=1`, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    .then(response => response.json())
    .then(data => {
      setServerFiles(data)
    })
    .catch(error => console.error(error));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle file upload
    const fileInput = document.getElementById('file');
    // @ts-expect-error - fileInput is an HTMLInputElement
    const filename: string = fileInput.files[0].name.replace(/\s/g, "_");
    const formData = new FormData(event.target as HTMLFormElement);
    // register file with central server
    fetch(`http://localhost:8000/api/register/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        filename: filename,
        topic: 1,
        semester: 1,
        professor: 1,
        course: 1,
      })
    })
      .then(response => response.json())
      .then(data => {
        formData.append("file_id", data.id)
        // send file to local
        return fetch("http://localhost:8080/copy-file", {
          method: 'POST',
          body: formData
        })
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        window.location.reload();
      })
      .catch(error => console.error(error));
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