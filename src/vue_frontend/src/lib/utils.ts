import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IcpStore } from './stores/icp-base';
import { createActor } from './../../../declarations/vue_backend/index'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const II_CANISTER_ID = process.env.CANISTER_ID_INTERNET_IDENTITY;
export const CANISTER_ID = process.env.CANISTER_ID;
export const BACKEND_CANISTER_ID = process.env.CANISTER_ID_VUE_BACKEND;
export const CANISTER_ID_DOGECY_REACT_FRONTEND = process.env.CANISTER_ID_DOGECY_REACT_FRONTEND;

export const getDfinityUrl = () => {
  let iiUrl = '';
  if (process.env.DFX_NETWORK === "local") {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    iiUrl = isSafari ? `http://localhost:4943/?canisterId=${II_CANISTER_ID}` : `http://${II_CANISTER_ID}.localhost:4943`;
  } else if (process.env.DFX_NETWORK === "ic") {
    iiUrl = `https://${II_CANISTER_ID}.ic0.app`;
  } else {
    iiUrl = `https://${II_CANISTER_ID}.dfinity.network`;
  }
  return iiUrl;
}

export const getDfinityFrontendUrl = () => {
  let iiUrl = '';

  if (process.env.DFX_NETWORK === "local") {
    iiUrl = `http://${CANISTER_ID_DOGECY_REACT_FRONTEND}.localhost:4943`;
  } else if (process.env.DFX_NETWORK === "ic") {
    iiUrl = `https://${CANISTER_ID_DOGECY_REACT_FRONTEND}.ic0.app`;
  } else {
    iiUrl = `https://${CANISTER_ID_DOGECY_REACT_FRONTEND}.dfinity.network`;
  }
  return iiUrl;
}

export const updateClient = async () => {
  console.log("update client");
  if (IcpStore.authClient !== undefined) {
    IcpStore.isAuthenticated = await IcpStore.authClient.isAuthenticated();
    if (!IcpStore.isAuthenticated) {
      return;
    }

    IcpStore.identity = IcpStore.authClient.getIdentity();
    IcpStore.principal = IcpStore.identity.getPrincipal();
    IcpStore.actor = createActor(CANISTER_ID?.toString() ?? '', {
      agentOptions: {
        identity: IcpStore.identity
      }
    });
  }

}

export function formatDate(secondsBigInt:BigInt) {
    const seconds = Number(secondsBigInt);

    const date = new Date(seconds * 1000); // Convert seconds to milliseconds

    const options:Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function getLocalTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function dateStringToInt(dateString:string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  return BigInt(date.getTime()) / 1000n;
}

/**
 * Reformat the input amount with commas
 */
export function amountToFormatted(rawAmount:string) {
  return Number(rawAmount).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
}


export const blobToUrl = (uint8Array : any ) => {
        const blob = new Blob([uint8Array]);
        return URL.createObjectURL(blob);
}


export const svgToText = (uint8Array: Uint8Array) => {
  console.log("SDASdasdasd")
  const decoder = new TextDecoder('utf-8')
  const x = decoder.decode(uint8Array)
  console.log("ccc", x);
  return x;
}
