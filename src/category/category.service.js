const { get } = require('express/lib/response');
const { prisma } = require('../db');
const { findAllCategory, findCategoryById, insertCategory, deleteCategory, editCategory } = require('./category.repository.js');

const getAllCategory = async () => {
    const category = await findAllCategory();
    return category;
}

const getCategoryById = async (categoryId) => {
    const category = await findCategoryById(categoryId);
    if (!category) {
        throw new Error('User not found');
    }
    return category;
}

const createCategory = async (newCategory) => {
    const category = await insertCategory(newCategory);
        
    return category;
}

const deleteCategorybyId = async (categoryId) => {
    
    await getCategoryById(categoryId); //cek Category ada atau tidak
    await deleteCategory(categoryId);
    return;
}

const updateCategoryById = async (categoryId, categoryData) => {
    await getCategoryById(categoryId); //cek Category ada atau tidak
    const category = await editCategory(categoryId, categoryData);
    return category;
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    deleteCategorybyId,
    updateCategoryById

};
