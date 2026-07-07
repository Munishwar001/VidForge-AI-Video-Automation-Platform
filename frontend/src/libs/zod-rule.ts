import type { Rule } from "antd/es/form";
import type { ZodType } from "zod";

export function zodRule(schema: ZodType): Rule {
	return {
		validator: async (_, value) => {
			const result = schema.safeParse(value);
			if (!result.success) {
				throw new Error(result.error.issues[0]?.message ?? "Invalid value");
			}
		},
	};
}
