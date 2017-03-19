/**
 * 获取输入的数字，并返回
 * @return {[type]} [description]
 */
function getNumb (id) {
	var inputValue = document.getElementById(id);
	return inputValue.value;
}

/**
 * 创建节点，并添加class
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function createEle (num) {
	var ele = document.createElement('li');
	ele.className = 'single';
	ele.innerText = num;
	return ele;
}

/**
 * 从左侧插入数字元素，将节点添加到最前面
 * 使用insetBefore(node, index)方法，当index为null时，与appendChild()相同
 * 
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function leftIn (parent) {
	let inputNum = getNumb('inputNum');

	var oChild = createEle(inputNum);
	// 判断容器内是否有元素
	var oLi = parent.getElementsByTagName("li");

	if(!oLi.length) {  //判断之前有无内容，在容器为空情况下insertBefore()
		parent.insertBefore(oChild, null)      // 第二个参数是null，与appendChild()相同
	} {
		parent.insertBefore(oChild, oLi[0]);     // 添加到第一个元素之前
		// alert("insertLeft " + inputNum);   
	}

	deleteItem(oChild, parent);   // 为每个添加的元素绑定删除事件
}

/**
 * 从右侧插入数字元素
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function rightIn (parent) {
	let inputNum = getNumb('inputNum');

	var oChild = createEle(inputNum);
	parent.appendChild(oChild);    // oParent在初始化函数中，可用
	// alert("insertRight " + inputNum); 
	
	deleteItem(oChild, parent);   // 为每个添加的元素绑定删除事件
}

/**
 * 读取并删除队列左侧第一个元素，并显示元素的中的值
 */
function leftOut (parent) {
	var oLi = parent.getElementsByTagName('li');
	if(!oLi.length) {
		alert("没有可以移除的节点了")
	} else {
		let num = oLi[0].innerText;
		parent.removeChild(oLi[0]);
		alert("deleteLeft " + num); 
	}
}

/**
 * 读取并删除队列右侧第一个元素，并显示元素的中的值
 */
function rightOut (parent) {
	var oLi = parent.getElementsByTagName('li');
	if(!oLi.length) {
		alert("没有可以移除的节点了")
	} else {
		let num = oLi[oLi.length - 1].innerText;
		parent.removeChild(oLi[oLi.length - 1]);
		alert("deleteLeft " + num); 
	}
}

/**
 * 在显示元素的容器上绑定删除子元素事件，利用事件代理
 * @return {[type]} [description]
 */
function deleteItem (item, parent) {
	item.addEventListener('click', function() {
		let num = this.innerText;
		parent.removeChild(this);      // 这里的this指向创建的节点对象
		alert(num);
	});
}


function init() {
	var oParent = document.getElementById('msg');   // 父元素节点在初始化函数中，可用

	var leftInBtn = document.getElementById('leftIn');
	var rightInBtn = document.getElementById('rightIn');
	var leftOutBtn = document.getElementById('leftOut');
	var rightOutBtn = document.getElementById('rightOut');

	leftInBtn.addEventListener('click', function () {
		leftIn(oParent);
	}, false);
	rightInBtn.addEventListener('click', function () {
		rightIn(oParent)
	}, false);
	leftOutBtn.addEventListener('click', function () {
		leftOut(oParent);
	}, false);
	rightOutBtn.addEventListener('click', function () {
		rightOut(oParent);
	}, false);

	oParent.addEventListener('click', function () {
		console.log(this);
	});
}

init();