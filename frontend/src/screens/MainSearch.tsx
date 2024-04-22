import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainScreenWrapper.css';
import { getAuthHeaders } from '../utils/getAuthHeaders';
import { Professor, Course, Topic, Semester } from "../types/types";
import { getSessionCookie } from '../contexts/session';

interface Filters extends Record<string, string> {
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
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const navigate = useNavigate();

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
    const token = getSessionCookie();
    try {
      const response = await fetch(`${import.meta.env.VITE_CENTRAL_SERVER}/api/professors/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      const data = await response.json();
      console.log("HEREEEEEE", data);
      console.log(response)
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
      const response = await fetch(`${import.meta.env.VITE_CENTRAL_SERVER}/api/courses`, {
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
      const response = await fetch(`${import.meta.env.VITE_CENTRAL_SERVER}/api/topics`, {
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
      const response = await fetch(`${import.meta.env.VITE_CENTRAL_SERVER}/api/semesters`, {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(filters);
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
    </>
  );
}

export default MainSearch;
