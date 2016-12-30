 var toast = function(){
	var toast = Vue.extend(require('./index.vue'));
	var toastBox = null;
	Vue.prototype.$toast = (message,durtime = 2) => {

		if (toastBox && toastBox.$el!==null) {
            document.body.removeChild(toastBox.$el)
        };

		toastBox = new toast({
			el: document.createElement('div'),
			data(){
				return {
					msg: message,
					time: durtime,
					animation: {
						'animation-duration' : '',
						'-webkit-animation-duration' : '',
						'animation-name': 'toastTran',
						'-webkit-animation-name': 'toastTran',
						'animation-timing-function': 'linear',
						'-webkit-animation-timing-function': 'linear',
						'animation-fill-mode': 'backwards',
						'-webkit-animation-fill-mode': 'backwards',
					}
				}
			}
		})
		document.body.appendChild(toastBox.$el);
		
	}
}
// if(window.Vue){
// 	Vue.use(toast);
// }

module.exports = toast;