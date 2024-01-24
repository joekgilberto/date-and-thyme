// Imports auth api functions
import * as authAPI from './auth-api'

// Creates login middelware
export async function login(data) {
    try {
        const response = await authAPI.login(data)
        return response
        
    } catch (err) {
        console.log(err)
    }
}

// Creates sign up middleware that then logs the user in
export async function signUp(data) {
    try {
        return await authAPI.signUp(data).then(async (res)=>{
            return await authAPI.login(data).then((token)=>{
                return token
            })
        })
        
    } catch (err) {
        console.log(err)
    }
}