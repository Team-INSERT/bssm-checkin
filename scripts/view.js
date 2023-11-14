(async () => {
  const { data } = await getAllCheckIn();
  const tableList = element["@id"](MEMBERS);

  tableList.innerHTML = data.map(
    ({ dormitoryType, roomNumber, roomMates, checkInList }) => {
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
        <td class="room--members">
          <div class="line--box">${firstMember?.name}</div>
          <div>${secondMember?.name}</div>
        </td>
        <td class="check--in">
          <div class="line--box">${isCheckInFirstMember ? "✔️" : "-"}</div>
          <div>${isCheckInSecondMember ? "✔️" : "-"}</div>
        </td>
        <td class="check--in">
          <div class="line--box time">
            ${dateFormat(firstCheckInInfo?.checkInTime)}
          </div>
          <div class="time">
            ${dateFormat(secondCheckInInfo?.checkInTime)}
          </div>
        </td>
      </tr>
      `;
    }
  );
})();
