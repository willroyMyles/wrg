import React, {Component} from "react"
import {TextParaGraph, TextHint, TextSubHeading} from "../../helpers/Helpers_Index"
import {Row, Col, Button, Badge, Affix} from "antd"
import {Avatar} from "evergreen-ui"
import moment from "moment"
import {theme} from "../../../Theme"
import ReplyBox from "../holders/ReplyBox"
import CommentBox from "../holders/CommentBox"
import eventEmitter, {eventStrings} from "../../helpers/EventEmitters"
import ReplyView from "../holders/ReplyView"

interface Props {
	item: any
	onClick: () => void
}
class Content_View_Post extends Component<Props> {
	state = {
		showReplyBox: false,
		showReplies: false,
	}
	item: any
	onClick: () => void

	constructor(props: Props) {
		super(props)

		this.onClick = props.onClick

		this.item = props.item

		eventEmitter.on(eventStrings.replyCreated, () => {
			this.forceUpdate()
		})
	}

	render() {
		return (
			<div id="ref">
				<Row
					justify="space-between"
					style={{padding: 10, border: "1px solid rgba(200,200,200,.1)", borderLeft: "none", borderRight: "none"}}>
					<TextHint>{this.item.make}</TextHint>
					<TextHint>{this.item.model}</TextHint>
					<TextHint>{this.item.category}</TextHint>
					<TextHint>{this.item.sub_category}</TextHint>
					<div
						style={{
							height: "40%",
							position: "absolute",
							top: "0%",
							// left: -20,
							width: 3,
							// backgroundColor: col,
						}}
					/>
				</Row>
				<Row style={{marginTop: 10}}>
					<Col span={3}>
						<Avatar name={this.item.username} size={45} style={{boxShadow: "0px 0px 5px rgba(100,100,100,.08)"}} />
					</Col>
					<Col span={20} offset={1}>
						<Row align="top" justify="space-between" style={{border: "0px solid black", padding: 0}}>
							<TextSubHeading>{this.item.title}</TextSubHeading>
						</Row>
						<TextHint>
							<span>posted by - </span>
							<span>{this.item.username}</span>
						</TextHint>
						<TextHint>{moment(this.item.time).fromNow()}</TextHint>
						<Row style={{marginTop: 13, marginBottom: 17}}>
							<TextParaGraph style={{color: theme.text_light}}>{this.item.body}</TextParaGraph>
						</Row>
						<Row gutter={[10, 10]}>
							<Col>
								<Button
									onClick={() => this.setState({showReplies: !this.state.showReplies})}
									type="default"
									color="blue">
									show comments{" "}
									<Badge
										count={this.item.replies.length}
										style={{backgroundColor: theme.primary_color, marginLeft: 4}}
									/>
								</Button>
							</Col>
							{/* <Col>
								<Button
									onClick={() => this.setState({showReplyBox: !this.state.showReplyBox})}
									type="default"
									color="blue">
									reply
								</Button>
							</Col> */}
							<Col flex="auto" />
							<Affix
								offsetTop={20}
								// target={() => document.getElementById( "ref" )}
							>
								<Col>
									<Button type="primary" onClick={this.onClick}>
										Close
									</Button>
								</Col>
							</Affix>
						</Row>
					</Col>
				</Row>
				<Row justify="end"></Row>

				<Row>
					<Col md={0} />
					<Col md={24}>
						<Row style={{width: "100%"}}>
							<ReplyBox item={this.item} />
							{/* {this.state.showReplies && <CommentBox replies={this.item.replies} postId={this.item._id} />} */}
							{this.state.showReplies && <ReplyView postId={this.item._id} />}
						</Row>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Content_View_Post
