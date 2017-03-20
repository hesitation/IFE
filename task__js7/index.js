function InputSomething(containerId, inputId) {
	this.result = [];
	this.container = document.getElementById(containerId);
	this.inputContent = document.getElementById(inputId);
}

// 类方法
InputSomething.trim = function(str) {   // trim
	var re = /^\s+|\s+$/g;   //判断首尾是否为空格或逗号，都去掉
	str = str.replace(re, '');
	return str.replace(/,$/, '');
}
InputSomething.unique = function(arr) {
	let des = [];
	arr.forEach(function(value) {
		if(des.indexOf(value) === -1) {
			des.push(value);
		} else {
			return;
		}
	});
	return des;
}

// 原型对象方法:
InputSomething.prototype.render = function(id) {
	this.container.innerHTML = this.result.map(function(ele, index) {
		return '<li data-id="' + index + '">' + ele + '</li>';
	}).join('');
}
InputSomething.prototype.getInput = function() {  // trim
	let input = this.inputContent.value;
	if(input.length > 1) {     // 注意这里：在中文输入时，打字时输入框中没有内容，但是每次按键都会捕获到输入的那个字符，每次捕获到的都是输入的值
		input = InputSomething.trim(input);

		input = input.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/gi);

		return input;
	}
}
InputSomething.prototype.insert = function() {
	let input = this.getInput();
	if(input) {
		this.result = this.result.concat(input);
		this.result = InputSomething.unique(this.result);    //去重
		if(this.result.length > 10) {   //多于十个时，自动删除
			let dis = this.result.length - 10;
			this.result.splice(0, dis);
			this.render();
			return;
		}
		this.render();
	}
}
InputSomething.prototype.delete = function(index) {
	this.result.splice(index, 1);
	this.render();
}


/* Tag的控制流------------------------------------------------------- */
var tag = new InputSomething('tag-container', 'inputContent');

// 输入事件
tag.inputContent.addEventListener('keyup', function(evt) {
	if(/[,\n\s]/g.test(tag.inputContent.value) || evt.keyCode === 13) {
		tag.insert();
		tag.inputContent.value = '';
	}
}, false);

tag.container.addEventListener('mouseover', function(evt) {
	let id = parseInt(evt.target.getAttribute('data-id'));
	if(tag.container.childNodes[id]) {   // 必须要目标节点存在时，才操作
		tag.container.childNodes[id].style.backgroundColor = 'coral';
		tag.container.childNodes[id].innerHTML = '删除 ' + evt.target.innerText + '?';
	}
}, false);
tag.container.addEventListener('mouseout', function(evt) {
	evt.stopPropagation();
	tag.render();
}, false);
// 删除事件
tag.container.addEventListener('click', function(evt) {
	let id = parseInt(evt.target.getAttribute('data-id'));
	tag.delete(id);
}, false);

/* Hobby的控制流------------------------------------------------------- */
var hobby = new InputSomething('hobby-container', 'textareaContent');
var btn = document.getElementById('btn');
// 输入事件
btn.addEventListener('click', function() {
	hobby.insert();
 	hobby.inputContent.value = '';
});
hobby.container.addEventListener('mouseover', function(evt) {
	let id = parseInt(evt.target.getAttribute('data-id'));
	if(hobby.container.childNodes[id]) {   // 必须要目标节点存在时，才操作
		hobby.container.childNodes[id].style.backgroundColor = 'coral';
		hobby.container.childNodes[id].innerHTML = '删除 ' + evt.target.innerText + '?';
	}
}, false);
hobby.container.addEventListener('mouseout', function(evt) {
	evt.stopPropagation();
	hobby.render();
}, false);
// 删除事件
hobby.container.addEventListener('click', function(evt) {
	let id = parseInt(evt.target.getAttribute('data-id'));
	hobby.delete(id);
}, false);