//事件触发器
function EventHub(){
	this.events = {}
}
EventHub.prototype.on = function(eventName, fn){
	this.events[eventName] = fn
}
EventHub.prototype.trigger = function(eventName, ...rest){
	if(eventName in this.events){
		this.events[eventName].call(undefined, ...rest)
	}
}

//下拉刷新
function PullToRefresh(options){
	EventHub.call(this)
	this.target = document.querySelector(options.el)
	this.oldY = undefined
	this.dist = 0
	this.state = 'default'//初始状态  下拉状态   释放状态  加载状态
	this.refreshDist = options.refreshDist
	this.maxPullDist = options.maxPullDist
	this.pullText= options.pullText
	this.releaseText = options.releaseText
	this.refreshText = options.refreshText
	this.callback = options.onRefresh
	this.downWrap = null
	this.promptContent = null
	
	this.init()
}
//继承事件触发器
PullToRefresh.prototype = Object.create(EventHub.prototype)

PullToRefresh.prototype.init = function(){
	this.addDom()
	this.registerFn()
	this.bindEvent()
}

//添加下拉背景框
PullToRefresh.prototype.addDom = function(){
	this.downWrap = document.createElement("div")
	this.downWrap.className = 'scroll-down-wrap'
	this.downWrap.innerHTML = `<p class="scroll-down-text"></p>`	
	this.target.parentNode.insertBefore(this.downWrap, this.target)
	this.promptContent = document.querySelector('.scroll-down-text')
	this.promptContent.style.lineHeight = `${this.refreshDist}px`
}
//给不同状态绑定回调
PullToRefresh.prototype.registerFn = function(){
	this.on('loading', ()=>{
		console.log('现在触发loading')
		this.prompt(this.refreshText)
		this.downWrap.style.height = `${this.refreshDist}px`
		this.callback()			
	})
	this.on('dropdown', (dist)=>{
		console.log('现在触发dropdown')
		this.downWrap.classList.remove('release')		
		this.downWrap.style.height = `${this.dist}px`
		this.prompt(this.pullText)
	})
	this.on('dropup', ()=>{
		console.log('现在触发dropup')		
		this.downWrap.style.height = `0`
		this.trigger(this.state='default')
	})
}
//绑定touchmove  touchend
PullToRefresh.prototype.bindEvent = function(){
	this.target.addEventListener('touchstart', (e)=>{
		this.oldY = e.touches[0].pageY
		//touchmove放在外部  浏览器默认事件会触发
		this.target.addEventListener('touchmove', this.scrollHandle.bind(this))
	})
	//先解除touchmove 让浏览器默认scroll能够生效
	this.target.addEventListener('touchend', (e)=>{
		this.target.removeEventListener('touchmove', this.scrollHandle.bind(this))
		if(this.state === 'default'){
			return
		}
		this.downWrap.classList.add('release')

		if(this.state === 'loading'){
			this.trigger(this.state)

		}
		else{
			this.trigger(this.state='dropup')
		}
	})
}
//下拉提示信息
PullToRefresh.prototype.prompt = function(info){
	this.promptContent.textContent = info
}
//touchmove回调函数
PullToRefresh.prototype.scrollHandle = function(e){
	this.dist = e.touches[0].pageY - this.oldY
	
	//判断是否是顶部刷新
	if(this.dist <= 0 || window.pageYOffset > 0){
		return
	}
	//防止浏览器默认scroll
	e.preventDefault();
	if(this.dist > this.maxPullDist){
		return
	}
	this.trigger(this.state = 'dropdown', this.dist)

	if(this.dist >= this.refreshDist){
		this.state = 'loading'
		this.prompt(this.releaseText)
	}
}

PullToRefresh.prototype.success = function(){
	this.prompt('刷新成功')
	//成功提示			
	setTimeout(()=>{
		this.trigger(this.state='dropup')
	},500)
}

PullToRefresh.prototype.fail = function(){
	this.prompt('刷新失败')
	//成功提示			
	setTimeout(()=>{
		this.trigger(this.state='dropup')
	},500)
}