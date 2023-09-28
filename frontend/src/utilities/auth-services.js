import * as authAPI from './auth-api'

export async function login(data) {
    try {
        const response = await authAPI.login(data)
        return response
        
    } catch (err) {
        console.log(err)
    }
}

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