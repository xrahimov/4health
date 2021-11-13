import React from 'react';
import { Link } from 'react-router-dom';

// styles
import styled from 'styled-components';
import { colors } from '../../GlobalStyles';

const DoctorCard = ({ doctor }) => {
  return (
    <StyledCard>
      <div className="imgDiv">
        <img src={doctor.image} alt={doctor.firstname} />
      </div>

      <div className="detailsDiv">
        <h3>
          {doctor.firstname} {doctor.lastname}
        </h3>
        <p>{doctor.specialization}</p>
        <Link to={`/doctors/doctor/${doctor._id}`}>Тўлиқ маълумот</Link>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: 100%;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 7px ${colors.textColor};
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 7px ${colors.darkGreyColor};
  }

  .imgDiv {
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
      object-position: center center;
      box-shadow: 0px 0px 5px transparent;
      display: block;
    }
  }

  .detailsDiv {
    width: 100%;
    margin-top: 1rem;
    text-align: center;

    h3 {
      font-size: 1.7rem;
    }

    p {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    a {
      display: block;
      width: 100%;
      padding: 1rem;
      outline-color: ${colors.primaryColor};
      border-radius: 0.5rem;
      margin-top: 1.5rem;
      font-size: 1.1rem;
      border: none;
      color: #fff;
      opacity: 0.8;
      transition: all 0.3s ease-in-out;
      background-color: ${colors.primaryColor};

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export default DoctorCard;
