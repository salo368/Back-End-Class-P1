const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

const { createUser } = require('./createUser.action')
const { softDeleteUser } = require('./deleteUser.action')
const { getUser } = require('./readUser.action')
const { updateUser } = require('./updateUser.action')

const UserModel = require("./user.model")

keyJWT="e3c6bedeefc5043740ecd268d679f522" //pasar a env

function tokenVerification(token) { //pasar a una carpeta de funciones
    try {
        
        return jwt.verify(token, keyJWT)
    } catch (error) {
        
        return undefined
    }
}

async function signUp(userData) {
    try {
        const validationResult = await UserModel.validate(userData)

        if (validationResult.error) {
            throw new Error(`Error de Validacion: ${validationResult.error.message}`)
        }

        const hashedPassword = await argon2.hash(userData.password)

        userData.password = hashedPassword 

        const newUser = await createUser(userData)

        console.log(newUser)

        const token = jwt.sign({ userId: newUser._id }, keyJWT, { expiresIn: '30d' })
        console.log(token)
        return token
    } catch (error) {
        console.error('Error al crear el usuario:', error)
        throw error
    }
}

async function login(email, password) {
    try {
    
        const UserData = await getUser(email, "email");

        if (await argon2.verify(UserData.password, password)) {

            const token = jwt.sign({ userId: UserData._id }, keyJWT, { expiresIn: '30d' });
            console.log('Contraseña correcta');

            console.log(token)
            return token;
        } else {
            throw new Error('Contraseña incorrecta');
        }

    } catch (error) {
        console.error('Error de autenticación:', error.message);
        throw error;
    }
}

async function updateUserData(token, newData) {
    try {
        const decodedToken = tokenVerification(token);

        if (!decodedToken) {
            throw new Error('Token inválido o expirado');
        }

        const userId = decodedToken.userId;

        const userSchemaKeys = Object.keys(UserModel.schema.obj);

        const newDataKeys = Object.keys(newData);
        const invalidKeys = newDataKeys.filter(key => !userSchemaKeys.includes(key));

        if (invalidKeys.length > 0) {
            throw new Error(`Las siguientes keys no existen en el esquema de User: ${invalidKeys.join(', ')}`);
        }

        // Si todas las keys son válidas, proceder con la actualización
        const updatedUser = await updateUser(userId, newData);

        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        throw error;
    }
}

async function deleteUser(token) {
    try {

        const decodedToken = tokenVerification(token)
        if (!decodedToken) {
            throw new Error('Token inválido o expirado')
        }

        const userId = decodedToken.userId

        await softDeleteUser(userId)

        return { message: 'Usuario eliminado exitosamente' }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error)
        throw error
    }
}

async function getUserData(token) {
    try {
    
        const decodedToken = tokenVerification(token)
        if (!decodedToken) {
            throw new Error('Token inválido o expirado')
        }

        const userId = decodedToken.userId

        const UserData = await getUser(userId, "id");

        console.log(UserData)
        return UserData
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
        throw error
    }
}

const userData = {
    name: 'Samuel',
    lastname: 'Saenz',
    email: 'smsaenz@example.com',
    password: 'elgatico',
    books: [],
    receivedOrders: [],
    sentOrders: [],
    softDelete: false
}

tokenn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNlOTYyY2NkYzhhNDk2NzdiMGU1MDIiLCJpYXQiOjE3MTUzNzkyMTgsImV4cCI6MTcxNzk3MTIxOH0.ovWdbygWxJWVXjq8iFDukamTjyVciwlOtLtNqN3pzsw"
tokenn2="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNmZGYzOGNmNjRhOTkwMjY2YWMzNDMiLCJpYXQiOjE3MTU0NjE5NDQsImV4cCI6MTcxODA1Mzk0NH0.JPbZGJAV9wiM8mLhRHOkZ5VMpPHolOt24ICqlBVLjwQ"
//console.log(updateUserData(tokenn,{lastname:"Saenz Giraldo"}))
//login("sdsaenz@example.com","elgatico")
//deleteUser(tokenn)
//getUserData(tokenn)
//getUserBooks(tokenn)

login("smsaenz@example.com","elgatico")