import db from '../models/index'

let getAll1 = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = ''
            if (id === 'ALL') {
                user = db.User.findAll({
                    attributes: {
                        exlucde: ['password']
                    }
                })
            }
            if (id && id !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exlucde: ['password']
                    }
                })
            }
            resolve(user);
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAll1
}