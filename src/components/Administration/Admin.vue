<template>
    <div>
        <header>
            <header-page></header-page>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Header from './Subs/Header'

export default {
    components: {
        'header-page': Header
    }
}
</script>

<style scoped>
    main {
        margin: 50px auto 0;
        max-width: 960px;
        padding: 20px 25px;
        box-sizing: border-box;
    }
</style>
