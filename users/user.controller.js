
const argon2 = require('argon2')

const { createUser } = require('./createUser.action')
const { softDeleteUser } = require('./deleteUser.action')
const { getUser } = require('./readUser.action')
const { updateUser } = require('./updateUser.action')
const { createToken } = require('../utils/authentication')

async function signUp(userData) {

    const { name, lastname, email, password } = userData

    if (!email || !password || !name || !lastname) {
        return { value: { error: "Incomplete data" }, code: 400 }
    }

    if (await getUser(email, "email")) {
        return { value: { error: "Email already exists" }, code: 409 }
    }

    const hashedPassword = await argon2.hash(userData.password)
    userData.password = hashedPassword 
    const newUser = await createUser(userData)
    const token = await createToken({ userId: newUser._id })
    return { value: { authorization: token ,message: 'User created successfully'}, code: 200 }
    
}

async function login(params) {
    const { email, password } = params

    if (!email || !password) {
        return { value: { error: "Incomplete data" }, code: 400 }
    }

    const userData = await getUser(email, "email")

    if (!userData) {
        return { value: { error: "User not found" }, code: 404 }
    }

    if (await argon2.verify(userData.password, password)) {
        const token = await createToken({ userId: userData._id })
        return { value: { authorization: token ,message: 'User login successfully'}, code: 200 }
    } else {
        return { value: { error: "Incorrect password" }, code: 401 }
    }
}

async function updateUserData(req) {

    const { name, lastname, email, password } = req.body

    if (!email && !password && !name && !lastname) {
        return { value: { message: "No data provided for modification" }, code: 204 }
    }

    if (password){
        const hashedPassword = await argon2.hash(password)
        req.body.password = hashedPassword 
    }

    if (await updateUser(req.userId, req.body)){
        return { value: {message: 'User updated successfully'}, code: 200 }
    }else{
        return { value: {message: 'User does not exist'}, code: 404 }
    }
}

async function deleteUser(req) {
    
    if (await softDeleteUser(req.userId)){
        return { value: {message: 'User deleted successfully'}, code: 200 }
    }else{
        return { value: {message: 'User does not exist'}, code: 404 }
    }
}

async function getUserData(req) {
    const userData = await getUser(req.userId, "id")
    userData.password = undefined
    if (userData) {
        return { value: { userData: userData }, code: 200 }
    } else {
        return { value: { message: 'User does not exist' }, code: 404 }
    }
}


module.exports={
    login,
    signUp,
    updateUserData,
    deleteUser,
    getUserData
}