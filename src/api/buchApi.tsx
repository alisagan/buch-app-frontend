// src/api/buchApi.ts
import axiosInstance from "./axios";

export async function sucheBuecher(params: Record<string, unknown>) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const response = await axiosInstance.get(`/rest/?${queryParams.toString()}`);
  return response.data;
}
