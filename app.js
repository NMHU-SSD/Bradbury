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
        t: null,
        afk: null,
        active:false
    },
    mounted: function(){
        this.GetData();
    },
    
    methods:{
        GetData: function(){
            fetch("data/Data.json",{
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
        resetTimer:function(){
            clearTimeout(this.t);
            clearTimeout(this.afk);
            if(this.active){
                this.t = setTimeout(this.toAlert, this.timeData.timeout);
                console.log("timer set");
            }
            document.onmousedown = this.resetTimer;
            console.log(this.active);
        },
        toAlert:function(){
            console.log("toAlert");
            document.onmousedown = this.resetTimer;
            this.$refs.timeModal.reset();
            this.displayModal();
            this.afk = setTimeout(this.toDefault, this.timeData.quitout);
        },
        toDefault:function(){
            this.active=false;
            clearTimeout(this.t);
            clearTimeout(this.afk);
            console.log("toDefault");
            $('#modalInfo').modal('hide');
        },
        displayModal:function(){
            $('#modalTimer').modal();
            this.$refs.timeModal.timer();
            setTimeout(function(){
                $('#modalTimer').modal('hide')}, this.timeData.quitout);
            document.onmousedown = this.resetTimer;
        },
        displayVideo:function(info){
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            //console.log(info);
            this.$refs.modalVid.geturl(info);
            $('#modalVid').modal();
        },
        displayCover:function(info){
            this.active=true;
            this.$refs[info.name].getCover(info.logo);
            $('#'+info.name).modal();
            this.resetTimer();
            //console.log(name);
        },
        displayTech:function(data){
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            if(data.ob ==1){
                this.$refs.modalVideo1.geturl(data.index);
                $('#modalVideo1').modal();
            }else if(data.ob ==2){
                this.$refs.modalVideo2.geturl(data.index);
                $('#modalVideo2').modal();
            }else if(data.ob==0){
                console.log("modalVid");
                this.$refs.modalVid.geturl(data.index);
                $('#modalVid').modal();
            }
        },
        //video modal popups
        videoModalClose:function(id){
            this.active=false;
            $('#'+id).modal('hide');
            console.log(this.active);
        }
    }
})