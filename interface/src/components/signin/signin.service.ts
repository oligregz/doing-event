import { apiProvider } from "../../services/api.provider";

const signinService = async (data: unknown) => {
  try {
    const path = `auth/login`
    const signinUserToken = await apiProvider.post(path, data)
    
    return signinUserToken

  } catch (error) {
    console.error(error)
  }
}

export default signinService;