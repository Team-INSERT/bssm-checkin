const insertAxios = axios.create({
  baseURL: "https://newbsm.team-insert.com",
  withCredentials: true,
});

const http = {
  getRoom,
  checkInRoom,
};

const getRoom = async () => {
  const { data } = await insertAxios.get("/checkIn/get/", authorization());
  return data;
};

const checkInRoom = async () => {
  const { data } = await insertAxios.post("", authorization());
  return data;
};
