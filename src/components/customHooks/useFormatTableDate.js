const formatTableDate = (date) =>
  `${date.split("T")[0]} ${date.slice(
    date.indexOf("T") + 1,
    date.indexOf("+")
  )}`;

export { formatTableDate };
