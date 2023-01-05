const StudentRouting = require('./handler/StudentRouting');

const handler = {
    "home": StudentRouting.showHome,
    "student/create": StudentRouting.createProduct,
    "student/delete": StudentRouting.deleteProduct,
    "student/edit": productRouting.editProduct,
    "student/upload": productRouting.showFormUpLoad
}

module.exports = handler;