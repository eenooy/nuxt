<template>
    <div class="page homePage">
        <div class="sliderBox">
            <button class="arrowButton" @click="prevMove">
                <span class="text">&lt;</span>
            </button>

            <div class="slider">
                <ul class="wrap">
                    <li v-for="(item, i) in swiper" class="item" :class="setClass(i)" :key="i">
                        <img class="img" :src="item" alt="" />
                    </li>
                </ul>
                <div class="background"></div>
            </div>

            <button class="arrowButton" @click="nextMove">
                <span class="text">&gt;</span>
            </button>
        </div>
        <div class="pagination">
            <button v-for="(item, i) in swiper" class="item" :class="{ '--active': currentIdx === i }" key="i" @click="currentIdx = i"></button>
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
const currentIdx = ref<number>(0);

const setClass = (i: number) => {
    if (currentIdx.value === i) {
        return "--active";
    } else {
        if (i === currentIdx.value - 1) {
            return "--prev";
        }

        if (i === currentIdx.value + 1) {
            return "--next";
        }

        if (currentIdx.value === 0) {
            if (i === -(currentIdx.value - swiper.length + 1)) {
                return "--prev";
            }
        }

        if (currentIdx.value === swiper.length - 1) {
            if (i === 0) {
                return "--next";
            }
        }
    }
};

function nextMove() {
    const totalImages = swiper.length;
    currentIdx.value = (currentIdx.value + 1) % totalImages;
}

function prevMove() {
    const totalImages = swiper.length;
    currentIdx.value = (currentIdx.value - 1 + totalImages) % totalImages;
}
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
            position: absolute;
            display: flex;
            width: 5600px;
            height: 600px;
        }

        .item {
            display: flex;
            transition: left 0.5s;
            width: 800px;
            height: 600px;
            overflow: hidden;

            &.--prev {
                position: absolute;
                left: -800px;
                z-index: 1;
            }

            &.--active {
                position: absolute;
                left: 0;
                z-index: 1;
            }

            &.--next {
                position: absolute;
                left: 800px;
                z-index: 1;
            }

            .img {
                width: 800px;
                height: 600px;
                object-fit: cover;
            }
        }

        .background {
            position: absolute;
            width: 800px;
            height: 600px;
            background-color: var(--brown-100);
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
</style>
