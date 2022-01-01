import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/data/dataSlice";

// Hooks
import useUpdateEffect from "../../hooks/useUpdateEffect";

// Toast
import { toast } from "react-toastify";

// Components
import Buttons from "../../components/Buttons/Buttons";

toast.configure();
const Authentication = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((s) => s.data);

	const [usernameError, setUsernameError] = useState("");
	useUpdateEffect(() => setTimeout(() => setUsernameError(""), 5000), [usernameError]);

	const [passwordError, setPasswordError] = useState("");
	useUpdateEffect(() => setTimeout(() => setPasswordError(""), 5000), [passwordError]);

	const [favoriteColorError, setFavoriteColorError] = useState("");
	useUpdateEffect(() => setTimeout(() => setFavoriteColorError(""), 5000), [favoriteColorError]);

	// ————— USERNAME —————
	const handleUsernameRealtime = (e) => {
		const username = e.target.value;
		username === "" ? dispatch(setData(["username", false])) : dispatch(setData(["username", username]));
	};
	const handleUsernameValidate = () => {
		const { username } = data;
		const regex = /^[a-z]\w+$/g;
		if (!username) {
			setUsernameError("Enter username!");
			return false;
		}
		if (!regex.test(username) || username.length < 4) {
			setUsernameError("Enter a proper username, at least 4 chars!");
			return false;
		}
		return true;
	};

	// ————— PASSWORD —————
	const handlePasswordRealtime = (e) => {
		const password = e.target.value;
		password === "" ? dispatch(setData(["password", false])) : dispatch(setData(["password", password]));
	};
	const handlePasswordValidate = () => {
		const { password } = data;
		const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/g;
		if (!password) {
			setPasswordError("Enter password!");
			return false;
		}
		if (!regex.test(password) || password.length < 6 || password.length > 16) {
			setPasswordError("Enter a proper password! between 6 to 16 chars");
			return false;
		}
		return true;
	};

	// ————— FAVORITE COLOR —————
	const handleFavoriteColorRealtime = (e) => {
		const favoriteColor = e.target.value;
		favoriteColor === ""
			? dispatch(setData(["favoriteColor", false]))
			: dispatch(setData(["favoriteColor", favoriteColor]));
	};
	const handleFavoriteColorValidate = () => {
		const { favoriteColor } = data;
		const regex = /#(?:[0-9a-fA-F]{3}){1,2}/g;
		if (!favoriteColor) {
			setFavoriteColorError("Enter favorite color");
			return false;
		}
		if (!regex.test(favoriteColor)) {
			setFavoriteColorError("Enter a proper color!");
			return false;
		}
		if (favoriteColor.length !== 4 && favoriteColor.length !== 7) {
			setFavoriteColorError("Color must be # + 3 or 6 chars!");
			return false;
		}
		return true;
	};

	// Finish
	const handleFinish = async () => {
		const d = await axios.post("https://jsonplaceholder.typicode.com/posts", data);
		toast.success("Request has been sent!");
	};

	// ——— Next & Previous ———
	const handlePrevious = () => {
		navigate("/contact");
	};
	const handleNext = () => {
		const validate = [handleUsernameValidate(), handlePasswordValidate(), handleFavoriteColorValidate()];
		if (validate.find((v) => v === false) === undefined) {
			handleFinish();
		}
	};

	return (
		<>
			<div className="AuthenticationPage">
				{/* Username */}
				<div className="group">
					<label htmlFor="username">Username :</label>
					<br />
					<input
						type="text"
						name="username"
						id="username"
						value={data.username ? data.username : ""}
						onChange={handleUsernameRealtime}
					/>
					{usernameError && <div className="error">{usernameError}</div>}
				</div>

				{/* Password */}
				<div className="group">
					<label htmlFor="password">Password :</label>
					<br />
					<input
						type="password"
						id="password"
						value={data.password ? data.password : ""}
						onChange={handlePasswordRealtime}
					/>
					{passwordError && <div className="error">{passwordError}</div>}
				</div>

				{/* Favorite Color */}
				<div className="group">
					<label htmlFor="favoriteColor">Favorite Color :</label>
					<br />
					<input
						type="color"
						name="favoriteColor"
						id="favoriteColor"
						value={data.favoriteColor ? data.favoriteColor : ""}
						onChange={handleFavoriteColorRealtime}
					/>
					{favoriteColorError && <div className="error">{favoriteColorError}</div>}
				</div>
			</div>

			<Buttons onClickPrevious={handlePrevious} onClickNext={handleNext} />
		</>
	);
};

export default Authentication;
