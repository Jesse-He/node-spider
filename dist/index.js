#!/usr/bin/env node
"use strict";

var _requestHtml = require("./requestHtml");

var _requestHtml2 = _interopRequireDefault(_requestHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var program = require("commander");
var inquirer = require("inquirer");

var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";
//初始url 


program.version(require("../package.json").version).usage("[options]  [node-cli study]").option("-s, --start", "start Fetch Page").parse(process.argv);

var currentPath = process.cwd();

console.log("currentPath", currentPath);

(0, _requestHtml2.default)(url); //主程序开始运行