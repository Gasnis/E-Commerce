const {User} = require("../../db")


const postUserData = async (userData) => {
    let {id,name,password} = userData
    
    if(id && name && password ){
        const searchUser = await User.findOne({
            where:{id: id}
        })
        if(!searchUser){
            const user = await User.create({id,name,password})
            return user
    
        }else{
            throw new Error(`El usuario ${id} ya esta registrado`)
        } 

    }else{
        throw new Error("Missing data")
    }
     
}

const getAllUsers = async (name) => {
    let todos = await User.findAll();
    if (name) {
        const byName = todos.filter((local) =>
          local.name.toLowerCase().includes(name.toLowerCase())
        );
        if (byName.length) {
          return byName
        }else{
            throw new Error(`${name} no encontrado`);
        }
    }
    return todos;
    
}

const getUserDetail = async (id) => {
    
    if (id) {
        const userDetail = await User.findOne({where: {id: id}})
        if (!userDetail) {
            throw new Error("Usuario no encontrado")
        }
        return userDetail
    }
}

const updateUser = async (newUserData) =>{
    
  const {id,name,password} = newUserData

  if (name && image && password) {
      let user = await User.findByPk(id);
      if (user.id === id) {
          await user.update( 
                  {
                  id,
                  name,
                  password,
              });
          const userUpdated = await User.findOne({where: {id: id}})
          return userUpdated
      }else{
          throw new Error("Tienes que poner el mismo Email")
      }

  }else{
    throw new Error("Falta rellenar campos")
  }
  
}


module.exports = {
    postUserData,
    getUserDetail,
    getAllUsers,
    updateUser
}
