// 另一种实现
var result = [];  // 保存输入的数据，需要排序，所以使用数组保存数据
var container = document.getElementById('container');
var Buttons = document.getElementsByTagName('button');

// 数据渲染函数
function render() {
	container.innerHTML = '';   // 每次渲染前将原来的数据的内容清空
	result.forEach(function(ele, index) {
		var oSpan = document.createElement('span');
		oSpan.style.height = parseInt(ele) * 3 + 'px';   //适当放大，便于观察：注意带上单位
		oSpan.innerText = ele;
		oSpan.setAttribute('data-id', index);      // 增加每个元素的id，便于以后删除
		container.appendChild(oSpan);
	});
	document.getElementById('input-num').value = '';   // 清空输入
}

// 检查输入的函数：处理不合法的输入，返回正确的输入内容
function checkInput() {
	var inputValue = document.getElementById('input-num').value;
	if(!/^[1-9]\d+$/.test(inputValue)) {   // 如果不匹配，/^[0-9].\d+$/至少两位数
		console.log('Please enter an integer');
		return 0;
	}
	if(parseInt(inputValue) >100 || parseInt(inputValue) < 10) {
		console.log('10-100 are requested');
		return 0;
	}
	if(result.length > 60) {
		console.log('The maximum number of element is 60');
		return 0;
	}

	return inputValue;
}

// 位指定索引设置不同的背景色
function setIndexBgcolor(arr) {  // arr是要设置不同颜色背景元素索引组成的数组
	container.innerHTML = '';   // 每次渲染前将原来的数据的内容清空
	result.forEach(function(ele, index) {
		var oSpan = document.createElement('span');
		oSpan.style.height = parseInt(ele) * 3 + 'px';   //适当放大，便于观察：注意带上单位
		oSpan.innerText = ele;
		oSpan.setAttribute('data-id', index);      // 增加每个元素的id，便于以后删除

		if(index === arr[0]) {
			oSpan.style.backgroundColor = 'coral';
		}
		if(index === arr[1]) {
			oSpan.style.backgroundColor = 'LightBlue';
		}
		container.appendChild(oSpan);
	});
	document.getElementById('input-num').value = '';   // 清空输入
}

/* 功能操作实现 */

// leftIn
function leftIn() {
	let input = checkInput();
	if(input) {  // 只有返回值不为0时才渲染
		result.unshift(input);
		render();
	}
}
// rightIn
function rightIn() {
	let input = checkInput();
	if(input) {
		result.push(input);
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

/* 其余功能 */

// 生成随机数
function randomTen() {
	var data = [];
	for(var i=0; i<10; i++) {
		var ran = Math.floor(Math.random() * (100 - 10 + 1) + 10);
		data.push(ran);
	}
	result = data;
	render();
}

// 冒泡排序，动态演示：每进行一次比较，数组更换内两个元素更换相对位置，通过延时函数，渲染一次数据
function BubbleSort() {
	var len = result.length;
	var i = 0;
	var count = 0;  // 主循环记录

	var Clock = setInterval(function() {
		if(count >= len) {
			clearInterval(Clock);
		}
		if(i === len - 1 - count) {   // 完成一次主循环
			i = 0;
			count++;
		}
		// 循环体
		if(result[i] > result[i+1]) {
			var temp = result[i];   // 保存大的值，交换位置
			result[i] = result[i+1];   // 小的值在前面
			result[i+1] = temp;
			render();  // 交换一次比较一次
		}
		i++;   //次循环

	}, 5000);

}



/* 逻辑操作 */

// 点击删除：通过事件代理的方式处理
container.addEventListener('click', function(evt) {   // 通过event.target获取点击的元素
	var index = parseInt(evt.target.getAttribute('data-id'));
	// 删除元素，再次渲染
	result.splice(index, 1);
	render();
}, false);

Buttons[0].addEventListener('click', leftIn, false);
Buttons[1].addEventListener('click', rightIn, false);
Buttons[2].addEventListener('click', leftOut, false);
Buttons[3].addEventListener('click', rightOut, false);
Buttons[4].addEventListener('click', BubbleSort, false);
Buttons[5].addEventListener('click', randomTen, false);