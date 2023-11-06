const getElement = (domain, property) => {
  return document.querySelector(`${domain}--${property}`);
};

const baseURL = process.env.baseURL;
