!(function(){
	let progressBar = document.querySelector('#progressBar'),
			offsetHeight = document.body.offsetHeight,
			innerHeight = window.innerHeight
	let ProgressBar = {
		init(){
			window.addEventListener('scroll', function(){			
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
				progressBar.style.width = '' + (scrollTop/(offsetHeight-innerHeight))*100+'%'	
			})
		}
	}
	window.ProgressBar = ProgressBar
})()