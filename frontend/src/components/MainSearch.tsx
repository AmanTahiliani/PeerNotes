import React, { useState } from 'react'; 
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

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = filters.toString()
    const searchParams = new URLSearchParams(input)
    navigate(`/results?${searchParams}`);
  };

  return (
    <>
    <img
      src="/PeerNotes.png" 
      alt="PeerNotes Logo" 
      style={{ 
        height: "100px"
      }} 
    />
    <form onSubmit={handleSubmit} className="filter-container">
      <div className="filter-item">
        <label htmlFor="professors">Professors:</label>
        <select id="professors" name="professor" value={filters.professor} onChange={handleChange}>
          <option value="">Select a Professor</option>
          {/* temporary options */}
          <option value="professor1">Professor 1</option>
          <option value="professor2">Professor 2</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="courses">Course:</label>
        <select id="courses" name="course" value={filters.course} onChange={handleChange}>
          <option value="">Select a Course</option>
          {/* temporary options */}
          <option value="course1">Course 1</option>
          <option value="course2">Course 2</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="topics">Topic:</label>
        <select id="topics" name="topic" value={filters.topic} onChange={handleChange}>
          <option value="">Select a Topic</option>
          {/* temporary options */}
          <option value="topic1">Topic 1</option>
          <option value="topic2">Topic 2</option>
        </select>
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
    </>
  );
}

export default MainSearch;
