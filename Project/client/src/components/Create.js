import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStudentsContext } from "../context/StudentsProvider";

function Create() {
    const [surname, setSurname] = useState("");
    const [lastname, setLastname] = useState("");
    const [classId, setClassId] = useState("");
    const { addStudent } = useStudentsContext(); // Use the context hook to access the addStudent function

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!surname || !lastname || !classId) {
            alert("Surname, lastname, and class ID are required");
            return;
        }

        const newStudent = {
            surname: surname,
            lastname: lastname,
            class_id: classId,
        };

        // Call the addStudent function from the context to add the new student
        addStudent(newStudent);

        // Redirect to home page after adding student
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Control
                        type="text"
                        placeholder="Enter Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastname">
                    <Form.Control
                        type="text"
                        placeholder="Enter Lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicClassId">
                    <Form.Control
                        type="number"
                        placeholder="Class ID"
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button
                    onClick={handleSubmit}
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>

                <Link className="d-grid gap-2" to="/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Create;
