import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MainClient } from "../../client/quiz-client";
import type { MessageInstance } from "antd/es/message/interface";
import type { User } from "../../@types/user";
import { rolesMap } from "../../libs/statusMap";

interface TestStoreState {
	user: User | null;
	appLoading: boolean;
	messageInstance: MessageInstance | null;
	init: () => Promise<void>;
	logout: () => Promise<void>;
	setAppLoading: (_state: boolean) => void;
	getRole: (_role: number) => string;
	setMessageInstance: (_message: MessageInstance) => void;
}

export const createAppStore = (client: MainClient) => {
	const initialValues: TestStoreState = {
		user: null,
		appLoading: true,
		messageInstance: null,
		init: async () => {},
		logout: async () => {},
		setAppLoading: () => {},
		setMessageInstance: () => {},
		getRole: (role: number) => rolesMap[role as keyof typeof rolesMap],
	};

	return create<TestStoreState>()(
		immer((set, get) => ({
			...initialValues,
			async init() {
				try {
					const user = await client.getMe();
					set({ user: user });
				} catch {
					set({ user: null });
				}
			},
			async logout() {
				await client.logout();
				set({ user: null });
			},
			setAppLoading(state) {
				set((appState) => {
					appState.appLoading = state;
					return appState;
				});
			},
			setMessageInstance(instance) {
				if (get().messageInstance) {
					return;
				}
				set((appStore) => {
					appStore.messageInstance = instance;
					return appStore;
				});
			},
		}))
	);
};
