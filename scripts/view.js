const insertAxios = axios.create({
  baseURL: "https://newbsm.team-insert.com/api",
  withCredentials: true,
});

const dateFormat = (date) => {
  if (!date) return "-";
  return dayjs(date).format("H시 m분 s초");
};

const element = {
  "@id": (id) => document.getElementById(id),
  "@class": (className) => document.getElementsByClassName(className),
  "@query": (query) => document.querySelector(query),
};

const getAllCheckIn = async () => {
  const { data } = await insertAxios.get("checkIn/all");
  return data;
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
          <div>${isCheckInSecondMember ? "✔️" : "-"}</div>
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
