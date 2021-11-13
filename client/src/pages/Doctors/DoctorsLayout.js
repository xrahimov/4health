import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import styled from 'styled-components';
import { PatientsContainer, Patient } from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getDoctors } from '../../store/actions/doctorActions';
import requireUser from '../../hoc/requireUser';

// utils
import { dateFormatter } from '../../utils';

const DoctorsLayout = ({ doctor: { doctors }, getDoctors }) => {
  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Layout>
      <TableContainer>
        <PatientsContainer>
          <tbody>
            <tr>
              <th>Исм Фамилия</th>
              <th>Телефон рақами</th>
              <th>Сана</th>
              <th></th>
            </tr>
            {doctors[0] &&
              doctors.map((doctor) => (
                <Patient key={doctor._id}>
                  <td>
                    {doctor.firstname} {doctor.lastname} {doctor.fathername}
                  </td>
                  <td>+998{doctor.phonenumber}</td>
                  <td>{dateFormatter(doctor.birthday)}</td>
                  <td>
                    <Link to={`/doctors/edit/${doctor._id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                  </td>
                </Patient>
              ))}
          </tbody>
        </PatientsContainer>
      </TableContainer>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  doctor: state.doctor,
});

export default compose(requireUser, connect(mapStateToProps, { getDoctors }))(DoctorsLayout);

const TableContainer = styled.div`
  width: 95%;
  margin: 1rem auto 2rem;
  padding: 2rem 0;
  border-radius: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  button {
    width: 20%;
    margin: 2rem auto 0;
    align-self: center;
  }
`;
