const {Product} = require("../../db")


const postProduct = async (data) => {
    let {id, name, image, observations } = data
    
    if(image && name){
            const user = await Product.create({id,name,password, observations})
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
    
  const {id, name, image, observations} = data

  if (name && image) {
      let product = await Product.findByPk(id);
      if (product.id === id) {
          await product.update( 
                  {
                  id,
                  name,
                  image,
                  observations
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

const deleteProduct = async (id) =>{
   
        let product = await Product.findByPk(id);
        if (product.id === id) {
            await product.update( 
                    {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    observations: product.observations,
                    status: "disabled"
                    });
            const productUpdated = await Product.findOne({where: {id: id}})
            return productUpdated
        }else{
            throw new Error("Product not found")
        }    
  }




module.exports = {
    postProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}
