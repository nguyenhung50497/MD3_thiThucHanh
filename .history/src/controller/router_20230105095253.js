const StudentRouting = require('./handler/StudentRouting');

const handler = {
    "home": StudentRouting.showHome,
    "student/create": StudentRouting.createStudent,
    "student/delete": StudentRouting.deleteStudent,
    "student/edit": StudentRouting.editStudent,
    "student/upload": StudentRouting.showFormUpLoad,
    "student/sortScoreByPracticeUP": StudentRouting.sortScoreByPracticeUP,
    "student/sortScoreByPracticeDown": StudentRouting.sortScoreByPracticeUP,
    "student/sortScoreByTheoryUp": StudentRouting.sortScoreByTheoryUp,
    "student/sortScoreByTheoryDown": StudentRouting.sortScoreByTheoryUp,
}

module.exports = handler;