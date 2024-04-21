import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Results.module.css'; // Make sure this path is correct
import { getAuthHeaders } from '../utils/getAuthHeaders';
import { File } from '../types/types';

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
            files.map((file) => (
            <>
            <div key={file.id} className={styles.fileCard}>
              <h3>{file.filename}</h3>
              <p>Course: {file.course.name} {file.course.number}</p>
              <p>Professor: {file.professor.name}</p>
              <p>Semester: {file.semester.name}</p>
              <p>Upvotes: {file.upvotes.length}</p>
              <p>Downvotes: {file.downvotes.length}</p>
            </div>
            <div key={file.id} className={styles.fileCard}>
              <h3>{file.filename}</h3>
              <p>Course: {file.course.name} {file.course.number}</p>
              <p>Professor: {file.professor.name}</p>
              <p>Semester: {file.semester.name}</p>
              <p>Upvotes: {file.upvotes.length}</p>
              <p>Downvotes: {file.downvotes.length}</p>
                </div>
                </>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
