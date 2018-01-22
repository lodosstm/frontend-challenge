var webpack = require('webpack');


module.exports = {
  entry: "./src/index.js",
  output: {
		path: __dirname + "/dist/build/",
		publicPath: "build/",
		filename: "bundle.js"
	},
 module: {
		rules: [
			{
            	test: /\.scss$/,
            	use: [{
                	loader: "style-loader" // creates style nodes from JS strings
            	}, {
                	loader: "css-loader" // translates CSS into CommonJS
            	}, {
                	loader: "sass-loader" // compiles Sass to CSS
            	}],
            	exclude: /node_modules/,
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
        		test: /.jsx?$/,
        		loader: 'babel-loader',
        		exclude: /node_modules/,
        		query: {
          			presets: ['es2015', 'react', 'stage-2']
        		},
      		},

			{
				test: /\.json$/,
				exclude: /node_modules/,
                loader: 'json-loader',

            },
            {
      			test: /\.(jpe?g|png|gif|svg)$/,
      			use: [
        				'url-loader?limit=10000',
        				'img-loader'
      ]
    }
 
		]
	},
 
	resolve: {
		modules: ['node_modules'],
		extensions: [".js",".jsx",".json"]
	},
	plugins: [],
}