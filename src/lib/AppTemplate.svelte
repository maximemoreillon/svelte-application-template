<Drawer variant="modal" fixed={false} bind:open>
    <Header>
      <DrawerTitle>{options.title}</DrawerTitle>
      <Subtitle>{options.subtitle}</Subtitle>
    </Header>
    <Content>
      <List>
        <Item
          href="javascript:void(0)">
          <Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
          <Text>Inbox</Text>
        </Item>
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
        <IconButton class="material-icons">logout</IconButton>
        </Section>
    </Row>
    </TopAppBar>
    <AutoAdjust {topAppBar}>
        <Login options={options}/>
        <!-- <slot></slot> -->

    </AutoAdjust>
</AppContent>


 

<script lang="ts">

import Login from './Login.svelte';


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

export const options = {
    title: 'Untitled application',
    subtitle: 'An untitled application',
    login_url: 'https://api.users.maximemoreillon.com/v2/auth/login'
}

</script>