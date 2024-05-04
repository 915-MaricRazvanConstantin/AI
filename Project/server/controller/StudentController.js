const StudentRepository = require('../repository/StudentRepository');
const ClassRepository = require('../repository/ClassRepository')
const ping = (req, res) => {
    res.status(200).json({ message: 'Server is up and running.' });
};

const getAllStudents = (req, res) => {
    StudentRepository.getAllStudents()
        .then(students => {
            res.json(students);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const createStudent = (req, res) => {
    const studentData = req.body;
    StudentRepository.createStudent(studentData)
        .then(newStudent => {
            console.log(newStudent);
            res.json(newStudent);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const getStudentByID = (req, res) => {
    const id = req.params.id;
    StudentRepository.getStudentById(id)
        .then(student => {
            if (student) {
                res.json(student);
            } else {
                res.status(404).json({ message: "Student not found" });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const updateStudent = (req, res) => {
    const id = req.params.id;
    const updatedStudentData = req.body;
    StudentRepository.updateStudent(id, updatedStudentData)
        .then(([_, updatedStudent]) => {
            if (updatedStudent) {
                console.log(updatedStudent);
                res.json(updatedStudent);
            } else {
                res.status(404).json({ message: "Student not found" });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const deleteStudent = (req, res) => {
    const id = req.params.id;
    StudentRepository.deleteStudent(id)
        .then(deletedStudent => {
            if (deletedStudent) {
                console.log('Deleted student:', deletedStudent);
                res.json(deletedStudent);
            } else {
                res.status(404).json({ message: "Student not found" });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

module.exports = {
    ping,
    getAllStudents,
    createStudent,
    getStudentByID,
    updateStudent,
    deleteStudent
};