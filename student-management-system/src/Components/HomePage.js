import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [selectedClass, setSelectedClass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClass) {
      navigate(`/class/${selectedClass}`);
    }
  };

  const classes = JSON.parse(localStorage.getItem('classes')) || [];

  return (
    <div className="container">
      <h1>System Zarządzania Uczniami</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Wybierz klasę --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.id}
            </option>
          ))}
        </select>
        <button type="submit">Zatwierdź</button>
      </form>
      <button onClick={() => navigate('/add-student')} style={{ marginTop: '20px' }}>
        Dodaj ucznia
      </button>
    </div>
  );
}

export default HomePage;