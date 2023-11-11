const handleCheckInButtonClick = async () => {
  const data = await http.checkInRoom();
  console.log(data);
};

const handleMountGetRoomInfo = async () => {
  const data = await http.getRoom();
  const propeties = ["name", "domitoryType", "roomNumber", "subname"];

  propeties.forEach((property) => {
    const element = getElement("user", property);
    element.innerHTML = data[property];
  });
};
