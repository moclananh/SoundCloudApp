import { USER_URL } from "../constants/endpoint";
import {
  CreateUserRequest,
  UpdateUserRequest,
} from "../features/users/types/user.table.type";

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjc4ZTBhMzEwOGE1YWMxMzYyMWRlYTY1IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3Mzc1MTQwNDcsImV4cCI6MTgyMzkxNDA0N30.cJ2VwSbjntX55efbk6K9XT1X7iTdbx86tGV-ATD88Nk";

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

export const getUserById = async (userId: string) => {
  const response = await fetch(`${USER_URL}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.message || `Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  const dataResponse = await response.json();
  return dataResponse.data;
};

export const createUser = async (request: CreateUserRequest) => {
  try {
    const response = await fetch(`${USER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || `Error: ${response.status}`;
      throw new Error(errorMessage);
    }

    const dataResponse = await response.json();
    console.log("data response from services: ", dataResponse);
    return dataResponse;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

export const updateUser = async (request: UpdateUserRequest, id: string) => {
  try {
    const response = await fetch(`${USER_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || `Error: ${response.status}`;
      throw new Error(errorMessage);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await fetch(`${USER_URL}/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(response.statusText);
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
