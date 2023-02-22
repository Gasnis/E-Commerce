const {Product} = require("../../db")


const postProduct = async (data) => {
    let {id, name, image, color, size, observations } = data
    
    if(image && name && size && color){
            const user = await Product.create({id,name,password,color, size, observations})
            return user

    }else{
        throw new Error("Missing data")
    }
     
}

const getAllProducts = async (name) => {
    let todos = await Product.findAll();
    if (name) {
        const byName = todos.filter((local) =>
          local.name.toLowerCase().includes(name.toLowerCase())
        );
        if (byName.length) {
          return byName
        }else{
            throw new Error(`${name} not found`);
        }
    }
    return todos;
    
}

const updateProduct = async (data) =>{
    
  const {id, name, image, color, size, observations, status} = data

  if (name && image) {
      let product = await Product.findByPk(id);
      if (product.id === id) {
          await product.update( 
                  {
                  id: id,
                  name: name,
                  image: image,
                  color: color,
                  size: size,
                  observations: observations,
                  status: status
              });
          const productUpdated = await Product.findOne({where: {id: id}})
          return productUpdated
      }else{
          throw new Error("Product not found")
      }

  }else{
    throw new Error("Not all parameters arrived successfully")
  }
  
}

const deleteProduct = async (product) =>{
    const {id, name, image, color, size, observations,} = product

    if (name && image) {
        let product = await Product.findByPk(id);
        if (product.id === id) {
            await product.update( 
                    {
                    id,
                    name,
                    image,
                    color,
                    size,
                    observations,
                    status : "disabled"
                });
            const productUpdated = await Product.findOne({where: {id: id}})
            return productUpdated
        }else{
            throw new Error("Product not found")
        }
  
    }else{
      throw new Error("Not all parameters arrived successfully")
    } 
  }




module.exports = {
    postProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}
