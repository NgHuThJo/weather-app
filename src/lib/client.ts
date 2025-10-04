export async function fetchData(
  url: string | Request | URL,
  options?: RequestInit,
) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error((error as Error).message);
  }
}
