import { atom } from "jotai";

const profile = atom({});
const profileMutate = atom({ fn: () => {} });

export { profile, profileMutate };
