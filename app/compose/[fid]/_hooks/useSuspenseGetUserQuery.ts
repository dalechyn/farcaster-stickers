import { getUser } from "@/lib/actions/getUser";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetUserQuery(parameters: { fid: number }) {
	return useSuspenseQuery({
		queryKey: ["getUser", parameters.fid] as const,
		queryFn: ({ queryKey: [_name, fid] }) => {
			return getUser(fid);
		},
	});
}
