<template>
    <div class="page datePage">
        <div class="wrap">
            <button class="button" @click="calendarOpen = !calendarOpen">
                <SvgIcon kind="calender" />
            </button>

            <input class="textField" type="text" placeholder="← Click!" v-model="selectedDate" @focus="calendarOpen = true" />

            <div v-if="calendarOpen === true" class="calendar">
                <div class="topArea">
                    <button class="button" @click="prevMonth">&lt;</button>
                    {{ displayYear }} {{ getMonthName(currentMonth) }}
                    <button class="button" @click="nextMonth">&gt;</button>

                    <select class="year" v-model="currentYear">
                        <option v-for="year in 10" :key="year" :value="currentYear - 5 + year">
                            {{ currentYear - 5 + year }}
                        </option>
                    </select>
                </div>

                <div class="bodyArea">
                    <div class="days">
                        <div class="row --dayName">
                            <div class="item" :class="{ '--red': dayName === 'Sun', '--blue': dayName === 'Sat' }" v-for="dayName in getWeekdayNames()" :key="dayName">
                                {{ dayName }}
                            </div>
                        </div>

                        <div class="row --day">
                            <button class="item" v-for="_lank in startDay"></button>
                            <button
                                class="item --days"
                                :class="{ '--red': getDayOfWeek(day) === 0, '--blue': getDayOfWeek(day) === 6 }"
                                v-for="day in getDaysInMonth()"
                                :key="day"
                                @click="selectDate(currentYear, currentMonth, day)"
                                :data-index="getDayOfWeek(day)"
                            >
                                {{ day }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const calendarOpen = ref<boolean>(false);

const selectedDate = ref<string | null>(null);
const currentDate = new Date();
const currentYear = ref<number>(currentDate.getFullYear());
const currentMonth = ref<number>(currentDate.getMonth() + 1); // 현재 월로 설정

const startDay = ref<number | null>(null);

const displayYear = computed(() => currentYear.value);

const getMonthName = (month: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month - 1];
};

const getDaysInMonth = () => {
    return new Date(currentYear.value, currentMonth.value, 0).getDate();
};

const prevMonth = () => {
    if (currentMonth.value === 1) {
        currentMonth.value = 12;
        currentYear.value -= 1;
    } else {
        currentMonth.value -= 1;
    }
};

const nextMonth = () => {
    if (currentMonth.value === 12) {
        currentMonth.value = 1;
        currentYear.value += 1;
    } else {
        currentMonth.value += 1;
    }
};

const selectDate = (year: number, month: number, day: number) => {
    const formattedDate = `${year}-${month}-${day}`;
    selectedDate.value = formattedDate;
    calendarOpen.value = false;
};

const getWeekdayNames = () => {
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdayNames;
};

const getDayOfWeek = (day: number) => {
    const targetYear = displayYear.value.toString();
    const targetMonth = currentMonth.value.toString();
    const targetDay = day.toString().length === 1 ? "0" + day.toString() : day.toString();

    const dayOfWeek = new Date(targetYear + "-" + targetMonth + "-" + targetDay).getDay();

    if (startDay.value === null) {
        startDay.value = dayOfWeek;
    }

    return dayOfWeek;
};

watch(
    () => currentMonth.value,
    () => {
        startDay.value = null;
    }
);
</script>

<style scoped lang="scss">
.datePage {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .wrap {
        position: relative;
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 100px 0 0;
    }

    .button {
        width: 80px;
        height: 80px;
        border-radius: 4px;

        &:hover {
            background: var(--brown-400);
        }

        :deep(.path) {
            fill: var(--gray-700);
        }
    }

    .textField {
        @include C2;
        width: 500px;
        height: 80px;
        padding: 0 30px;
        font-weight: 400;
        color: var(--gray-900);
        background: var(--gray-200);
        border-radius: 4px;
        border: 1px solid var(--gray-700);

        &::placeholder {
            color: var(--gray-600);
        }
    }

    .calendar {
        position: absolute;
        left: 50%;
        top: calc(100% + 10px);
        transform: translateX(-50%);
        width: 480px;
        border-radius: 14px;
        border: 1px solid var(--gray-700);
        overflow: hidden;
    }

    .topArea {
        @include C1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        height: 80px;
        color: var(--gray-200);
        background-color: var(--brown-900);
        border-bottom: 1px solid var(--gray-700);

        .button {
            @include C2;
            width: 50px;
            height: 50px;
            color: var(--gray-200);
        }

        .year {
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
    }

    .bodyArea {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        background-color: var(--gray-200);
    }

    .days {
        .--dayName {
            display: flex;
            align-items: center;
            height: 60px;

            .item {
                @include T3;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;

                &.--red {
                    color: #e91e63;
                }

                &.--blue {
                    color: #00b8d4;
                }
            }
        }

        .--day {
            display: grid;
            grid-template-columns: repeat(7, 1fr);

            .item {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 60px;

                &.--red {
                    color: #e91e63;
                }

                &.--blue {
                    color: #00b8d4;
                }

                &.--days:hover {
                    background-color: var(--brown-100);
                }
            }
        }
    }
}
</style>
