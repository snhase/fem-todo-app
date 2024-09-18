import { ToDo } from "App";

const SERVER_URL: string = process.env.REACT_APP_SERVER_URL;

const makeRequest = async (
  requestUrl: string,
  method: string,
  body: string
) => {
  let requestData = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
  let url: string = SERVER_URL + requestUrl;

  const response = await fetch(url, requestData);

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

export const manageTodo = async (
  requestUrl: string,
  method: string,
  body: string,
  callback: () => void
) => {
  try {
    const data = await makeRequest(requestUrl, method, body);

    if (data) {
      callback();
    }
  } catch (error) {
    console.error("Error", error);
  }
};

export const deleteTodo = async (requestUrl: string, callback: () => void) => {
  try {
    const data = await makeRequest(requestUrl, "DELETE", null);

    if (data && data.status === "success") {
      callback();
    }
  } catch (error) {
    console.error("Error", error);
  }
};
