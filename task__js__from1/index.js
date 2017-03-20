window.onload = function() {
	var btn = document.getElementById('btn');

	btn.addEventListener('click', function() {
		var inputMsg = document.getElementById('msg');
		var tipDom = document.getElementById('tip');

		var data = validate(inputMsg.value);
		console.log(data);
		inputMsg.style.borderColor = data.color;
		tipDom.innerText = data.message;
		tipDom.style.color = data.color;
	}, false);
}

function validate (str) {
	let len = checkLength(str);
	console.log(len);
	let data = {
		message: "",
		color: ''
	}

	if(len === 0) {
		data.message = "名称不能为空";
		data.color = 'red';
		return data;
	} else if(len >= 4 && len <= 16) {
		data.message = "名称格式正确";
		data.color = 'green';
		return data;
	} else {
		data.message = "必填，长度为4~16个字符";
		data.color = 'red';
		return data;
	}

}

function checkLength(str) {
	if(str === '') {
		return 0;
	}
	var re_char = /\w+/g;
	var re_ch = /[\u4e00-\u9fa5]/g;
	var char = str.match(re_char);  // 数字、字母、下划线
	var ch = str.match(re_ch);  // 中文字符

	var char_len = 0;
	var ch_len = 0;

	if(char != null) {
		char_len = char.join('').length;
	} 
	if(ch != null) {
		ch_len = ch.join('').length * 2;
	}
	
	return char_len + ch_len;
}