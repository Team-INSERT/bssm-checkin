const getUserCheckIn = async () => {
  const Authorization = getAccessToken();
  const { data } = await insertAxios.get("/checkIn", {
    headers: { Authorization },
  });
  return data;
};

const getAllCheckIn = async () => {
  const Authorization = getAccessToken();
  const { data } = await insertAxios.get("checkIn/all", {
    headers: { Authorization },
  });
  return data;
};

const requestCheckIn = async (requestData) => {
  const Authorization = getAccessToken();
  const { data } = await insertAxios.post(
    "/checkIn",
    { requestData },
    { headers: { Authorization } }
  );
  return data;
};

const createRoom = async (requestData) => {
  const Authorization = getAccessToken();
  const { data } = await insertAxios.post(
    "/room/allocate",
    { requestData },
    { headers: { Authorization } }
  );
  return data;
};
