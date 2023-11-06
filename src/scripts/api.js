const insertAxios = axios.create({
  baseURL,
  withCredentials: true,
});

const getRoom = async () => {
  const authorization = localStorage.getItem("access_token");
  const { data } = await axios.get("/checkIn/get", {
    headers: {
      Authorization: authorization,
    },
  });
  return data;
};
