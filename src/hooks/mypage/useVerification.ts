import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  SubmitVerificationRequest,
  getVerifications,
  postVerification,
} from "@/apis/verification";

export const useVerificationsQuery = () => {
  return useQuery({
    queryKey: ["verifications"],
    queryFn: getVerifications,
  });
};

export const useSubmitVerificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitVerificationRequest) =>
      postVerification(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verifications"] });
    },
  });
};
