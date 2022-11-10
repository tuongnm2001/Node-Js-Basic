import db from '../models/index'
import CRUDService from '../service/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e);
    }
}

let getAbout = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.creteNewUser(req.body);
    console.log(message)
    return res.send('post crud from server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', { dataTable: data })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId);
        return res.render('editCRUD', {
            userData: userData
        })
    } else {
        return res.send('Users not found!')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete user succed!')
    } else {
        return res.send('User not found!')
    }
}

module.exports = {
    getHomePage, getAbout, getCRUD, postCRUD,
    displayGetCRUD, getEditCRUD, putCRUD, deleteCRUD

}