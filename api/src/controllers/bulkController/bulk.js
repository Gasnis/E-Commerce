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
        observations: "Camisa clásica para hombre con bolsillo en el lado izquierdo, cuello estilo esmoquin con botones y canesú en la espalda.",
        color: ["Azul", "Negro"],
        size: ["S", "M", "L", "XL"]
    },
    {
        name: "Sudadera",
        image: "https://cdn1.vestuariolaboral.com/68499/sudadera-laboral-unisex-con-capucha-roly-1087.jpg" ,
        observations: "Prenda deportiva de algodón u otro tejido, generalmente afelpada por dentro, cerrada, de escote redondo y manga larga, que cubre el cuerpo hasta la cadera y suele llevarse sobre una camiseta.",
        color: ["Azul", "Negro"],
        size: ["S", "M", "L", "XL"]
    },
    {
        name: "Pantalon Cargo",
        image: "https://media.boohoo.com/i/boohoo/mzz41130_khaki_xl/hombre-khaki-pantal%C3%B3n-cargo-de-sarga-te%C3%B1ido-con-pernera-ancha/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit" ,
        observations: "Pantalon largo, perfecto para el campo o trabajar.",
        color: ["Verde", "Gris"],
        size: ["38", "39", "40", "41","42"]
    },
    {
        name: "Camiseta cuello tortuga",
        image: "https://www.5avshop.es/uploads/photo/image/18993/gallery_A07837_igjbE0Wu.JPG" ,
        observations: "Jersey de cuello alto Harper and Neyer, confeccionado en algodón totalmente. Es un jersey muy fino. Diseñado en manga larga y cuello subido, con el logo de la marga en pequeño en la parte frontal y el nombre en letras cursivas azyles en una manga.",
        color: ["Gris", "Blanco"],
        size: ["S", "M"]
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