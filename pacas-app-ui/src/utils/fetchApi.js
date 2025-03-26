import addToastMessage from "./toastMessage";

const fetchApi = async (
  endpoint,
  method = "GET",
  body = null,
  isFormData = false,
  credentials = "include"
) => {
  const options = {
    method,
    credentials,
  };

  if (!isFormData) {
    options.headers = { "Content-Type": "application/json" };
  }
  if (body) options.body = isFormData ? body : JSON.stringify(body);

  try {
    const response = await fetch(`/api${endpoint}`, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.msg || "Something went wrong");
    }

    addToastMessage("success", data.msg);
    return data;
  } catch (error) {
    console.error(`API Error [${method}] ${endpoint}:`, error.message);
    throw error;
  }
};

export default fetchApi;
