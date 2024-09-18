import { ToDo } from "App";

export const getTodoList = async (
  requestUrl: string,
  setData: (d: ToDo[]) => void
) => {
  try {
    const data = await makeRequest(requestUrl, "GET", null);

    if (data) {
      setData(data);
    } else {
      throw new Error("Network response not ok");
    }
  } catch (error) {
    console.error("Error", error);
  }
};

const makeRequest = async (
  requestUrl: string,
  method: string,
  payload: ToDo
) => {
  let requestData = {
    method: method,
  };
  if (payload) {
    requestData["body"] = JSON.stringify(payload);
  }
  const response = await fetch(requestUrl, requestData);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("404");
    } else {
      throw new Error("Network response not ok");
    }
  }

  const data = await response.json();

  return data;
};
