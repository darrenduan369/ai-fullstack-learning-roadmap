import { API_BASE_URL } from "../config/apiConfig";
import { HttpError, ResponseValidationError } from "../errors";

export type Validator<T> = (value: unknown) => value is T;

export async function request<T>(
  path: string,
  validator: Validator<T>,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  const data: unknown = await response.json();

  if (!validator(data)) {
    throw new ResponseValidationError();
  }

  return data as T;
}
