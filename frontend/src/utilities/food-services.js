import * as foodApi from './food-api'
import * as notifServices from './notif-services'
import { getUserToken } from './auth-token';

export async function getAllFoodItems() {
    try {
        return await foodApi.index().then((foods)=>{
            foods.sort((a,b) => new Date(a.expiration_date) - new Date(b.expiration_date));
            return foods
        })
    } catch (err) {
        return err
    }
}

export async function getFoodItem(id) {
    try {
        const response = await foodApi.show(id)
        return response
    } catch (err) {
        return err
    }
}

export async function createFoodItem(data) {
    try {
        const token = getUserToken()
        data = {...data, owner:token}
        console.log("DATA",data)
        await foodApi.create(data).then((res)=>{
            console.log(res)
            notifServices.createNotif(res)
            return res
        })
        
    } catch (err) {
        return err
    }
}

export async function updateFoodItem(id,data) {
    try {
        await foodApi.update(id,data).then((res)=>{
            notifServices.updateNotifDate(res)
            return res
        })
    } catch (err) {
        return err
    }
}

export async function destroyFoodItem(id) {
    try {
        const response = await foodApi.destroy(id)
        return response
    } catch (err) {
        return err
    }
}