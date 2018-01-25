"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var fs = require("fs");
var request = require("request");

//该函数的作用：在本地存储所爬取的新闻内容资源
var savedContent = exports.savedContent = function savedContent($, news_title) {
	$(".article-content p").each(function (index, item) {
		var x = $(this).text();

		var y = x.substring(0, 2).trim();

		if (y == "") {
			x = x + "\n";
			//将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
			fs.appendFile("./data/" + news_title + ".txt", x, "utf-8", function (err) {
				if (err) {
					console.log(err);
				}
			});
		}
	});
};

//该函数的作用：在本地存储所爬取到的图片资源
var savedImg = exports.savedImg = function savedImg($, news_title) {
	$(".article-content img").each(function (index, item) {
		var img_title = $(this).parent().next().text().trim(); //获取图片的标题
		if (img_title.length > 35 || img_title == "") {
			img_title = "Null";
		}
		var img_filename = img_title + ".jpg";

		var img_src = "http://www.ss.pku.edu.cn" + $(this).attr("src"); //获取图片的url

		//采用request模块，向服务器发起一次请求，获取图片资源
		request.head(img_src, function (err, res, body) {
			if (err) {
				console.log(err);
			}
		});
		request(img_src).pipe(fs.createWriteStream("./image/" + news_title + "---" + img_filename)); //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
	});
};