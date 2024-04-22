import "../styles/RegisterFile.css";
import { RegisteredFile, Status, Professor, Course, Topic, Semester } from "../types/types";
import { useState, useEffect } from "react";
import { getAuthHeaders } from "../utils/getAuthHeaders";
import { getSessionCookie } from "../contexts/session";

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
        const files: string[] = data.files.map((file: string) => {
          return file.replace(/\s/g, "_");
        })
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
    fetch(`http://localhost:8000/api/get-peer-files/`, {
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
        topic: formData.get('topic'),
        semester: formData.get('semester'),
        professor: formData.get('professor'),
        course: formData.get('course'),
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

  // Filters Logic
  interface Filters extends Record<string, string> {
  professor: string;
  course: string;
  topic: string;
}
  const [filters, setFilters] = useState<Filters>({
    professor: '',
    course: '',
    topic: '',
  });
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    if (!getSessionCookie()) {
      return;
    }
    // Fetch professors
    fetchProfessors();
    // Fetch courses
    fetchCourses();
    // Fetch topics
    fetchTopics();
    // Fetch semesters
    fetchSemesters();
  }, []);


  const fetchProfessors = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/professors', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setProfessors(data);
      } else {
        console.error('Data fetched is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/courses', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        console.error('Data fetched is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/topics', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setTopics(data);
      } else {
        console.error('Data fetched is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };
  const fetchSemesters = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/semesters', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setSemesters(data);
      } else {
        console.error('Data fetched is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
    return (
        <div className="container">
          <div className="file-upload-card">
              <h1>Upload a File</h1>
              <p>Host a local file for the GT community!</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="file">File</label>
            <input type="file" name="file" id="file" />
            <div className="filter-item">
          <label htmlFor="professors">Professors:</label>
          <select id="professors" name="professor" value={filters.professor} onChange={handleChange}>
            <option value="">Select a Professor</option>
            {professors.map((professor) => (
              <option key={professor.id} value={professor.id}>{professor.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="courses">Course:</label>
          <select id="courses" name="course" value={filters.course} onChange={handleChange}>
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="topics">Topic:</label>
          <select id="topics" name="topic" value={filters.topic} onChange={handleChange}>
            <option value="">Select a Topic</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="semesters">Semester:</label>
          <select id="semester" name="semester" value={filters.semester} onChange={handleChange}>
            <option value="">Select a Semester</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>{semester.name}</option>
            ))}
          </select>
        </div>
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