<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import { IcpStore } from '@/lib/stores/icp-base';
import { CircleUser, Signature } from 'lucide-vue-next';
import { ref } from 'vue';
import { watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const { params } = useRoute();
import type { Base } from './../../../declarations/vue_backend/vue_backend.did';
import { blobToUrl, formatDate } from '@/lib/utils';
const { actor, isAuthenticated, whoami, ledgerActor } = IcpStore;
const data = ref<undefined | [string, Base][]>([[], [], []])
const loading = ref(false)
const fetchData = async (params: any) => {

    if (actor) {
        loading.value = true;

        const res = await actor.getAllPetitions()
        console.log("allPetitions", res);
        data.value = res;
        loading.value = false;
    }

}

watch(() => params, fetchData, { immediate: true })
</script>

<template>
    <main class="py-14 md:py-14 px-4">
        <div class="container mx-auto">
            <h1 class="text-3xl md:text-5xl font-bold text-white mb-14 font-intro">
                Explore Petitions
            </h1>
            <div class="space-y-8">
                <div class="flex items-center justify-between gap-6 flex-wrap ">
                    <div></div>
                    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-6">

                        <RouterLink v-if="data == undefined || data.length > 0" v-for="(item, index) in data"
                            :key="index" :to="{ name: 'detail', params: { id: item[1]?.petitionId ?? '#' } }">
                            <Card class="bg-black overflow-hidden group cursor-pointer border-[#111111]" key={index}>

                                <div class="relative h-52 w-full overflow-hidden">
                                    <img
                                        :src="item[1].image ? blobToUrl(item[1].image) : 'https://placehold.co/1200x1000/111/222/png?text=DogeCracy&font=lato'" />
                                    alt="Title" />
                                </div>

                                <CardContent v-if="loading" class="p-4 text-white">
                                    <div class="animate-pulse bg-white/10 h-[20px] w-full rounded-md mb-1" />
                                    <div class="animate-pulse bg-white/10 h-[20px] w-full rounded-md mb-5" />
                                    <div class="animate-pulse bg-white/10 h-[70px] w-full rounded-md" />
                                </CardContent>

                                <CardContent v-else-if="!loading" class="p-4 text-white">
                                    <h3 class="font-semibold line-clamp-1 mb-1 group-hover:text-[#FFAC43]">
                                        {{ item[1]?.petitionTitle }}
                                    </h3>
                                    <div class="flex items-center justify-between gap-x-4 mb-5 text-gray-300">
                                        <div class="text-xs flex items-center gap-x-1 max-w-60">
                                            <CircleUser class="size-8 " />
                                            <span class="text-[#15e6b7] text-nowrap overflow-hidden text-ellipsis">
                                                {{ item[1]?.petitionId }}
                                            </span>
                                        </div>
                                        <div class="text-xs flex-shrink-0">
                                            {{ formatDate(item[1]?.created) }}
                                        </div>

                                    </div>
                                    <div class="text-sm line-clamp-2 text-gray-300" v-html="item[1].petitionDesc" />
                                </CardContent>
                                <CardFooter class="px-4 pb-4 pt-0">
                                    <div class="flex items-center gap-x-4 justify-between w-full overflow-hidden">
                                        <div v-if="loading"
                                            class="animate-pulse bg-white/10 h-[20px] w-6/12 rounded-md" />

                                        <Badge v-else-if="!loading"
                                            class="border-[#15e6b7] font-normal text-[#15e6b7] flex-shrink-0">
                                            Environment
                                        </Badge>
                                        <div class="flex-1 flex w-full justify-start overflow-hidden">
                                            <div v-if="loading"
                                                class="animate-pulse bg-white/10 h-[20px] w-full rounded-md" />

                                            <div v-else-if="!loading"
                                                class="inline-flex w-full items-center space-x-2 justify-end text-white font-normal text-sm">

                                                <Signature class="size-4 text-brand flex-shrink-0" />
                                                <span class="overflow-hidden whitespace-nowrap  text-ellipsis">
                                                    231 signatures
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>