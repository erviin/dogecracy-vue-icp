<script setup lang="ts">
import { Menu, Wallet } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
import Sheet from '../ui/sheet/Sheet.vue';
import SheetTrigger from '../ui/sheet/SheetTrigger.vue';
import SheetContent from '../ui/sheet/SheetContent.vue';
import { RouterLink } from 'vue-router';
import LoginButton from '../ui/dfinity/LoginButton.vue';
</script>

<template>
    <header class="sticky top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md">
        <div class="bg-white text-center font-intro  text-black">
            <span class='text-red-500'>WARNING</span>: THIS WEBSITE & PROJECT IS UNDER DEVELOPMENT!
        </div>
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/">
                <img class="text-2xl h-16 font-bold text-brand-white" alt="DOGECRACY LOGO" src="/images/logo.png" />
            </a>
            <nav class="hidden xl:flex xl:space-x-6 xl:font-intro">
                <a href="/explore-petitions" class="hover:text-[#FFAC43]">Explorer Petitions</a>
                <a href="#about" class="text-brand-white hover:text-brand-white/80">Fundraising</a>
                <a href="#about" class="text-brand-white hover:text-brand-white/80">Petition Token</a>
                <a href="#about" class="text-brand hover:text-brand/80">$DOGECY</a>
            </nav>
            <div class="flex items-center space-x-4 font-intro">
                <Button class="text-brand font-intro hover:bg-[#FFAC43]/80 hover:text-black hidden md:flex">
                    <Wallet /> Connect Wallet
                </Button>
                <LoginButton />
                <!-- {isConnected ? (
                        <Button variant="outline" class="text-brand-white border-brand hidden md:flex">
                            <Wallet />
                        </Button>
                    ) : ( -->
                <!-- <Button onClick={handleConnect} class="text-brand font-intro hover:bg-[#FFAC43]/80 hover:text-black hidden md:flex">
                            <Wallet/> Connect Wallet
                        </Button> -->
                <!-- )} -->
                <!-- <DfinityLoginButton /> -->


                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" class="md:hidden">
                            <Menu class="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" class="w-[300px] bg-black text-[#FFF2EA]">
                        <nav class="flex flex-col space-y-4 mt-6">
                            <RouterLink to="/explore-petitions" class="hover:text-[#FFAC43]">Explorer Petitions
                            </RouterLink>
                            <RouterLink to="#about" class="text-brand-white hover:text-brand-white/80">Fundraising
                            </RouterLink>
                            <RouterLink to="#about" class="text-brand-white hover:text-brand-white/80">Petition Token
                            </RouterLink>
                            <RouterLink to="#about" class="text-brand hover:text-brand/80">$DOGECY</RouterLink>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </header>
    <!-- )
} -->
</template>
