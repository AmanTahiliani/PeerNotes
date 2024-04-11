import React from 'react';
import '../styles/MainScreenWrapper.css';

const MainSearch: React.FC = () => {
  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="professors">Professors:</label>
        <select id="professors">
          <option value="">Select a Professor</option>
          {/* temporary */}
          <option value="professor1">Professor 1</option>
          <option value="professor2">Professor 2</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="courses">Course:</label>
        <select id="courses">
          <option value="">Select a Course</option>
          {/* temporary */}
          <option value="course1">Course 1</option>
          <option value="course2">Course 2</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="topics">Topic:</label>
        <select id="topics">
          <option value="">Select a Topic</option>
          {/* temporary */}
          <option value="topic1">Topic 1</option>
          <option value="topic2">Topic 2</option>
        </select>
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </div>
  );
}

export default MainSearch;
