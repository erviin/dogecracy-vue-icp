<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import type Carousel from '@/components/ui/carousel/Carousel.vue';
import CarouselContent from '@/components/ui/carousel/CarouselContent.vue';
import { IcpStore } from '@/lib/stores/icp-base';
import { Bookmark, Bug, CircleUser, Share2, Signature } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Base } from './../../../declarations/vue_backend/vue_backend.did';
import { blobToUrl, formatDate } from '@/lib/utils';
import NewVoteDialog from '@/components/detail/NewVoteDialog.vue';
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';
import LatestSigner from '@/components/detail/LatestSigner.vue';
import FundRaise from '@/components/detail/FundRaise.vue';

const { actor } = IcpStore;
const detail = ref<undefined | Base>(undefined)
const principalId = ref<undefined | string>(undefined)
const fetchData = async (id: string | string[]) => {
    if (actor && typeof id == "string") {
        const splits = id.split("-");
        const principalIds = [];
        for (let index = 0; index < (splits.length - 1); index++) {
            principalIds.push(splits[index]);
        }
        principalId.value = principalIds.join("-");
        const res = await actor.getPetitionDetail(principalId.value, id)
        detail.value = res[0]
        console.log("DEtTT", detail);
    }
}
const route = useRoute();
watch(() => route.params.id, fetchData, { immediate: true })



</script>

