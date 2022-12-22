import { writable } from "svelte/store";
import { browser } from '$app/environment';
import { parse } from 'cookie'


export let currentUser = writable<any>(null);
export let authenticating = writable<boolean>(false);

export const getCurrentUser = async () => {

    authenticating.set(true)
    try {

        if(!browser) throw 'Not browser'
        const {jwt}  = parse(document.cookie)

        if(!jwt) throw 'No JWT'

        const url = `https://api.users.maximemoreillon.com/v2/users/self`

        const opts = {
            method: 'GET',
            headers: { authorization: `Bearer ${jwt}` }, 
        }
        const res = await fetch(url, opts)
        const user = await res.json()

        currentUser.set(user)

    } catch (error) {
        console.error(error)
        currentUser.set(undefined)
    } finally {
        authenticating.set(false)
    }
}