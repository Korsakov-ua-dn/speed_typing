export async function request<T = unknown>(
  url: string,
  params: RequestInit = {}
): Promise<T> {
  const urlWithSlash = url[0] === "/" ? url : "/" + url;

  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}${urlWithSlash}`,
    params
  );
  if (!res.ok) {
    return res
      .json()
      .then((data) => Promise.reject(data))
      .catch(() => res.text())
      .then((text) => Promise.reject(text));
  }
  return await res.json();
}
