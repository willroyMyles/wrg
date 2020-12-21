import React from "react";
import "./App.less";
import "./style.less";
import "bootstrap/dist/css/bootstrap.css";

import { ThemeProvider } from "styled-components";
import { theme } from "./Theme";
import { Row } from "antd";
import WebFont from "webfontloader";
import Holder from "./Holder";
import { Container } from "react-bootstrap";
import { TinaProvider, TinaCMS } from "tinacms";
import {
	StrapiMediaStore,
	StrapiProvider,
	StrapiClient,
  } from 'react-tinacms-strapi'
import { processEnv } from "./api_layer/API_Strapi";

function App() {
	console.log(processEnv.strapi);
  WebFont.load({
    google: {
      families: [
        "Titillium",
        "Montserrat",
        "Roboto",
        "Dosis",
        "Questrial",
        "sans-serif",
      ],
    },
  });

  const cms = new TinaCMS({
	sidebar: true,
  enabled:false,
	apis: {
		strapi: new StrapiClient("http://localhost:1337"),
	  },
  });

  return (
    <TinaProvider cms={cms}>
		<StrapiProvider 
		onLogin={() => {
			/* we'll come back to this */
		  }}
		  onLogout={() => {
			/* we'll come back to this */
		  }}
		  >

      <ThemeProvider theme={theme}>
        <div
          className="App "
          style={{ backgroundColor: "rgba(240,242,245, 1)" }}
		  >
          <Row justify="center">
            <Container>
              <Holder />
            </Container>
          </Row>
        </div>
      </ThemeProvider>
		  </StrapiProvider>
    </TinaProvider>
  );
}

export default App;
