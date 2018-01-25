#!/usr/bin/env node

const inquirer = require("inquirer");

// 提示配置
const inquireArgs = {
	addUrl: {
		type: "input",
		message: "请输入你需要爬去的网站网址：",
		name: "url",
	},
	addSelector: {
		type: "input",
		message: "请给出要获取页面的元素的选择器(例如 .classNmae 或者 #id)：",
		name: "selector",
	},
	check: {
		type: "input",
		message: "爬去信息成功。是否查看文件？(yes/no)",
		name: "isCheck",
	},
};

module.exports = async function () {
	try {
		const addUrl = await inquirer.prompt(inquireArgs.addUrl);
		const addSelector = await inquirer.prompt(inquireArgs.addSelector);
		return {
			url: addUrl.url,
			selector: addSelector.selector
		};
	} catch (error) {
		console.error("参数异常");
		return null;
	}
};
