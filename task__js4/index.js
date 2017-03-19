/**
 *  整个逻辑是数据抽象的过程：
 *   1. 将队列当做一个对象，使用数组保存存入队列的内容；
 *   2. 使用数组执行增加、删除等操作，完成后将数组中的数据渲染到页面上
 *   3. 每种操作完，都重新渲染一次页面，所有数据更新
 *   4. 在渲染数据时，为每个元素增加一个当前元素的索引属性，可以根据这个属性值来删除该元素
 *   5. 没有使用事件代理，事件绑定在所有添加的节点上
 */


// 根据id获取元素
function $ (id) {
	return document.getElementById(id); 
}

// 绑定事件的兼容方法
function addEvent (ele, event, fn) {
	if(ele.addEventListener) {
		ele.addEventListener(event, fn, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, fn);
	} else {
		ele['on' + event] = fn;
	}
}

// 数组中每个元素执行指定函数，并将数组索引作为元素的参数和元素作为参数
function each (arr, fn) {
	arr.forEach(function (ele, index) {
		fn(ele, index);
	})
}

window.onload = function () {
	var Buttons = document.getElementsByTagName('button');
	var container = $('container');

	// 定义队列
	var queue = {
		result: [],     // 输入内容保存在数组中

		leftPush: function (num) {   // 输入从左侧加入队列，然后渲染到页面
			this.result.unshift(num);
			this.render();
		},

		rightPush: function (num) {     //从右侧加入队列数组，然后渲染到页面
			this.result.push(num);
			this.render();
		},

		isEmpty: function () {          // 判断队列中是否为空
			return (this.result.length === 0);
		},

		leftPop: function () {
			if(this.isEmpty()) {
				alert("the queue is already empty")
			} else {
				this.result.shift();
				this.render();
			}
		},

		rightPop: function () {
			if(this.isEmpty()) {
				alert("the queue is already empty")
			} else {
				this.result.pop();
				this.render();
			}
		},

		deleteId: function (id) {   // 使用splice()方法删除对应id的数据
			this.result.splice(id, 1);    // 将对应位置的元素删除
			this.render();
		},

		render: function () {
			var str = '';
			// 将数组中的所有元素渲染到页面中，拼接字符串
			each(this.result, function (ele, index) {
				str += '<span class="single" data-index=' + index + '>' + ele + '</span>';   // 增加一个data-index属性来标识每个元素
			});
			container.innerHTML = str;
			// 为每个添加的span元素绑定删除事件
			addSpanDelEvent();
		}
	}

	function addSpanDelEvent () {
		// 根据容器内span节点的个数来循环
		var oSpans = container.getElementsByTagName('span');
		// 
		Array.prototype.forEach.call(oSpans, function(ele) {
			addEvent(ele, 'click', function() {    // 根据队列中每个元素的索引来删除相应的元素
				var index = parseInt(this.getAttribute('data-index'));   
				queue.deleteId(index);
			})
		});
	}


	// 具体操作逻辑：为4个按钮绑定事件
	addEvent(Buttons[0], 'click', function() {   // 左侧进入
		var input = $('input-num').value;
		if(/^[0-9]+$/.test(input)) {
			queue.leftPush(input);
		} else {
			alert('Please enter an intreger!')
		}
	});

	addEvent(Buttons[1], 'click', function() {
		var input = $('input-num').value;
		if(/^[0-9]+$/.test(input)) {
			queue.rightPush(input);
		} else {
			alert('Please enter an intreger!')
		}
	});

	addEvent(Buttons[2], 'click', function() {
		queue.leftPop();
	});

	addEvent(Buttons[3], 'click', function() {
		queue.rightPop();
	});
}


