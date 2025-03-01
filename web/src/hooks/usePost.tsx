import API from "@/utils/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePost = (qkey: string) => {
  const queryClient = useQueryClient();

  const {
    mutate: postMutation,
    isError,
    isSuccess,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: { url: string; data: any }) => {
      console.log(payload);
      const response = await API.post(payload.url, payload.data);
      return response.data;
    },
    onError(error: any) {
      console.error(
        "Post request failed:",
        error.response?.data?.message || error.message,
      );
    },
    onSuccess: async () => {
      if (qkey && qkey !== "false") {
        await queryClient.invalidateQueries({ queryKey: [qkey] });
      }
    },
  });

  return { postMutation, isError, isSuccess, data, error, isPending };
};

export default usePost;
