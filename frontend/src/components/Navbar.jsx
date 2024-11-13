import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMoon, IoSunny } from "react-icons/io5";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.body.classList.toggle("dark-mode", !isDarkMode);
	};

	return (
		<div className="navbar">
			<div className="navbar-logo">
				<Link to="/">Product Store 🛒</Link>
			</div>
			<div className="navbar-actions">
				<Link to="/create">
					<button className="create-button">Create</button>
				</Link>
				<button className="toggle-button" onClick={toggleDarkMode}>
					{isDarkMode ? <IoSunny size={20} /> : <IoMoon size={20} />}
				</button>
			</div>
		</div>
	);
};

export default Navbar;
