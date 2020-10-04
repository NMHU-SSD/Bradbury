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
        active:null
    },
    mounted: function(){
        this.GetData();
        this.resetTimer();
    },
    
    methods:{
        GetData: function(){
            fetch("data/Data.json",{
            	mode: 'cors'
            })
            .then(response => response.json())
            .then(data =>{
                this.comp = data.comp;
                this.timeData = data.timeData;
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
            else if(this.active==null){
                this.active=true;
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
            //this.active=false;
            console.log("toDefault");
            //this.$refs[this.computeId].reset();
            //this.$refs[this.historyId].reset();
        },
        displayModal:function(){
            $('#'+'modalTimer').modal();
            this.$refs.timeModal.timer();
            setTimeout(function(){
                $('#'+'modalTimer').modal('hide')}, this.timeData.quitout);
            document.onmousedown = this.resetTimer;
            /*
            $(document).on('show.bs.modal', '.modal', function (event) {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function() {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });
        */
        },
        displayVideo:function(info){
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            //this.stillActive=info.active;
            //console.log(info);
            this.$refs.modalVid.geturl(info);
            $('#modalVid').modal();
        },
        displayCover:function(index){
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            this.$refs.modalInfo.getCover(index);
            $('#modalInfo').modal();
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
            }
            //console.log("app ", data);
        },
        //video modal popups
        videoModalClose:function(){
            this.active=true;
            console.log(this.active);
        }
    }
})