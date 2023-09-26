import * as foodApi from './food-api'
import * as notifServices from './notif-services'

export async function getAllFoodItems() {
    try {
        const response = await foodApi.index()
        return response
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