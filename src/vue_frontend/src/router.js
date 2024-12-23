import { createRouter, createWebHistory } from 'vue-router'

import Landing from './router/Landing.vue'
import { IcpStore } from './lib/stores/icp-base'
import { AuthClient } from '@dfinity/auth-client'
import { createActor } from 'declarations/vue_backend/index'
import { createActor as createActorDogecy, canisterId as DogecyCanisterId  } from 'declarations/icrc1/index'
import Profile from './router/Profile.vue'
import Detail from './router/Detail.vue'

const routes = [
    { path: '/', name: "landing", component: Landing },
    { path: '/petition/:id', name: "detail", component: Detail },

    {
        path: '/profile/',
        name: "profile",
        component: Profile,
        meta: { requiresAuth:true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    if (IcpStore.authClient === undefined) {
        IcpStore.authClient = IcpStore.authClient ?? await AuthClient.create();
        console.log("IcpStore", IcpStore.authClient)
    }
    if (IcpStore.isAuthenticated === undefined) {
        IcpStore.isAuthenticated = await IcpStore.authClient.isAuthenticated();
    }
    if (IcpStore.identity === undefined) {
        IcpStore.identity = IcpStore.authClient.getIdentity();
    }
    if (IcpStore.principal === undefined) {
        IcpStore.principal = IcpStore.identity.getPrincipal();
    }
    
    
    if (IcpStore.actor === undefined) {
        IcpStore.actor = createActor(process.env.CANISTER_ID_VUE_BACKEND, {
            agentOptions: {
                identity: IcpStore.identity
            }
        });
        if (IcpStore.whoami === undefined) {
            const whoami = await IcpStore.actor.whoami();
            IcpStore.whoami =  "" + whoami;
        }
    }
    if (IcpStore.ledgerActor === undefined) {
        IcpStore.ledgerActor = createActorDogecy(DogecyCanisterId, {
                agentOptions: {
                    identity: IcpStore.identity
                }
            });
    }

    if (to.meta.requiresAuth && !IcpStore.isAuthenticated) return '/'
})

export default router