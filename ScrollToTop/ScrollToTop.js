function ScrollToTop(options){
	this.target = document.querySelector(options.el)
	this.scrollTop = 0
	this.isFirstShow = true
	this.hasClicked = false
	this.timer = undefined
	this.speed = options.speed || 'normal'
	this.distance = options.distance;
	this.bindEvent()
	this.init()
}
ScrollToTop.prototype.init = function(){
	window.addEventListener('scroll', ()=>{
		this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
		if(this.scrollTop > this.distance){

			this.target.classList.remove('hide')
			this.target.classList.add('show')
			this.isFirstShow = false
		}
		else{
			if(this.isFirstShow){
				return
			}
			this.target.classList.remove('show')
			this.target.classList.add('hide')
		}

	})
}
ScrollToTop.prototype.bindEvent = function(){
	this.target.addEventListener('click', ()=>{
		if(this.hasClicked){
			return
		}
		this.hasClicked = true
		let v;
		if(this.speed === 'normal'){
			v = this.scrollTop/40
		}
		else if(this.speed === 'fast'){
			v = this.scrollTop/20
		}
		else if(this.speed === 'slow'){
			v = this.scrollTop/60
		}

		this.timer = this.backTop(v)

	})
}
ScrollToTop.prototype.backTop = function(v){
	if(this.scrollTop>0){
		document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop - v
		this.timer = requestAnimationFrame(()=>{
			this.backTop(v)
		})
	}
	else{
		this.hasClicked = false
		cancelAnimationFrame(this.timer)
	}
}