<script setup lang="ts">
import { ref } from 'vue';
import Dialog from '../ui/dialog/Dialog.vue';
import Button from '../ui/button/Button.vue';
import { Loader2, PlusCircle, X } from 'lucide-vue-next';
import DialogContent from '../ui/dialog/DialogContent.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import RichTextEditor from './RichTextEditor.vue';
import Input from '../ui/input/Input.vue';
import { IcpStore } from '@/lib/stores/icp-base';

const { actor } = IcpStore
const open = ref(false)
const loading = ref(false)
const petitionName = ref('')
const image = ref<undefined | File>(undefined)
const description = ref<string>('')
const postingState = ref("")

const setOpen = (val: boolean) => {
    open.value = val
}
const MAX_FILE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const richChange = (e: any) => {
    console.log(" e", e)
    description.value = e
}
const imageChange = (e: any) => {
    console.log(" e", e.target.files)
    image.value = e.target.files[0];

}
const nameChange = (e: any) => {
    console.log(" e", e.target.value)
    petitionName.value = e.target.value;
}
const onSubmit = async (e: Event) => {

    try {
        loading.value = true;
        e.preventDefault();
        if (actor && image.value && ACCEPTED_IMAGE_MIME_TYPES.includes(image.value.type)) {
            if (image.value.size <= MAX_FILE_SIZE) {

                const file = image.value
                const fileBlob = await file.arrayBuffer();
                const uint8Array = new Uint8Array(fileBlob);
                const sub = await actor.createPetition(petitionName.value, description.value, uint8Array);
                return sub;

            }
        }
    } catch (error) {
        console.log('error', error)
    } finally {
        loading.value = false;
    }
}

// watch the params of the route to fetch the data again

</script>

<template>

    <Dialog :open="open" :hideClose="true" class="border-white !max-w-full">
        <Button @click="() => setOpen(true)" class="text-[#15e6b7] border-[#15e6b7] border mx-4 ">
            <PlusCircle /> Publish new
        </Button>

        <DialogContent aria-describedby="dogecracy"
            class=" flex flex-col w-[60vw] h-[70vh] overflow-y-auto bg-white/60 backdrop-blur border-white !max-w-full overflow-hidden">
            <DialogHeader class="h-fit">
                <DialogTitle class="font-intro text-white">Create a New Petition</DialogTitle>
                <Button variant="ghost" size="icon" class="absolute right-4 top-4 " @click="() => setOpen(false)">
                    <X />
                    <span class="sr-only">Close</span>
                </Button>
            </DialogHeader>
            <!-- <Form v-bind="form" class="flex-1"> -->

            <form class="flex-1 flex overflow-hidden h-full" enctype='multipart/form-data' @submit="onSubmit">
                <div class='flex flex-1 flex-col-reverse lg:flex-row-reverse h-full'>
                    <div class='mx-4 flex flex-col space-y-4 lg:w-4/12'>

                        <div class="text-white font-intro">Petition Name</div>
                        <Input name="petitionName" class="border-gray-800" placeholder="Enter petition name"
                            :onchange="nameChange" />

                        <div class="text-white font-intro">Petition Image</div>
                        <Input class="border-gray-800" type="file" :onchange="imageChange" />

                        <Button v-if="loading" :disabled="loading" class="text-brand">
                            <Loader2 class='animate-spin' />
                            <span>{{ postingState }}</span>
                        </Button>

                        <Button v-else-if="!loading" type="submit" class="font-intro text-brand">Submit
                            Petition</Button>

                    </div>
                    <div class='flex-1 flex flex-col'>
                        <div class="text-white font-intro">Petition Detail</div>
                        <div class="flex-1 overflow-y-auto">
                            <RichTextEditor :onChange="richChange" class="border-black" />

                        </div>
                        <!-- <FormField name="petitionDetail">
                            <FormItem class="h-full flex flex-col">
                                <FormLabel class="text-white font-intro">Petition Detail</FormLabel>
                                <FormControl>
                                    <RichTextEditor :onChange="richChange" class="border-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField> -->
                    </div>

                </div>



            </form>
            <!-- </Form> -->
        </DialogContent>
    </Dialog>
</template>