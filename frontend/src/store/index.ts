import { MainClient } from "../client";
import { createAppStore } from "./app-store";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const mainClient = new MainClient(backendUrl);
export const useAppStore = createAppStore(mainClient);