<template>
    <main class="py-14 md:py-14 px-4">
        <div class="container mx-auto">
            <div class="space-y-20">
                <div class="w-full  mx-auto text-center">
                    <h1
                        class="text-2xl !leading-[2.5rem] md:text-5xl font-bold text-white mb-6 text-center md:!leading-[4rem] font-sans">
                        {{ detail?.petitionTitle }}
                    </h1>
                    <div class="flex items-center justify-center gap-x-4 mb-5 text-gray-300">
                        <div class="text-base flex items-center gap-x-1 w-fit">
                            <CircleUser class="size-4 -mt-[1px]" />
                            <div class="text-[#15e6b7] w-36 overflow-hidden text-ellipsis text-nowrap">{{ principalId
                                ?? ''
                                }}</div>
                        </div>
                        <div class="text-base flex-shrink-0">{{ detail ? formatDate(BigInt(detail?.created)) : '' }}
                        </div>
                    </div>
                    <div class="flex items-center gap-3 flex-wrap justify-center">
                        <Badge class="border-[#15e6b7] font-normal text-[#15e6b7] flex-shrink-0">
                            Environment
                        </Badge>
                    </div>
                    <div class="h-0.5 rounded-full w-full bg-[#FFAC43] relative mt-20 max-w-2xl mx-auto">
                        <div
                            class="size-16 bg-black rounded-full flex items-center justify-center absolute left-1/2 -top-8 -ml-8 border-2 border-[#FFAC43]">
                            <Signature class="size-6 text-[#FFAC43]" />
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-7xl mx-auto">
                    <div class="flex items-start gap-12 flex-col md:flex-row">
                        <div class="flex-1 space-y-6">
                            <div
                                class="relative w-full max-h-[30rem] h-full justify-center flex rounded-lg overflow-hidden">
                                <img class="h-full w-fit rounded-lg"
                                    :src="detail ? blobToUrl(detail.image) : 'https://placehold.co/1200x1000/111/222/png?text=DogeCracy&font=lato'" />
                            </div>

                            <div class="bg-brand-white/70 text-black rounded-lg p-4 ">
                                <div class="flex items-center space-x-4 mb-4 border-b pb-4">
                                    <Avatar class="w-16 h-16 bg-gray-800">
                                        <AvatarImage src="/placeholder-avatar.jpg" alt="User's avatar" />
                                        <AvatarFallback class="bg-gray-800 text-brand font-intro">DGC</AvatarFallback>
                                    </Avatar>
                                    <div class="">
                                        <h1 class=" font-intro text-2xl">Why it's important?</h1>
                                        <div>Started by <span class="font-semibold">0xzczxcdf89</span></div>
                                    </div>
                                </div>
                                <div v-html="detail?.petitionDesc"
                                    class="whitespace-pre-line  leading-loose text-justify text-lg px-6 py-2">
                                </div>
                            </div>


                            <div class="flex items-center gap-4 justify-between bg-[#111] rounded-lg py-3 px-4">
                                <div class="flex items-center gap-4 ">
                                    <!-- {(!isReported || isReported) && !isSigned && -->
                                    <!-- <Button class={isReported ? `h-12 bg-red-500 justify-start border border-red-500
                                        hover:bg-red-500 hover:border-red-500 hover:text-white` : `h-12 bg-transparent
                                        justify-start border border-[#555] hover:opacity-55 hover:bg-transparent
                                        hover:text-white`} variant="outline" onClick={handleReport}>
                                        <Bug class="size-5" />
                                        Report
                                    </Button> -->
                                    <Button class="h-12 bg-transparent
                                        justify-start border border-[#555] hover:opacity-55 hover:bg-transparent
                                        hover:text-white" variant="outline">
                                        <Bug class="size-5" />
                                        Report
                                    </Button>
                                    <!-- } -->
                                    <!-- <Button class={isBookmark ? `h-12 bg-[#FFAC43] justify-start border text-black
                                        border-[#FFAC43] hover:bg-[#FFAC43]` : `h-12 bg-transparent justify-start border
                                        border-[#555] hover:opacity-55 hover:bg-transparent hover:text-white`}
                                        onClick={handleBookmark} variant="outline">
                                        <Bookmark class="size-5" />Bookmark {totalBookmark > 0 ?
                                        `(${totalBookmark})` : ``}
                                    </Button> -->
                                    <Button class="h-12 bg-transparent justify-start border
                                        border-[#555] hover:opacity-55 hover:bg-transparent hover:text-white"
                                        onClick={handleBookmark} variant="outline">
                                        <Bookmark class="size-5" />Bookmark 0
                                    </Button>
                                </div>
                                <Button
                                    class=" h-12 bg-transparent justify-start border border-[#555] hover:border-[#15e6b7] hover:bg-[#15e6b7]"
                                    variant="outline">
                                    <Share2 class="size-5" />Share
                                </Button>
                            </div>

                        </div>
                        <div class="md:w-80 w-full flex-shrink-0 space-y-6 sticky top-36">

                            <div>
                                <!-- {isReported && <p
                                    class="bg-transparent text-red-500 w-full h-12 rounded-lg flex items-center justify-center border border-red-500">
                                    You reported this petition</p>} -->


                                <!-- {/* {!isReported && isSigned && */} -->
                                <div class="text-center">
                                    <!-- {/* <div class="signature text-5xl -rotate-3 text-[#FFAC43] py-6 text-center">
                                        DogecracySign
                                    </div> */} -->
                                    <NewVoteDialog />


                                </div>
                                <!-- {/* } */} -->
                            </div>
                            <FundRaise />

                            <LatestSigner />
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-7xl mx-auto">
                    <h2 class="font-medium text-lg mb-3 flex items-center gap-x-2 leading-none">
                        <Newspaper class="text-[#ec4899] size-6" />
                        <span>More Smiliar Petitions</span>
                    </h2>

                    <div class="px-0">
                        <!-- <Carousel class="w-full" :opts={{ align: "start" , loop: true, }}>
                            <CarouselContent class="-ml-2 md:-ml-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                <CarouselItem key={index} class="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/3">
                                    <div class="p-1">
                                        <Card
                                            class="bg-black overflow-hidden group cursor-pointer border-[#111111]">
                                            <Link href={"/explorer/" + index} prefetch={false}>
                                            <div class="relative h-32 w-full overflow-hidden">
                                                <img src="https://placehold.co/600x400/111/222/png?text=DogeCracy&font=lato"
                                                    alt="Title" fill="true" sizes="100%" style={{ objectFit: "cover"
                                                    }} />
                                            </div>
                                            <CardContent class="p-4 text-white">
                                                <h3
                                                    class="font-semibold line-clamp-1 mb-1 group-hover:text-[#FFAC43]">
                                                    Improve Public Transportation
                                                </h3>
                                                <div class="flex items-center gap-x-4 mb-5 text-gray-300">
                                                    <div class="text-xs flex items-center gap-x-1">
                                                        <CircleUser class="size-3 -mt-[1px]" />{" "}
                                                        <span class="text-[#15e6b7]">
                                                            0xFe34...95b85E
                                                        </span>
                                                    </div>
                                                    <div class="text-xs flex-shrink-0">
                                                        1/1/2025
                                                    </div>
                                                </div>
                                                <p class="text-sm line-clamp-2 text-gray-300">
                                                    Increase bus frequency and add more bike
                                                    lanes
                                                </p>
                                            </CardContent>
                                            <CardFooter class="px-4 pb-4 pt-0">
                                                <div
                                                    class="flex items-center gap-x-4 justify-between w-full overflow-hidden">
                                                    <Badge
                                                        class="border-[#15e6b7] font-normal text-[#15e6b7] flex-shrink-0">
                                                        Environment
                                                    </Badge>
                                                    <div class="flex-1 flex w-full justify-start overflow-hidden">
                                                        <div
                                                            class="inline-flex w-full items-center space-x-2 justify-end text-white font-normal text-sm">
                                                            <Signature
                                                                class="size-4 text-[#FFAC43] flex-shrink-0" />{" "}
                                                            <span
                                                                class="overflow-hidden whitespace-nowrap  text-ellipsis">
                                                                231 signatures
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardFooter>
                                            </Link>
                                        </Card>
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious class="bg-black left-[-0.8rem] md:left-[-2rem] border-[#222222]" />
                            <CarouselNext class="bg-black right-[-0.8rem] md:right-[-2rem] border-[#222222]" />
                        </Carousel> -->
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>