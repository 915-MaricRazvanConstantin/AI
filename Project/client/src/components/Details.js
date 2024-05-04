import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStudentsContext } from '../context/StudentsProvider'; // Import the context hook

function Details() {
    const { fetchStudent } = useStudentsContext(); // Use the context hook to access context values
    const { id } = useParams(); // Get the id from URL params
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch person data based on the ID
        fetchStudent(id)
            .then(response => {
                setStudent(response);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id, fetchStudent]); // Include id and getPersonById in the dependency array

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!student) return <p>No student found</p>;

    return (
        <div>
            <h1>Student Details</h1>
            <p>ID: {student.id}</p>
            <p>Surname: {student.surname}</p>
            <p>Lastname: {student.lastname}</p>
            <p>Class ID: {student.class_id}</p>
        </div>
    );
}

export default Details;