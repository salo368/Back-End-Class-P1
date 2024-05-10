
const { createUser, getUserByEmail, getUserById, updateUser, softDeleteUser  } = require('./createUser.action');

(async () => {
    
    const usuario = await getUserByEmail('sdsaenz@uninorte.edu.co');
    //updateUser(usuario._id,{email:'sdsaenz@uninorte.edu.co'});
})();

// async function getUserByEmail(email) {

    
// }