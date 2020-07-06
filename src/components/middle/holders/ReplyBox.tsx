import React, {useState} from "react"
import Motioner from "../../helpers/Motioner"
import {Comment, Button, Row, Col, message} from "antd"
import TextArea from "antd/lib/input/TextArea"
import dataExchanger from "../../../data_layer/DataExchange"
import {TextSubHeading} from "../../helpers/Helpers_Index"
import {Avatar} from "evergreen-ui"
import eventEmitter, {eventStrings} from "../../helpers/EventEmitters"

const ReplyBox = ({item}: {item: any}) => {
	const [disabled, setDisabled] = useState(true)
	const [loading, setLoading] = useState(false)
	const [value, setValue] = useState("")

	const handleClick = () => {
		setLoading(true)

		dataExchanger.sendReply(value, item._id).then((res) => {
			setValue("")
			setLoading(false)
			console.log(res)

			if (res) {
				message.success("reply created!")
				eventEmitter.emit(eventStrings.replyCreated)
			} else {
				message.error("something went horribly wrong")
			}
		})
	}

	return (
		<Motioner style={{width: "100%", marginTop: 12}}>
			<Row>
				{dataExchanger.isLoggedIn() && (
					<Comment
						style={{width: "100%"}}
						// avatar={<Avatar name={dataExchanger.username} />}
						content={
							<div>
								<TextArea
									disabled={loading}
									value={value}
									onChange={(e) => {
										setValue(e.target.value)
										if (e.target.value.length > 0) setDisabled(false)
										else setDisabled(true)
									}}
									allowClear
									style={{width: "100%"}}
									placeholder="write reply here..."
								/>
								<Row style={{marginTop: 10}}>
									<Button loading={loading} onClick={() => handleClick()} disabled={disabled} type="primary">
										reply
									</Button>
								</Row>
							</div>
						}
					/>
				)}
				{!dataExchanger.isLoggedIn() && (
					<Comment
						content={
							<Row>
								<Col>
									<TextSubHeading>you need to log in to reply</TextSubHeading>
									<Button>log in</Button>
								</Col>
							</Row>
						}
					/>
				)}
			</Row>
		</Motioner>
	)
}

export default ReplyBox
