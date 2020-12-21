import React from "react"

import Left_Middle from "./Left_Middle"
import Left_Bottom from "./Left_Bottom"
import { theme } from "../../Theme"
import { Row, Button } from "antd"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import eventEmitter, { eventStrings } from "../helpers/EventEmitters"
import { useCMS, useForm, usePlugin } from "tinacms"
import { getAllAuthors } from "../../api_layer/API_Strapi"

const formConfig = {
    id: 'tina-tutorial-index',
    label: 'Edit Page',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'body',
        label: 'Body',
        component: 'textarea',
      },
    ],
    initialValues: [],
    onSubmit: async () => {
      window.alert('Saved!')
    },
  }


const LeftHolder = () => {
	const cms = useCMS()
	const [editableData, form] = useForm(formConfig)
	usePlugin(form)
	// cms.plugins.add(form)

	return (
		<Row
			// align="middle"
			justify="space-between"
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				backgroundColor: theme.faint,
				border: "0px solid black",
				paddingTop: 5,
				paddingBottom: 5,
				// boxShadow: "7px 0px 10px rgba(100,100,100,.1)",
			}}>
			<Left_Bottom />
			<Left_Middle />
			<div />
			<div />
			<Button onClick={() => eventEmitter.emit(eventStrings.showFeedback)} type="primary">
				feedback
			</Button>
		<div>{editableData.title}</div>
		{/* <div>{getAllAuthors()}</div> */}
			<Button onClick={() => cms.toggle()} type="primary">
				cms
			</Button>
			{/* <Left_Top /> */}
		</Row>
	)
}

export default LeftHolder
