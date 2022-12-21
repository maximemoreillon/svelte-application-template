{#if $currentUser}
<Drawer variant="modal" fixed={false} bind:open>
    <Header>
      <DrawerTitle>{options.title}</DrawerTitle>
      <Subtitle>{options.subtitle}</Subtitle>
    </Header>
    <Content>
      <List>
        {#each options.nav as item}
            <Item
                href={item.href}>
                <Graphic class="material-icons" aria-hidden="true">{item.icon}</Graphic>
                <Text>{item.label}</Text>
            </Item>
        {/each}
        
      </List>
    </Content>
</Drawer>

<Scrim fixed={false} />

<AppContent class="app-content">
    <TopAppBar bind:this={topAppBar} variant="fixed">
    <Row>
        <Section>
            <IconButton class="material-icons" on:click={() => {open = !open}}>menu</IconButton>
            <Title>{options.title}</Title>
        </Section>
        <Section align="end" toolbar>
        <IconButton class="material-icons" on:click={logout}>logout</IconButton>
        </Section>
    </Row>
    </TopAppBar>
    <AutoAdjust {topAppBar}>
        
        <slot></slot>
        

    </AutoAdjust>
</AppContent>
{:else}
<Login options={options}/>
{/if}

 

<script lang="ts">

import Login from './Login.svelte';
import { currentUser, getCurrentUser} from './auth';
import { serialize, parse } from 'cookie'
import { browser } from '$app/environment';

import { onMount } from 'svelte';

import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
import IconButton from '@smui/icon-button';
import Drawer, {
    AppContent,
    Content,
    Header,
    Title as DrawerTitle,
    Subtitle,
    Scrim,
} from '@smui/drawer';
import Button, { Label } from '@smui/button';
import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
} from '@smui/top-app-bar';
 
let topAppBar: TopAppBar;
let open = false;

export let options = {
    title: 'Untitled application',
    subtitle: 'An untitled application',
    login_url: 'https://api.users.maximemoreillon.com/v2/auth/login',
    nav: [
        { href:'/', label: 'Home', icon: 'home'}
    ]
}

onMount(() => {
    getCurrentUser()
})

const logout = () => {
    if(!browser) throw 'Not browser'
    document.cookie = serialize('jwt', '', {expires: new Date(0)})
    getCurrentUser()
}

</script>