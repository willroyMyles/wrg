import {createBrowserHistory} from "history"
import Text from "antd/lib/typography/Text"
import React, {CSSProperties, useState, ReactNode} from "react"
import {motion, MotionProps} from "framer-motion"
import {Row, Tooltip, Popconfirm, Button} from "antd"
import Title from "antd/lib/typography/Title"
import Motioner from "./Motioner"
import {theme} from "../../Theme"
import Paragraph, {ParagraphProps} from "antd/lib/typography/Paragraph"
import {AvatarProps, Avatar} from "evergreen-ui"
import eventEmitter, {eventStrings} from "./EventEmitters"
export const sideHistory = createBrowserHistory()

export const ErrorLabel = (text: string | any) => {
	const val = motionValues.Scale_Big
	return (
		<motion.span
			style={{width: "100%", border: "0px solid red"}}
			initial={val}
			animate={motionValues.in}
			exit={val}
			className="error-text">
			<Row justify="center">{text.text}</Row>
		</motion.span>
	)
}

export const TextHeading = (props: any) => {
	return (
		<Motioner>
			<Row>
				<Text
					style={{
						// textShadow: "0px 0px 3px rgba(0,0,0,.1)",
						fontFamily: "Questrial",
						fontWeight: "normal",
						fontSize: "3rem",
					}}>
					{props.children}
				</Text>
			</Row>
		</Motioner>
	)
}

interface TextSubHeadingProps {
	style?: CSSProperties
	children: ReactNode
}
export const TextSubHeading = (props: TextSubHeadingProps) => {
	return (
		<Motioner style={{marginBottom: 5}}>
			<Row>
				<Text
					style={{
						fontFamily: "Questrial",
						fontWeight: "normal",
						fontSize: "1.5rem",
						textShadow: "0px 0px .1px rgba(0,0,0,.2)",
					}}>
					{props.children}
				</Text>
			</Row>
		</Motioner>
	)
}

export const TextSection = (props: any) => {
	return (
		<Motioner style={{marginBottom: 5}}>
			<Row>
				<Text style={{fontFamily: "Questrial", fontWeight: "bold", fontSize: "1rem", color: "rgba(0,0,10,.45)"}}>
					{props.children}
				</Text>
			</Row>
		</Motioner>
	)
}

export const TextRegular = (props: any) => {
	return (
		<Motioner style={{marginBottom: 5}}>
			<Row>
				<Text style={{fontFamily: "Questrial", fontWeight: "normal", fontSize: ".9rem"}}>{props.children}</Text>
			</Row>
		</Motioner>
	)
}

interface HintProps {
	children: ReactNode
	textStyle?: CSSProperties

	motion?: MotionProps
}
export const TextHint = (props: HintProps) => {
	return (
		<Motioner style={{marginBottom: 5}}>
			<Row>
				<Text
					style={{
						fontFamily: "Roboto",
						fontWeight: "bold",
						fontSize: ".75rem",
						color: "rgba(100,100,100,.5)",
					}}>
					{props.children}
				</Text>
			</Row>
		</Motioner>
	)
}

export const TextParaGraph = (props: ParagraphProps) => {
	const syle: CSSProperties = {
		color: theme.text_light,
		fontSize: "1rem",
		textAlign: "left",
		fontFamily: "Roboto",
		// ...props.style,
	}
	return (
		<Motioner>
			<Paragraph style={syle} ellipsis={props.ellipsis}>
				{props.children}
			</Paragraph>
		</Motioner>
	)
}

interface AAVProps {
	props?: AvatarProps
	item: any
}

export const AAvatar = (props: AAVProps) => {
	return (
		<div>
			<Motioner motion={{whileHover: {scale: 1.1}}}>
				<Tooltip mouseEnterDelay={1.5} title={`view ${props.item.username} profile`}>
					<div
						style={{cursor: "pointer"}}
						onClick={() => {
							eventEmitter.emit(eventStrings.showOtherProfile, props.item)
						}}>
						<Avatar style={{boxShadow: "0px 0px 5px rgba(100,100,100,.08)"}} name={props.item.username} size={45} />
					</div>
				</Tooltip>
			</Motioner>
		</div>
	)
}

export const HintContentText = (props: any) => {
	return (
		<Motioner style={{marginBottom: 5}}>
			<Row>
				<span
					style={{
						// textShadow: "0px 0px .5px rgba(90,90,90,.1)",
						fontSize: ".9rem",
						fontWeight: "lighter",
						color: theme.text_light,
					}}>
					{props.children}
				</span>
			</Row>
		</Motioner>
	)
}

export const motionValues = {
	in: {opacity: 1, y: 0, scale: 1, x: 0, scaleX: 1, scaleY: 1, translateY: 0},
	Scale_Big: {scale: 3, opacity: 0.7},
	Scale_Small: {scale: 0.3, opacity: 0},
	Fade: {opacity: 0},
	from_left: {y: -1000, opacity: 0.5},
	Scale_x: {opacity: 0.3, scaleX: 0, x: 0, y: 0},
	Height: {scale: 0, opacity: 0, translateY: -200},
	none: {},
	spring: {
		type: "spring",
		damping: 20,
		stiffness: 300,
	},

	transition: {duration: 0.3},
}

export const localStorageStrings = {
	user_name: "user name",
	user_id: "user id",
	user_logged_in: "am i logged in bro?",
	use_online_database: "this is to tell the backend weather to use online or offline database",
}
