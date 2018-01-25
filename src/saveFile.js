const fs = require("fs");
// const request = require("request");

const currentPath = process.cwd();

const mkdir = (cb) => {
	fs.exists(currentPath + "/data", function (exists) {
		// 不存在，新建
		if (!exists) {
			fs.mkdir(currentPath + "/data", function (err) {
				if (err) {
					throw err;
				}
				cb && cb();
			});
		} else {
			cb && cb();
		}
		console.log(`"内容保存目录: ${currentPath}/data"`);
	});

};
//该函数的作用：在本地存储所爬取的内容
const savedContent = (content) => {
	if (content) {
		mkdir(
			function () {
				const data = new Date();
				const time = `${data.toDateString()} - ${data.getTime()}`;
				const filename = `${currentPath}/data/${time}.text`;
				fs.writeFile(filename, content, "utf-8", function (err) {
					if (err) {
						console.log(err);
					}
				});
			}
		);
	}
};

//该函数的作用：在本地存储所爬取到的图片资源
// const savedImg = ($, news_title) => {
// 	$(".article-content img").each(function (index, item) {
// 		var img_title = $(this).parent().next().text().trim();  //获取图片的标题
// 		if (img_title.length > 35 || img_title == "") {
// 			img_title = "Null";
// 		}
// 		var img_filename = img_title + ".jpg";

// 		var img_src = "http://www.ss.pku.edu.cn" + $(this).attr("src"); //获取图片的url

// 		//采用request模块，向服务器发起一次请求，获取图片资源
// 		request.head(img_src, function (err, res, body) {
// 			if (err) {
// 				console.log(err);
// 			}
// 		});
// 		request(img_src).pipe(fs.createWriteStream("./image/" + news_title + "---" + img_filename));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
// 	});
// };

module.exports = {
	savedContent,
};
