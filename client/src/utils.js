import { io } from 'socket.io-client';

export const dateFormatter = (birthday) => {
  const date = new Date(birthday);
  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  return `${day}/${month}/${year}`;
};

export const options = (token) => {
  return {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token,
    },
  };
};

export const compareByFirstname = (a, b) => {
  if (a.firstname < b.firstname) {
    return -1;
  }
  if (a.firstname > b.firstname) {
    return 1;
  }
  return 0;
};

export const compareByLastname = (a, b) => {
  if (a.lastname < b.lastname) {
    return -1;
  }
  if (a.lastname > b.lastname) {
    return 1;
  }
  return 0;
};

export const compareByServicename = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

export const compareByServicetype = (a, b) => {
  if (a.servicetype.title < b.servicetype.title) {
    return -1;
  }
  if (a.servicetype.title > b.servicetype.title) {
    return 1;
  }
  return 0;
};

export const compareByPFname = (a, b) => {
  if (a.patient.firstname < b.patient.firstname) {
    return -1;
  }
  if (a.patient.firstname > b.patient.firstname) {
    return 1;
  }
  return 0;
};

export const compareByPLname = (a, b) => {
  if (a.patient.lastname < b.patient.lastname) {
    return -1;
  }
  if (a.patient.lastname > b.patient.lastname) {
    return 1;
  }
  return 0;
};

export const compareByUzichild = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

export const compareByUziparent = (a, b) => {
  if (a.uziparent.title < b.uziparent.title) {
    return -1;
  }
  if (a.uziparent.title > b.uziparent.title) {
    return 1;
  }
  return 0;
};

export const compareByUziparentTitle = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

export const compareByDoctor = (a, b) => {
  if (a.vrach.firstname < b.vrach.firstname) {
    return -1;
  }
  if (a.vrach.firstname > b.vrach.firstname) {
    return 1;
  }
  return 0;
};

export const socket = io('http://localhost:5000');
// export const socket = io('https://bshifo.herokuapp.com');
