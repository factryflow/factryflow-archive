import axios from "axios";

const URL = import.meta.env.VITE_API_URL || "";

export const signUp = async (email: string, password: string) => {
  await axios.post(`${URL}/auth/register`, {
    email,
    password,
    is_active: true,
    is_superuser: false,
    is_verified: false,
  });
};

export const signIn = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  const {
    data: { access_token },
  } = await axios.post(`${URL}/auth/jwt/login`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return { token: access_token };
};
