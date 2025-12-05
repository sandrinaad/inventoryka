const { prisma } = require('../db');

const findAllCategory = async () => {
    const category = await prisma.category.findMany();
    return category;
}

const findCategoryById = async (categoryId) => {
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    });
    return category;
}

const insertCategory = async (categoryData) => {
    const category = await prisma.category.create({
        data: {
            nama: categoryData.nama,
        }
    });
    return category;
}

const deleteCategory = async (categoryId) => {
    await prisma.category.delete({
        where: {
            id: categoryId,
        },
    });
}

const editCategory = async (categoryId, categoryData) => {
    const category = await prisma.category.update({
        where: {
            id: categoryId
        },
        data: {
            nama: categoryData.nama,
        }
    });
    return category;
}

module.exports = {
    findAllCategory,
    findCategoryById,
    insertCategory,
    deleteCategory,
    editCategory
};
