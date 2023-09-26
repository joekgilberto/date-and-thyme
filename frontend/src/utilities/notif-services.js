import * as notifApi from './notif-api'
import * as foodApi from './food-api'
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

export async function getNotifsFood(){
    try {
        const data = []
        await getAllNotifs().then(async (res)=>{
            console.log(res)
            for (let notif of res){
                await foodApi.show(notif.food_item).then((secondRes)=>{
                    console.log(secondRes)
                    data.push(secondRes)
                })
            }
        })
        console.log(data)
        return data
    }catch(err){
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

export async function updateNotif(foodItemData) {
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