import React from "react"
import logo from "./logo.svg"
import "antd/dist/antd.css"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Holder from "./Holder"

function App() {
	return (
		<div className="App">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header> */}
			<Holder />
		</div>
	)
}

export default App
