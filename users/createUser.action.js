
const { createUser, getUserByEmail, getUserById, updateUser, softDeleteUser  } = require('./user.model');

(async () => {
    
    const usuario = await getUserByEmail('sdsaenz@uninorte.edu.co');
    //updateUser(usuario._id,{email:'sdsaenz@uninorte.edu.co'});
})();
