import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const colors = {
  primaryColor: '#388fe3',
  lightPrimaryColorBackground: '#f6fafd',
  lightPrimaryColor: '#00b9f2',
  darkGreyColor: '#3F4756',
  textColor: '#8f8f8f',
  errorColor: '#ef594f',
  successColor: '#00a255',
};

const primaryColor = '#388fe3';
// const lightPrimaryColorBackground = '#f6fafd';
// const lightPrimaryColor = '#00b9f2';
// const darkGreyColor = '#3f4756';
const textColor = '#8f8f8f';
const errorColor = '#ef594f';
// const successColor = '#00a255';

// =========================== //
// GLOBAL STYLES
// =========================== //
export const GlobalStyles = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body{
		background-color: #f6f7f9;
	}

	body::-webkit-scrollbar {
		width: 0.5rem;
	}

	body::-webkit-scrollbar-track {
		background-color: #fff;
	}

	body::-webkit-scrollbar-thumb {
		background-color: ${primaryColor};
	}

	h1,
	h2, 
	h3,
	h4
	{
		font-family: 'Nunito', sans-serif;
		font-weight: bold;
		color: ${primaryColor};
	}

	h1{
		font-size: 2.7rem;
	}

	h2{
		font-size: 2.3rem;
	}
 
	h3{
		font-size: 2rem;	
	}

	h4{
		font-size: 1.6rem;		
		color: #000;
	}

	th,
	td{		
		font-family: 'Nunito', sans-serif;
	}

	p{
		font-family: 'Open Sans', sans-serif;						
	}
	
	a,
	button,
	input,
	textarea,
	label,
	select,
	option{
		font-family: 'Nunito', sans-serif;
		color: ${textColor};

		::placeholder{
			font-family: 'Nunito', sans-serif;
			color: ${textColor};
		}
	}

	a {
	  text-decoration: none;
	}

	input,
	textarea,
	button {
	  width: 100%;
	  padding: 1rem;
	  outline-color: ${primaryColor}; 	  
	  border: 1.5px solid ${textColor};
	  border-radius: 0.5rem;
	  margin: 5px 0;
	  opacity: 1;
	  display: inline-block;
	  font-size: 1.05rem;
	  line-height: 20px;
	  text-decoration: none;	  
	  box-shadow: none;
	  background-color: transparent;
	  transition: all .3s ease-in-out;
	}	

	input:focus,
	textarea:focus	{
		border: 1.5px solid ${primaryColor};
		box-shadow: 0px 0px 4px 1px ${primaryColor};
	}

	input, textarea{
		color: ${colors.primaryColor};
	}

	button{
		border: none;
		color: #fff;
		opacity: 0.80;	  
		cursor: pointer;
	  	background-color: ${primaryColor};
	}

	input:hover,
	textarea:hover,
	button:hover {
	  opacity: 1;
	}	

	.error {
	  width: 100%;
	  color: ${errorColor};
	  margin-bottom: 0.5rem;
	}
	
	button:disabled,
	button[disabled] {
	  border: 1px solid #999999;
	  background-color: #cccccc;
	  color: #666666;
	  cursor: not-allowed;
	}

	select::-webkit-scrollbar {
		width: 0.3rem;
	}

	select::-webkit-scrollbar-track {
		background-color: #fff;
	}

	select::-webkit-scrollbar-thumb {
		background-color: ${colors.primaryColor};
	}

	select{
		cursor: pointer;
	}

	.disabledBtn {
		border: 1px solid #999999 !important;
	  background-color: #cccccc !important;
	  color: #666666 !important;
	  cursor: not-allowed !important;
	}

	.up-arrow:after {
  display: inline-block;
  content: " ";
  margin-left: 4px;
  margin-bottom: 4px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
}

.down-arrow:after {
  display: inline-block;
  content: " ";
  margin-left: 4px;
  margin-bottom: 4px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
}

`;

export const StyledTitle = styled.h3`
  width: 90%;
  margin: 0.5rem auto;
  padding: 1rem 0;
  background-color: #fff;
  border-radius: 1rem;
  text-align: center;

  span {
    margin-left: 0.5rem;
  }
