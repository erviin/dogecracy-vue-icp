<script setup lang="ts">
import MyPetition from '@/components/profile/MyPetition.vue';
import NewPetitionDialog from '@/components/profile/NewPetitionDialog.vue';
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import { IcpStore } from '@/lib/stores/icp-base';
const { whoami } = IcpStore;
</script>

<template>
    <main class="py-14 md:py-14 px-4 flex-1">
        <div class="container mx-auto space-x-8 flex ">
            <div class="w-4/12 xl:block hidden">
                <Card class="bg-gray-950 text-brand-white border-gray-800 sticky">
                    <CardHeader class="space-y-6">
                        <div class="flex justify-between items-center font-intro space-x-4">
                            <span class="bg-purple-600  py-0 px-2 rounded-lg ">ICP IDENTITY</span>
                            <span class=" flex-1 overflow-hidden text-ellipsis text-nowrap">{{ whoami }}</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <Avatar class="w-20 h-20 bg-gray-800">
                                <AvatarImage src="/placeholder-avatar.jpg" alt="User's avatar" />
                                <AvatarFallback class="bg-gray-800 text-brand font-intro">DGC</AvatarFallback>
                            </Avatar>
                            <div class="space-y-2">
                                <CardTitle class="font-sundiary text-xl">DOGECRACY</CardTitle>
                                <CardDescription>@ananymous</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <div class="flex space-x-2 ">
                            <!-- <Button onClick={() => getwhoami()} class=" w-full text-brand hover:bg-black"><Link2Icon /> Connect Google</Button> -->
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div class="flex-1 flex-col space-y-4 overflow-hidden">
                <!-- {/* <div class="flex "> */} -->
                <div class="flex justify-between items-center">
                    <h1 class="text-5xl font-bold font-intro">Petitions, Campaign</h1>

                    <div>
                        <NewPetitionDialog />
                        <!-- <NewPetitionDialog />
                        {/* <Button onClick={() => setIsPetitionShow(!isPetitionShow)} class="rounded-full p-2">
                                <ChevronDown class={cn(
                                    "transition-transform duration-200",
                                    !isPetitionShow && "rotate-180"
                                )} />
                            </Button> */} -->
                    </div>
                </div>
                <div>
                    <MyPetition />

                    <!-- {/* <div class="bg-gray-950 border shadow-md text-brand-white border-gray-800 rounded-xl min-h-60 flex justify-center items-center">
                        <p class="font-intro">No records found</p>
                    </div> */} -->
                    <!-- <MyPetition /> -->

                </div>
                <!-- {/* </div> */} -->

            </div>
        </div>
    </main>
</template>