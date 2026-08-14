import toast from "react-hot-toast";

export const handleApiError = (error) => {
  const message =
    error.response?.data?.message || error.message || "Something went wrong";

  toast.error(message);
};
