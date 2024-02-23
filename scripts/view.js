const insertAxios = axios.create({
  baseURL: "https://newbsm.team-insert.com/api",
  withCredentials: true,
});

const closePopup = () => {
  setTimeout(() => window.close(), 5000);
};

const dateFormat = (date) => {
  if (!date) return "-";
  return dayjs(date).format("H시 m분 s초");
};

const element = {
  "@id": (id) => document.getElementById(id),
  "@class": (className) => document.getElementsByClassName(className),
  "@query": (query) => document.querySelector(query),
};

const getUserCheckIn = async () => {
  const Authorization = getAccessToken();
  const { data } = await insertAxios.get("/checkIn", {
    headers: { Authorization },
  });
  return data;
};

const getAllCheckIn = async () => {
  const { data } = await insertAxios.get("checkIn/all");
  return data;
};

const requestCheckIn = async (requestData) => {
  const Authorization = getAccessToken();
  const { data } = await insertAxios.post(
    "/checkIn",
    { ...requestData },
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

const USER = {
  NAME: "user--name",
  DORMITORY_TYPE: "user--dormitoryType",
  ROOM_NUMBER: "user--roomNumber",
  SUB_NAME: "user--subName",
};

const CHECK_IN = {
  BUTTON: "checkin--button",
};

const INFO_BOX = {
  FORM: "info--form",
  BOX: "info--box",
};

const MEMBERS = "members";

(async () => {
  const data = await getAllCheckIn();
  const tableList = element["@id"](MEMBERS);

  tableList.innerHTML = data
    .map(({ dormitoryType, roomNumber, roomMates, checkInList }) => {
      const [firstMember, secondMember] = roomMates || ["-", "-"];
      const [firstCheckInInfo, secondCheckInInfo] = checkInList;
      const isCheckInFirstMember =
        firstMember?.id === firstCheckInInfo?.userSimpleWithNameRes?.id;
      const isCheckInSecondMember =
        secondMember?.id === secondCheckInInfo?.userSimpleWithNameRes?.id;

      return `
      <tr>
        <td>${dormitoryType}</td>
        <td>${roomNumber}</td>
        <td>
          <div class="S">${firstMember?.name}</div>
          <div>${secondMember?.name || "-"}</div>
        </td>
        <td>
          <div class="S">${isCheckInFirstMember ? "✔️" : "-"}</div>
          <div>${dateFormat(secondCheckInInfo?.checkInTime) !== "-" ? "✔️" : "-"}</div>
        </td>
        <td>
          <div class="S">${dateFormat(firstCheckInInfo?.checkInTime)}</div>
          <div>${dateFormat(secondCheckInInfo?.checkInTime)}</div>
        </td>
      </tr>
      `;
    })
    .join("");
})();
