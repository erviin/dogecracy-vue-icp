<script setup lang="ts">
import Button from '../ui/button/Button.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
import { ref, toRaw, watch } from 'vue';
import { IcpStore } from '@/lib/stores/icp-base';
import type { Base } from './../../../../declarations/vue_backend/vue_backend.did';
import { CircleUser, Signature } from 'lucide-vue-next';
import Card from '../ui/card/Card.vue';
import CardContent from '../ui/card/CardContent.vue';
import CardFooter from '../ui/card/CardFooter.vue';
import Badge from '../ui/badge/Badge.vue';

const { actor } = IcpStore
const data = ref<undefined | [string, Base][]>([[], [], []])
const loading = ref(false)
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id: string | string[]) {
    if (actor) {
        loading.value = true;
        const res = await actor.getMyPetitions();
        data.value = res;
        loading.value = false;
    }
}
</script>



<template>
    <div class="flex flex-wrap">
        <div v-if="data !== undefined && data.length == 0"
            class="text-center text-xl p-4 w-full bg-gray-900 rounded-xl my-6">
            No records found
        </div>
        <RouterLink v-if="data == undefined || data.length > 0" v-for="(item, index) in data" :key="index"
            :to="{ name: 'detail', params: { id: item[1]?.petitionId ?? '#' } }"
            class=" w-full md:w-6/12 xl:w-4/12 p-1 ">
            <Card class=" py-2 overflow-hidden bg-gray-950 text-brand-white border-gray-800 h-fit">

                <CardContent v-if="loading" class="p-4 text-white">
                    <div class="animate-pulse bg-white/10 h-[20px] w-full rounded-md mb-1" />
                    <div class="animate-pulse bg-white/10 h-[20px] w-full rounded-md mb-5" />
                    <div class="animate-pulse bg-white/10 h-[70px] w-full rounded-md" />
                </CardContent>
                <CardContent v-else-if="!loading" class="p-4 text-white">
                    <h3 class="font-semibold line-clamp-2 mb-1 group-hover:text-[#FFAC43]">
                        {{ item[1].petitionTitle }}
                    </h3>
                    <div class="flex items-center justify-between gap-x-4 mb-5 text-gray-300">
                        <div class="text-xs flex items-center gap-x-1 w-6/12">
                            <CircleUser class="size-3 -mt-[1px]" />
                            <span class="text-[#15e6b7] flex-1 overflow-hidden text-nowrap text-ellipsis">
                                {principal}
                            </span>
                        </div>
                        <div class="text-xs flex-shrink-0">
                            1/1/2025
                        </div>
                    </div>
                    <div class="text-sm line-clamp-4 text-gray-300" v-html="item[1].petitionDesc" />
                </CardContent>

                <CardFooter class="py-4  px-4">

                    <div class="flex items-center gap-x-4 justify-between w-full overflow-hidden">
                        <div v-if="loading" class="animate-pulse bg-white/10 h-[20px] w-6/12 rounded-md" />

                        <Badge v-else-if="!loading" class="border-[#15e6b7] font-normal text-[#15e6b7] flex-shrink-0">
                            Environment
                        </Badge>

                        <div class="flex-1 flex w-full justify-start overflow-hidden">

                            <div v-if="loading" class="animate-pulse bg-white/10 h-[20px] w-full rounded-md" />

                            <div v-else-if="!loading"
                                class="inline-flex w-full items-center space-x-2 justify-end text-white font-normal text-sm">
                                <Signature class="size-4 text-[#FFAC43] flex-shrink-0" />
                                <span class="overflow-hidden whitespace-nowrap  text-ellipsis">
                                    231 signatures
                                </span>
                            </div>


                        </div>
                    </div>

                    <!-- <div class="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage src={card.avatar} alt={card.author} />
                            <AvatarFallback>{card.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span class="text-sm font-medium">{card.author}</span>
                    </div>  -->
                </CardFooter>
            </Card>
        </RouterLink>
    </div>
</template>