import { isAxiosError } from "axios";
import { apiProvider } from "../../services/api.provider";

const signupService = async (data: unknown) => {
  try {
    const path = `users`
    const signupedUser = await apiProvider.post(path, data)

    return signupedUser.data;

  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      return error.response?.data?.message || "Error when trying to register user";
    }
  }
}

export default signupService;