export const post = async (url, data) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const get = async (url) => {
  return await fetch(url, {
    method: "GET",
  });
};

//  @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
