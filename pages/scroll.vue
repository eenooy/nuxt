<template>
    <div class="page shopPage" @mouseup="moveEndEvent">
        <div class="scrollBox" @wheel="wheelEvent" @mousedown="moveStartEvent" @mousemove="moveEvent">
            <ul class="box">
                <li v-for="(item, i) in shiftedSwipers" class="item xWrap" :key="i">
                    <div class="yWrap">
                        <img v-for="(img, j) in item" class="img" :src="img" alt="" :key="j" draggable="false" />
                    </div>
                </li>
            </ul>

            <div class="xScrollBar" @mousedown="xScrollBarMouseDown">
                <div class="xTargetBar" :style="{ width: xBarWidth + 'px' }" @mousedown="xScrollBarEvent"></div>
            </div>
            <div class="yScrollBar" @mousedown="yScrollBarMouseDown">
                <div class="yTargetBar" :style="{ height: yBarHight + 'px' }" @mousedown="yScrollBarEvent"></div>
            </div>
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
const numSwipers = 10;

// 각 배열을 오른쪽으로 한 칸씩 밀어내기
const shiftedSwipers = new Array(numSwipers).fill(null).map((_, index) => {
    const startIndex = (index + 1) % numSwipers;
    const shiftedArray = [...swiper.slice(startIndex), ...swiper.slice(0, startIndex)];
    return shiftedArray;
});

const xBarWidth = ref<number>(0);
const yBarHight = ref<number>(0);

const getBarSize = () => {
    const targetBox = document.querySelector(".box") as HTMLElement;
    const innerWidth = targetBox.scrollWidth;
    const clientWidth = targetBox.clientWidth;

    const innerHeight = targetBox.scrollHeight;
    const clientHeight = targetBox.clientHeight;

    const percentWidth = (clientWidth / innerWidth) * 100;
    const percentHeight = (clientHeight / innerHeight) * 100;

    xBarWidth.value = Math.floor((clientWidth * percentWidth) / 100);
    yBarHight.value = Math.floor((clientHeight * percentHeight) / 100);
};

