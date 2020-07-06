import React, {useEffect, useState} from "react"
import Motioner from "../../helpers/Motioner"
import {Row, List, Divider} from "antd"
import dataExchanger from "../../../data_layer/DataExchange"
import {TextParaGraph, AAvatar, TextHint} from "../../helpers/Helpers_Index"
import {Avatar} from "evergreen-ui"
import moment from "moment"
import eventEmitter, {eventStrings} from "../../helpers/EventEmitters"

export const ReplyView = ({postId}: {postId: string}) => {
	const [data, setData] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		eventEmitter.addListener(eventStrings.replyCreated, () => {
			getReplies()
		})
		getReplies()

		return () => {
			eventEmitter.removeListener(eventStrings.replyCreated, () => null)
		}
	}, [])

	const getReplies = () => {
		dataExchanger.getReplies(postId).then((res) => {
			if (res) {
				//sorts data
				const arr = dataExchanger.listOfReplies.get(postId)?.sort((a, b) => (a.date > b.date ? 1 : -1)) || []
				setData(arr)
				setLoading(false)
			} else {
			}
		})
	}

	return (
		<Motioner style={{width: "100%"}}>
			<Row>
				<List
					style={{width: "100%"}}
					loading={loading}
					dataSource={data}
					grid={{column: 1}}
					renderItem={(item, index) => {
						return (
							<List.Item style={{width: "100%", padding: 15, borderRadius: 4, backgroundColor: "rgba(250,250,250,.5)"}}>
								<Motioner style={{width: "100%", border: "0px solid red"}}>
									<Row>
										<Avatar name={item.username} style={{marginRight: 8}} />
										<TextParaGraph>{item.username}</TextParaGraph>
									</Row>
									<Row>
										<TextParaGraph>{item.body}</TextParaGraph>
									</Row>
									<Row>
										<TextHint>{moment(item.date).fromNow()}</TextHint>
										<Divider type="vertical" />
										<TextHint>Report</TextHint>
									</Row>
								</Motioner>
							</List.Item>
						)
					}}
				/>
			</Row>
		</Motioner>
	)
}

export default ReplyView
