import type { ActorSubclass, Identity } from "@dfinity/agent";
import type { AuthClient } from "@dfinity/auth-client";
import type { Principal } from "@dfinity/principal";
import type { _SERVICE } from "./../../../../declarations/vue_backend/vue_backend.did";
import type { _SERVICE as _ICRC_SERVICE } from "./../../../../declarations/icrc1/icrc1.did";
import { reactive } from "vue";

export const IcpStore = reactive<{
    actor: undefined | ActorSubclass<_SERVICE>,
    ledgerActor: undefined | ActorSubclass<_ICRC_SERVICE>,
    authClient: undefined | AuthClient,
    identity: undefined | Identity,
    isAuthenticated: undefined | boolean,
    principal: undefined | Principal,
    whoami: undefined | string
}>({
    actor: undefined,
    authClient: undefined,
    ledgerActor: undefined,
    identity: undefined,
    isAuthenticated: undefined,
    principal: undefined,
    whoami: undefined
})