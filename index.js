#!/usr/bin/env node

const program = require("commander");
const inputModule = require("./src/inputModule");
const fetchPage = require("./src/requestHtml");

// var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";
//初始url 

program
	.version(require("./package.json").version)
	.usage("[options]  [node-spide]")
	.option("-s, --start", "start Fetch Page")
	.option("-e, --examples", "show Examples")
	.parse(process.argv);

const currentPath = process.cwd();

function showExamples() {
	console.log("");
	console.log("  Examples:");
	console.log("");
	console.log(" 想要爬取的网站地址： http://www.ss.pku.edu.cn/index.php/newscenter/news/3482");
	console.log(" 想要爬取的内容选择器：  div.article-title a  ");
	console.log(" 该内容是标题 '北京大学工程硕士专业学位授权点自我评估专家评审会召开' ");
	console.log("");
}

(function () {
	console.log("Jesse Log", program.args.length);
	if (program.examples) {
		return showExamples();
	}
	if (program.start) {
		console.log("当前路径：", currentPath);
		console.log("开始设置        …………^o^…………");
		inputModule().then((params) => {
			console.log(params);
			const { url, selector } = params;
			fetchPage(url, selector);      //主程序开始运行
		});
		return null;
	}
	// 没有输入参数
	if (program.args.length < 1) {
		return program.help();
	}
})();
