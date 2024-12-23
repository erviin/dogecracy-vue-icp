<script setup lang="ts">
import { Loader2, X } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
import Dialog from '../ui/dialog/Dialog.vue';
import DialogContent from '../ui/dialog/DialogContent.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import Label from '../ui/label/Label.vue';
import Input from '../ui/input/Input.vue';
import { ref } from 'vue';
import Textarea from '../ui/textarea/Textarea.vue';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn, dateStringToInt } from '@/lib/utils'
import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import Calendar from '../ui/calendar/Calendar.vue';
import { IcpStore } from '@/lib/stores/icp-base';
const df = new DateFormatter('en-US', {
    dateStyle: 'long',
})
const { actor } = IcpStore;

const { petitionId } = defineProps(['petitionId', "isShow"])
const open = ref(false)
const loading = ref(false)
const hideClose = ref(true)
const reason = ref('')
const formattedAmount = ref('')
const rawAmount = ref('')
const endDate = ref<DateValue>()

const currencySymbol = ref("");

const setOpen = (val: boolean) => {
    open.value = val;
}

const setFundRaise = async (e: any) => {
    e.preventDefault();
    if (actor) {
        try {
            loading.value = true;
            const detail = await actor.setFundRaise(petitionId as string, BigInt(rawAmount.value), reason.value, dateStringToInt(endDate.value?.toString() ?? ''))
            console.log("detail", detail)
            if (detail.length > 0) {
                // data.value = detail
                loading.value = false;
            } else {
                throw new Error("NOT_EXISTS")
            }
        } catch (error) {
            loading.value = false;
        }
    }
}
const handleAmountInput = () => {
    const numericValue = formattedAmount.value.replace(/,/g, "").replace(/[^\d.]/g, "");
    rawAmount.value = numericValue;
    formattedAmount.value = Number(numericValue).toLocaleString("en-US", {
        maximumFractionDigits: 2,
    })
}
</script>

<template>
    <Button type="button" @click="setOpen(true)" class="font-intro bg-emerald-300 text-black hover:text-white w-fit">
        Setup Now
    </Button>
    <Dialog :open="open" :hideClose="hideClose" class="border-white !max-w-full">
        <DialogContent :onPointerDownOutside="(e) => e.preventDefault()" :onEscapeKeyDown="(e) => e.preventDefault()"
            class=" flex flex-col w-[30vw] h-fit overflow-y-auto bg-brand-white/80 backdrop-blur border-brand !max-w-full overflow-hidden">
            <DialogHeader class="h-fit">
                <DialogTitle class="font-intro text-black">Support this petition</DialogTitle>
                <Button variant="ghost" size="icon" class="absolute right-4 top-4 text-black hover:bg-brand"
                    @click="() => setOpen(false)">
                    <X />
                    <span class="sr-only">Close</span>
                </Button>
            </DialogHeader>
            <form class="overflow-hidden my-4" enctype='multipart/form-data' @submit="setFundRaise">
                <div class='flex flex-col space-y-4 items-end'>
                    <div class="grid w-full items-center space-y-2 gap-1.5 text-black px-2 ">
                        <Label class="" htmlFor="name">What is the fund you gonna use for?</Label>
                        <Textarea v-model="reason" type="text" id="name"
                            placeholder="Tell the world you need them"> </Textarea>
                    </div>
                    <div class="grid w-full items-center space-y-2 gap-1.5 text-black px-2 ">
                        <Label class="" htmlFor="name">When the fund raise gonna end?</Label>
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button variant="outline" :class="cn(
                                    'w-[280px] justify-start text-left font-normal',
                                    !endDate && 'text-muted-foreground',
                                )">
                                    <CalendarIcon class="mr-2 h-4 w-4" />
                                    {{ endDate ? df.format(endDate.toDate(getLocalTimeZone())) : "Pick a date" }}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                                <Calendar v-model="endDate" initial-focus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div class="grid w-full items-center space-y-2 gap-1.5 text-black px-2 ">
                        <Label class="" htmlFor="name">Total amount to raise</Label>
                        <div class="relative w-full max-w-sm items-center">

                            <Input id="formatted-amount" v-model="formattedAmount" @input="handleAmountInput"
                                class="block w-full pl-24 pr-3 text-sm border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter amount" />
                            <span
                                class="absolute start-0 inset-y-0 flex items-center justify-center px-2 text-gray-500 font-semibold">
                                $DOGECY
                            </span>
                        </div>
                    </div>
                    <Button :disabled="loading" type="submit"
                        class="font-intro bg-brand text-black hover:text-white w-fit">
                        <Loader2 v-if="loading" class="animate-spin" />
                        Vote Now
                    </Button>
                </div>

            </form>
        </DialogContent>
    </Dialog>


</template>