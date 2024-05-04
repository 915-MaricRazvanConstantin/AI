import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const StudentsContext = createContext();

export const useStudentsContext = () => useContext(StudentsContext);

export const StudentsProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(); // Fetch initial data
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5000/api/students')
            .then(response => {
                setStudents(response.data);
                console.log(response);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setError(error);
                setLoading(false);
            });
    };

    const fetchStudent = (id) => {
        return axios.get(`http://localhost:5000/api/students/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching student by ID: ', error);
                throw error;
            });
    };


    const addStudent = (newStudent) => {
        // Assuming the API supports adding a new student
        axios.post('http://localhost:5000/api/students', newStudent)
            .then(response => {
                setStudents(prevStudents => [...prevStudents, response.data]);
                window.alert('Successfully added new student');
            })
            .catch(error => {
                console.error('Error adding student: ', error);
                // Handle error if needed
            });
    };

    const deleteStudent = (id) => {
        // Assuming the API supports deleting a student
        axios.delete(`http://localhost:5000/api/students/${id}`)
            .then(() => {
                setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
            })
            .catch(error => {
                console.error('Error deleting student: ', error);
                // Handle error if needed
            });
    };

    const updateStudent = (id, updatedData) => {
        // Assuming the API supports updating a student
        axios.put(`http://localhost:5000/api/students/${id}`, updatedData)
            .then(() => {
                // Update the local state with the updated student data
                setStudents(prevStudents => prevStudents.map(student => {
                    if (student.id === id) {
                        return { ...student, ...updatedData };
                    }
                    return student;
                }));
                // Display a success alert
                window.alert('Student updated successfully.');
            })
            .catch(error => {
                console.error('Error updating student: ', error);
                // Handle error if needed
            });
    };

    return (
        <StudentsContext.Provider value={{ students, loading, error, addStudent, deleteStudent, fetchStudent, updateStudent }}>
            {children}
        </StudentsContext.Provider>
    );
};
