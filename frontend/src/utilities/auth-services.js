import * as authAPI from './auth-api'

export async function signUp(data) {
    try {
        const response = await authAPI.create(data)
        return response
        
    } catch (err) {
        console.log(err)
    }
}