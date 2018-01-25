const http = require("http");
const https = require("https");
const cheerio = require("cheerio");
const saveFile = require("./saveFile");

let request = http;

module.exports = function (url, selector) {
	const contentList = [];
	if (url.indexOf("https") >= 0) {
		request = https;
	}
	//采用http模块向服务器发起一次get请求      
	request.get(url, function (res) {
		let html = "";        //用来存储请求网页的整个html内容
		res.setEncoding("utf-8"); //防止中文乱码
		//监听data事件，每次取一块数据
		res.on("data", function (chunk) {
			html += chunk;
		});
		//监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
		res.on("end", function () {
			const $ = cheerio.load(html); //采用cheerio模块解析html
			$(selector).each(function () {
				const content = $(this).text().trim();
				contentList.push(content);
				// console.log(content);     //打印信息
			});

			saveFile.savedContent(contentList.join("\n"));  //存储每篇文章的内容及文章标题
			// savedImg($, news_title);    //存储每篇文章的图片及图片标题
		});
	}).on("error", function (err) {
		console.log(err);
	});
};