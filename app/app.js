//register components
Vue.component('tubie-overlay', tubieOverlay)
Vue.component('modal-overlay', modalOverlay)
Vue.component('rd-comp', rdComp)
Vue.component('trans-comp',transComp)
Vue.component('info-overlay', infoOverlay)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        timeData:"",
        comp:"",
        rd100:"",
        pageTubie: "",
        t: null,
        afk: null,
        active:false,
        open:""
    },
    mounted: function(){
        this.GetData();
    },
    updated: function(){
        this.listeners();
    },
    methods:{
        GetData: function(){
            fetch("data/data.json",{
            	mode: 'cors'
            })
            .then(response => response.json())
            .then(data =>{
                this.timeData = data.timeData;
                this.pageTubie = data.pageTubie;
                this.comp = data.comp;
                this.rd100=data.rd100;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
         //Timer modal functions
        listeners:function(){
			//prevent multitouch zoom in
			document.addEventListener('touchmove', e => {
			  if (e.touches.length > 1) {  
			     e.preventDefault();
			  }
			}, {passive: false})
        },
        resetTimer:function(){
            clearTimeout(this.t);
            clearTimeout(this.afk);
            if(this.active){
                this.t = setTimeout(this.toAlert, this.timeData.timeout);
            }
            document.onmousedown = this.resetTimer;
        },
        toAlert:function(){
            document.onmousedown = this.resetTimer;
            this.$refs.timeModal.reset();
            this.displayModal();
            this.afk = setTimeout(this.toDefault, this.timeData.quitout);
        },
        toDefault:function(){
            this.active=false;
            clearTimeout(this.t);
            clearTimeout(this.afk);
            $('#'+this.open).modal('hide');
        },
        displayModal:function(){
            $('#modalTimer').modal();
            this.$refs.timeModal.timer();
            setTimeout(function(){
                $('#modalTimer').modal('hide')}, this.timeData.quitout);
            document.onmousedown = this.resetTimer;
        },
        //video modal popups
        videoModalClose:function(id){
            this.active=false;
            $('#'+id).modal('hide');
        },
        displayCover:function(info){
            this.active=true;
            this.open = info.name;
            this.$refs[info.name].getCover(info.logo);
            $('#'+info.name).modal();
            this.resetTimer();
        },
        displayTech:function(data){ //displayVideo
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            var name='';
            if(data.ob==0){
                this.$refs.modalVid.geturl(data.index,data.caps);
                $('#modalVid').modal();
                return
            }else if(data.ob ==1)
                name='modalVideo1';
            else if(data.ob ==2)
                name='modalVideo2';
            this.$refs[name].geturl(data.index);
            $('#'+name).modal();
        }
    }
})