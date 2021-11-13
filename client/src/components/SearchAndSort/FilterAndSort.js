import React from 'react';

// styles
import styled from 'styled-components';
import { colors } from '../../GlobalStyles';

const FilterAndSort = ({ refreshFunction, first, second, doctors, uziparents }) => {
  // const [searchTerms, setSearchTerms] = useState('');
  // const [doctor, setDoctor] = useState('');

  const onChangeSortTerm = (e) => {
    refreshFunction(e.currentTarget.value, e.currentTarget.name);
  };

  return (
    <StyledContainer>
      <SortContainer>
        <select onChange={onChangeSortTerm} name="vrach">
          <option value="">Врач</option>
          {doctors &&
            doctors?.map((d) => {
              return (
                <option key={d._id} value={d._id}>
                  {d.firstname} {d.lastname} {d.fathername}
                </option>
              );
            })}
        </select>
        <button>Филтр</button>
      </SortContainer>
      {uziparents && (
        <SortContainer>
          <select onChange={onChangeSortTerm} name="uziparent">
            <option value="">Шаблон</option>
            {uziparents?.map((d) => {
              return (
                <option key={d._id} value={d._id}>
                  {d.title}
                </option>
              );
            })}
          </select>
          <button>Филтр</button>
        </SortContainer>
      )}
      <SortContainer>
        <select onChange={onChangeSortTerm} name="sort">
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

export default FilterAndSort;

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

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 3rem;

  select {
    width: 100%;
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
