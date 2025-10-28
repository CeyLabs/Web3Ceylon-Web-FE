import { createGlobalState } from "react-hooks-global-state";

const initialState = { photoToScrollTo: null as number | null };
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => useGlobalState("photoToScrollTo");
