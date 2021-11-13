import React, { useEffect, useState } from 'react';

// styles
import styled from 'styled-components';
import { colors } from '../../GlobalStyles';

const BirthdayPicker = ({ handleBirthday }) => {
	const [bday, setBday] = useState(0);
	const [bmonth, setBmonth] = useState(0);
	const [byear, setByear] = useState(0);

	const birthday = {
		bday: bday,
		bmonth: bmonth,
		byear: byear,
	};
	
	// functions
	const generateDays = () => {
		let days = [];
		for (let i = 1; i <= 31; i++) {
			if (i < 10) days.push(`0${i}`);
			else days.push(`${i}`);
		}

		return days;
	};

	const generateYears = () => {
		let years = [];
		let currentYear = new Date().getFullYear();

		for (let i = 0; i <= 100; i++) {
			years.push(currentYear - i);
		}

		return years;
	};

	const changeDay = (event) => {
		setBday(event.target.value);
		birthday.bday = event.target.value;
		handleBirthday(birthday);
	};

	const changeMonth = (event) => {
		setBmonth(event.target.value);
		birthday.bmonth = event.target.value;
		handleBirthday(birthday);
	};

	const changeYear = (event) => {
		setByear(event.target.value);
		birthday.byear = event.target.value;
		handleBirthday(birthday);
	};

	return (
		<StyledPickerContainer>
			<div>
				<select name="dob-day" id="dob-day dob" value={bday} onChange={changeDay}>
					<option value="">Кун</option>
					{generateDays().map((day, index) => (
						<option value={day} key={index}>
							{day}
						</option>
					))}
				</select>

				<select name="dob-month" id="dob-month" value={bmonth} onChange={changeMonth}>
					<option value="">Ой</option>
					<option value="0">Январь</option>
					<option value="1">Февраль</option>
					<option value="2">Март</option>
					<option value="3">Апрель</option>
					<option value="4">Май</option>
					<option value="5">Июнь</option>
					<option value="6">Июль</option>
					<option value="7">Август</option>
					<option value="8">Сентябрь</option>
					<option value="9">Октябрь</option>
					<option value="10">Ноябрь</option>
					<option value="11">Декабрь</option>
				</select>

				<select name="dob-year" id="dob-year" value={byear} onChange={changeYear}>
					<option value="">Йил</option>
					{generateYears().map((year, index) => (
						<option value={year} key={index}>
							{year}
						</option>
					))}
				</select>
			</div>
		</StyledPickerContainer>
	);
};

export const StyledPickerContainer = styled.div`
	select {
		margin: 0.5rem 0.5rem 1rem 0;
		padding: 0.5rem;
		border-radius: 0.5rem;
		outline-color: ${colors.primaryColor};
		border: 1.5px solid ${colors.textColor};
		box-shadow: none;
		background-color: transparent;
		transition: all 0.3s ease-in-out;
		font-size: 1rem;
		color: ${colors.darkGreyColor};

		option {
			font-size: 1rem;
			color: ${colors.darkGreyColor};
		}
	}
`;

export default BirthdayPicker;
