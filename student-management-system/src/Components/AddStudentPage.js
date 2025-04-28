import React, { useState } from 'react';

function AddStudentPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [average, setAverage] = useState('');
  const [classId, setClassId] = useState('');
  const [error, setError] = useState('');

  const classes = JSON.parse(localStorage.getItem('classes')) || [];
  const students = JSON.parse(localStorage.getItem('students')) || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Walidacja danych
    if (firstName.length < 2 || lastName.length < 2 || average < 0 || average > 6 || !classId) {
      setError('Wprowadź poprawne dane.');
      return;
    }

    // Tworzenie nowego ucznia
    const newStudent = {
        id: students.length + 1,
        firstName,
        lastName,
        averageGrade: parseFloat(average), // Konwersja na liczbę
        classId,
      };

    // Aktualizacja danych w localStorage
    localStorage.setItem('students', JSON.stringify([...students, newStudent]));

    // Resetowanie formularza
    alert(`Uczeń ${firstName} ${lastName} został dodany do klasy ${classId}!`);
    setFirstName('');
    setLastName('');
    setAverage('');
    setClassId('');
    setError('');
  };

  return (
    <div className="container">
      <h1>Dodaj ucznia</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Imię"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Średnia ocen"
          value={average}
          onChange={(e) => setAverage(e.target.value)}
        />
        <select value={classId} onChange={(e) => setClassId(e.target.value)}>
          <option value="">-- Wybierz klasę --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.id}
            </option>
          ))}
        </select>
        <button type="submit">Dodaj ucznia</button>
      </form>
    </div>
  );
}

export default AddStudentPage;