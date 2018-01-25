"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var http = require("http");
var cheerio = require("cheerio");
var i = 0;

exports.default = function (x) {
	//采用http模块向服务器发起一次get请求      
	http.get(x, function (res) {
		var html = ""; //用来存储请求网页的整个html内容
		res.setEncoding("utf-8"); //防止中文乱码
		//监听data事件，每次取一块数据
		res.on("data", function (chunk) {
			html += chunk;
		});
		//监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
		res.on("end", function () {

			var $ = cheerio.load(html); //采用cheerio模块解析html

			var time = $(".article-info a:first-child").next().text().trim();

			var news_item = {
				//获取文章的标题
				title: $("div.article-title a").text().trim(),
				//获取文章发布的时间
				Time: time,
				//获取当前文章的url
				link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr("href"),
				//获取供稿单位
				author: $("[title=供稿]").text().trim(),
				//i是用来判断获取了多少篇文章
				i: i = i + 1

			};

			console.log(news_item); //打印新闻信息

			// const news_title = $("div.article-title a").text().trim();

			// savedContent($, news_title);  //存储每篇文章的内容及文章标题

			// savedImg($, news_title);    //存储每篇文章的图片及图片标题

			//下一篇文章的url
			// const nextLink = "http://www.ss.pku.edu.cn" + $("li.next a").attr("href");
			// const str1 = nextLink.split("-");  //去除掉url后面的中文
			// const str = encodeURI(str1[0]);
			//这是亮点之一，通过控制I,可以控制爬取多少篇文章.
			// if (i <= 500) {
			// 	fetchPage(str);
			// }
		});
	}).on("error", function (err) {
		console.log(err);
	});
};