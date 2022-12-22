<div class="authWall">
    {#if $authenticating}
    <CircularProgress style="height: 5rem; width: 5rem;" indeterminate />
    {:else}
    <form on:submit|preventDefault={login}>
        <h5>{options.title}</h5>
        <Textfield bind:value={credentials.username} label="Username">
            <Icon class="material-icons" slot="leadingIcon">person</Icon>
        </Textfield>
        <Textfield bind:value={credentials.password} label="Password" type="password">
            <Icon class="material-icons" slot="leadingIcon">key</Icon>
        </Textfield>
        {#if logginIn}
        <CircularProgress style="height: 2em; width: 2em;" indeterminate />
        {:else}
        <Button>
            <ButtonIcon class="material-icons">login</ButtonIcon>
            <Label>Login</Label>
        </Button>
        {/if}
    </form>
    {/if}
</div>



<Snackbar bind:this={snackbar}>
    <SnackbarLabel>{snackbarLabel}</SnackbarLabel>
    <Actions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>

<script lang="ts">

import Textfield from '@smui/textfield';
import Icon from '@smui/textfield/icon';
import Button, { Label, Icon as ButtonIcon} from '@smui/button';
import Snackbar, { Actions, Label as SnackbarLabel} from '@smui/snackbar';
import IconButton from '@smui/icon-button';
import CircularProgress from '@smui/circular-progress';

import { browser } from '$app/environment';
import { serialize } from 'cookie'
import { getCurrentUser, authenticating } from './auth';

export let options: any
let snackbar: Snackbar
let snackbarLabel = ''
let logginIn = false

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
    logginIn = true
    try {
        const res = await fetch(url, opts)
        const {jwt} = await res.json()

        if(!browser) return alert('Not browser')

        // TODO: Cookie options
        document.cookie = serialize('jwt', jwt)

        getCurrentUser()
        
    } catch (error: any) {
        console.error(error)
        snackbar.open()
        snackbarLabel = 'Login failed'
        
        
    } finally {
        logginIn = false
    }
}

</script>

<style>
.authWall {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
}
</style>