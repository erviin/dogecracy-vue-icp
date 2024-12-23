<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import type { Voters } from './../../../../declarations/vue_backend/vue_backend.did';
import { IcpStore } from '@/lib/stores/icp-base';
import { formatDate, svgToText } from '@/lib/utils';
const { actor } = IcpStore;
const { params } = useRoute();


const loading = ref(false);

const data = ref<[][] | [string, Voters][]>([[], [], [], []])

const fetchData = async (petitionId: string | string[]) => {
    if (actor) {
        try {
            loading.value = true;
            const detail = await actor.getPetitionVoters(petitionId as string)
            if (detail.length > 0) {
                data.value = detail
                loading.value = false;

            } else {
                throw new Error("NOT_EXISTS")
            }
        } catch (error) {
            loading.value = false;
        }
    }
}

watch(() => params.id, fetchData, { immediate: true })

const replaceSvgHeight = (svg: string) => {
    return svg.replaceAll(` height="100" `, ` height="100%" `)
}

</script>
<template>
    <div class="space-y-3">
        <div class="flex items-center justify-between gap-4">
            <h3 class="font-semibold">Latest Signed</h3>
            <RouterLink to="#" class="text-sm hover:text-[#15e6b7] hover:underline">see all</RouterLink>
        </div>
        <div class="flex flex-col space-y-3">
            <RouterLink v-for="(element, index) in data" to="#" :key="index">
                <div class="flex flex-col border hover:bg-[#15e6b7]/20 border-[#15e6b7] p-3 rounded-lg">
                    <div v-if="!loading && element.length > 0" class="h-10 w-fit -rotate-3"
                        v-html="replaceSvgHeight(svgToText(element[1]?.signature as any))" />

                    <div class="flex w-full items-center justify-between gap-4">
                        <div
                            :class="`flex-1 ${loading ? 'animate-pulse bg-gray-700 h-5  rounded-full' : 'text-[#15e6b7] text-sm text-nowrap overflow-hidden text-ellipsis '}`">
                            <!-- {isLoadingSigner || element == undefined || element?.length < 1 ? '' : element[0]}  -->
                            <span v-if="!loading && element.length > 0">{{ element[0] }}</span>
                        </div>
                        <div :class="`w-26 ${loading ? 'animate-pulse bg-gray-700 h-5 w-12 rounded-full'
                            : 'text-[#848795] text-xs text-nowrap overflow-hidden text-ellipsis'} `">
                            <span v-if="!loading && element.length > 0 && element[1]?.created">
                                {{ formatDate(element[1]?.created) }}
                            </span>
                        </div>
                    </div>

                </div>
            </RouterLink>
        </div>
    </div>

</template>