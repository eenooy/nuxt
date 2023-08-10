<template>
    <div class="page shopPage" @mouseup="moveEndEvent">
        <ul class="scrollBox" @wheel="wheelEvent" @mousedown="moveStartEvent" @mousemove="moveEvent">
            <li v-for="(item, i) in shiftedSwipers" class="item xWrap" :key="i">
                <div class="yWrap">
                    <img v-for="(img, j) in item" class="img" :src="img" alt="" :key="j" draggable="false" />
                </div>
            </li>
        </ul>
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
const numSwipers = 7;

// 각 배열을 오른쪽으로 한 칸씩 밀어내기
const shiftedSwipers = new Array(numSwipers).fill(null).map((_, index) => {
    const startIndex = (index + 1) % numSwipers;
    const shiftedArray = [...swiper.slice(startIndex), ...swiper.slice(0, startIndex)];
    return shiftedArray;
});

let toX = 0;
let toY = 0;
function wheelEvent(event: WheelEvent) {
    event.preventDefault();

    const targetElement = document.querySelector(".scrollBox") as HTMLElement;

    const targetWidth = targetElement.offsetWidth;
    const targetScrollLeft = targetElement.scrollLeft;
    const targetScrollWidth = targetElement.scrollWidth;

    const targetHeight = targetElement.offsetHeight;
    let targetScrollTop = targetElement.scrollTop;
    targetScrollTop += targetScrollTop;

    const targetScrollHeight = targetElement.scrollHeight;

    let wheelX = event.deltaX;
    let wheelY = event.deltaY;

    if (wheelY > 0) {
        if (targetScrollHeight !== targetScrollTop + targetHeight) {
            toY = toY + Math.abs(wheelY);
        }
    } else {
        if (targetElement.scrollTop !== 0) {
            toY = toY - Math.abs(wheelY);
        }
    }

    if (wheelX > 0) {
        if (targetScrollLeft !== targetScrollWidth - targetWidth) {
            toX = toX + Math.abs(wheelX);
        }
    } else {
        if (targetScrollLeft !== 0) {
            toX = toX - Math.abs(wheelX);
        }
    }

    targetElement.scrollTo(toX, toY);
}

let startX: number | undefined;
let startY: number | undefined;
let moveStartX: number | undefined;
let moveStartY: number | undefined;
let moveEnd: boolean;

function moveStartEvent(event: MouseEvent) {
    moveEnd = false;

    startX = event.clientX;
    startY = event.clientY;

    // 이미지 이동 시작 위치 기록
    moveStartX = startX;
    moveStartY = startY;
}

function moveEvent(event: MouseEvent) {
    const targetElement = document.querySelector(".scrollBox") as HTMLElement;

    if (moveEnd === false) {
        if (moveStartX !== undefined && moveStartY !== undefined) {
            const deltaX = event.clientX - startX!;
            const deltaY = event.clientY - startY!;

            // 이미지 이동
            targetElement.scrollLeft -= deltaX;
            targetElement.scrollTop -= deltaY;

            startX = event.clientX;
            startY = event.clientY;
            toX = targetElement.scrollLeft;
            toY = targetElement.scrollTop;
        }
    }
}

function moveEndEvent(event: MouseEvent) {
    moveEnd = true;

    startX = event.clientX;
    startY = event.clientY;

    // 이미지 이동이 종료되면 이전 이동 시작 위치 초기화
    moveStartX = undefined;
    moveStartY = undefined;
}
</script>

<style scoped lang="scss">
.shopPage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.scrollBox {
    display: flex;
    width: 800px;
    height: 600px;
    overflow: hidden;

    .img {
        width: 800px;
        height: 600px;
        object-fit: cover;
    }
}
</style>
