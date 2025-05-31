"use client";

import { UserStore } from "@/store/UserStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  const { setLogOut } = UserStore((state) => state);

  const mutation = useMutation({
    mutationFn: async () => {
      const a = axios.post(
        "http://localhost:3333/api/v1/auths/logout",
        {},
        { withCredentials: true },
      );
      return a;
    },
    onSuccess: async () => {
      try {
        localStorage.removeItem("access_token");
        setLogOut();
        // Wait for state updates to finish before navigation
        await new Promise((resolve) => setTimeout(resolve, 100));

        router.push("/signin");
      } catch (error) {
        console.error("Error clearing session data:", error);
      }
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    },
  });

  return { logout: mutation.mutate, isLoading: mutation.isPending };
};
export default useLogout;
