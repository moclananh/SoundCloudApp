import { LOGIN_URL } from "../constants/endpoint";

export const login = async () => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify({
      username: "hoidanit@gmail.com",
      password: "123456",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataResponse = await response.json();
  console.log(dataResponse);
  if (dataResponse) {
    localStorage.setItem("access_token", dataResponse.data.access_token);
    return dataResponse;
  }
};
