/* 批量插入，并且模糊匹配 */

var result = [];
var container = document.getElementById('container');
var Buttons = document.getElementsByTagName('button');

// 渲染数据
function render (str) {  // str为查询内容
	container.innerHTML = result.map(function(ele, index) {
		if(str != null && str.length > 0) {
			var re = new RegExp(str, 'gi');       // 只能使用构造函数的方式创建变量类型的正则表达式
			ele = ele.replace(re, '<span class="select">' + str + '</span>');       // 查询的实现，在渲染中
		}
		return '<li data-id="' + index + '">' + ele + '</li>';
	}).join(''); 
	
	document.getElementById('input-num').value = '';
}

// 获取输入的内容，将其存入数组并返回
function getInput() {
	var input = document.getElementById('input-num').value;
	var re = /[^0-9a-zA-Z\u4e00-\u9fa5]+/gi;   // 匹配所有输入内容，去掉分隔换行符、逗号等连字符
	var arr = input.split(re).filter(function(ele) {
		if(ele != null && ele.length > 0) {
			return true;
		} else {
			return false;
		}
	});
	return arr;
}

// leftIn
function leftIn() {
	let inputArr = getInput();
	if(inputArr) {
		result = inputArr.concat(result);
		render();
	}
}
// rightIn
function rightIn() {
	let inputArr = getInput();
	if(inputArr) {
		result = result.concat(inputArr);
		render();
	}
}
// leftOut
function leftOut() {
	result.shift();
	render();	
}
// rightOut
function rightOut() {
	result.pop();
	render();
}

// 事件代理：点击每个元素自动删除
container.addEventListener('click', function(evt) {
	var id = parseInt(evt.target.getAttribute('data-id'));
	result.splice(id, 1);
	render();
}, false);

// 查询：
function find() {
	var inputStr = document.getElementById('find').value;
	render(inputStr);
}

Buttons[0].addEventListener('click', leftIn, false);
Buttons[1].addEventListener('click', rightIn, false);
Buttons[2].addEventListener('click', leftOut, false);
Buttons[3].addEventListener('click', rightOut, false);
Buttons[4].addEventListener('click', find, false);