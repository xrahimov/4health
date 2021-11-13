import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';

// form validation
import { useFormik } from 'formik';
import { uziChildSchema } from '../ServiceRegister/validation';

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

const UziChildRegister = ({ auth: { token }, history }) => {
  // states
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [uziparent, setUziparent] = useState();
  const [uziParents, setUziParents] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    getUziParents({ skip: 0, limit: 100 });
  }, []);

  const getUziParents = (variables) => {
    setIsLoading(true);
    axios
      .get(`/api/uziparents?limit=${variables.limit}&skip=${variables.skip}`, options(token))
      .then((response) => {
        setIsLoading(false);
        setUziParents(response.data.uziParents);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // form validation
  const formik = useFormik({
    initialValues: {
      title: '',
      norm: '',
      edizm: '',
      pageloc: 0,
    },
    validationSchema: uziChildSchema,
    onSubmit: (values) => {
      if (draftToHtml(convertToRaw(editorState.getCurrentContent())).trim()) {
        setError();
        setIsLoading(true);
        values.uziparent = uziparent;
        values.content = draftToHtml(convertToRaw(editorState.getCurrentContent())).trim();
        axios
          .post('/api/uzichilds', values, options(token))
          .then(() => {
            setIsLoading(false)
            history.push('/uzichildslist');
          })
          .catch((error) => {
            setError(error.response.data.message);
          });
      } else {
        setError('Илтимос маълумот киритинг');
      }
    },
  });

  return (
    <Layout>
      <StyledTitle>Хизматни рўйҳатдан ўтказиш</StyledTitle>

      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <SelectContainer>
                <StyledPickerContainer className="type">
                  <label htmlFor="type">Шаблон</label>
                  <select
                    required
                    name="type"
                    id="type"
                    onChange={(e) => setUziparent(e.target.value)}
                  >
                    <option value="">Танлаш</option>
                    {uziParents[0] &&
                      uziParents.map((type) => {
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />

              {formik.touched.title && formik.errors.title ? (
                <p className="error">{formik.errors.title}</p>
              ) : null}

              <label htmlFor="norm">Норма</label>
              <input
                placeholder="Норма"
                name="norm"
                id="norm"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.norm}
              />

              {formik.touched.norm && formik.errors.norm ? (
                <p className="error">{formik.errors.norm}</p>
              ) : null}
              <SelectContainer>
                <div>
                  <label htmlFor="edizm">Ед. изм</label>
                  <input
                    placeholder="Ед. изм"
                    name="edizm"
                    id="edizm"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.edizm}
                  />

                  {formik.touched.edizm && formik.errors.edizm ? (
                    <p className="error">{formik.errors.edizm}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="edizm">Тартиб рақами</label>
                  <input
                    placeholder="Тартиб рақами"
                    name="pageloc"
                    id="pageloc"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pageloc}
                  />

                  {formik.touched.pageloc && formik.errors.pageloc ? (
                    <p className="error">{formik.errors.pageloc}</p>
                  ) : null}
                </div>
              </SelectContainer>
              <div
                style={{
                  border: '1px solid #f0f0f0',
                  minHeight: '6em',
                  cursor: 'text',
                  borderRadius: '2em',
                  padding: '2em',
                }}
              >
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div>
              <button type="submit" disabled={isLoading || !formik.isValid}>
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
});

export default compose(requireAuth, withRouter, connect(mapStateToProps, {}))(UziChildRegister);
