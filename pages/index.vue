<template>
    <div class="page homePage">
        <div class="sliderBox">
            <button class="arrowButton" @click="prevMove">
                <span class="text">&lt;</span>
            </button>

            <div class="slider">
                <ul class="wrap">
                    <li class="item">
                        <img class="img" :src="swiper[prevIdx]" alt="" />
                    </li>
                    <li class="item">
                        <img class="img" :src="swiper[currentIdx]" alt="" />
                    </li>
                    <li class="item">
                        <img class="img" :src="swiper[nextIdx]" alt="" />
                    </li>
                </ul>
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
const prevIdx = ref<number>(6);
const currentIdx = ref<number>(0);
const nextIdx = ref<number>(1);

const swiperLength = swiper.length;

function nextMove() {
    if (0 <= currentIdx.value && currentIdx.value % 2 === 0) {
        if (currentIdx.value < swiperLength) {
            if (0 < currentIdx.value) {
                if (currentIdx.value === swiperLength - 1) {
                    currentIdx.value = 0;
                    prevIdx.value = 6;
                    nextIdx.value = 1;
                } else {
                    currentIdx.value += 1;
                }
            } else {
                currentIdx.value += 1;
            }
        }
    } else {
        currentIdx.value += 1;
        prevIdx.value = currentIdx.value - 1;
        nextIdx.value += currentIdx.value + 1;
    }
}

function prevMove() {
    if (currentIdx.value >= 0) {
        if (currentIdx.value > 0) {
            currentIdx.value -= 1;
        } else {
            currentIdx.value = swiperLength - 1;
        }

        prevIdx.value = currentIdx.value - 1;
        nextIdx.value = (currentIdx.value + 1) % swiperLength;
    }
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
            display: flex;
            position: absolute;
            left: -800px;
            width: 2400px;
            height: 600px;
            transition: 0.5s;
        }

        .item {
            .img {
                display: block;
                width: 800px;
                height: 600px;
            }
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
