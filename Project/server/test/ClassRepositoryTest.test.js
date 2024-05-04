const { describe, test, expect} = require('@jest/globals');
const ClassRepository = require('../repository/ClassRepository');

// Mock Class model
class MockClass {
    constructor() {
    }
    static findAll() {
        return Promise.resolve([
            { id: 1, name: 'Class A' },
            { id: 2, name: 'Class B' }
        ]);
    }

    static findByPk(id) {
        const classes = [
            { id: 1, name: 'Class A' },
            { id: 2, name: 'Class B' }
        ];
        return Promise.resolve(classes.find(cls => cls.id === id));
    }

    static create(data) {
        return Promise.resolve(data);
    }

    static update(data, options) {
        return Promise.resolve([1, [data]]);
    }

    static destroy(options) {
        return Promise.resolve(1);
    }
}

jest.mock('../model/Class', () => ({
    __esModule: true,
    default: MockClass
}));

describe('getAllClasses function', () => {
    test('should return all classes', async () => {
        const classes = await ClassRepository.getAllClasses();
        expect(classes).toEqual([
            { id: 1, name: 'Class A' },
            { id: 2, name: 'Class B' }
        ]);
    });
});

describe('getClassById function', () => {
    test('should return the correct class if found', async () => {
        const class1 = await ClassRepository.getClassById(1);
        expect(class1).toEqual({ id: 1, name: 'Class A' });
    });

    test('should return null if class is not found', async () => {
        const class1 = await ClassRepository.getClassById(3);
        expect(class1).toBeNull();
    });
});

describe('createClass function', () => {
    test('should create a new class', async () => {
        const newClass = { name: 'Class C' };
        const createdClass = await ClassRepository.createClass(newClass);
        expect(createdClass).toEqual(newClass);
    });
});

describe('updateClass function', () => {
    test('should update the class with the given id', async () => {
        const id = 1;
        const updatedClassData = { name: 'Updated Class A' };
        const updatedClass = await ClassRepository.updateClass(id, updatedClassData);
        expect(updatedClass).toEqual({ id: 1, name: 'Updated Class A' });
    });

    test('should throw error if class is not found', async () => {
        const id = 3;
        const updatedClassData = { name: 'Updated Class C' };
        await expect(ClassRepository.updateClass(id, updatedClassData)).rejects.toThrow('Class not found');
    });
});

describe('deleteClass function', () => {
    test('should delete the class with the given id', async () => {
        const id = 1;
        const deletedRows = await ClassRepository.deleteClass(id);
        expect(deletedRows).toBe(1);
    });

    test('should throw error if class is not found', async () => {
        const id = 3;
        await expect(ClassRepository.deleteClass(id)).rejects.toThrow('Class not found');
    });
});