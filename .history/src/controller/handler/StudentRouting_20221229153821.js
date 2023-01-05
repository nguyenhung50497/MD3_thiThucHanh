const fs = require('fs');
const qs = require('qs');
const formidable = require('formidable');
const path = require("path");
const StudentService = require('../../service/StudentService');
const CategoryService = require('../../service/ScoreService');

class StudentRouting {
    static getHomeHtml(homeHtml , students) {
        let tbody = '';
        students.map(async (student, index) => {
            tbody +=`
                    <tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.price}</td>
                    <td><img src="./public/${product.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                    <td>${student.nameCategory}</td>
                    <td><a href="/product/edit/${product.id}"><button class="btn btn-primary">Edit</button></a></td>
                    <td>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${product.id}">Delete</button>
                        <div class="modal fade" id="deleteModal${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete: <span style="color: red; font-size: 36px">${product.name}</span></h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h3>Are you sure???</h3>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                        <form action="/product/delete/${product.id}" method="post">
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
        homeHtml = homeHtml.replace('{products}' , tbody);
        return homeHtml;
    }

    static showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let products = await productService.findAll();
                    homeHtml = StudentRouting.getHomeHtml(homeHtml, products);
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
                    const products = qs.parse(data);
                    const mess = await productService.findByNameContaining(products.search);
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

    static createProduct(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/create.html', 'utf-8', async (err, createHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let categories = await CategoryService.getCategory();
                    let optionHtml = ''
                    categories.map((category) => {
                        optionHtml += `<option value="${category.id}">${category.nameCategory}</option>`
                    })
                    createHtml = createHtml.replace('{categories}', optionHtml);
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
                    const product = qs.parse(create);
                    let data = await productService.save(product);
                    res.writeHead(301, {'location': `/product/upload/${data.insertId}`});
                    res.end();
                }
            })
        }
    }

    static async deleteProduct(req, res, id) {
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
            let mess = await productService.remove(id);
            console.log(mess);
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }

    static editProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let categories = await CategoryService.getCategory();
                    let product = await productService.findById(id);
                    let categoryName = await productService.findCategoryNameByProductId(id);
                    let optionHtml = '';
                    for (let category of categories) {
                        if (category.nameCategory !== categoryName[0].nameCategory) {
                            optionHtml += `<option value="${category.id}">${category.nameCategory}</option>`
                        }
                    }
                    editHtml = editHtml.replace('{name}', product[0].name);
                    editHtml = editHtml.replace('{price}', product[0].price);
                    editHtml = editHtml.replace('{description}', product[0].description);
                    editHtml = editHtml.replace('{idCategory}', product[0].idCategory);
                    editHtml = editHtml.replace('{nameCategory}', categoryName[0].nameCategory);
                    editHtml = editHtml.replace('{categories}', optionHtml);
                    editHtml = editHtml.replace('{id}', id);
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
                    let product = qs.parse(data);
                    const mess = await productService.update(product, id);
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
                await productService.editImage(files.img.originalFilename, id);
                res.writeHead(301, {'location': '/home'})
                res.end();
            });
        }
    }
    
}

module.exports = StudentRouting;