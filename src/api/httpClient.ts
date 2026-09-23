import { API_BASE_URL } from "../config/apiConfig";
import { ApiResponse } from "../types/api";

// export async function request<T>(
//   url: string,
//   options?: RequestInit,
// ): Promise<T> {
//   const response = await fetch(url, options);

//   if (!response.ok) {
//     throw new Error(`HTTP ${response.status}`);
//   }

//   if (response.status === 204) {
//     return undefined as T;
//   }

//   const data = await response.json();

//   return data as T;
// }

// export async function request<T>(
//   url: string,
//   options?: RequestInit,
// ): Promise<ApiResponse<T>> {
//   const response = await fetch(url, options);

//   if (!response.ok) {
//     throw new Error(`HTTP ${response.status}`);
//   }

//   const result = await response.json();

//   return result as ApiResponse<T>;
// }

export type Validator<T> = (value: unknown) => value is T;

export async function request<T>(
  path: string,
  validator: Validator<T>,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!validator(data)) {
    throw new Error("Invalid response data");
  }

  return data;
}
