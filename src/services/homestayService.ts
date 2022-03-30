import {CONFIG} from '../config/config'

export const getAllRooms = () => {
    return fetch(CONFIG.ApiRooms, {
        headers: {
            "Content-Type": "application/json",
          },
    })
}

export const getRoomDetail = (params: any) => {
    return fetch(CONFIG.ApiRoom, {
        headers: {
            "Content-Type": "application/json",
          },
    })
}

export const addNewBooking = (body: any) => {
    return fetch(CONFIG.ApiBooking, {
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(body),
    })
}