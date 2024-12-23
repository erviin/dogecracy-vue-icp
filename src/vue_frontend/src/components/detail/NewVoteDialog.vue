<script setup lang="ts">
import { ref, watch } from 'vue';
import Dialog from '../ui/dialog/Dialog.vue';
import DialogContent from '../ui/dialog/DialogContent.vue';
import { Loader2, Signature, X } from 'lucide-vue-next';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';
import Label from '../ui/label/Label.vue';
import AnimateSignature from './AnimateSignature.vue';
import { IcpStore } from '@/lib/stores/icp-base';
import { useRoute } from 'vue-router';
import type { Voters } from './../../../../declarations/vue_backend/vue_backend.did';

const open = ref(false)
const loading = ref(false)
const submitting = ref(false)
const isSigned = ref(false)
const mySign = ref<undefined | Voters | Partial<Voters>>(undefined)
const name = ref('')
const postingState = ref('')
const hideClose = ref(true)
const { actor, isAuthenticated } = IcpStore;
const { params } = useRoute();

const fetchData = async (id: string | string[]) => {
    if (!isAuthenticated || !actor) {
        return;
    }
    try {

        const status = await actor.getMySign(id as string)
        console.log("status", status)

        if (status.length > 0) {
            mySign.value = status[0];
            isSigned.value = true;
        } else {
            throw new Error("ERROR");
        }
    } catch (error) {
        mySign.value = { petitionId: id as string };
        isSigned.value = false;
    }
}
watch(() => params.id, fetchData, { immediate: true })

const setOpen = (val: boolean) => {
    open.value = val;
}

const setName = (val: string) => {
    name.value = val;
}

const prepareVotePetition = (e: any) => {
    e.preventDefault();
    if (isAuthenticated && params.id && name.value.trim().length > 0) {
        setOpen(false);
        loading.value = true;
        submitting.value = true;
        postingState.value = "Signing"
    } else {
        if (name.value.trim().length < 1) {
            alert("Give your name or nickname")
        } else {
            alert("please login")
        }
    }
}

const submitSignature = async (svgData: any) => {
    if (actor) {
        postingState.value = "Sending  your sign"

        try {
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;' })
            const arrayBuffer = await svgBlob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            const status = await actor.votePetition(
                params.id as string,
                name.value,
                uint8Array
            )
            if (status) {
                mySign.value = status;
                //HARD RELOAD: TODO
                window.location.reload();
                isSigned.value = true
            } else {
                throw new Error("Failed top submit")

            }

        } catch (err) {
            isSigned.value = false
            alert("something went wrong")
        } finally {
            loading.value = false
        }
    }

}
</script>

<template>
    <div class='flex flex-col space-y-2 mb-4'>
        <Dialog :open="open" :hideClose="hideClose" class="border-white !max-w-full">
            <DialogContent :onPointerDownOutside="(e) => e.preventDefault()"
                :onEscapeKeyDown="(e) => e.preventDefault()"
                class=" flex flex-col w-[30vw] h-fit overflow-y-auto bg-brand-white/80 backdrop-blur border-brand !max-w-full overflow-hidden">
                <DialogHeader class="h-fit">
                    <DialogTitle class="font-intro text-black">Support this petition</DialogTitle>
                    <Button variant="ghost" size="icon" class="absolute right-4 top-4 text-black hover:bg-brand"
                        @click="() => setOpen(false)">
                        <X />
                        <span class="sr-only">Close</span>
                    </Button>
                </DialogHeader>
                <form class="overflow-hidden my-4" enctype='multipart/form-data' @submit="prepareVotePetition">
                    <div class='flex flex-col space-y-4 items-end'>
                        <div class="grid w-full items-center space-y-2 gap-1.5 text-black px-2 ">
                            <Label class="" htmlFor="name">Your name</Label>
                            <Input v-model="name" @change="(e: any) => setName(e.target?.value ?? '')" type="text"
                                id="name" placeholder="Your name to sign" />
                        </div>
                        <Button type="submit" class="font-intro bg-brand text-black hover:text-white w-fit">
                            Vote Now
                        </Button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
        <AnimateSignature v-if="(name.trim().length > 0 && submitting) || isSigned" :text="name" :isSigned="isSigned"
            :mySign="mySign" :submitSignature="submitSignature" />
        <Button v-if="!isSigned" :disabled="loading || isSigned"
            class="text-lg bg-[#FFAC43] text-black w-full h-12 font-semibold hover:bg-black hover:text-[#FFAC43] border border-black hover:border-[#FFAC43] "
            @click="() => setOpen(true)">
            <Signature class="h-12" />
            <div v-if="loading" class='flex space-x-2 items-center'>
                <Loader2 class='animate-spin' />
                <span>{{ postingState }}</span>
            </div>

            <span v-else-if="!loading">{{ isSigned ? 'Signed' : 'Sign' }}</span>

        </Button>
    </div>
</template>