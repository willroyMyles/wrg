import React, {useState, useEffect} from "react"
import Motioner from "../../helpers/Motioner"
import {Row, Button, notification, Space, Layout, Input, Col, Divider, Switch} from "antd"
import {
	sideHistory,
	TextParaGraph,
	TextSubHeading,
	TextHeading,
	TextSection,
	TextHint,
	localStorageStrings,
} from "../../helpers/Helpers_Index"
import {ConfirmButton} from "../../left/Left_Bottom"
import {refreshStyles} from "less"
import Text from "antd/lib/typography/Text"
import {theme} from "../../../Theme"
import {Avatar} from "evergreen-ui"
import {observer} from "mobx-react"
import dataExchanger from "../../../data_layer/DataExchange"
import eventEmitter, {eventStrings} from "../../helpers/EventEmitters"

const Settings = observer(() => {
	const [onlineDatabase, setonlineDatabase] = useState(false)

	const handleToggle = (value: boolean) => {
		setonlineDatabase(value)
		dataExchanger.setUseOnlineDataBase(value)
		localStorage.setItem(localStorageStrings.use_online_database, String(onlineDatabase).toString())
	}

	useEffect(() => {
		setonlineDatabase(Boolean(localStorage.getItem(localStorageStrings.use_online_database)))
	}, [])

	return (
		<Motioner>
			{dataExchanger.isLoggedIn() && (
				<>
					<TextHeading>Profile</TextHeading>

					<Row align="middle" justify="center" style={{flexDirection: "column"}}>
						<Avatar name={dataExchanger.username} size={75} style={{margin: 10}} />
						<Button>Update</Button>
					</Row>

					<Divider style={{borderColor: theme.text_extra_light, opacity: 0.4}} />
					<Row>
						<TextSection>User Name</TextSection>
					</Row>
					<Row justify="space-between">
						<Row align="top">
							<TextParaGraph>your user-name is</TextParaGraph>
							<TextSubHeading style={{marginTop: 3, marginLeft: 4}}> {dataExchanger.username}</TextSubHeading>
						</Row>
						<Button type="ghost">Change</Button>
					</Row>
					<Divider style={{borderColor: theme.text_extra_light, opacity: 0.4}} />

					<Row>
						<TextSection>Email Address</TextSection>
					</Row>
					<Row justify="space-between">
						<Row align="top">
							<TextParaGraph>your email adress is</TextParaGraph>
							<TextSubHeading style={{marginTop: 3, marginLeft: 4}}> emailaddress</TextSubHeading>
						</Row>
						<Button type="ghost">Change</Button>
					</Row>
					<Divider style={{borderColor: theme.text_extra_light, opacity: 0.4}} />

					<Row justify="space-between">
						<TextSection>Password</TextSection>
						<Button type="ghost">Change</Button>
					</Row>
					<Divider style={{borderColor: theme.text_extra_light, opacity: 0.4}} />

					<Row justify="space-between">
						<TextSection>Delete my account</TextSection>
						<Button type="ghost">Dalete Account</Button>
					</Row>
					<Divider style={{borderColor: theme.text_extra_light, opacity: 0.4}} />

					<Space size="middle">
						<Row>
							<Button
								onClick={() => {
									notification.info({
										message: "Confirm log out?",
										placement: "bottomLeft",
										description: "Are you sure you wish to log out?",
										duration: 10,
										btn: <ConfirmButton />,
										key: "btn",
									})
								}}>
								Log out
							</Button>
						</Row>
						<Row>
							<Button
								onClick={() => {
									notification.info({
										message: "Confirm log out?",
										placement: "bottomLeft",
										description: "Are you sure you wish to log out?",
										duration: 10,
										btn: <Button onClick={() => sideHistory.go(0)}>Clear History</Button>,
										key: "btn",
									})
								}}>
								Clear History
							</Button>
						</Row>
						<Row>
							<Button onClick={() => {}}>change</Button>
						</Row>
						<Row>
							<Col>
								<TextHint>online database</TextHint>
								<Switch checked={onlineDatabase} onChange={handleToggle} />
							</Col>
						</Row>
					</Space>
				</>
			)}
			{!dataExchanger.isLoggedIn() && (
				<Row align="middle" justify="center" style={{flex: 1, flexDirection: "column", minHeight: "70vh"}}>
					<Button type="primary" onClick={() => eventEmitter.emit(eventStrings.login)}>
						login
					</Button>
					<TextSubHeading>Log in to view this page</TextSubHeading>
				</Row>
			)}
		</Motioner>
	)
})

export default Settings
