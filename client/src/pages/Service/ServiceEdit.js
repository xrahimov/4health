import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { editService } from '../../store/actions/serviceActions';
import { getServiceTypes } from '../../store/actions/serviceTypeActions';

// styles
import {
  StyledTitle,
  StyledRegister,
  RegisterContainer,
  SelectContainer,
} from '../../GlobalStyles';
import { StyledPickerContainer } from '../PatientRegister/BirthdayPicker';

// components
import Layout from '../../layout/Layout';
import { options } from '../../utils';

const ServiceEdit = ({
  auth: { token },
  servicetype: { servicetypes },
  history,
  editService,
  getServiceTypes,
}) => {
  const { id } = useParams();

  // states
  const [servicetype, setServicetype] = useState();
  const [title, setTitle] = useState('');
  const [norm, setNorm] = useState('');
  const [price, setPrice] = useState('');
  const [edizm, setEdizm] = useState('');

  useEffect(() => {
    getServiceTypes();
    axios
      .get(`/api/services/${id}`, options(token))
      .then((res) => {
        setServicetype(res.data.service.servicetype._id);
        setTitle(res.data.service.title);
        setNorm(res.data.service.norm);
        setPrice(res.data.service.price);
        setEdizm(res.data.service.edizm);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      norm,
      price: parseInt(price),
      edizm,
    };
    formData.servicetype = servicetypes.find((stype) => stype._id === servicetype);
    editService(id, formData, history);
  };

  return (
    <Layout>
      <StyledTitle>Хизмат маълумотларини ўзгартириш</StyledTitle>

      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={handleSubmit}>
            <div>
              <SelectContainer>
                <StyledPickerContainer className="type">
                  <label htmlFor="type">Хизмат тури</label>
                  <select
                    required
                    value={servicetype}
                    name="type"
                    id="type"
                    onChange={(e) => setServicetype(e.target.value)}
                  >
                    <option value="">Танлаш</option>
                    {servicetypes[0] &&
                      servicetypes.map((type) => {
                        return (
                          <option key={type._id} value={type._id}>
                            {type.title}
                          </option>
                        );
                      })}
                  </select>
                </StyledPickerContainer>
              </SelectContainer>

              <label htmlFor="title">Хизмат номи</label>
              <input
                placeholder="Хизмат номини киритинг"
                name="title"
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />

              <label htmlFor="price">Хизмат нархи</label>
              <input
                name="price"
                type="number"
                id="price"
                min={0}
                placeholder="Хизмат нархини киритинг"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />

              <label htmlFor="norm">Норма</label>
              <input
                placeholder="Норма"
                name="norm"
                id="norm"
                type="text"
                onChange={(e) => setNorm(e.target.value)}
                value={norm}
                required
              />

              <label htmlFor="edizm">Ед. изм</label>
              <input
                placeholder="Ед. изм"
                name="edizm"
                id="edizm"
                type="text"
                onChange={(e) => setEdizm(e.target.value)}
                value={edizm}
                required
              />
            </div>

            {/* {error && <p className="error">{error}</p>} */}

            <div>
              <button type="submit">Таҳрирлаш</button>
            </div>
          </form>
        </RegisterContainer>
      </StyledRegister>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  servicetype: state.servicetype,
});

export default compose(
  requireAuth,
  withRouter,
  connect(mapStateToProps, { editService, getServiceTypes }),
)(ServiceEdit);
