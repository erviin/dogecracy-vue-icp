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
    <main class="px-4 py-14 md:py-14">
        <div class="container mx-auto">
            <div class="space-y-20">
                <div class="w-full mx-auto text-center">
                    <h1
                        class="text-2xl !leading-[2.5rem] md:text-5xl font-bold text-white mb-6 text-center md:!leading-[4rem] font-sans">
                        {{ detail?.petitionTitle }}
                    </h1>
                    <div class="flex items-center justify-center mb-5 text-gray-300 gap-x-4">
                        <div class="flex items-center text-base gap-x-1 w-fit">
                            <CircleUser class="size-4 -mt-[1px]" />
                            <div class="text-[#15e6b7] w-36 overflow-hidden text-ellipsis text-nowrap">{{ principalId
                                ?? ''
                                }}</div>
                        </div>
                        <div class="flex-shrink-0 text-base">{{ detail ? formatDate(BigInt(detail?.created)) : '' }}
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-center gap-3">
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

                <div class="w-full mx-auto max-w-7xl">
                    <div class="flex flex-col items-start gap-12 md:flex-row">
                        <div class="flex-1 space-y-6">
                            <div
                                class="relative w-full max-h-[30rem] h-full justify-center flex rounded-lg overflow-hidden">
                                <img class="h-full rounded-lg w-fit"
                                    :src="detail ? blobToUrl(detail.image) : 'https://placehold.co/1200x1000/111/222/png?text=DogeCracy&font=lato'" />
                            </div>

                            <div class="p-4 text-black rounded-lg bg-brand-white/70 ">
                                <div class="flex items-center pb-4 mb-4 space-x-4 border-b">
                                    <Avatar class="w-16 h-16 bg-gray-800">
                                        <AvatarImage src="/placeholder-avatar.jpg" alt="User's avatar" />
                                        <AvatarFallback class="bg-gray-800 text-brand font-intro">DGC</AvatarFallback>
                                    </Avatar>
                                    <div class="">
                                        <h1 class="text-2xl  font-intro">Why it's important?</h1>
                                        <div>Started by <span class="font-semibold">0xzczxcdf89</span></div>
                                    </div>
                                </div>
                                <div v-html="detail?.petitionDesc"
                                    class="px-6 py-2 text-lg leading-loose text-justify whitespace-pre-line">
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
                        <div class="sticky flex-shrink-0 w-full space-y-6 md:w-80 top-36">

                            <div>
                                <!-- {isReported && <p
                                    class="flex items-center justify-center w-full h-12 text-red-500 bg-transparent border border-red-500 rounded-lg">
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

                <div class="w-full mx-auto max-w-7xl">
                    <h2 class="flex items-center mb-3 text-lg font-medium leading-none gap-x-2">
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
                                            <div class="relative w-full h-32 overflow-hidden">
                                                <img src="https://placehold.co/600x400/111/222/png?text=DogeCracy&font=lato"
                                                    alt="Title" fill="true" sizes="100%" style={{ objectFit: "cover"
                                                    }} />
                                            </div>
                                            <CardContent class="p-4 text-white">
                                                <h3
                                                    class="font-semibold line-clamp-1 mb-1 group-hover:text-[#FFAC43]">
                                                    Improve Public Transportation
                                                </h3>
                                                <div class="flex items-center mb-5 text-gray-300 gap-x-4">
                                                    <div class="flex items-center text-xs gap-x-1">
                                                        <CircleUser class="size-3 -mt-[1px]" />{" "}
                                                        <span class="text-[#15e6b7]">
                                                            0xFe34...95b85E
                                                        </span>
                                                    </div>
                                                    <div class="flex-shrink-0 text-xs">
                                                        1/1/2025
                                                    </div>
                                                </div>
                                                <p class="text-sm text-gray-300 line-clamp-2">
                                                    Increase bus frequency and add more bike
                                                    lanes
                                                </p>
                                            </CardContent>
                                            <CardFooter class="px-4 pt-0 pb-4">
                                                <div
                                                    class="flex items-center justify-between w-full overflow-hidden gap-x-4">
                                                    <Badge
                                                        class="border-[#15e6b7] font-normal text-[#15e6b7] flex-shrink-0">
                                                        Environment
                                                    </Badge>
                                                    <div class="flex justify-start flex-1 w-full overflow-hidden">
                                                        <div
                                                            class="inline-flex items-center justify-end w-full space-x-2 text-sm font-normal text-white">
                                                            <Signature
                                                                class="size-4 text-[#FFAC43] flex-shrink-0" />{" "}
                                                            <span
                                                                class="overflow-hidden whitespace-nowrap text-ellipsis">
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
