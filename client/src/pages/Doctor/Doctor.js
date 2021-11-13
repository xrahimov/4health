import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// styles
import styled from 'styled-components';
import { StyledDoctor, Description, Controls } from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireUser from '../../hoc/requireUser';

// utils
import { options } from '../../utils';

const Doctor = ({ auth: { token } }) => {
  const id = useParams();

  // states
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  
  // useEffects
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`/api/doctors/${id}`, options(token))
      .then((res) => {
        setDoctor(res.data.doctor);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout>
      {doctor && (
        <StyledDoctor>
          <ImgContainer>
            <img src={doctor.image} alt={doctor.firstname} />
            <h3>
              {doctor.firstname} {doctor.lastname}
            </h3>
          </ImgContainer>

          <Description>
            <p className="spec-name">Муттахассислиги: {doctor.specialization}</p>
            <p>
              Description: Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </Description>

          <Controls>
            <Link to="#" className="edit">
              Таҳрирлаш
            </Link>
            <Link to="#" className="delete">
              Ўчириш
            </Link>
          </Controls>
        </StyledDoctor>
      )}
    </Layout>
  );
};

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    height: 60%;
    object-fit: cover;
    object-position: center center;
    border-radius: 1rem;
  }

  h3 {
    margin-top: 1.5rem;
  }
`;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(requireUser, connect(mapStateToProps, {}))(Doctor);
