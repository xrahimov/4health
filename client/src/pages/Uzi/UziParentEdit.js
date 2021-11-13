import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { getDoctors } from '../../store/actions/doctorActions';

// styles
import {
  StyledTitle,
  StyledRegister,
  RegisterContainer,
  SelectContainer,
} from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';
import { StyledPickerContainer } from '../PatientRegister/BirthdayPicker';

// utils
import { options } from '../../utils';

const UziParentEdit = ({ auth: { token }, history, doctor: { doctors }, getDoctors }) => {
  const { id } = useParams();

  // states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [vrach, setVrach] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getDoctors()
    
    axios
      .get(`/api/uziparents/${id}`, options(token))
      .then((res) => {
        setTitle(res.data.uziparent.title);
        setDescription(res.data.uziparent.description);
        setPrice(res.data.uziparent.price);
        setVrach(res.data.uziparent.vrach._id);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setIsLoading(false);
      });
  }, []);

  // form validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      title,
      description,
      price,
      vrach,
    };

    axios
      .put(`/api/uziparents/${id}`, formData, options(token))
      .then(() => {
        setIsLoading(false);
        history.push('/uziparentslist');
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.message);
      });
  };

  return (
    <Layout>
      <StyledTitle>Хизматни рўйҳатдан ўтказиш</StyledTitle>

      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Шаблон номи</label>
            <input
              placeholder="Шаблон номи"
              name="title"
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />

            <SelectContainer>
              <div>
                <label htmlFor="price">Шаблон нархи</label>
                <input
                  name="price"
                  type="number"
                  id="price"
                  min={0}
                  placeholder="Шаблон нархини киритинг"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <StyledPickerContainer className="type">
                <label htmlFor="vrach">Врач:</label>
                <select
                  name="vrach"
                  id="vrach"
                  value={vrach}
                  onChange={(e) => setVrach(e.target.value)}
                >
                  <option value="">Танлаш</option>
                  {doctors[0] &&
                    doctors.map((d) => {
                      return (
                        <option key={d._id} value={d._id}>
                          {d.firstname} {d.lastname} {d.fathername}
                        </option>
                      );
                    })}
                </select>
              </StyledPickerContainer>
            </SelectContainer>
            <label htmlFor="description">Шаблон ҳақида маълумот</label>
            <textarea
              cols="30"
              rows="8"
              name="description"
              placeholder="Шаблон ҳақида қисқача маълумот"
              id="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>

            {error && <p className="error">{error}</p>}

            <div>
              <button type="submit" disabled={isLoading}>
                Рўйҳатдан ўтказиш
              </button>
            </div>
          </form>
        </RegisterContainer>
      </StyledRegister>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  doctor: state.doctor,
});

export default compose(
  requireAuth,
  withRouter,
  connect(mapStateToProps, { getDoctors }),
)(UziParentEdit);
