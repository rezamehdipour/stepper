import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/data/dataSlice";

// Hooks
import useUpdateEffect from "../../hooks/useUpdateEffect";

// Components
import Buttons from "../../components/Buttons/Buttons";

const Contact = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((s) => s.data);

	const [phoneNumberError, setPhoneNumberError] = useState("");
	useUpdateEffect(() => setTimeout(() => setPhoneNumberError(""), 5000), [phoneNumberError]);

	const [emailError, setEmailError] = useState("");
	useUpdateEffect(() => setTimeout(() => setEmailError(""), 5000), [emailError]);

	const [addressError, setAddressError] = useState("");
	useUpdateEffect(() => setTimeout(() => setAddressError(""), 5000), [addressError]);

	const [websiteError, setWebsiteError] = useState("");
	useUpdateEffect(() => setTimeout(() => setWebsiteError(""), 5000), [websiteError]);

	// ————— PHONE NUMBER —————
	const handlePhoneNumberRealtime = (e) => {
		const phoneNumber = e.target.value;
		const regex = /^\d+$/g;
		if (phoneNumber === "") {
			dispatch(setData(["phoneNumber", false]));
		} else if (regex.test(phoneNumber) && phoneNumber.length < 12) {
			dispatch(setData(["phoneNumber", phoneNumber]));
		} else {
			e.preventDefault();
		}
	};
	const handlePhoneNumberValidate = () => {
		const { phoneNumber } = data;
		const regex = /^0(\d+)$/g;
		if (phoneNumber === "") {
			setPhoneNumberError("Enter phone number!");
			return false;
		}
		if (regex.test(phoneNumber)) {
			if (phoneNumber.length < 12) {
				return true;
			} else {
				setPhoneNumberError("Number length must be 11!");
				return false;
			}
		} else {
			setPhoneNumberError("Enter a proper phone number!");
			return false;
		}
		return true;
	};

	// ————— EMAIL —————
	const handleEmailRealtime = (e) => {
		const email = e.target.value;
		email === "" ? dispatch(setData(["email", false])) : dispatch(setData(["email", email.toLowerCase()]));
	};
	const handleEmailValidate = () => {
		const { email } = data;
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
		if (email === "") {
			setEmailError("Enter an email!");
			return false;
		}
		if (!regex.test(email)) {
			setEmailError("Enter a proper email!");
			return false;
		}
		return true;
	};

	// ————— Address —————
	const handleAddressRealtime = (e) => {
		const address = e.target.value;
		address === "" ? dispatch(setData(["address", false])) : dispatch(setData(["address", address]));
	};
	const handleAddressValidate = () => {
		const { address } = data;
		if (!address || address.length < 3) {
			setAddressError("Enter a proper address!");
			return false;
		}
		return true;
	};

	// ————— Website —————
	const handleWebsiteRealtime = (e) => {
		const website = e.target.value;
		website === "" ? dispatch(setData(["website", false])) : dispatch(setData(["website", website.toLowerCase()]));
	};
	const handleWebsiteValidate = () => {
		const { website } = data;
		const regex = /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})[\w.-]*/g;
		if (!website || !regex.test(website)) {
			setWebsiteError("Enter a proper URL");
			return false;
		}
		return true;
	};

	// ——— Next & Previous ———
	const handlePrevious = () => {
		navigate("/identity");
	};
	const handleNext = () => {
		const validate = [
			handlePhoneNumberValidate(),
			handleEmailValidate(),
			handleAddressValidate(),
			handleWebsiteValidate(),
		];
		if (validate.find((v) => v === false) === undefined) {
			navigate("/authentication");
		}
	};

	return (
		<>
			<div className="ContactPage">
				{/* Phone Number */}
				<div className="group">
					<label htmlFor="phoneNumber">Phone Number (09123456789) :</label>
					<br />
					<input
						type="tel"
						name="phoneNumber"
						id="phoneNumber"
						value={data.phoneNumber ? data.phoneNumber : ""}
						onChange={handlePhoneNumberRealtime}
					/>
					{phoneNumberError && <div className="error">{phoneNumberError}</div>}
				</div>

				{/* Email */}
				<div className="group">
					<label htmlFor="email">Email :</label>
					<br />
					<input
						type="email"
						id="email"
						value={data.email ? data.email : ""}
						onChange={handleEmailRealtime}
					/>
					{emailError && <div className="error">{emailError}</div>}
				</div>

				{/* Address */}
				<div className="group">
					<label htmlFor="address">Address :</label>
					<br />
					<input
						type="text"
						name="address"
						id="address"
						value={data.address ? data.address : ""}
						onChange={handleAddressRealtime}
					/>
					{addressError && <div className="error">{addressError}</div>}
				</div>

				{/* Website */}
				<div className="group">
					<label htmlFor="website">Website :</label>
					<br />
					<input
						type="text"
						name="website"
						id="website"
						value={data.website ? data.website : ""}
						onChange={handleWebsiteRealtime}
					/>
					{websiteError && <div className="error">{websiteError}</div>}
				</div>
			</div>

			<Buttons onClickPrevious={handlePrevious} onClickNext={handleNext} />
		</>
	);
};

export default Contact;
