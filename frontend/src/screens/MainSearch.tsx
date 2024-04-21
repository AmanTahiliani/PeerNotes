import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainScreenWrapper.css';
import { getSessionCookie } from '../contexts/session';
import { Professor, Course, Topic } from "../types/types";

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
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch professors
    fetchProfessors();
    // Fetch courses
    fetchCourses();
    // Fetch topics
    fetchTopics();
  }, []);

  const getAuthHeaders = () => {
    const token = getSessionCookie();
    // const token = localStorage.getItem('authToken');
    console.log("Using token for API call:", token);
    return {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchProfessors = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/professors', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      console.log("Professors fetched:", data);

      if (Array.isArray(data)) {
        console.log("Professors fetched:", data);
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
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </>
  );
}

export default MainSearch;
