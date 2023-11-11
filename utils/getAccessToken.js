const getAccessToken = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("authorization");
};
