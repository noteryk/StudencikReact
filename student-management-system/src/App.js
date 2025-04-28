import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import ClassDetailsPage from './Components/ClassDetailsPage';
import AddStudentPage from './Components/AddStudentPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useEffect } from 'react';
import './styles.css';

function App() {
  const [classes, setClasses] = useLocalStorage('classes', []);
  const [students, setStudents] = useLocalStorage('students', []);
  
  // Inicjalizacja danych przy pierwszym uruchomieniu
  useEffect(() => {
    if (classes.length === 0 || students.length === 0) {
      const { initialData } = require('./Data/InitialData'); // Poprawiona ścieżka
      setClasses(initialData.classes);
      setStudents(initialData.students);
    }
  }, [classes, students, setClasses, setStudents]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/class/:classId" element={<ClassDetailsPage />} />
        <Route path="/add-student" element={<AddStudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;