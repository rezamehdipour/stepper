import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/data/dataSlice";

// Hooks
import useUpdateEffect from "../../hooks/useUpdateEffect";

// Components
import Buttons from "../../components/Buttons/Buttons";

const Identity = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((s) => s.data);
	const continents = ["asia", "europe", "africa", "oceania"];
	const countries = ["iran", "germany", "russia", "china", "georgia"];

	const [continentError, setContinentError] = useState("");
	useUpdateEffect(() => setTimeout(() => setContinentError(""), 5000), [continentError]);

	const [countryError, setCountryError] = useState("");
	useUpdateEffect(() => setTimeout(() => setCountryError(""), 5000), [countryError]);

	const [nationalCardIdError, setNationalCardIdError] = useState("");
	useUpdateEffect(() => setTimeout(() => setNationalCardIdError(""), 5000), [nationalCardIdError]);

	const [nationalCardPhotoError, setNationalCardPhotoError] = useState("");
	useUpdateEffect(() => setTimeout(() => setNationalCardPhotoError(""), 5000), [nationalCardPhotoError]);

	// ————— CONTINENT —————
	const handleContinentRealtime = (e) => {
		const continent = e.target.value;
		continent === "" ? dispatch(setData(["continent", false])) : dispatch(setData(["continent", continent]));
	};
	const handleContinentValidate = () => {
		const { continent } = data;
		if (!continent) {
			setContinentError("Select a continent");
			return false;
		}
		if (continents.find((c) => c === continent) === undefined) {
			setContinentError("This continent is not in the list!");
			return false;
		}
		return true;
	};

	// ————— COUNTRY —————
	const handleCountryRealtime = (e) => {
		const country = e.target.value;
		country === "" ? dispatch(setData(["country", false])) : dispatch(setData(["country", country]));
	};
	const handleCountryValidate = () => {
		const { country } = data;
		if (!country) {
			setCountryError("Select a country");
			return false;
		}
		if (countries.find((c) => c === country) === undefined) {
			setCountryError("This country is not in the list!");
			return false;
		}
		return true;
	};

	// ————— NATIONAL CARD ID —————
	const handleNationalCardIdRealtime = (event) => {
		const regex = /^(\d+)$/g;
		const enteredNationalCardId = event.target.value;
		if (enteredNationalCardId.length < 11) {
			if (regex.test(enteredNationalCardId) || enteredNationalCardId === "") {
				if (enteredNationalCardId === "") {
					dispatch(setData(["nationalCardId", false]));
				} else {
					dispatch(setData(["nationalCardId", enteredNationalCardId]));
				}
			} else {
				event.preventDefault();
			}
		} else {
			event.preventDefault();
		}
	};
	const handleNationalCardIdValidate = () => {
		const { nationalCardId } = data;
		const regex = /^(\d+)$/g;
		if (regex.test(nationalCardId) && nationalCardId.length === 10) {
			return true;
		} else {
			setNationalCardIdError("Enter a proper Id (Number 10 Char)");
			return false;
		}
	};

	// ————— NATIONAL CARD PHOTO —————
	const nationalCardPhotoRef = useRef();
	const handleNationalCardPhotoValidate = () => {
		let photo = nationalCardPhotoRef.current.files[0];

		if (photo === undefined) {
			setNationalCardPhotoError(`Choose an image!`);
			return false;
		}

		// Extension
		const extension = photo.name.split(".").at(-1);
		const allowedExtensions = ["jpg", "jpeg", "png"];
		if (allowedExtensions.find((exten) => exten === extension) === undefined) {
			setNationalCardPhotoError(`Only .jpg , .jpeg , .png allowed!`);
			return false;
		}

		// Size
		const photoSizeInKb = (photo.size / 1024).toFixed(1);
		if (photoSizeInKb > 100) {
			setNationalCardPhotoError(`Yours : ${photoSizeInKb}KB | Max-Allowed : 100KB`);
			return false;
		}

		return true;
	};

	// ——— Next & Previous ———
	const handlePrevious = () => {
		navigate("/");
	};
	const handleNext = () => {
		const validate = [
			handleContinentValidate(),
			handleCountryValidate(),
			handleNationalCardIdValidate(),
			handleNationalCardPhotoValidate(),
		];
		if (validate.find((v) => v === false) === undefined) {
			navigate("/contact");
		}
	};

	return (
		<>
			<div className="IdentityPage">
				{/* Continent */}
				<div className="group">
					<label htmlFor="continent">Continent :</label>
					<br />
					<select
						name="continent"
						id="continent"
						value={data.continent ? data.continent : ""}
						onChange={handleContinentRealtime}
					>
						<option value=""></option>
						{continents.map((continent, index) => (
							<option key={index} value={continent}>
								{continent}
							</option>
						))}
					</select>
					{continentError && <div className="error">{continentError}</div>}
				</div>

				{/* Country */}
				<div className="group">
					<label htmlFor="country">Country :</label>
					<br />
					<select
						name="country"
						id="country"
						value={data.country ? data.country : ""}
						onChange={handleCountryRealtime}
					>
						<option value=""></option>
						{countries.map((country, index) => (
							<option key={index} value={country}>
								{country}
							</option>
						))}
					</select>
					{countryError && <div className="error">{countryError}</div>}
				</div>

				{/* National Card Id */}
				<div className="group">
					<label htmlFor="nationalCardId">National Card ID (Number Only) :</label>
					<br />
					<input
						type="tel"
						id="nationalCardId"
						value={data.nationalCardId ? data.nationalCardId : ""}
						onChange={handleNationalCardIdRealtime}
					/>
					{nationalCardIdError && <div className="error">{nationalCardIdError}</div>}
				</div>

				{/* National Card Photo */}
				<div className="group">
					<label htmlFor="nationalCardPhoto">National Card Photo (JPEG,PNG | Max : 100KB) :</label>
					<br />
					<input type="file" accept=".png, .jpg, .jpeg" id="nationalCardPhoto" ref={nationalCardPhotoRef} />
					{nationalCardPhotoError && <div className="error">{nationalCardPhotoError}</div>}
				</div>
			</div>

			<Buttons onClickPrevious={handlePrevious} onClickNext={handleNext} />
		</>
	);
};

export default Identity;
