import React, {useState, useEffect} from "react"
import {List, Row, Col, Tooltip, Button, BackTop, Divider} from "antd"
import dataExchanger from "../../../data_layer/DataExchange"
import Motioner from "../../helpers/Motioner"
import {theme} from "../../../Theme"
import {AAvatar, TextSubHeading, TextParaGraph, TextHint, TextSection} from "../../helpers/Helpers_Index"
import moment from "moment"
import {BsThreeDotsVertical, BsChat, BsEye, BsPaperclip, BsArrowRight, BsArrowUp} from "react-icons/bs"
import Content_View_Post from "./Content_View_Post"
import Text from "antd/lib/typography/Text"
import dataProvider from "../../../data_layer/DataProvider"
import {useParams} from "react-router-dom"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import eventEmitter, {eventStrings} from "../../helpers/EventEmitters"

export const Content_List_2 = (props: any) => {
	const [morePost, setMorePost] = useState(true)
	const [data, setData] = useState<any[]>([])
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(true)
	const [currentIndex, setCurrentIndex] = useState<number | null>(-1)
	const [timeToggle, setTimeToggle] = useState(true)

	const {id} = useParams()
	const bp = useBreakpoint()
	useEffect(() => {
		getMorePosts()
		filterData()

		eventEmitter.addListener(eventStrings.postDataAltered, () => {
			filterData()
		})

		return () => {
			eventEmitter.removeListener(eventStrings.postDataAltered, () => null)
		}

		// console.log("called")
	}, [])

	const filterData = () => {
		setLoading(true)
		const categoryNumber = Number.parseInt(id)
		const category = dataProvider.headers[categoryNumber]

		var d: any[] = []
		dataExchanger.postData.forEach((value) => {
			const stat = value.category == category
			if (stat) d.push(value)
		})
		setData(d)

		setLoading(false)
	}

	const getMorePosts = () => {
		setLoading(true)
		dataExchanger.getPosts().then((res) => {
			if (res) {
				if (res == 100) {
					setLoading(false)

					setMorePost(false)
					return
				}
				filterData()
			} else {
				setLoading(false)
			}
		})
	}

	const sortByTime = () => {
		setLoading(true)
		setTimeToggle(!timeToggle)
		const d = data.sort((a: any, b: any) => {
			const val = a.time > b.time ? -1 : 1
			return timeToggle ? val : val * -1
		})
		setData(d)
		setLoading(false)
	}

	return (
		<Row id="row" style={{width: "100%", minHeight: "90vh"}}>
			<Row style={{padding: 10}}>
				<Button onClick={() => sortByTime()}>sort by time</Button>
			</Row>
			<List
				style={{width: "100%", padding: bp.sm ? 0 : bp.xs ? 0 : 25}}
				dataSource={data}
				loading={loading}
				grid={{column: 1, gutter: 30}}
				renderItem={(item: any, index: number) => {
					return (
						<List.Item>
							<Motioner
								style={{
									width: bp.xs ? "100%" : "85%",
									marginTop: 29,
									backgroundColor: theme.text_white,
									padding: 25,
									borderRadius: 7,
									border: "1px solid rgba(200,200,200,.3)",
									boxShadow: "5px 5px 8px rgba(100,100,100,.1)",
								}}>
								{currentIndex != index && (
									<Row
										style={{width: "100%"}}
										onClick={() => {
											// eventEmitter.emit(eventStrings.PostSelected, item)
										}}>
										<Col span={3}>
											<div
												style={{
													height: "40%",
													position: "absolute",
													top: "0%",
													left: -20,
													width: 3,
													// backgroundColor: col,
												}}
											/>
											<AAvatar item={item} />
										</Col>
										<Col span={20} offset={1}>
											<Row align="middle" justify="space-between">
												<Col span={24}>
													<Row align="middle" justify="space-between">
														<TextSection>{item.username}</TextSection>

														<Col>
															<Row align="middle">
																<TextHint>{moment(item.time).fromNow()}</TextHint>
																<Tooltip title="more options">
																	<Button
																		type="text"
																		onClick={() => console.log("vertical")}
																		style={{border: "none"}}
																		icon={<BsThreeDotsVertical opacity={0.6} />}
																	/>
																</Tooltip>
															</Row>
														</Col>
													</Row>
													<TextSubHeading>{item.title}</TextSubHeading>
												</Col>
											</Row>
											<Row style={{marginTop: 12, marginBottom: 5}}>
												<TextParaGraph ellipsis={{rows: 2}}>{item.body}</TextParaGraph>
											</Row>
											<Row id="bottom row" gutter={[24, 0]}>
												<Col>
													<Tooltip title={`${item.replies.length} comments`}>
														<Row align="middle" style={{opacity: 0.6}}>
															<Text>{item.replies.length} </Text>
															<BsChat strokeWidth={0.3} style={{marginLeft: 7}} size={14} />
														</Row>
													</Tooltip>
												</Col>
												<Col>
													<Tooltip title={` views`}>
														<Row align="middle" style={{opacity: 0.6}}>
															<Text>0 </Text>
															<BsEye strokeWidth={0.3} style={{marginLeft: 7}} size={16} />
														</Row>
													</Tooltip>
												</Col>
												<Col>
													<Tooltip title={`attatchments`}>
														<Row align="middle" style={{opacity: 0.6}}>
															<Text>0 </Text>
															<BsPaperclip
																rotate={45}
																strokeWidth={0.2}
																style={{marginLeft: 7, transform: "rotate(45deg)"}}
																size={16}
															/>
														</Row>
													</Tooltip>
												</Col>
												<Col flex="auto"></Col>
												<Col>
													<Button
														onClick={() => {
															setVisible(true)
															setCurrentIndex(index)
														}}
														type="primary">
														{/* <Row align="middle" style={{textTransform: "capitalize", marginTop: 5}}> */}
														View Content <BsArrowRight size={20} strokeWidth={1} opacity={0.65} />
														{/* </Row> */}
													</Button>
												</Col>
											</Row>
										</Col>
									</Row>
								)}
								{visible && currentIndex == index && (
									<Motioner>
										<Content_View_Post onClick={() => setCurrentIndex(null)} item={item} />
									</Motioner>
								)}
							</Motioner>
							<Divider style={{borderColor: theme.text_extra_light, opacity: 0.0}} />
						</List.Item>
					)
				}}
			/>
			<Row justify="center" align="middle" style={{marginTop: 20, marginBottom: 30, width: "100%"}}>
				<Col>{morePost && <Button onClick={() => getMorePosts()}>load more !</Button>}</Col>
				<Col>{!morePost && <TextSubHeading>no more posts</TextSubHeading>}</Col>
			</Row>
			<Tooltip title="to top">
				<BackTop>
					<BsArrowUp color={"rgba(0,0,0,1)"} />
					help
				</BackTop>
			</Tooltip>
		</Row>
	)
}

export default Content_List_2
