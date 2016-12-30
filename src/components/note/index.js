
var note = function(){
	var note = Vue.extend(require('./index.vue'));
	var noteBox = null;

	Vue.prototype.$note = (data) => {
		let {title,msg,cancel,confirm,cancelCb,confirmCb} = data;
		console.log(title,msg,cancel,confirm,cancelCb,confirmCb);
		noteBox = new note({
			el:document.createElement('div'),
			data(){
				return{
					title:title,
					msg:msg,
					cancel:cancel,
					confirm:confirm,
					cancelCb:cancelCb,
					confirmCb:confirmCb
				}
			},
			methods:{
				cancelBtn:function(cb){
					if(!cb){
						document.body.removeChild(noteBox.$el);
					}else{
						cb();
					}
				},
				confirmBtn:function(cb){
					if(!cb){
						document.body.removeChild(noteBox.$el);
					}else{
						cb();
					}
				}
			}
		});

		document.body.appendChild(noteBox.$el);
	};
}

if(window.Vue){
	Vue.use(note);
}

module.exports = note;