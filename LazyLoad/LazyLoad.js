function LazyLoad(options){
	this.targetArr = Array.from(document.querySelectorAll('[data-lazy-src],[data-lazy-background]'))
	this.renderArr = []
	this.screenHeight = window.innerHeight
	
	this.delay = options.delay
	this.init()
	this.scrollLoad()
}
LazyLoad.prototype.init = function(){
	this.checkInScreen()
	this.renderImg()
}

LazyLoad.prototype.scrollLoad = function(){
	window.addEventListener('scroll', this.throttle(this.init.bind(this), this.delay))
}

LazyLoad.prototype.throttle = function(func){
	delay = this.delay || 250
	let timer = null;

	return function(){
		if(!timer){
			timer = setTimeout(function(){
				func()
				timer = null;
			},delay);
		}
	}
}

LazyLoad.prototype.checkInScreen = function(){
	this.renderArr.length = 0;
	for(let i = 0;i < this.targetArr.length;i++){
		if(this.targetArr[i] && this.targetArr[i].getBoundingClientRect().top <= this.screenHeight){
			this.renderArr.push(this.targetArr[i])
			this.targetArr[i] = null
		}
	}
}

LazyLoad.prototype.renderImg = function(){
	this.renderArr.map((item,index)=>{
		if(item.src){
			item.classList.add('show-img')
			item.src = item.dataset.lazySrc
		}
		else{
			item.style.backgroundImage = `url(${item.dataset.lazyBackground})`
		}
	})
}