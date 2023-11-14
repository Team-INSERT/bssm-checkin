(async () => {
  /** 유저의 방 정보 불러오기 시도 */
  try {
    const { data } = await getUserCheckIn();
    const { user, dormitoryType, roomNumber, isCheckIn } = data;

    element["@id"](USER.NAME).innerText = user.name;
    element["@id"](USER.SUB_NAME).innerText = user.name;
    element["@id"](USER.DORMITORY_TYPE).innerText = dormitoryType;
    element["@id"](USER.ROOM_NUMBER).innerText = roomNumber;

    const button = element["@id"](CHECK_IN.BUTTON);
    button.addEventListener("click", requestCheckIn);

    if (isCheckIn) {
      button.disabled = true;
      button.innerText = "이미 완료했어요";

      return setTimeout(() => window.close(), 5000);
    }
  } catch {
    /** 실패했다면 사용자게에 방 정보 입력 요구 */
    const box = element["@id"](INFO_BOX.BOX);
    const form = element["@id"](INFO_BOX.FORM);

    box.innerHTML = `
    <form id="info--form" class="flex flex-col gap-8 justify-center items-center">
      <div id="info--box" class="flex justify-center items-center flex-col gap-1">
        <h1 class="text-3xl font-semibold">
          👋 기숙사에 입소하셨나요?
        </h1>
        <span class="text-lg text-gray-500 font-semibold">
          데이터를 새로 입력해주세요.
        </span>
      </div>
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-1">
          <span class="text-md font-medium">방 번호를 입력해주세요!</span>
          <input type="text" name="roomNumber" class="w-fit py-2 px-4 border-[1px] border-solid border-gray-400 rounded-md" type="text" placeholder="ex ) 334" /> 
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-md font-medium">기숙사동을 입력해주세요!</span>
          <span class="text-sm font-regular text-gray-500">신기숙사는 B, 구기숙사는 A에요</span>
          <input name="dormitoryType" class="w-fit py-2 px-4 border-[1px] border-solid border-gray-400 rounded-md" type="text" placeholder="ex ) A" /> 
        </div>
       </div>
      <button id="new--button" class="w-fit py-2 px-6 bg-[#73AEE3] rounded-lg text-white font-semibold disabled:bg-gray-300">입사 체크하기</button>
    </form>
    `;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const { roomNumber, dormitoryType } = e.target;
      if (!roomNumber.value) return alert("방 번호를 입력해주세요!");
      if (!dormitoryType.value) return alert("기숙사 분류를 입력해주세요!");
      if (!["A", "B"].includes(dormitoryType.value))
        return alert("A동이나 B동 중 입력해주세요!");

      const requestData = {
        roomNumber: roomNumber.value,
        dormitoryType: dormitoryType.value,
      };

      try {
        await requestCheckIn(requestData);
      } catch (error) {
        createRoom(requestData).then(async () => {
          await requestCheckIn(requestData);
          box.innerHTML = `
        <div class="flex flex-col gap-1">
          <h1>입사 체크에 완료했어요!</h1>
          <span class="text-gray-500">5초 후 자동으로 창을 닫을게요</span>
          <button onclick="window.close()" class="w-fit py-2 px-6 bg-[#73AEE3] rounded-lg text-white font-semibold disabled:bg-gray-300">지금 닫기</button>
        </div>
        `;
          closePopup();
        });
      }
    });
  }
})();
