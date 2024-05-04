const Student = require('../model/Student'); // Assuming your Student model is defined in a file named 'Student.js'

const getAllStudents = () => {
    return Student.findAll()
        .then(students => students)
        .catch(error => {
            console.error('Error fetching students:', error);
            throw new Error('Error fetching students');
        });
};

const getStudentById = (id) => {
    return Student.findByPk(id)
        .then(student => student)
        .catch(error => {
            console.error('Error fetching student by id:', error);
            throw new Error('Error fetching student by id');
        });
};

const createStudent = (studentData) => {
    return Student.create(studentData)
        .then(student => student)
        .catch(error => {
            console.error('Error creating student:', error);
            throw new Error('Error creating student');
        });
};

const updateStudent = (id, updatedStudentData) => {
    return Student.update(updatedStudentData, {
        where: { id },
        returning: true // Return the updated record
    })
        .then(([rowsUpdated, [updatedStudent]]) => {
            if (rowsUpdated === 0) {
                throw new Error('Student not found');
            }
            return updatedStudent;
        })
        .catch(error => {
            console.error('Error updating student:', error);
            throw new Error('Error updating student');
        });
};

const deleteStudent = (id) => {
    return Student.destroy({
        where: { id }
    })
        .then(deletedRows => {
            if (deletedRows === 0) {
                throw new Error('Student not found');
            }
            return deletedRows;
        })
        .catch(error => {
            console.error('Error deleting student:', error);
            throw new Error('Error deleting student');
        });
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};