const CracoLessPlugin = require("craco-less")

module.exports = {
	env: {
		STRAPI_URL: process.env.STRAPI_URL,
	  },
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							// "@primary-color": "green",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
