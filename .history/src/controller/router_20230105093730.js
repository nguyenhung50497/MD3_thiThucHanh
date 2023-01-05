const StudentRouting = require('./handler/StudentRouting');

const handler = {
    "home": StudentRouting.showHome,
    "student/create": StudentRouting.createStudent,
    "student/delete": StudentRouting.deleteStudent,
    "student/edit": StudentRouting.editStudent,
    "student/upload": StudentRouting.showFormUpLoad,
    "student/upload": StudentRouting.showFormUpLoad,
}

module.exports = handler;