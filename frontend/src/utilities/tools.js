import * as foodItemServices from '../utilities/food-services'
import * as notifServices from '../utilities/notif-services'

export function initDaysLeft(foodItem) {
    const expire = new Date(foodItem.expiration_date)
    const bought = new Date(foodItem.purchase_date)
    let daysLeft = Math.abs(expire - bought)
    daysLeft = Math.ceil(daysLeft / (1000 * 3600 * 24))

    return daysLeft
}

export function updatedDaysLeft(foodItem) {
    const expire = new Date(foodItem.expiration_date)
    const bought = new Date()
    let daysLeft = Math.abs(expire - bought)
    daysLeft = Math.ceil(daysLeft / (1000 * 3600 * 24))

    return daysLeft
}

export async function updateAllDaysLeft(foodItems) {
    for (let food of foodItems) {
        await notifServices.getNotif(food.pk).then(async (notif) => {
            const daysLeft = updatedDaysLeft(food)
            const data = { ...notif, days_left: daysLeft }
            await notifServices.updateNotif(food.pk,data)
        })
    }
}

export async function unreadNotifs() {
    let unread = 0

    await notifServices.getAllNotifs().then((res) => {
        for (let notif of res) {
            if (!notif.read && notif.days_left < 4) {
                unread++
            }
        }
    })

    return unread
}