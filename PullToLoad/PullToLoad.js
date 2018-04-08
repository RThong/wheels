function PullToLoad(options){
	this.target = document.querySelector(options.el)
	this.loadingWrap = document.querySelector(options.loader)
	this.dist = options.dist
	this.isLoad = false
	this.callback = options.onLoad
	this.init()
}
PullToLoad.prototype.init = function(){
	this.loadingWrap.style.display = 'none'
	this.target.addEventListener('scroll', (e)=>{
		if(this.isLoad){
			return
		}
		if(this.target.clientHeight + this.target.scrollTop >= this.target.scrollHeight - this.dist){
			this.isLoad = true
			this.loadingWrap.style.display = 'block'
			this.callback()
		}
	})
}
PullToLoad.prototype.success = function(){
	this.target.appendChild(this.loadingWrap)
	this.loadingWrap.style.display = 'none'
	this.isLoad = false
}