import axios, {AxiosRequestConfig} from "axios"
import {stringify} from "querystring"
import {message, Row} from "antd"
import moment from "moment"
import qs from "qs"

const url = "http://localhost:8000/api/"
axios.defaults.headers = {
	"Content-Type": "application/x-www-form-urlencoded",
}

export const sendCreatePost = (data: any) => {
	data.year = moment(data.year._d).format("YYYY")
	return new Promise((resolve, reject) => {
		axios
			.post(url + "post/create", stringify(data))
			.then((res) => {
				//display toast
				//should return a post message
				if (res) resolve(res)
			})
			.catch((err) => {
				console.log(err)
				reject(false)
			})
	})
}

export const setOnlineDatabase = (values: boolean) => {
	const data = {value: values}
	axios.post(url + "online", stringify(data))
}

export const getPosts = (offset: number, limit: number) => {
	const headers: AxiosRequestConfig = {
		headers: {
			offset: offset,
			limit: limit,
		},
	}
	return new Promise((resolve, reject) => {
		axios
			.get(url + "post", headers)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export const register = (data: any) => {
	return new Promise((resolve, reject) => {
		axios
			.post(url + "signup", stringify(data))
			.then((res) => {
				if (res) resolve(res)
			})
			.catch((err) => {
				if (err) reject(err)
			})
	})
}

export const login = (data: any) => {
	return new Promise((resolve, reject) => {
		axios
			.post(url + "login", stringify(data))
			.then((res) => {
				if (res) resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export const getStatictics = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(url + "stats")
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(false)
			})
	})
}

export const getUserData = (userId: string) => {
	const headers: AxiosRequestConfig = {
		headers: {
			userId: userId,
		},
	}

	return new Promise((resolve, reject) => {
		axios
			.get(url + "user", headers)
			.then((res) => {
				console.log(res)
				resolve(res.data)
			})
			.catch((err) => {
				reject("ntht")
			})
	})
}

export const sendReply = (reply: string, postId: string, username: string) =>
	new Promise((resolve, reject) => {
		const data = {reply: reply, id: postId, username: username}
		axios
			.post(url + "reply", stringify(data))
			.then((res) => {
				//gets back the reply

				resolve(res.data)
			})
			.catch((err) => reject(err))
	})

export const getReplies = (postId: string) => {
	// console.log(replyIds)

	const headers: AxiosRequestConfig = {
		headers: {
			postId: postId,
		},
	}
	return new Promise((resolve, reject) => {
		axios
			.get(url + "reply", headers)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
