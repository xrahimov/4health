import { dateFormatter, groupServices } from './utils.js';

const labresult = (appointment) => {
  if (appointment.appointmenttype[0] === 'lab') {
    const appointmentServices = groupServices(appointment);
    let s = '';

    const serviceTr = (a) => {
      let tr = '';
      appointmentServices[a].forEach((i) => {
        tr += `
      <tr>
        <td>${i.title}</td>
        <td>${i.result}</td>
        <td>${i.norm}</td>
        <td>${i.edizm}</td>
      </tr>
      `;
      });

      return tr;
    };

    Object.keys(appointmentServices).forEach((a) => {
      s += `<h4>${a}</h4>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Rezultat</th>
              <th>Norma</th>
              <th>Edizm</th>
            </tr>
          </thead>
          <tbody>
          ${serviceTr(a)}
          </tbody>
        </table>`;
    });

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />

        <title>LabResult</title>

        <style>
          html,
          body {
            height: 100%;
            margin: 0;
            font-family: "Times New Roman", serif;
            font-size: small;
          }

          h1,
          h2,
          h3,
          h4 {
            font-family: 'Nunito', sans-serif;
            font-weight: bold;
            color: #388fe3;
          }

          h1 {
            font-size: medium;
          }

          h2 {
            font-size: medium;
          }

          h3 {
            font-size: medium;
          }

          h4 {
            font-size: medium;
            color: #000;
          }

          th,
          td {
            font-family: 'Nunito', sans-serif;
          }

          p {
            font-family: 'Open Sans', sans-serif;
          }

          .container {
            display: flex;
            flex-direction: column;
            min-height: 85%;
            align-items: center;
          }

          .footer {
            font-weight: bold;
            margin-left: 3rem;
            font-family: "Times New Roman", serif;
            font-size: small;
          }

          .table-container {
            text-align: center;
            padding: 1rem 2rem;
          }

          .content {
            font-family: "Times New Roman", serif;
            font-size: 17pt;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #000;
          }

          td,
          th {
            border: 1px solid #000;
            padding: 0.5rem;
            font-size: 15px;
          }

          th {
            text-align: start;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div style="text-align: center; line-height: 4px;">
            <h2>Bahodir Shifo Diagnostika</h2>
            <div style="text-align: right">
              <p style="font-weight: bold; color: rgb(46, 151, 46); font-size: small">Диагностический центр</p>
              <div style="font-weight: bold; color: rgb(56, 131, 192)">
                <p>г. Ташкент, Яшнабадский р-н, ул. Aвиасозлар, дом 56</p>
                <p>+99890 983 05 72 +99890 372 54 18 (Telegram)</p>
              </div>
            </div>
          </div>
          <div style="font-weight: bold; font-size: small; text-align: left">
            <p>Дата исследования: ${dateFormatter(appointment.createdAt)}</p>
              <p>Пациент: ${appointment.patient.firstname} ${appointment.patient.lastname} ${
      appointment.patient.fathername
    }</p>
              <p>Ден рождения: ${dateFormatter(appointment.patient.birthday)}</p>
          </div>
          <div class="table-container">${s}</div>
        </div>
        <footer class="footer">
          <p>Интерпретация резултатов анализов толко за лечашим врачом!</p>
          <p style="color: #388fe3">"BAHODIR SHIFO" Желайет Вам здоровя</p>
          <p style="color: #388fe3">В случаи утери документа копия не выдаеця</p>
          <p style="font-size: larger">Врач лаборант: Дехканова Г.М_______________</p>
        </footer>
      </body>
    </html>
  `;
  } else {
    const content = () => {
      let a = '';
      appointment.uzis.forEach((i) => {
        a += `<h4>${i.title}</h4>`;
        i.uzichilds.forEach((j) => {
          let ind = j.content.lastIndexOf('</');
          a += `<div class="content">${
            j.content.slice(0, ind) +
            ' ' +
            '<span style="font-size: medium"><strong>' +
            j.result +
            ' ' +
            j.edizm +
            '</strong>' +
            ' ' +
            '<em>' +
            j.norm +
            '</em>' +
            j.content.slice(ind) +
            '</span>'
          }</div>
          `;
        });
        a += `<footer class="footer">
                <p style="font-size: larger">Врач ${i.vrach}_______________</p>
              </footer>`;
      });

      return a;
    };

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />

        <title>LabResult</title>

        <style>
          html,
          body {
            height: 100%;
            margin: 0;
            font-family: "Times New Roman", serif;
            font-size: medium;
          }

          h1,
          h2,
          h3,
          h4 {
            font-family: 'Nunito', sans-serif;
            font-weight: bold;
            color: #388fe3;
          }

          h1 {
            font-size: medium;
          }

          h2 {
            font-size: medium;
          }

          h3 {
            font-size: medium;
          }

          h4 {
            font-size: medium;
            color: #000;
          }

          th,
          td {
            font-family: 'Nunito', sans-serif;
          }

          p {
            font-family: 'Open Sans', sans-serif;
          }

          .container {
            display: flex;
            flex-direction: column;
            min-height: 85%;
            align-items: center;
          }

          .footer {
            font-weight: bold;
            margin-left: 3rem;
            font-family: "Times New Roman", serif;
            font-size: medium;
          }

          .table-container {
            text-align: center;
            padding: 1rem 2rem;
          }

          .content {
            font-family: "Times New Roman", serif;
            font-size: medium;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #000;
          }

          td,
          th {
            border: 1px solid #000;
            padding: 0.5rem;
            font-size: small;
          }

          th {
            text-align: start;
          }
        </style>
      </head>
      <body>
        <div style="text-align: center; line-height: 4px;">
          <h2>Тошкент шахар Яшнобод тумани</h2>
          <h2>Авиасозлар2 56 уй</h2>
          <h2>BAHODIR SНIFO «diagnostika»</h2>
          <h2>(90) 983 05 72</h2>
          <h2>Ф.И.О.: ${appointment.patient.firstname} ${appointment.patient.lastname}</h2>
          <h2>Год рождение: ${dateFormatter(appointment.patient.birthday)}</h2>
          <h2>Дата исследование: ${dateFormatter(appointment.createdAt)}</h2>
        </div>
        ${content()}
      </body>
      </html>`;
  }
};

export default labresult;
