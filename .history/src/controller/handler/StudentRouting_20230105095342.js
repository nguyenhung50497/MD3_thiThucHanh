const fs = require('fs');
const qs = require('qs');
const formidable = require('formidable');
const path = require("path");
const StudentService = require('../../service/StudentService');
const ScoreService = require('../../service/ScoreService');
const { loadavg } = require('os');

class StudentRouting {
    static getHomeHtml(homeHtml , students) {
        let tbody = '';
        students.map(async (student, index) => {
            tbody +=`
                    <tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.class}</td>
                    <td>${student.scoreTheory}</td>
                    <td>${student.evaluate}</td>
                    <td>${student.scorePractice}</td>
                    <td>${student.description}</td>
                    <td><a href="/student/edit/${student.id}"><button class="btn btn-primary">Edit</button></a></td>
                    <td>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${student.id}">Delete</button>
                        <div class="modal fade" id="deleteModal${student.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete: <span style="color: red; font-size: 36px">${student.name}</span></h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h3>Are you sure???</h3>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                        <form action="/student/delete/${student.id}" method="post">
                                            <button type="submit" class="btn btn-danger">Yes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    </tr>
                    `
        });
        homeHtml = homeHtml.replace('{students}' , tbody);
        return homeHtml;
    }

    static showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let students = await StudentService.findAll();
                    homeHtml = StudentRouting.getHomeHtml(homeHtml, students);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            });
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    const students = qs.parse(data);
                    const mess = await StudentService.findByNameContaining(students.search);
                    fs.readFile('./views/home.html', 'utf-8', (err, searchHtml) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            searchHtml = StudentRouting.getHomeHtml(searchHtml, mess);
                            res.writeHead(200, 'text/html');
                            res.write(searchHtml);
                            res.end();
                        }
                    });
                }
            })
        }
    }

    static createStudent(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/create.html', 'utf-8', async (err, createHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            });
        }
        else {
            let create = '';
            req.on('data', chunk => {
                create += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    const student = qs.parse(create);
                    let data = await StudentService.create(student);
                    console.log(data);
                    res.writeHead(301, {'location': `/home`});
                    res.end();
                }
            })
        }
    }

    static async deleteStudent(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/delete.html', 'utf-8', async (err, removeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.writeHead(200, 'text/html');
                    removeHtml = removeHtml.replace('{id}', id);
                    res.write(removeHtml);
                    res.end();
                }
            });
        }
        else {
            let mess = await StudentService.remove(id);
            console.log(mess);
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }

    static editStudent(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let student = await StudentService.findById(id);
                    
                    editHtml = editHtml.replace('{name}', student[0].name);
                    editHtml = editHtml.replace('{class}', student[0].class);
                    editHtml = editHtml.replace('{scoreTheory}', student[0].scoreTheory);
                    editHtml = editHtml.replace('{evaluate}', student[0].evaluate);
                    editHtml = editHtml.replace('{scorePractice}', student[0].scorePractice);
                    editHtml = editHtml.replace('{description}', student[0].description);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            });
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
             
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    let student = qs.parse(data);
                    const mess = await StudentService.update(student, id);
                    res.writeHead(301, {'location': `/home`});
                    res.end();
                }
            })
        }
    }

    static showFormUpLoad(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/upload.html', 'utf-8', (err, upLoadHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(upLoadHtml);
                    res.end();
                }
            })
        } else {
            let form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.log(err)
                }
                let tmpPath = files.img.filepath;
                let newPath = path.join(__dirname, '..', '..', "public", files.img.originalFilename);
                fs.readFile(newPath, (err) => {
                    if (err) {
                        fs.copyFile(tmpPath, newPath, (err) => {
                            if (err) throw err;
                        });
                    }
                })
                await StudentService.editImage(files.img.originalFilename, id);
                res.writeHead(301, {'location': '/home'})
                res.end();
            });
        }
    }

    static sortScoreByPracticeUP(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/sortScoreByPractice.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let students = await StudentService.sortScoreByPraticeUP();
                    homeHtml = StudentRouting.getHomeHtml(homeHtml, students);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            });
        }
    }
    
    static sortScoreByPracticeDown(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/sortScoreByPractice.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let students = await StudentService.sortScoreByPraticeDown();
                    homeHtml = StudentRouting.getHomeHtml(homeHtml, students);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            });
        }
    }

    static sortScoreByTheoryUp(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/sortScoreByPractice.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let students = await StudentService.sortScoreByTheoryUP();
                    homeHtml = StudentRouting.getHomeHtml(homeHtml, students);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            });
        }
    }

    static sortScoreByTheoryUp(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/sortScoreByPractice.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let students = await StudentService.sortScoreByPraticeUP();
                    homeHtml = StudentRouting.getHomeHtml(homeHtml, students);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            });
        }
    }
}

module.exports = StudentRouting;