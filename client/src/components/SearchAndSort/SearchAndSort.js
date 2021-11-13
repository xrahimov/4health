import React, { useState } from 'react';

// styles
import styled from 'styled-components';
import { colors } from '../../GlobalStyles';

const SearchAndSort = ({ refreshFunction, first, second }) => {
  const [searchTerms, setSearchTerms] = useState('');
  const [sortTerm, setSortTerm] = useState('')

  const onChangeSearch = (e) => {
    setSearchTerms(e.currentTarget.value);
    refreshFunction(e.currentTarget.value, 'search');
  };

  const onChangeSortTerm = (e) => {
    setSortTerm(e.currentTarget.value)
    refreshFunction(e.currentTarget.value, 'sort')
  }

  return (
    <StyledContainer>
      <SearchContainer>
        <input
          placeholder={`${first} орқали излаш...`}
          name="name"
          type="text"
          autoComplete="off"
          value={searchTerms}
          onChange={onChangeSearch}
          required
        />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </SearchContainer>

      <SortContainer>
        <select onChange={onChangeSortTerm} name="sort-doctor">
          <option value="">Вариантлар</option>
          <option value="first">{first}</option>
          <option value="second">{second}</option>
          {/* <option value="age">Ёш</option> */}
        </select>
        <button>Саралаш</button>
      </SortContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 95%;
  margin: 1rem auto;
  border-radius: 1rem;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
`;

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  width: 70%;

  input {
    width: 90%;
    font-size: 1.1rem;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    font-weight: bold;
  }

  button {
    width: 10%;
    padding: 1.02rem 0;
    font-size: 1.4rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  margin-left: 3rem;

  select {
    width: 65%;
    font-size: 1rem;
    padding: 0.95rem 0;
    font-weight: bold;
    outline-color: ${colors.primaryColor};
    border: 1.5px solid ${colors.textColor};
    background-color: transparent;
    border-radius: 0.5rem;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    option {
      font-size: 1rem;
      color: ${colors.darkGreyColor};
    }
  }

  button {
    width: 35%;
    padding: 1.15rem 0;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

export default SearchAndSort;
