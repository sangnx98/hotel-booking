import {CONFIG} from '../config/config'
import axios from 'axios'

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
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(body),
    })
}

export const removeRoom = async (id: number) => {
    return await axios.delete(`${CONFIG.ApiRooms}/${id}`);
  };
