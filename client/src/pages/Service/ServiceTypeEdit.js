import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { editServiceType } from '../../store/actions/serviceTypeActions';

// styles
import {
  StyledTitle,
  StyledRegister,
  RegisterContainer,
} from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';
import { options } from '../../utils';

const ServiceTypeEdit = ({
  auth: { token },
  servicetype: { error },
  history,
  editServiceType,
}) => {
  const { id } = useParams();

  // states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`/api/servicetypes/${id}`, options(token)).then((res) => {
      if (res.status === 200) {
        setTitle(res.data.servicetype.title);
        setDescription(res.data.servicetype.description);
      } else {
        alert(res.data.message);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
    };
    editServiceType(id, formData, history);
  };

  return (
    <Layout>
      <StyledTitle>Хизмат тури маълумотларини ўзгартириш</StyledTitle>

      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Хизмат тури номи</label>
              <input
                placeholder="Хизмат тури номини киритинг"
                name="title"
                id="title"
                type="text"
                minLength="2"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />

              <label htmlFor="description">Хизмат тури ҳақида маълумот</label>
              <textarea
                cols="30"
                rows="8"
                name="description"
                placeholder="Хизмат тури ҳақида қисқача маълумот"
                id="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            {error && <p className="error">{error}</p>}

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
  connect(mapStateToProps, { editServiceType }),
)(ServiceTypeEdit);
