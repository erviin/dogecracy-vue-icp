<script setup lang="ts">
import { Loader2, Signature } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { IcpStore } from '@/lib/stores/icp-base';
import type { FundBase } from './../../../../declarations/vue_backend/vue_backend.did';
import Dialog from '../ui/dialog/Dialog.vue';
import NewFundRaiseDialog from './NewFundRaiseDialog.vue';
import { amountToFormatted, BACKEND_CANISTER_ID } from '@/lib/utils';
import { Principal } from '@dfinity/principal';
import DialogContent from '../ui/dialog/DialogContent.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import Input from '../ui/input/Input.vue';

const { params } = useRoute();
const { actor, isAuthenticated, whoami, ledgerActor } = IcpStore;
const loading = ref(false);
const donateLoading = ref(false);
const balance = ref<undefined | number>(undefined);
const petitionOwner = ref<string | undefined>(undefined);
const data = ref<undefined | FundBase>(undefined);
const openDonateDialog = ref(false);
const formattedAmount = ref('')
const rawAmount = ref('')
const comment = ref('')


const fetchData = async (petitionId: string | string[]) => {
    var splits = (petitionId as string).split("-");
    var ownerId = [];
    for (let index = 0; index < (splits.length - 1); index++) {
        ownerId.push(splits[index]);
    }
    petitionOwner.value = ownerId.join("-");
    if (ledgerActor && isAuthenticated) {
        var x = Number(await ledgerActor.icrc1_balance_of({ "owner": Principal.fromText(whoami as string), "subaccount": [] }));
        balance.value = parseInt(x.toString());
    }
    if (actor) {
        try {
            loading.value = true;
            const detail = await actor.getFundRaise(petitionId as string)
            console.log("detail", detail)
            if (detail.length > 0) {
                data.value = detail[0]
                loading.value = false;
            } else {
                throw new Error("NOT_EXISTS")
            }
        } catch (error) {
            loading.value = false;
        }
    }
};


watch(() => params.id, fetchData, { immediate: true })

const setOpenDonateDialog = (v: boolean) => {
    openDonateDialog.value = v
}

const donateNow = async (e: Event) => {
    e.preventDefault()
    if (ledgerActor && isAuthenticated && BACKEND_CANISTER_ID) {
        try {
            donateLoading.value = true;
            const response = await ledgerActor.donate({
                "to": {
                    "owner": Principal.fromText(BACKEND_CANISTER_ID),
                    "subaccount": []
                },
                "amount": BigInt(rawAmount.value),
                "fee": [],
                'memo': [],
                'from_subaccount': [],
                'created_at_time': [],
            }, {
                'created': BigInt((new Date()).getTime()) / 1000n,
                'petitionId': params.id as string,
                'comment': comment.value,
                'amount': BigInt(rawAmount.value)
            })
            console.log("detail", response)
            console.log("detail", rawAmount.value)
            if (response) {
                // data.value = detail[0]
                donateLoading.value = false;
            } else {
                throw new Error("NOT_EXISTS")
            }
        } catch (error) {
            alert("something went wrong");
            donateLoading.value = false;
        }
    }
}

const handleAmountInput = (e: Event) => {
    const numericValue = formattedAmount.value.replace(/,/g, "").replace(/[^\d.]/g, "");
    rawAmount.value = numericValue;
    formattedAmount.value = amountToFormatted(numericValue);
}

</script>
<template>
    <div v-if="data === undefined" class="text-center space-y-4 bg-gray-900 p-4 rounded-lg">
        <h2 class="text-brand font-semibold text-xl font-intro"> No Fundraise</h2>
        <p>Currently there is no fundraise for this petition</p>
        <NewFundRaiseDialog v-if="isAuthenticated && whoami === petitionOwner" :petitionId="params.id" />

    </div>
    <div v-if="data !== undefined" class="space-y-6  rounded-lg mb-4">
        <div class="space-y-2 text-center ">
            <div>Fund Raising Target <span class="text-brand font-semibold">
                    $DOGECY
                </span>
            </div>
            <div class="font-bold text-lg text-emerald-400 flex items-center justify-center space-x-2 w-full">
                <!-- <Signature class="size-10" /> -->
                <span>{{ amountToFormatted((data?.targetAmount ?? 0).toString()) }}</span>
            </div>
            <h3>
                Collected
            </h3>
            <div class="font-semibold text-emerald-400 text-xl">34.000.000.000</div>
            <div class="text-brand-white text-center bg-gray-900 p-2">{{ data?.reason }}</div>
            <div>
                <div class="flex justify-between my-4">
                    <div>Your balance <span class="text-brand">$DOGECY</span></div>
                    <span>{{ amountToFormatted((balance ?? 0).toString()) }}</span>
                </div>
                <Button :disabled="balance == undefined || balance == 0" @click="() => setOpenDonateDialog(true)"
                    class="bg-emerald-400 w-full text-black hover:bg-emerald-600">
                    {{ balance == undefined ? 'Please login' : (balance == 0 ? 'Insufficient balance' : 'Donate now') }}
                </Button>
                <p v-if="balance === 0" class="text-right">How to get <RouterLink to="#"
                        class="text-brand hover:text-brand/80">$DOGECY
                    </RouterLink> ?
                </p>
            </div>
        </div>
    </div>

    <Dialog :open="openDonateDialog" :hideClose="true" class="border-white !max-w-full">
        <DialogContent :onPointerDownOutside="(e) => e.preventDefault()" :onEscapeKeyDown="(e) => e.preventDefault()"
            class=" flex flex-col w-[30vw] h-fit overflow-y-auto bg-brand-white/80 backdrop-blur border-brand !max-w-full overflow-hidden">
            <DialogHeader class="h-fit">
                <DialogTitle class="font-intro text-black">Support this petition</DialogTitle>
                <Button variant="ghost" size="icon" class="absolute right-4 top-4 text-black hover:bg-brand"
                    @click="() => setOpenDonateDialog(false)">
                    <X />
                    <span class="sr-only">Close</span>
                </Button>
            </DialogHeader>
            <form class="overflow-hidden my-4" enctype='multipart/form-data' @submit="donateNow">
                <div class='flex flex-col space-y-4 items-end'>
                    <div class="grid w-full items-center space-y-2 gap-1.5 text-black px-2 ">
                        <Label class="" htmlFor="name">Total amount to donate</Label>
                        <div class="relative w-full max-w-sm items-center">

                            <Input :max="data?.targetAmount ?? 0" id="formatted-amount" v-model="formattedAmount"
                                @input="handleAmountInput"
                                class="block w-full pl-24 pr-3 text-sm border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter amount" />
                            <span
                                class="absolute start-0 inset-y-0 flex items-center justify-center px-2 text-gray-500 font-semibold">
                                $DOGECY
                            </span>
                        </div>
                    </div>
                    <div class="grid w-full items-center space-y-2 gap-1.5 text-black px-2 ">
                        <Label class="" htmlFor="name">Give your comment</Label>
                        <Textarea v-model="comment" type="text" id="name"
                            placeholder="Tell the world what you think about the idea"> </Textarea>
                    </div>
                    <Button :disabled="donateLoading" type="submit"
                        class="font-intro bg-brand text-black hover:text-white w-fit">
                        <Loader2 v-if="donateLoading" class="animate-spin" />
                        Donate Now
                    </Button>
                </div>

            </form>
        </DialogContent>
    </Dialog>
</template>