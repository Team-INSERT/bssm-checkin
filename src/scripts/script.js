(function mount() {
  handleMountGetRoomInfo();
})();

const checkInButton = getElement("checkin", "button");
checkInButton.addEventListener("click", handleCheckInButtonClick);