let toX = 0;
let toY = 0;
let isWheeling: boolean = false;
function wheelEvent(event: WheelEvent) {
    event.preventDefault();
    isWheeling = true;

    const targetElement = document.querySelector(".box") as HTMLElement;

    const targetWidth = targetElement.offsetWidth;
    const targetScrollWidth = targetElement.scrollWidth;

    const targetHeight = targetElement.offsetHeight;
    const targetScrollHeight = targetElement.scrollHeight;

    let wheelX = event.deltaX;
    let wheelY = event.deltaY;

    if (0 <= toY + wheelY && toY + wheelY <= targetScrollHeight - targetHeight) {
        toY += wheelY;
    }

    if (0 <= toX + wheelX && toX + wheelX <= targetScrollWidth - targetWidth) {
        toX += wheelX;
    }

    targetElement.scrollTo(toX, toY);

    let scrollXPercent = (toX / targetScrollWidth) * 100;
    let scrollYPercent = (toY / targetScrollHeight) * 100;

    const xBar = document.querySelector(".xTargetBar") as HTMLElement;
    const yBar = document.querySelector(".yTargetBar") as HTMLElement;

    xBar.style.left = Math.floor((scrollXPercent * targetWidth) / 100) + "px";
    yBar.style.top = Math.floor((scrollYPercent * targetHeight) / 100) + "px";
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
    const targetElement = document.querySelector(".box") as HTMLElement;

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

let xBarLeft: number;
function xScrollBarEvent(event: MouseEvent) {
    const targetElement = document.querySelector(".box") as HTMLElement;
    const boxWidth = targetElement.offsetWidth;

    const xBar = document.querySelector(".xTargetBar") as HTMLElement;

    if (xBarLeft === undefined) {
        xBarLeft = targetElement.scrollLeft - xBar.scrollLeft;
    }

    document.addEventListener("mousemove", xScrollBarMouseMove);
    document.addEventListener("mouseup", xScrollBarMouseUp);

    function xScrollBarMouseMove(event: MouseEvent) {
        xBarLeft += event.movementX;

        if (xBarLeft <= boxWidth - xBarWidth.value && 0 <= xBarLeft) {
            xBar.style.left = xBarLeft + "px";

            let scrollPercent = (xBarLeft / boxWidth) * 100;

            targetElement.scrollLeft = (targetElement.scrollWidth * scrollPercent) / 100;
        }
    }

    function xScrollBarMouseUp() {
        xBarLeft = Number(xBar.style.left.split("px")[0]);

        document.removeEventListener("mousemove", xScrollBarMouseMove);
        document.removeEventListener("mouseup", xScrollBarMouseUp);
    }
}

let yBarTop: number;
function yScrollBarEvent(event: MouseEvent) {
    event.stopPropagation();

    const targetElement = document.querySelector(".box") as HTMLElement;
    const boxHeight = targetElement.offsetHeight;
    const yBar = document.querySelector(".yTargetBar") as HTMLElement;

    if (yBarTop === undefined) {
        yBarTop = targetElement.scrollTop - yBar.scrollTop;
    }

    document.addEventListener("mousemove", yScrollBarMouseMove);
    document.addEventListener("mouseup", yScrollBarMouseUp);

    function yScrollBarMouseMove(event: MouseEvent) {
        yBarTop += event.movementY;

        if (yBarTop <= boxHeight - yBarHight.value && 0 <= yBarTop) {
            yBar.style.top = yBarTop + "px";

            let scrollPercent = (yBarTop / boxHeight) * 100;
            targetElement.scrollTop = (targetElement.scrollHeight * scrollPercent) / 100;
        }
    }

    function yScrollBarMouseUp() {
        yBarTop = Number(yBar.style.top.split("px")[0]);

        document.removeEventListener("mousemove", yScrollBarMouseMove);
        document.removeEventListener("mouseup", yScrollBarMouseUp);
    }
}

function xScrollBarMouseDown(event: MouseEvent) {
    const targetElement = document.querySelector(".box") as HTMLElement;
    const boxWidth = targetElement.offsetWidth;

    const xBar = document.querySelector(".xTargetBar") as HTMLElement;

    if (event.offsetX <= boxWidth - xBarWidth.value) {
        xBarLeft = event.offsetX;
    } else {
        xBarLeft = boxWidth - xBarWidth.value;
    }
    let scrollPercent = (xBarLeft / boxWidth) * 100;
    targetElement.scrollLeft = (targetElement.scrollWidth * scrollPercent) / 100;
    xBar.style.left = xBarLeft + "px";
}

function yScrollBarMouseDown(event: MouseEvent) {
    const targetElement = document.querySelector(".box") as HTMLElement;
    const boxHeight = targetElement.offsetHeight;

    const yBar = document.querySelector(".yTargetBar") as HTMLElement;

    if (event.offsetY <= boxHeight - yBarHight.value) {
        yBarTop = event.offsetY;
    } else {
        yBarTop = boxHeight - yBarHight.value;
    }
    let scrollPercent = (yBarTop / boxHeight) * 100;
    targetElement.scrollTop = (targetElement.scrollHeight * scrollPercent) / 100;
    yBar.style.top = yBarTop + "px";
}

onMounted(() => {
    getBarSize();
});
</script>

<style scoped lang="scss">
.shopPage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.scrollBox {
    position: relative;

    .box {
        display: flex;
        width: 800px;
        height: 600px;
        overflow: hidden;
    }

    .img {
        width: 800px;
        height: 600px;
        object-fit: cover;
    }

    .xScrollBar {
        position: absolute;
        left: 0;
        bottom: 0;
        min-width: 800px;
        min-height: 10px;
        background-color: aqua;

        .xTargetBar {
            position: absolute;
            left: 0;
            bottom: 0;
            min-width: 15px;
            height: 100%;
            background-color: brown;
            z-index: 10;
            cursor: pointer;
        }
    }

    .yScrollBar {
        position: absolute;
        right: 0;
        top: 0;
        min-width: 10px;
        min-height: 600px;
        background-color: aqua;

        .yTargetBar {
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            min-height: 15px;
            background-color: brown;
            z-index: 10;
            cursor: pointer;
        }
    }
}
</style>
