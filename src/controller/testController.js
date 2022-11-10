import testService from '../service/testService'

let getall = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'User not exist'
        })
    }


    if (id === req.query.id) {
        let users = await testService.getAll1(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'ok1',
            users
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Id not found!',
        })
    }
}
module.exports = {
    getall
}