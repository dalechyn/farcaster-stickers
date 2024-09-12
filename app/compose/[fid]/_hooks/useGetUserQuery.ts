import { getUser } from "@/lib/actions/getUser";
import { useQuery } from "@tanstack/react-query";

export function useGetUserQuery(parameters: { fid: number }) {
	return useQuery({
		queryKey: ["getUser", parameters.fid] as const,
		queryFn: ({ queryKey: [_name, fid] }) => {
			return getUser(fid);
		},
	});
}
