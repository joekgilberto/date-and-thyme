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
        const response = await foodApi.create(data)
        notifServices.createNotif(response)
        return response
    } catch (err) {
        return err
    }
}

export async function updateFoodItem(id,data) {
    try {
        const response = await foodApi.update(id,data)
        return response
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