//register components
Vue.component('tubie-overlay', tubieOverlay)
Vue.component('modal-overlay', modalOverlay)
Vue.component('carousel-comp', carouselComp)
Vue.component('rd-comp', rdComp)
Vue.component('info-overlay', infoOverlay)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        timeData:"",
        sample:"",
        rd100:"",
        t: null,
        afk: null,
        active:null
    },
    mounted: function(){
        this.GetData();
        //this.resetTimer();
    },
    
    methods:{
        GetData: function(){
            fetch("data/Data.json",{
            	mode: 'cors'
            })
            .then(response => response.json())
            .then(data =>{
                this.sample = data.sample;
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
        },
        displayVideo:function(info){
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            //this.stillActive=info.active;
            //console.log(info);
            this.$refs.modalVideo.geturl(info);
            $('#modalVideo').modal();
        },
        displayCover:function(index){
            this.$refs.modalInfo.getCover(index);
            $('#modalInfo').modal();
        },
        //getter and setter videos
        passVids:function(videos){
            this.$refs[this.modalVideo].setVideos(videos);
        },
        getNextVid:function(index){
            this.$refs[this.historyId].setNext(index);
        },
        getPrevVid:function(index){
            this.$refs[this.historyId].setPrev(index);
        },
        //video modal popups
        videoModalClose:function(){
            this.active=true;
            /*if(this.stillActive){
                this.resetTimer();
            }*/
        },
        switchData:function(){
            if(this.firstData){
                this.$refs.style1.reset();
            }
            else{this.$refs.style2.reset();}
            this.firstData = !this.firstData;
            console.log(this.firstData);
        }
    }
})