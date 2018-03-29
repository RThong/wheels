function ProgressBar(){
	this.target = document.querySelector('#progressBar')
	this.offsetHeight = document.body.offsetHeight
	this.innerHeight = window.innerHeight
	this.init()
}
ProgressBar.prototype.init = function(){
	window.addEventListener('scroll', ()=>{			
		let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
		this.target.style.width = '' + (scrollTop/(this.offsetHeight-this.innerHeight))*100+'%'	
	})
}