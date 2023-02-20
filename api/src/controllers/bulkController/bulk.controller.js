const {User, Local, Book} = require("../../db")

const users = [

]


const locals =[

]


const bulkCreate = async () => {
    users.forEach(e=>{
        User.create(e)
    })
    locals.forEach(e=>{
        Local.create(e)
    })
    return "se creo"
}

module.exports = bulkCreate;