`;

// =========================== //
// REGISTER STYLES
// =========================== //

export const StyledRegister = styled.div`
  width: 90%;
  margin: 1rem auto;
  padding: 1rem 0 2rem;
  background-color: #fff;
  border-radius: 1rem;

  button {
    margin-top: 1rem;
  }
`;

export const RegisterContainer = styled.div`
  width: 85%;
  margin: 0 auto;

  form {
    width: 100%;

    label {
      display: block;
      font-size: 1.3rem;
      font-weight: 700;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      color: ${colors.darkGreyColor};
    }

    input {
      color: ${colors.primaryColor};
      font-size: 1.2rem;
      padding-bottom: 1.2rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .gender {
    margin-left: 4rem;
  }
`;

// =========================== //
// TABLE AND LIST STYLES
// =========================== //

export const PatientsContainer = styled.table`
  width: 95%;
  margin: 0 auto;
  padding: 2rem 3rem;
  background-color: #fff;
  border-radius: 1rem;
  font-family: 'Nunito', sans-serif;

  th {
    text-align: start;
    font-size: 1.3rem;
  }
`;

export const Patient = styled.tr`
  td {
    font-size: 1.2rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    color: black;
    opacity: 0.9;
    padding: 0.5rem 0;
  }

  a {
    padding: 0.5rem 1.5rem;
    outline-color: ${colors.primaryColor};
    border: none;
    border-radius: 0.5rem;
    margin: 5px 0;
    font-size: 1.05rem;
    background-color: ${colors.primaryColor};
    opacity: 0.85;
    color: #fff;
    transition: all 0.3s ease-in-out;
    display: block;
    width: 70%;
    margin: 0 auto;
    text-align: center;

    &:hover {
      opacity: 1;
    }
  }
`;

export const StyledDoctor = styled.div`
  width: 80%;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0px 0px 7px ${colors.textColor};
`;

export const Description = styled.div`
  margin: 2rem auto;
  width: 90%;
  font-size: 1.1rem;
  line-height: 170%;

  .spec-name {
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
`;

export const Controls = styled.div`
  width: 90%;
  margin: 1rem auto 0;
  display: flex;
  justify-content: flex-end;

  a {
    display: inline-block;
    color: #fff;
    padding: 0.8rem;
    border-radius: 1rem;
    opacity: 0.8;
    transition: opacity 0.3s ease-in-out;
    font-size: 1.4rem;

    &:hover {
      opacity: 1;
    }
  }

  .edit {
    background-color: ${colors.primaryColor};
    margin-right: 1rem;
  }

  .delete {
    background-color: ${colors.errorColor};
  }
`

export const RadioContainer = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 20px 15px;
  input[type='radio'] {
    display: none;
  }
  .option {
    background: #fff;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    padding: 0 10px;
    border: 2px solid lightgrey;
    transition: all 0.3s ease;
  }
  .option .dot {
    height: 20px;
    width: 20px;
    background: #d9d9d9;
    border-radius: 50%;
    position: relative;
  }
  .option .dot::before {
    position: absolute;
    content: '';
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    background: ${colors.primaryColor};
    border-radius: 50%;
    opacity: 0;
    transform: scale(1.5);
    transition: all 0.3s ease;
  }
  #option-1:checked:checked ~ .option-1,
  #option-2:checked:checked ~ .option-2 {
    border-color: ${colors.primaryColor};
    background: ${colors.primaryColor};
  }
  #option-1:checked:checked ~ .option-1 .dot,
  #option-2:checked:checked ~ .option-2 .dot {
    background: #fff;
  }
  #option-1:checked:checked ~ .option-1 .dot::before,
  #option-2:checked:checked ~ .option-2 .dot::before {
    opacity: 1;
    transform: scale(1);
  }
  .option span {
    font-size: 20px;
    color: #808080;
  }
  #option-1:checked:checked ~ .option-1 span,
  #option-2:checked:checked ~ .option-2 span {
    color: #fff;
  }
`;
