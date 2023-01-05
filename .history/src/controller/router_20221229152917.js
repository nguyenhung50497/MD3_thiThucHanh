const productRouting = require('./handler/productRouting');

const handler = {
    "home": productRouting.showHome,
    "student/create": productRouting.createProduct,
    "student/delete": productRouting.deleteProduct,
    "student/edit": productRouting.editProduct,
    "product/upload": productRouting.showFormUpLoad
}

module.exports = handler;