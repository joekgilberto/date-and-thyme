// Imports notif api and tools
import * as notifApi from './notif-api'
import * as tools from './tools'

// gets all notifs
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

// gets a specific notif
export async function getNotif(id) {
    try {
        const response = await notifApi.show(id)
        return response
    } catch (err) {
        return err
    }
}

// creates a notif based off of foodItem data
export async function createNotif(foodItemData) {
    try {
        const daysLeft = tools.initDaysLeft(foodItemData)
        const data = {food_item: foodItemData.pk, food_item_name: foodItemData.name, days_left: daysLeft, owner: foodItemData.owner}
        const response = await notifApi.create(data)
        return response
    } catch (err) {
        return err
    }
}

// updates a notif
export async function updateNotif(id,data) {
    try {
        const response = await notifApi.update(id,data)
        return response

    } catch (err) {
        return err
    }
}

// updates just a notif's days_left property
export async function updateNotifDate(foodItemData) {
    try {
        return await getNotif(foodItemData.pk).then(async (notif)=>{
            let read = notif.read
            const daysLeft = tools.updatedDaysLeft(foodItemData)

            if(notif.days_left !== daysLeft){
                read = false
            }

            const data = {...notif, food_item: foodItemData.pk, days_left: daysLeft, read: read}
            return await notifApi.update(foodItemData.pk,data).then((res)=>{
                return res
            })
        })

    } catch (err) {
        return err
    }
}

// update if a notif is read or not
export async function updateNotifRead(notif) {
    try {
        const data = {...notif, read: !notif.read}

        const response = await notifApi.update(notif.food_item,data)
        return response

    } catch (err) {
        return err
    }
}