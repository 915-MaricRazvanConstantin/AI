const Class = require('../model/Class');
const Student = require("../model/Student");

const getAllClasses = () => {
    return Class.findAll()
        .then(classes => classes)
        .catch(error => {
            console.error('Error fetching classes:', error);
            throw new Error(`Error fetching classes: ${error}`);
        });

};

const getClassById = (id) => {
    return Class.findByPk(id)
        .then(class1 => class1)
        .catch(error => {
            console.error('Error fetching class by id: ', error);
            throw new Error(`Error fetching class by id: ${error}`);
        })
}

const createClass = (classData) => {
    return Class.create(...classData)
        .then(student => student)
        .catch(error => {
            console.error('Error creating class:', error);
            throw new Error(`Error creating class: ${error}`);
        });
};

const updateClass = (id, updatedClassData) => {
    return Student.update(updatedClassData, {
        where: { id },
        returning: true // Return the updated record
    })
        .then(([rowsUpdated, [updatedClass]]) => {
            if (rowsUpdated === 0) {
                throw new Error('Class not found');
            }
            return updatedClass;
        })
        .catch(error => {
            console.error('Error updating class:', error);
            throw new Error(`Error updating class: ${error}`);
        });
};

const deleteClass = (id) => {
    return Class.destroy({
        where: { id }
    })
        .then(deletedRows => {
            if (deletedRows === 0) {
                throw new Error('Class not found');
            }
            return deletedRows;
        })
        .catch(error => {
            console.error('Error deleting class:', error);
            throw new Error(`Error deleting student: ${error}`);
        });
};

module.exports = {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass
}