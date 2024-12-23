<script setup lang="ts">
import { ref, toRaw } from 'vue';
import Button from '../button/Button.vue';
import { IcpStore } from '@/lib/stores/icp-base';
import { getDfinityUrl, updateClient } from '@/lib/utils';
import { Loader2, LogOut, User2Icon } from 'lucide-vue-next';
import DropdownMenu from '../dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from '../dropdown-menu/DropdownMenuTrigger.vue';
import DropdownMenuContent from '../dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from '../dropdown-menu/DropdownMenuItem.vue';
import { RouterLink } from 'vue-router';

const loading = ref(false)
const disabled = ref(false)
const login = async () => {
    if (IcpStore.authClient !== undefined) {
        disabled.value = true;
        loading.value = true;
        await toRaw(IcpStore.authClient).login({
            identityProvider: getDfinityUrl(),
            maxTimeToLive: BigInt(30 * 60 * 1000 * 1000 * 1000),
            onSuccess: async () => {
                await updateClient()
                disabled.value = false;
                loading.value = false;
            },
            onError: () => {
                disabled.value = false;
                loading.value = false;
            }
        })
    }
}
const logout = async () => {
    disabled.value = true;
    loading.value = true;
    await toRaw(IcpStore.authClient)?.logout();
    await updateClient();
    disabled.value = false;
    loading.value = false;
    window.location = "/";
}
</script>

<template>
    <Button v-if="!IcpStore.isAuthenticated" :disabled @click="login"
        class="text-black hover:bg-black/80 hidden md:flex ">
        <Loader2 v-if="loading" class="animate-spin text-purple-600 h-4" />
        <img src="/images/dfinity.svg" class='h-4' />
    </Button>
    <DropdownMenu v-else-if="IcpStore.isAuthenticated">
        <DropdownMenuTrigger asChild class="w-full">
            <Button :disabled class="bg-purple-600 hover:bg-purple-800 w-full">
                <Loader2 v-if="loading" class="animate-spin text-white h-4" />
                <img src="/images/dfinity.svg" class='h-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56 px-0 py-4 border-0 bg-black " data-align="left">
            <DropdownMenuItem class="p-0">
                <RouterLink to="/profile"
                    class="flex text-white items-center space-x-2 w-full h-full p-4 bg-black hover:bg-black/80 rounded-none  text-md font-intro">
                    <User2Icon />
                    <span>Your Profile</span>
                </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem class="p-0">
                <Button @click="logout"
                    class="w-full p-4 h-full bg-black hover:bg-black/80  rounded-none  text-md font-intro">
                    <LogOut /> <span>Logout</span>
                </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>