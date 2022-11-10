import userService from '../service/userService'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            massage: 'Missing inputs paranerter!'
        })
    }


    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        massage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id //ALL , SIGNLE
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok1',
        users
    })

}

let handleCreateNewUSer = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message)
    return res.status(200).json(message)
}

let handleDeleteUSer = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        console.log('check data : ', data)
        return res.status(200).json(data)
    } catch (e) {
        console.log('Get all cod error :  ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin, handleGetAllUser, handleCreateNewUSer,
    handleEditUser, handleDeleteUSer, getAllCode
}