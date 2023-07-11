<template>
    <div class="wrapper">
        <div class="authBar"></div>
        <slot />
    </div>
    <Snackbar />
</template>

<style scoped lang="scss">
.wrapper {
    background-color: var(--brown-50);

    .authBar {
        width: 100%;
        height: 8px;
        background-color: var(--brown-100);
    }
}
</style>
