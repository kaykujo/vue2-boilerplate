import Vue from 'vue'
import axios from 'axios'

class API {
	static getExternal = (url, type) => {
		return new Promise(async (resolve, reject) => {
			try {
				const opts = {
					method: "get",
					url: url
				};
				if (type == 'file') {
					opts.responseType = 'blob'
				};
				const response = await axios(opts);
				resolve(response);
			} catch (err) {
				console.error(JSON.stringify(err.response));
				reject(err);
			}
		})
	}

	static get = (moduleName, type) => {
		return new Promise(async (resolve, reject) => {
			try {
				const opts = this._opts(moduleName, 'get');
				if (type == 'file') {
					opts.responseType = 'blob'
				};
				const response = await axios(opts);
				resolve(response);
			} catch (err) {
				console.error(JSON.stringify(err.response));
				if (err.response && err.response.status == 401) {
					localStorage.clear();
					window.location = '/';
				}
				reject(err);
			}
		})
	}

	static post = (moduleName, data) => {
		return new Promise(async (resolve, reject) => {
			try {
				const opts = this._opts(moduleName, 'post', data);
				const response = await axios(opts);
				resolve(response);
			} catch (err) {
				console.error(JSON.stringify(err.response));
				if (err.response && err.response.status == 401) {
					localStorage.clear();
					window.location = '/';
				}
				reject(err);
			}
		})
	}

	static postForm = (moduleName, data) => {
		return new Promise(async (resolve, reject) => {
			try {
				const opts = this._opts(moduleName, 'post', data);
				opts.headers['Content-Type'] = 'multipart/form-data';
				const response = await axios(opts);
				resolve(response)
			} catch (err) {
				if (err.response && err.response.status == 401) {
					localStorage.clear();
					window.location = '/';
				}
				reject(err);
			}
		})
	}

	static put = (moduleName, data) => {
		return new Promise(async (resolve, reject) => {
			try {
				const opts = this._opts(moduleName, 'put', data);
				const response = await axios(opts);
				resolve(response)
			} catch (err) {
				if (err.response && err.response.status == 401) {
					localStorage.clear();
					window.location = '/';
				}
				reject(err);
			}
		})
	}

	static del = (moduleName) => {
		return new Promise(async (resolve, reject) => {
			try {
				const opts = this._opts(moduleName, 'delete');
				const response = await axios(opts);
				resolve(response)
			} catch (err) {
				if (err.response && err.response.status == 401) {
					localStorage.clear();
					window.location = '/';
				}
				reject(err);
			}
		})
	}

	static _opts = (moduleName, method, data) => {
		let token = localStorage.getItem('token');

		const opts = {
			method: method,
			url: `${this.apiUrl()}/${moduleName}`
		};

		if (token) {
			opts.headers = {
				'Authorization': `Bearer ${token}`
			};
		}

		if (data) {
			opts.data = data
		};

		return opts;
	};

	static apiUrl = () => {
		return process.env.VUE_APP_API_URL;
	};
}

export default {
	install: () => {
		Vue.prototype.API = API
		Vue.API = API
	}
}