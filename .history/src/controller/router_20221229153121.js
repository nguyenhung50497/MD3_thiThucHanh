const productRouting = require('./handler/StudentRouting');

const handler = {
    "home": productRouting.showHome,
    "student/create": productRouting.createProduct,
    "student/delete": productRouting.deleteProduct,
    "student/edit": productRouting.editProduct,
    "student/upload": productRouting.showFormUpLoad
}

module.exports = handler;