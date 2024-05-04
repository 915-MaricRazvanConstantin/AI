import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import { useStudentsContext } from "../context/StudentsProvider"; // Import the context hook

function Edit() {
    const { fetchStudent, updateStudent } = useStudentsContext(); // Use the context hook to access context values
    const { id } = useParams(); // Get the id from URL params
    const [surname, setSurname] = useState("");
    const [lastname, setLastname] = useState("");
    const [classId, setClassId] = useState("");

    useEffect(() => {
        fetchStudent(id); // Fetch student data on component mount
    }, [fetchStudent, id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (surname === "" || lastname === "" || classId === "") {
            alert("Invalid input");
            return;
        }

        updateStudent(id, { surname, lastname, class_id: classId }); // Update student data
    };

    return (
        <div>
            <Form onSubmit={handleUpdate} className="d-grid gap-2" style={{ margin: "5rem" }}>
                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Control
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        type="text"
                        placeholder="Enter Surname"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastname">
                    <Form.Control
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        type="text"
                        placeholder="Enter Lastname"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicClassId">
                    <Form.Control
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                        type="number"
                        placeholder="Class ID"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg">
                    Update
                </Button>
                <Link className="d-grid gap-2" to="/">
                    <Button variant="warning" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;