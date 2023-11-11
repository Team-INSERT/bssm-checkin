const element = {
  "@id": (id) => document.getElementById(id),
  "@class": (className) => document.getElementsByClassName(className),
  "@query": (query) => document.querySelector(query),
};
