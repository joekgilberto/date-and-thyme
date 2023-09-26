export function initDaysLeft(foodItem){
    const expire = new Date(foodItem.expiration_date)
    const bought = new Date(foodItem.purchase_date)
    let daysLeft = Math.abs(expire - bought)
    daysLeft = daysLeft / (1000 * 3600 * 24)

    return daysLeft
}