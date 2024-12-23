<script setup lang="ts">
import { svgToText } from '@/lib/utils';
import { ref, toRaw, watch } from 'vue';

const svgRef = ref(null);
const pathLength = ref(0);


const { text, submitSignature, isSigned, mySign } = defineProps(['text', 'submitSignature', "isSigned", "mySign"])

const animateString = (text: any) => {
    if (text.length > 0 && pathLength.value == 0) {
        const timer = setTimeout(() => {
            pathLength.value = 1;
            const timer = setTimeout(() => {
                const svgData = new XMLSerializer().serializeToString(svgRef.value)
                submitSignature(svgData);
            }, 100);

        }, 100);
    }
}
watch(() => text, animateString, { immediate: true })


</script>
<template>

    <div class="w-full max-w-md mx-auto text-brand font-sundiary -rotate-3 ">


        <div v-if="isSigned" v-html="svgToText(mySign.signature)" />

        <svg v-else-if="!isSigned" ref="svgRef" width="100%" height="100" viewBox="0 0 300 100"
            preserveAspectRatio="xMidYMid meet">
            <text x="150" y="50" text-anchor="middle" dominant-baseline="middle" font-family="Sundiary, cursive"
                font-size="48" fill="none" stroke="#FFAC43" stroke-width="1" class='font-sundiary'>
                <tspan>
                    {{ text }}
                </tspan>
            </text>
            <text x="150" y="50" text-anchor="middle" dominant-baseline="middle" font-family="Sundiary, cursive"
                font-size="48" fill="#FFAC43" class='font-sundiary'>
                <tspan>
                    {{ text }}
                </tspan>
            </text>
            <path :d="`M0,50 Q150,${50 + Math.random() * 20 - 10} 300,50`" fill="none" stroke="#FFAC43"
                stroke-width="2.5" stroke-dasharray="300" :stroke-dashoffset="`${300 - (pathLength * 300)}`"
                :style="{ transition: 'stroke-dashoffset 1s ease-in-out' }" />
        </svg>
    </div>
</template>