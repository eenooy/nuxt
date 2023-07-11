<template>
    <div class="page homePage">
        <div class="sliderBox">
            <button class="arrowButton" @click="showImage--">
                <span class="text">&lt;</span>
            </button>

            <div class="slider">
                <div class="wrap">
                    <div v-for="(item, i) in swiper" class="item" :class="{ '--showing': showImage === i + 1 }" :key="i">
                        <img class="img" :src="item" alt="" />
                    </div>

                    <div class="itemBackground"></div>
                </div>
            </div>

            <button class="arrowButton" @click="showImage++">
                <span class="text">&gt;</span>
            </button>
        </div>
        <div class="pagination">
            <button v-for="(item, i) in swiper" class="item" :class="{ '--active': showImage === i + 1 }" key="i" @click="showImage = i + 1"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import img1 from "@/assets/image/img1.png";
import img2 from "@/assets/image/img2.png";
import img3 from "@/assets/image/img3.png";
import img4 from "@/assets/image/img4.png";
import img5 from "@/assets/image/img5.png";
import img6 from "@/assets/image/img6.png";
import img7 from "@/assets/image/img7.png";

const swiper = [img1, img2, img3, img4, img5, img6, img7];
const showImage = ref<number>(1);

watch(
    () => showImage.value,
    (newData) => {
        if (7 < newData) {
            showImage.value = newData - 7;
        } else if (newData < 1) {
            showImage.value = newData + 7;
        }
    }
);
</script>

<style scoped lang="scss">
.homePage {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 20px;
}

.sliderBox {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .arrowButton {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
        background-color: var(--brown-50);
        border-radius: 100%;

        .text {
            @include C2;
            color: var(--brown-a200);
        }

        &:hover {
            background-color: var(--brown-300);
            border: 1px solid var(--brown-a200);
        }

        &:active {
            background-color: var(--brown-500);
            border: 1px solid var(--brown-a200);
        }
    }

    .slider {
        position: relative;
        width: 800px;
        height: 600px;
        overflow: hidden;

        .wrap {
            display: flex;
            width: 5600px;
            height: 600px;
        }
        .item {
            position: absolute;

            .img {
                display: block;
                width: 800px;
                height: 600px;
            }

            &.--showing {
                z-index: 1;
                animation: fadeIn 0.5s linear;
            }
        }

        .itemBackground {
            position: absolute;
            width: 800px;
            height: 600px;
            background-color: black;
            z-index: 0;
        }
    }
}

.pagination {
    display: flex;
    align-items: center;
    gap: 10px;

    .item {
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: var(--brown-50);

        &:hover {
            background-color: var(--brown-300);
        }

        &:active {
            background-color: var(--brown-500);
        }

        &.--active {
            background-color: var(--brown-a200);
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
