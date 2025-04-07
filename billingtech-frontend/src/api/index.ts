const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async (endpoint: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: any): Promise<any> => {
  console.log(`${BASE_URL}/${endpoint}`);
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to post data:", error);
    throw error;
  }
};
