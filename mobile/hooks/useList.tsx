import { useQuery } from "@tanstack/react-query";
import API from "../utils/API";

const useList = (qkey: string, urls: string, page: number, limit: number) => {
  const str = JSON.stringify({ page, limit });
  console.log("puge");
  const { isError, isLoading, data } = useQuery({
    queryKey: [qkey, str],
    queryFn: async () => {
      const params = {
        page: page,
        limit: limit,
      };
      console.log(urls, params, "detailsssssssss");
      const { data } = await API.get(urls, { params });
      console.log(data, "yehalodataa");
      return data;
    },
  });

  return { isError, isLoading, data };
};

export default useList;
