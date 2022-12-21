<AppTemplate options={options}>
    <slot></slot>
</AppTemplate>

<script lang="ts">
import AppTemplate from "$lib/AppTemplate.svelte";

const options = {
    title: 'Untitled application',
    subtitle: 'An untitled application',
    login_url: 'https://api.users.maximemoreillon.com/v2/auth/login',
    nav: [
        { href:'/', label: 'Home', icon: 'home'},
        { href:'/about', label: 'About', icon: 'help'},
    ]
}

</script>