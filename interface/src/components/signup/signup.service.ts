import { apiProvider } from "../../services/api.provider";

const signupService = async (data: unknown) => {
  try {
    const path = `users/create`
    const signupedUser = await apiProvider.post(path, data)
    
    return signupedUser;

  } catch (error) {
    console.error(error)
  }
}

export default signupService;