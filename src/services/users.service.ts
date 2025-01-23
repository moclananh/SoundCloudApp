import { USER_URL } from "../constants/endpoint";
import {
  CreateUserRequest,
  IUser,
} from "../features/users/types/user.table.type";

const access_token = localStorage.getItem("access_token");

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

export const updateUser = async (request: IUser) => {
  try {
    const response = await fetch(`${USER_URL}`, {
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
