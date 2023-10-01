// Imports notif-services
import * as notifServices from '../utilities/notif-services'

// Creates function to calaculate initial days left when a notification is generated
export function initDaysLeft(foodItem) {
    const expire = new Date(foodItem.expiration_date)
    const bought = new Date(foodItem.purchase_date)
    let daysLeft = Math.abs(expire - bought)
    daysLeft = Math.ceil(daysLeft / (1000 * 3600 * 24))
    if (Math.abs(expire) < Math.abs(bought)){
        daysLeft *= -1
    }
    return daysLeft
}

// Updates how many days are left in a notification based on current day and expiration date
export function updatedDaysLeft(foodItem) {
    const expire = new Date(foodItem.expiration_date)
    const current = new Date()
    let daysLeft = Math.abs(expire - current)
    daysLeft = Math.ceil(daysLeft / (1000 * 3600 * 24))
    if (Math.abs(expire) < Math.abs(current)){
        daysLeft *= -1
    }

    return daysLeft
}

// Iterates through all inputed foodItems and updates their days left
export async function updateAllDaysLeft(foodItems) {
    for (let food of foodItems) {
        await notifServices.getNotif(food.pk).then(async (notif) => {
            const daysLeft = updatedDaysLeft(food)
            const data = { ...notif, days_left: daysLeft }
            await notifServices.updateNotif(food.pk,data)
        })
    }
}

// Counts how many relevant notifications are unread
export async function unreadNotifs() {
    let unread = 0

    await notifServices.getAllNotifs().then((res) => {
        for (let notif of res) {
            if (!notif.read && notif.days_left <= 2) {
                unread++
            }
        }
    })
    .catch((err)=>console.log(err))

    return unread
}