import Vue from 'vue'
import Moment from "moment"

class Helper {
	static formatDate = (date, withTime) => {
		if (!date) {
			return ""
		} else if (withTime) {
			return Moment(date).format("D MMM YYYY, h:mm A")
		} else {
			return Moment(date).format("D MMM YYYY")
		}
	}

	static formatMoney = (data) => {
		if (!data) {
			return "RM 0.00"
		} else {
			return `RM ${data.toFixed(2)}`
		}
	}

	static formatMediaUrl = (media) => {
		if (media && media.url) {
			let url = media.url

			return url.startsWith("http") ? url : `https://${url}`
		} else {
			return false
		}
	}

	static formatCoordinate = (coord) => {
		if (coord && typeof coord == "object" && coord.length == 2) {
			return `${parseFloat(coord[0]).toFixed(6)}, ${parseFloat(coord[1]).toFixed(6)}`
		}
		if (coord && !isNaN(coord)) {
			return `${parseFloat(coord).toFixed(6)}`
		} else {
			return ""
		}
	}

	static formatAddress = (address, city, state) => {
		let result = []

		if (address) {
			result.push(address)
		}

		if (city) {
			result.push(city)
		}

		if (state) {
			result.push(state)
		}

		return result.join(", ")
	}

	static validateEmail = (email) => {
		let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

		if (!pattern.test(email)) {
			return false;
		}

		return true;
	}

	static validatePassword = (password) => {
		// Minimum 7 characters, must include uppercase, lowercase, number and a symbol.
		let pattern = new RegExp(/^(?=.*[\W_])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/);

		if (!pattern.test(password)) {
			return false;
		}

		return true;
	}

	static validateToken = () => {
		const token = localStorage.getItem("token");

		if (!token) {
			localStorage.removeItem("token");
			
			return false;
		}

		let tokenSplit = token.split(".");

		if (tokenSplit.length != 3) {
			localStorage.removeItem("token");

			return false;
		} else {
			let decodedHeader = atob(tokenSplit[0]);

			if (decodedHeader && JSON.parse(decodedHeader).typ == "JWT") {
				return true;
			} else {
				localStorage.removeItem("token");

				return false;
			}
		}
	}
}

export default {
	install: () => {
		Vue.prototype.Helper = Helper
		Vue.Helper = Helper
	}
}
