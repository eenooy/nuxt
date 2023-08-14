<template>
    <svg class="icon" viewBox="0 0 64 64">
        <component :is="target" />
    </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ kind: string }>();
const iconList: { [key: string]: any } = {
    calender: resolveComponent("IconCalender"),
};
const target = iconList[props.kind];
</script>
