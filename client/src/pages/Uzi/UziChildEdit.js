import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import axios from 'axios';

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';

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

const UziChildEdit = ({ auth: { token }, history }) => {
  const { id } = useParams();

  // states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [uziparent, setUziparent] = useState('');
  const [uziParents, setUziParents] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [norm, setNorm] = useState('');
  const [edizm, setEdizm] = useState('');
  const [pageloc, setPageloc] = useState(0);

  useEffect(() => {
    getUziParents({ skip: 0, limit: 100 });
    setIsLoading(true)
    axios
      .get(`/api/uzichilds/${id}`, options(token))
      .then((res) => {
        const { contentBlocks } = convertFromHTML(res.data.uzichild.content);
        const state = ContentState.createFromBlockArray(contentBlocks);
        setEditorState(EditorState.createWithContent(state));
        setUziparent(res.data.uzichild.uziparent._id);
        setTitle(res.data.uzichild.title);
        setNorm(res.data.uzichild.norm);
        setEdizm(res.data.uzichild.edizm);
        setPageloc(res.data.uzichild.pageloc);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setIsLoading(false);
      });
  }, []);

  const getUziParents = (variables) => {
    axios
      .get(`/api/uziparents?limit=${variables.limit}&skip=${variables.skip}`, options(token))
      .then((response) => {
        setUziParents(response.data.uziParents);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  // form validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      norm,
      edizm,
      pageloc,
    };
    if (draftToHtml(convertToRaw(editorState.getCurrentContent())).trim()) {
      setError();
      setIsLoading(true)
      formData.uziparent = uziparent;
      formData.content = draftToHtml(convertToRaw(editorState.getCurrentContent())).trim();
      axios
        .put(`/api/uzichilds/${id}`, formData, options(token))
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
  };

  return (
    <Layout>
      <StyledTitle>Хизматни рўйҳатдан ўтказиш</StyledTitle>

      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={handleSubmit}>
            <div>
              <SelectContainer>
                <StyledPickerContainer className="type">
                  <label htmlFor="type">Шаблон</label>
                  <select
                    required
                    value={uziparent}
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
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
              <SelectContainer>
                <div>
                  <label htmlFor="edizm">Ед. изм</label>
                  <input
                    placeholder="Ед. изм"
                    name="edizm"
                    id="edizm"
                    type="text"
                    onChange={(e) => setEdizm(e.target.value)}
                    value={edizm}
                  />
                </div>
                <div>
                  <label htmlFor="pageloc">Тартиб рақами</label>
                  <input
                    placeholder="Тартиб рақами"
                    name="pageloc"
                    id="pageloc"
                    type="number"
                    onChange={(e) => setPageloc(e.target.value)}
                    value={pageloc}
                  />
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
              <button type="submit" disabled={isLoading}>Рўйҳатдан ўтказиш</button>
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

export default compose(requireAuth, withRouter, connect(mapStateToProps, {}))(UziChildEdit);
