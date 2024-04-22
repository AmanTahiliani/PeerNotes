import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Results.module.css'; // Make sure this path is correct
import { getAuthHeaders } from '../utils/getAuthHeaders';
import { File } from '../types/types';
import { Link } from 'react-router-dom';

const Results: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        // Need to double check this
        const queryString = location.search; // Includes the '?' prefix
        console.log(queryString)
        const response = await fetch(`http://localhost:8000/api/files/filter${queryString}`, {headers: getAuthHeaders()});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFiles(data);
      } catch (e) {
        console.error("Could not fetch files", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [location]);

  const handleSearchAgain = () => {
    navigate('/search');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src="/PeerNotes.png" alt="PeerNotes Logo" className={styles.logo} />
        <button onClick={handleSearchAgain} className={styles.searchAgainButton}>Search Again</button>
      </div>
      <div className={styles.resultsContainer}>
        {isLoading ? (
          <p>Loading...</p>
        ) : files.length ? (
            <table>
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Course</th>
                  <th>Professor</th>
                  <th>Semester</th>
                  <th>Upvotes</th>
                  <th>Downvotes</th>
                  <th>Original Author</th>
                  <th>Download</th>
                  <th>Upvote</th>
                  <th>Downvote</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td>{file.filename}</td>
                    <td>{file.course.name} {file.course.number}</td>
                    <td>{file.professor.name}</td>
                    <td>{file.semester.name}</td>
                    <td>{file.upvotes.length}</td>
                    <td>{file.downvotes.length}</td>
                    <td>{file.original_author.username}</td>
                    <td><DownloadButton file={file} /></td>
                    <td><UpvoteButton file={file} /></td>
                    <td><DownvoteButton file={file} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;


function DownloadButton({ file }: { file: File }) {
  const [success, setSuccess] = useState(false);
  const handleDownload = () => {
    // Implement download functionality
    fetch("http://localhost:8080/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: file.id, filename: file.filename, ip: file.original_author.ip_address }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success download response data:", data);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSuccess(false);
      });
  };
  return (
  <>
    {
      success === true ? 
      <Link to="/register">Downloaded!</Link> : 
      <button onClick={handleDownload}>Download</button>
    }
      </>
  );
}

function UpvoteButton({ file, onUpdate }: { file: File, onUpdate: () => void }) {
  const [upvoted, setUpvoted] = useState(false);

  const handleUpvote = async () => {
    try {
      await fetch(`http://localhost:8000/api/files/${file.id}/upvote/`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      setUpvoted(true);
      window.location.reload();
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <button onClick={handleUpvote}>Upvote</button>
  );
}

function DownvoteButton({ file, onUpdate }: { file: File, onUpdate: () => void }) {
  const [downvoted, setDownvoted] = useState(false);

  const handleDownvote = async () => {
    try {
      await fetch(`http://localhost:8000/api/files/${file.id}/downvote/`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      setDownvoted(true);
      window.location.reload();
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleDownvote}>Downvote</button>
  );
}