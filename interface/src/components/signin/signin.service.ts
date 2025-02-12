import { isAxiosError } from "axios";
import { apiProvider } from "../../services/api.provider";

const signinService = async (data: unknown) => {
  try {
    const path = `auth/login`
    const signinUserToken = await apiProvider.post(path, data);

    return signinUserToken.data;

  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      return error.response?.data?.message || "Error when trying to log in user";
    }
  }
}

export default signinService;