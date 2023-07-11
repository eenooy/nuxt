<template>
    <div class="wrapper">
        <nav class="navigation">
            <div v-for="(menu, i) in menus" :key="i">
                <NuxtLink class="link" :to="links[i]">{{ menu }}</NuxtLink>
            </div>
        </nav>
        <div class="page">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const menus = ref<string[]>(["Home", "Shop", "Login", "Sign-up"]);
const links = ref<string[]>(["/", "/shop", "/auth/login", "/auth/sign-up"]);
</script>

<style scoped lang="scss">
.navigation {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 65px;
    background-color: var(--brown-50);
    border-bottom: solid 1px var(--gray-900);

    .link {
        @include BTN1;
        color: var(--gray-900);

        &:hover {
            color: var(--gray-900);
        }
    }
}
</style>
