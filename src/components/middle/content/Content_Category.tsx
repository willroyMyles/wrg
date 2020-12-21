import React, { useState, useEffect } from "react";
import { Row, Col, List, Spin } from "antd";
import { observer } from "mobx-react";
import dataProvider from "../../../data_layer/DataProvider";
import eventEmitter, { eventStrings } from "../../helpers/EventEmitters";
import dataExchanger from "../../../data_layer/DataExchange";
import Motioner from "../../helpers/Motioner";
import { theme } from "../../../Theme";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { DescText } from "../account/Profile_View_Other";
import { TextHeading, TextSection } from "../../helpers/Helpers_Index";
import { useCMS } from "tinacms";
import { getAllCategories } from "../../../api_layer/API_Strapi";
import { useHistory } from "react-router-dom";
const Content_Category = observer(() => {
  const [data, setData] = useState(dataExchanger.statictics);
  const [loading, setLoading] = useState(false);

  const nav = useHistory()
	const [cat, setcat] = useState<string[]>([])
	const [subs, setsubs] = useState<any[]>([])
  const cms = useCMS();
	
  useEffect(() => {
    eventEmitter.on(eventStrings.updatingStatistics, (val) => {
      setLoading(val);
	});
	getAllCategories().then(res=>{
		const titles = res.map(a=>a.title);
		const subs = res.map(a => a.sub)
		setcat(titles);
		setsubs(subs)
	})

    dataExchanger.getStatictics().then((res) => {
      if (res) {
        setData(dataExchanger.statictics);
      } else {
      }
    });
  }, []);

  const col = theme.primary_color.slice(0, 7);

  return (
    <Motioner>
      <TextHeading>Categories</TextHeading>
      <List
        dataSource={cat}
        grid={{ gutter: 10, xl: 3, md: 2, sm: 2, xs: 1, lg: 3, xxl: 4 }}
        renderItem={(item, index) => {
          return (
            <Col span={24}>
              <div
				// onClick={() => eventEmitter.emit(eventStrings.category, index)}
				onClick={() => nav.push("/category/"+index, {subs:subs[index]})}
                style={{
                  margin: 17,
                  padding: 10,
                  paddingLeft: 30,
                  paddingRight: 30,
                  backgroundColor: "white",
                  cursor: "pointer",
                  borderRadius: 4,
                  border: ".1px solid rgba(100,100,100,.1)",
                  borderBottom: `2px solid ${col}99`,
                  boxShadow: `3px 3px 10px rgba(200,200,200,.3)`,
                }}
              >
                <Row>
                  <TextSection>{item}</TextSection>
                </Row>
                <Spin spinning={loading}>
                  <Row
                    style={{ marginTop: 20 }}
                    align="middle"
                    justify="space-around"
                    gutter={[20, 10]}
                  >
                    <Col>
                      <DescText
                        title="total"
                        value={data.get(index)?.total | 0}
                      />{" "}
                    </Col>
                    <Col>
                      <DescText
                        title="available"
                        value={data.get(index)?.available | 0}
                      />{" "}
                    </Col>
                    {/* <Col>
                      <DescText
                        title="pending"
                        value={data.get(index)?.pending | 0}
                      />{" "}
                    </Col>
                    <Col>
                      <DescText
                        title="filled"
                        value={data.get(index)?.filled | 0}
                      />{" "}
                    </Col> */}
                  </Row>
                </Spin>
              </div>
            </Col>
          );
        }}
      />
    </Motioner>
  );
});

export default Content_Category;
