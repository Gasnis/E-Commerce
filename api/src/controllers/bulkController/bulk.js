const {User, Product} = require("../../db")

const users = [
{
    id: "gaston@gmail.com",
    name: "Gaston",
    password: "123"
},

]


const products =[
    {
        name: "Camisa de algodon",
        image: "https://naisa.es/11057-large_default/camisa-algodon-manga-larga-marino-o-azulina-ma388-cml.jpg" ,
        observations: "Camisa clásica para hombre con bolsillo en el lado izquierdo, cuello estilo esmoquin con botones y canesú en la espalda."
    },
]

        



const bulkCreate = async () => {
    users.forEach(e=>{
        User.create(e)
    })
    products.forEach(e=>{
        Product.create(e)
    })
    return "se creo"
}

module.exports = bulkCreate;