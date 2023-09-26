import * as notifApi from './notif-api'
import * as tools from './tools'

export async function getAllNotifs() {
    try {
        const response = await notifApi.index()
        return response
    } catch (err) {
        return err
    }
}

export async function getNotif(id) {
    try {
        const response = await notifApi.show(id)
        return response
    } catch (err) {
        return err
    }
}

export async function createNotif(foodItemData) {
    try {
        const daysLeft = tools.initDaysLeft(foodItemData)
        const data = {food_item: foodItemData.pk, days_left: daysLeft}
        console.log('DATA',data)
        const response = await notifApi.create(data)
        return response
    } catch (err) {
        return err
    }
}

export async function updateNotif(id,data) {
    try {
        const response = await notifApi.update(id,data)
        return response
    } catch (err) {
        return err
    }
}