!(function(){			
	let backToTop = document.querySelector('#backToTop');
	let scrollTop = 0,
	isFirstShow = true,
	hasClicked = false,
	timer = undefined;
	
	let ScrollToTop = {
		init(){
			window.addEventListener('scroll', function(e){
				scrollTop = document.body.scrollTop || document.documentElement.scrollTop
				if(scrollTop > 500){

					backToTop.classList.remove('hide')
					backToTop.classList.add('show')
					isFirstShow = false
				}
				else{
					if(isFirstShow){
						return
					}
					backToTop.classList.remove('show')
					backToTop.classList.add('hide')
				}

			})

			backToTop.addEventListener('click', function(){
				if(hasClicked){
					return;
				}
				hasClicked = true;
				let v = scrollTop/20
				timer = requestAnimationFrame(a)
				function a(){
					if(scrollTop>0){
						document.documentElement.scrollTop = document.body.scrollTop = scrollTop - v
						requestAnimationFrame(a)
					}
					else{

						hasClicked = false
						cancelAnimationFrame(timer)
					}
				}
			})
		}
	}
	window.ScrollToTop = ScrollToTop
})()

ScrollToTop.init()