const pad = (n, s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);

export const getTimestamp = (date) => {
  const parsedDate = Date.parse(date);
  const utcDate = new Date(parsedDate);
  
  return `${pad(utcDate.getFullYear(),4)}-${pad(utcDate.getMonth()+1)}-${pad(utcDate.getDate())} ${pad(utcDate.getHours())}:${pad(utcDate.getMinutes())}`;
}