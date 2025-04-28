import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

function ClassDetailsPage() {
  const { classId } = useParams();
  const [classes, setClasses] = useLocalStorage('classes', []);
  const [students, setStudents] = useLocalStorage('students', []);
  const [average, setAverage] = useState('0.00');

  // Znajdź aktualną klasę
  const currentClass = classes.find((cls) => cls.id === classId);
  
  // Filtruj uczniów przypisanych do tej klasy
  const classStudents = students.filter((student) => student.classId === classId);

  // Oblicz średnią ocen klasy
  useEffect(() => {
    if (classStudents.length > 0) {
      const sum = classStudents.reduce((acc, student) => {
        const grade = parseFloat(student.averageGrade || 0); // Upewnij się, że średnia jest liczbą
        return acc + grade;
      }, 0);
      setAverage((sum / classStudents.length).toFixed(2)); // Oblicz średnią i zaokrąglij do 2 miejsc po przecinku
    } else {
      setAverage('Brak danych');
    }
  }, [classStudents]);

  return (
    <div className="container">
      <h1>Szczegóły klasy {classId}</h1>
      <p>Wychowawca: {currentClass?.teacher || 'Brak danych'}</p>
      <table>
        <thead>
          <tr>
            <th>L.p.</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Średnia ocen</th>
          </tr>
        </thead>
        <tbody>
          {classStudents.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.averageGrade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Średnia ocen klasy: {average}</p>
    </div>
  );
}

export default ClassDetailsPage;