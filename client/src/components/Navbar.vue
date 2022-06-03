<template>
    <nav>
        <ul>
            <li><img src="/img/logo.png" alt="intuitive logotype"></li>
        </ul>
    </nav>
</template>

<script>
/* eslint-disable */
    export default {
        name: "Navbar"

    }
</script>

<style scoped>
    nav ul li{
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ul li img{
        width: 150px;
    }
    nav{
        max-height: 200px;
        box-shadow: 0 4px 4px rgb(131, 129, 129);
        margin-bottom: 70px;
        background-color: #fff;
    }
    
</style>