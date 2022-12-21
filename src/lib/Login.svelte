<form on:submit|preventDefault={login}>
    <Textfield bind:value={credentials.username} label="Username">
        <Icon class="material-icons" slot="leadingIcon">person</Icon>
    </Textfield>
    <Textfield bind:value={credentials.password} label="Password" type="password">
        <Icon class="material-icons" slot="leadingIcon">key</Icon>
    </Textfield>
    <Button>
        <ButtonIcon class="material-icons">login</ButtonIcon>
        <Label>Login</Label>
    </Button>
</form>

<script lang="ts">

import Textfield from '@smui/textfield';
import Icon from '@smui/textfield/icon';
import Button, { Label, Icon as ButtonIcon} from '@smui/button';

import { browser } from '$app/environment';
import { serialize } from 'cookie'
import { getCurrentUser } from './auth';

export let options: any

const credentials = {
    username: '',
    password: ''
}


const login = async () => {

    const url = options.login_url
    const opts = { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(credentials)
    }
    try {
        const res = await fetch(url, opts)
        const {jwt} = await res.json()

        if(!browser) return alert('Not browser')

        // TODO: Cookie options
        document.cookie = serialize('jwt', jwt)

        getCurrentUser()
        
    } catch (error) {
        
    }
}

</script>

<style>
form {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
}
</style>