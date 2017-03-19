// 冒泡排序实现
// var arr = [1, 27, 5, 15, 10, 9, 71, 85, 20];
var arr = [1, 5, 2, 6, 3];

function bubbleSort (arr) {
	var len = arr.length;

	for(var i=0; i<len; i++) {
		for(var j=i; j<len; j++) {
			var temp = 0; 
			if(arr[i] >= arr[j]) {   // 升序排列
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

console.log(bubbleSort(arr));