
const {createUser} = require('./createUser.action');
const {softDeleteUser} = require('./deleteUser.action');
const {getUser} = require('./readUser.action');
const {updateUser} = require('./updateUser.action');


const newUser = {
    name: 'Salomon',
    lastname: 'Saenz',
    email: 'sdsaenz@example.com',
    password: '123456'
};

const obtenerUsuario = async () => {
    
    usuario = await getUser("sdsaenz@uninorte.edu.co", "email")
    getUser(usuario._id,"id")
    
}
  
obtenerUsuario();
  