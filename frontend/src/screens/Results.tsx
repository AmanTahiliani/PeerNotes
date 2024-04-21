import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Results.module.css'; // Make sure this path is correct

interface File {
  id: string;
  name: string; // do we even use id and name?
  professor: string;
  course: string;
  type?: string; // Assumed type is optional
  // what other properties to add?semester?
}

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
        const response = await fetch(`/api/path-to-filefilterview${queryString}`);
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
          <table className={styles.resultsTable}>
            {/* Table structure here */}
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
