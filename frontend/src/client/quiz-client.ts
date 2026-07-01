import { Client } from "./abstract";
import type { User } from "../types/user";

export class MainClient extends Client {
	constructor(url: string) {
		super(url);
	}

	async getMe() {
		const res = await this.mainApi("/auth/me");
		const user = res.data as User;
		return user;
	}

	async logout() {
		await this.mainApi.post("/auth/logout");
	}

	async forgotPassword(email: string) {
		await this.mainApi.post("/auth/forgot-password", { email });
	}

	async resetPassword(token: string, password: string) {
		await this.mainApi.post("/auth/reset-password", { token, password });
	}
}
