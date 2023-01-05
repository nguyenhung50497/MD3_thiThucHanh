const StudentRouting = require('./handler/StudentRouting');

const handler = {
    "home": StudentRouting.showHome,
    "student/create": StudentRouting.createStudent,
    "student/delete": StudentRouting.deleteProduct,
    "student/edit": StudentRouting.editProduct,
    "student/upload": StudentRouting.showFormUpLoad
}

module.exports = handler;