import * as authAPI from './auth-api'

export async function login(data) {
    try {
        const response = await authAPI.login(data)
        return response
        
    } catch (err) {
        console.log(err)
    }
}