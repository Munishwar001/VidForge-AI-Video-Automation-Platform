import * as dashboardService from '../services/dashboard.js';
import { toApiEnum } from '../libs/enum-map.js';

export async function stats(req, res) {
	const data = await dashboardService.getStats(req.userId);
	return res.json(data);
}

export async function activity(req, res) {
	const limit = Number(req.query.limit) || 10;
	const items = await dashboardService.getActivity(req.userId, limit);
	return res.json(items.map((item) => ({ ...item, type: toApiEnum(item.type) })));
}
