<template>
    <div class="wrapper">
        <nav class="navigation">
            <NuxtLink v-for="(menu, i) in menus" :key="i" class="link" :to="links[i]">{{ menu }}</NuxtLink>
        </nav>

        <slot />
    </div>
</template>

<script setup lang="ts">
const menus = ref<string[]>(["SliderEvent", "ScrollEvent", "Login", "Sign-up"]);
const links = ref<string[]>(["/", "/scroll", "/auth/login", "/auth/sign-up"]);
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
    z-index: 10;

    .link {
        @include BTN1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 65px;
        color: var(--gray-900);

        &:hover {
            color: var(--gray-900);
        }

        &.router-link-active {
            font-weight: 700;
            color: var(--gray-900);
            border-bottom: 2px solid var(--gray-900);
        }
    }
}
</style>
