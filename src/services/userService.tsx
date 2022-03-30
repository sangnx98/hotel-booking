import {CONFIG} from '../config/config'

export const signUp = (body: any) => {
    return fetch(CONFIG.ApiUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
}

export const getAllUser = () => {
    return fetch(CONFIG.ApiUser, {
        headers: {
            "Content-Type": "application/json",
          },
    })
}




