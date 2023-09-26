import * as notifServices from '../utilities/notif-services'

export function initDaysLeft(foodItem) {
    const expire = new Date(foodItem.expiration_date)
    const bought = new Date(foodItem.purchase_date)
    let daysLeft = Math.abs(expire - bought)
    daysLeft = daysLeft / (1000 * 3600 * 24)

    return daysLeft
}

export async function unreadNotifs() {
    let unread = 0

    await notifServices.getAllNotifs().then((res) => {
        for (let notif of res) {
            if (!notif.read) {
                unread++
            }
        }
    })


    return unread
}