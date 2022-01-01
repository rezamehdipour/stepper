import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/data/dataSlice";

// Hooks
import useUpdateEffect from "../../hooks/useUpdateEffect";

// Moment
import moment from "moment";
import Buttons from "../../components/Buttons/Buttons";

const Personal = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((s) => s.data);
	const [firstNameError, setFirstNameError] = useState(""); // Firstname Error
	useUpdateEffect(() => {
		setTimeout(() => setFirstNameError(""), 5000);
	}, [firstNameError]);
	const [lastNameError, setLastNameError] = useState(""); // Lastname Error
	useUpdateEffect(() => {
		setTimeout(() => setLastNameError(""), 5000);
	}, [lastNameError]);
	const [genderError, setGenderError] = useState(""); // Gender Error
	useUpdateEffect(() => {
		setTimeout(() => setGenderError(""), 5000);
	}, [genderError]);
	const [birthDateError, setBirthDateError] = useState(""); // Birthdate Error
	useUpdateEffect(() => {
		setTimeout(() => setBirthDateError(""), 5000);
	}, [birthDateError]);

	// ————— FIRST NAME —————
	const handleFirstNameRealtime = (event) => {
		const firstName = event.target.value;
		const regex = /^(\w+)$/g;
		if (regex.test(firstName) || firstName === "") {
			if (firstName === "") {
				dispatch(setData(["firstName", false]));
			} else {
				dispatch(setData(["firstName", firstName]));
			}
		} else {
			event.preventDefault();
		}
	};
	const handleFirstNameValidate = () => {
		const { firstName } = data;
		const regex = /^(\w+)$/g;
		if (!regex.test(firstName)) {
			setFirstNameError("Enter a proper name!");
			return false;
		}
		if (firstName.length < 3 || firstName.length > 16) {
			setFirstNameError("Must be between 3 to 16 characters!");
			return false;
		}
		return true;
	};

	// ————— LAST NAME —————
	const handleLastName = (event) => {
		const lastName = event.target.value;
		const regex = /^(\w+)$/g;
		if (regex.test(lastName) || lastName === "") {
			if (lastName === "") {
				dispatch(setData(["lastName", false]));
			} else {
				dispatch(setData(["lastName", lastName]));
			}
		} else {
			event.preventDefault();
		}
	};
	const handleLastNameValidate = () => {
		const { lastName } = data;
		const regex = /^(\w+)$/g;
		if (!regex.test(lastName)) {
			setLastNameError("Enter a proper surname!");
			return false;
		}
		if (lastName.length < 3 || lastName.length > 16) {
			setLastNameError("Must be between 3 to 16 characters!");
			return false;
		}
		return true;
	};

	// ————— GENDER —————
	const handleGenderRealtime = (event) => {
		const gender = event.target.value;
		if (gender === "male" || gender === "female") {
			dispatch(setData(["gender", event.target.value]));
		}
	};
	const handleGenderValidate = () => {
		const { gender } = data;
		if (gender !== "male" && gender !== "female") {
			setGenderError("Gender is not valid!");
			return false;
		}
		return true;
	};

	// ————— BIRTH DATE —————
	const handleBirthdate = (event) => {
		const dateString = event.target.value;
		if (dateString === "") {
			dispatch(setData(["birthdate", false]));
		} else {
			const isValid = moment(dateString, "YYYY-MM-DD", true).isValid();
			if (isValid) {
				dispatch(setData(["birthdate", dateString]));
			} else {
				event.preventDefault();
			}
		}
	};
	const currentDay = moment().format("DD");
	const currentMonth = moment().format("MM");
	const n18YearsAgoYear = Number(moment().format("YYYY")) - 18;
	const n18YearsAgoDate = `${n18YearsAgoYear}-${currentMonth}-${currentDay}`;
	const handleBirthdateValidate = () => {
		const { birthdate } = data;
		if (!birthdate) {
			setBirthDateError("Enter a valid date!");
			return false;
		}
		const n18YearsAgoUnixtime = moment(n18YearsAgoDate).unix();
		const enteredDateUnixtime = moment(birthdate).unix();
		if (enteredDateUnixtime > n18YearsAgoUnixtime) {
			setBirthDateError("You must be at least 18!");
			return false;
		}
		return true;
	};

	// ——— Next & Previous ———
	const handlePrevious = () => {
		return false;
	};
	const handleNext = () => {
		const validate = [
			handleFirstNameValidate(),
			handleLastNameValidate(),
			handleGenderValidate(),
			handleBirthdateValidate(),
		];
		if (validate.find((v) => v === false) === undefined) {
			navigate("/identity");
		}
	};

	return (
		<>
			<div className="PersonalPage">
				{/* First name */}
				<div className="group">
					<label htmlFor="firstName">First name :</label>
					<br />
					<input
						type="text"
						name="firstName"
						id="firstName"
						value={data.firstName ? data.firstName : ""}
						onChange={handleFirstNameRealtime}
					/>
					{firstNameError && <div className="error">{firstNameError}</div>}
				</div>

				{/* Last name */}
				<div className="group">
					<label htmlFor="lastName">Last name :</label>
					<br />
					<input
						type="text"
						name="lastName"
						id="lastName"
						value={data.lastName ? data.lastName : ""}
						onChange={handleLastName}
					/>
					{lastNameError && <div className="error">{lastNameError}</div>}
				</div>

				{/* Gender */}
				<div className="group">
					<label>Gender :</label>
					<br />
					<label htmlFor="male">Male</label>
					<input
						type="radio"
						name="gender"
						id="male"
						value="male"
						checked={data.gender === "male" ? true : false}
						onChange={handleGenderRealtime}
					/>
					<label htmlFor="female">Female</label>
					<input
						type="radio"
						name="gender"
						id="female"
						value="female"
						checked={data.gender === "female" ? true : false}
						onChange={handleGenderRealtime}
					/>
					{genderError && <div className="error">{genderError}</div>}
				</div>

				{/* Birthdate */}
				<div className="group">
					<label htmlFor="birthdate">Birth date :</label>
					<br />
					<input
						type="date"
						name="birthdate"
						id="birthdate"
						value={data.birthdate ? data.birthdate : ""}
						onChange={handleBirthdate}
						max={n18YearsAgoDate}
					/>
					{birthDateError && <div className="error">{birthDateError}</div>}
				</div>
			</div>
			<Buttons onClickPrevious={handlePrevious} onClickNext={handleNext} />
		</>
	);
};

export default Personal;
