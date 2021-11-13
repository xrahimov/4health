import fs from 'fs';
import { promisify } from 'util';
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);

export const deleteAllAvatars = async (absoluteFolderPath) => {
  try {
    const files = await readdir(absoluteFolderPath);
    const unlinkPromises = files.map((filename) => {
      if (!['avatar0.jpg', 'avatar1.jpg', 'avatar2.jpg'].includes(filename)) {
        unlink(`${absoluteFolderPath}/${filename}`);
      }
    });
    return Promise.all(unlinkPromises);
  } catch (err) {}
};

export const isValidUrl = (str) => {
  var urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
};

export const removeLastChars = (text, n) => {
  n *= -1;
  return text.slice(0, n);
};

export const dateFormatter = (birthday) => {
  const date = new Date(birthday);
  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  return `${day}/${month}/${year}`;
};

export const groupBy = (arr, prop) => {
  const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
  arr.forEach((obj) => map.get(obj[prop]).push(obj));
  return Array.from(map.values());
};

export const groupServices = (appointment) => {
  return appointment.services.reduce((groups, item) => {
    const group = groups[item.servicetype.title] || [];
    group.push(item);
    groups[item.servicetype.title] = group;
    return groups;
  }, {});
};

export const pdfOptions = () => {
  return {
    format: 'A4',
    orientation: 'portrait',
    border: {
      top: '1cm',
      right: '2cm',
      bottom: '1cm',
      left: '1.5cm',
    },
  };
};
