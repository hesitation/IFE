function testInput () {
	var input = document.getElementById('username').value;
 	var re1 = /\w+/g;  // 匹配字符
 	var re2 = /[\u4e00-\u9fa5]/g;  // 匹配中文
 	var len = 0;  // 字符个数
 	
 	if(input == '') {
 		len = 0;
 	} else {
 		var str = input.match(re1).join('');
 		var chinese = input.match(re2);
 		if(chinese != null) {
 			chinese = chinese.join('');
	 		len = str.length + chinese.length * 2;
 		} else {
 			len = str.length;
 		}
 	}
 	console.log(len);

 	if(len == 0) {
 		document.getElementsByTagName('input')[0].style.borderColor = 'red';
 		document.getElementsByTagName('p')[0].style.color = 'red';
 		document.getElementsByTagName('p')[0].innerHTML = '名称不能为空';
 	}
 	else if(len >=4 && len <= 16) {
 		document.getElementsByTagName('input')[0].style.borderColor = 'green';
 		document.getElementsByTagName('p')[0].style.color = 'green';
 		document.getElementsByTagName('p')[0].innerHTML = '名称格式正确';
 	} else {
 		document.getElementsByTagName('input')[0].style.borderColor = 'red';
 		document.getElementsByTagName('p')[0].style.color = 'red';
 		document.getElementsByTagName('p')[0].innerHTML = '必填，长度为4~16个字符';
 	} 

}

document.getElementsByTagName('button')[0].addEventListener('click', testInput, false);	