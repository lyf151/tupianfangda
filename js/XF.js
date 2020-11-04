
function getStyle(obj) {
	return window.getComputedStyle ? window.getComputedStyle(obj, false) : obj.currentStyle;
}


//获取元素所有父结点，包括document，body，html
function getAllparents(obj) {
	var parents = [];
	if (obj) {
		(function getparent(obj) {
			if (obj.parentNode) {
				getparent(obj.parentNode);
				parents.push(obj.parentNode);
			}
		})(obj)
	}
	return parents;
}
//获取元素相对body的绝对left的值
function getAbsLfet(obj) {
	if (obj) {
		var absLeft = 0;
		var parents = getAllparents(obj);
		if(parents.length>3){
			for (var i = 3; i < parents.length; i++) {
				absLeft += parents[i].offsetLeft;
			}
		}
		return absLeft + obj.offsetLeft;
	}
}
//获取元素相对body的绝对top的值
function getAbsTop(obj) {
	if (obj) {
		var absTop = 0;
		var parents = getAllparents(obj);
		if(parents.length>3){
			for (var i = 3; i < parents.length; i++) {
				absTop += parents[i].offsetTop;
			}
		}
		return absTop + obj.offsetTop;
	}
}
/*
smallImg 小图框
selectArea 选择区域框
bigImg 显示大图框
scale 比例
*/

function enlarged(smallImg, selectArea, bigImg, scale) {
	
	//获取smallImg相对于body的绝对left,top的值
	var absLeft = getAbsLfet(smallImg);
	var absTop = getAbsTop(smallImg);
	smallImg.onmousemove = function(event) {
		event = event || window.event;
		//设置区域选择子元素位置（需要event.clientX，event.clientY（此为鼠标相对于浏览器的位置）减去父元素(小图div)位置相对于原点的距离，保证其位置相对于父元素计算），再减去子元素长宽的各一半，以让鼠标处于子元素的中心点
		selectArea.style.left = event.clientX - absLeft - parseInt(getStyle(inner).width) / 2 + "px";
		selectArea.style.top = event.clientY - absTop - parseInt(getStyle(inner).height) / 2 + "px";
		//当内部选择区域元素右下距离（相对于父元素(小图div)）超过父元素右下边框时将其最大移动距离设置为父元素的宽高减去子元素的宽高
		if (parseInt(selectArea.style.left) > (parseInt(getStyle(this).width) - parseInt(getStyle(selectArea).width))) {

			selectArea.style.left = parseInt(getStyle(this).width) - parseInt(getStyle(selectArea).width) + "px";
		}
		if (parseInt(selectArea.style.top) > (parseInt(getStyle(this).height) - parseInt(getStyle(selectArea).height))) {

			selectArea.style.top = parseInt(getStyle(this).height) - parseInt(getStyle(selectArea).height) + "px";
		}
		//当内部选择区域元素父元素左上距离为0时（相对父元素）将其设置为0
		if (parseInt(selectArea.style.left) < 0) {
			selectArea.style.left = 0 + "px";
		}
		if (parseInt(selectArea.style.top) < 0) {
			selectArea.style.top = 0 + "px";
		}
		//根据子元素（区域选择div）在父元素(小图div)中移动的位置显示大图片要显示的区域，移动距离要乘比值
		bigImg.style.backgroundPosition = -(parseInt(selectArea.style.left) * scale) + "px" + " " + (-parseInt(selectArea.style
			.top) * scale) + "px";
	}
}
