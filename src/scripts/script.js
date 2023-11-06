const CheckInButton = getElement("checkin", "button");

CheckInButton.addEventListener("click", async () => {
  const data = await getRoom();

  ["name", "domitoryType", "roomNumber", "subname"].forEach((property) => {
    const element = getElement("user", property);
    element.innerHTML = data[property];
  });
});
