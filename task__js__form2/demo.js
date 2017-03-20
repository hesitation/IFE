// 废弃，之前写的版本

function Validate (id, tip) {
	this.data = {     // 保存较验结果的数据
		code: 0,
		message: tip,
		color: '',
		borderColor: 'SkyBlue'
	}
	var self = this;
	this.input = document.getElementById(id);
	this.init = function() {
		this.input.addEventListener('focus', this.showTip.bind(this), false);
		this.input.addEventListener('blur', (function() {      // 绑定调用的对象
			var str = this.input.value;
			this.checkUserName(str);
			this.showTip();
		}).bind(this), false);
	}
	this.init();
}

// 定义API
Validate.prototype.showTip = function() {
	this.input.nextElementSibling.style.visibility = 'visible';
	this.input.style.borderColor = this.data.borderColor;
	this.input.nextElementSibling.innerHTML = this.data.message;
	this.input.nextElementSibling.style.color = this.data.color;
};

Validate.prototype.check = function(fn) {
	fn();
}

Validate.prototype.checkLength = function(str) {
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

Validate.prototype.checkUserName = function (str) {
	let len = this.checkLength(str);

	if(len === 0) {
		this.data.message = "名称不能为空";
		this.data.color = 'red';
		this.data.borderColor = 'red'
	} else if(len >= 4 && len <= 16) {
		this.data.message = "名称格式正确";
		this.data.color = 'green';
		this.data.borderColor = 'green';
		this.data.code - 1;
	} else {
		this.data.message = "必填，长度为4~16个字符";
		this.data.color = 'red';
		this.data.borderColor = 'red'
	}

}
Validate.prototype.checkPassWord = function(str) {
	var len = this.checkLength();
	console.log(len);
	if(len === 0) {
		this.data.message = "密码不能为空";
		this.data.color = 'red';
		this.data.borderColor = 'red';
	} else if(len < 8) {
		this.data.message = "密码不能少于8位";
		this.data.color = 'red';
		this.data.borderColor = 'red';
	} else {
		this.data.message = "密码可用";
		this.data.color = 'green';
		this.data.borderColor = 'green';
		this.data.code = 1;
	}
}


var messageTip = ['必填，长度为4~16个字符', '请输入密码', '请重复输入密码', '请输入邮箱', '请输入手机号'];


var userName = new Validate('username', messageTip[0]);
var passWord = new Validate('password', messageTip[1]);
var rePassWord = new Validate('repassword', messageTip[2]);
var email = new Validate('email', messageTip[3]);
var cellphone = new Validate('cellphone', messageTip[4]);




