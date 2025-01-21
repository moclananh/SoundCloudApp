import { USER_URL } from "../constants/endpoint";

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjc4ZTBhMzEwOGE1YWMxMzYyMWRlYTY1IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3Mzc0MjY2MTMsImV4cCI6MTgyMzgyNjYxM30.TJ9jt_VV0i6_EAqavzcxMXNAeDd955MP05gOg_JNWxE";

export const getUserList = async () => {
  const response = await fetch(`${USER_URL}/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const dataResponse = await response.json();
  console.log(dataResponse);
  return dataResponse.data.result;
};
