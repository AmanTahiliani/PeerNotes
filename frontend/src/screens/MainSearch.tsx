import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainScreenWrapper.css';

interface Filters {
  professor: string;
  course: string;
  topic: string;
}

const MainSearch: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    professor: '',
    course: '',
    topic: '',
  });
  const [professors, setProfessors] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch professors
    fetchProfessors();
    // Fetch courses
    fetchCourses();
    // Fetch topics
    fetchTopics();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await fetch('{{host}}/api/professors', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setProfessors(data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('{{host}}/api/courses', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await fetch('{{host}}/api/topics', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(filters as any);
    navigate(`/results?${searchParams}`);
  };

  return (
    <>
      <img src="/PeerNotes.png" alt="PeerNotes Logo" style={{ height: "100px" }} />
      <form onSubmit={handleSubmit} className="filter-container">
        <div className="filter-item">
          <label htmlFor="professors">Professors:</label>
          <select id="professors" name="professor" value={filters.professor} onChange={handleChange}>
            <option value="">Select a Professor</option>
            {professors.map((professor, index) => (
              <option key={index} value={professor}>{professor}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="courses">Course:</label>
          <select id="courses" name="course" value={filters.course} onChange={handleChange}>
            <option value="">Select a Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="topics">Topic:</label>
          <select id="topics" name="topic" value={filters.topic} onChange={handleChange}>
            <option value="">Select a Topic</option>
            {topics.map((topic, index) => (
              <option key={index} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </>
  );
}

export default MainSearch;
