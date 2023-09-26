import * as notifApi from './notif-api'
import * as foodApi from './food-api'
import * as tools from './tools'

export async function getAllNotifs() {
    try {
        return await notifApi.index().then((notifs)=>{
            notifs.sort((a,b) => a.days_left - b.days_left);
            return notifs
        })
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
        console.log(foodItemData)
        console.log(foodItemData.name)
        const daysLeft = tools.initDaysLeft(foodItemData)
        const data = {food_item: foodItemData.pk, food_item_name: foodItemData.name, days_left: daysLeft}
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

export async function updateNotifDate(foodItemData) {
    try {
        const daysLeft = tools.updatedDaysLeft(foodItemData)
        const data = {food_item: foodItemData.pk, days_left: daysLeft}
        console.log('DATA',data)

        const response = await notifApi.update(foodItemData.pk,data)
        return response

    } catch (err) {
        return err
    }
}

export async function updateNotifRead(notif) {
    try {
        const data = {...notif, read: !notif.read}
        console.log('DATA',data)

        const response = await notifApi.update(notif.food_item,data)
        return response

    } catch (err) {
        return err
    }
}