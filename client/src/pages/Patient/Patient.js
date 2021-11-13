import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import requireUser from '../../hoc/requireUser';

// styles
import styled from 'styled-components';
import { StyledDoctor, Description, Controls } from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { deletePatient } from '../../store/actions/patientActions';

// functions
import { dateFormatter, options } from '../../utils';
import axios from 'axios';
import { useAlert } from 'react-alert'

const Patient = ({ auth: { token }, deletePatient, history }) => {
  const { id } = useParams();

  // states
  const alert = useAlert()
  const [patient, setPatient] = useState(null);

  // useEffects
  useEffect(() => {
    axios.get(`/api/patients/${id}`, options(token)).then((res) => {
      res.status === 200 ? setPatient(res.data.patient) : alert(res.data.message);
    });
  }, []);

  const onDelete = (id) => {
    alert.show('Ҳаракатни ортга қайтаришни иложи йўқ!', {
      title: 'Маълумотни йўқ қилмоқчимисиз?',
      actions: [
        {
          copy: 'Йўқ қилиш',
          onClick: () => {
            deletePatient(id, history);
          },
        },
      ],
    });
  };

  return (
    <Layout>
      {patient ? (
        <StyledPatient>
          <h3 className="fullname">{`${patient.firstname} ${patient.lastname} ${patient.fathername}`}</h3>

          <PatientDescription>
            <div>
              <p>{`Туғулган санаси: ${dateFormatter(patient.birthday)}`}</p>
              <p>{`Телефон рақами: +998${patient.phonenumber}`}</p>
            </div>
            <p>
              Ташхиз: Лорем ипсум долор сит амет, еу нам сцаевола аппеллантур, еу цум видит вирис
              санцтус. Хас ат ессе менандри, вел лудус феугиат не. Ех еверти облияуе вим, пер ет
              нуллам феугиат сусципиантур. Амет инани цонсеяуат цу нам, поссим тхеопхрастус
              делицатиссими ат дуо. Вим дисцере сенсерит ид. Сеа доценди партиендо ад, нам тибияуе
              хендрерит еу.
            </p>
          </PatientDescription>

          <Controls>
            <Link
              style={{ fontSize: '1.2rem' }}
              to={`/patients/patient/edit/${patient._id}`}
              className="edit"
            >
              Таҳрирлаш
            </Link>
            <Link
              style={{ fontSize: '1.2rem' }}
              onClick={() => onDelete(id)}
              to="#"
              className="delete"
            >
              Ўчириш
            </Link>
          </Controls>
        </StyledPatient>
      ) : (
        <div></div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(requireUser, connect(mapStateToProps, { deletePatient }))(Patient);

const StyledPatient = styled(StyledDoctor)`
  .fullname {
    text-align: center;
  }
`;

const PatientDescription = styled(Description)`
  width: 85%;
  margin: 2rem auto;

  div {
    margin-bottom: 1rem;
  }
`;
