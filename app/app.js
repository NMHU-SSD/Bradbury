//register components
Vue.component('titleBar', titleBar)
Vue.component('buildingFuture', buildingFuture)
Vue.component('womanComputing', womanComputing)
Vue.component('modalOverlay', modalOverlay)
Vue.component('timeLine', timeLine)
Vue.component('tubieOverlay', tubieOverlay)
Vue.component('slideshowComponent', slideshowComponent)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        womenComputingData:"",
        buildingFutureData:"",
        inTheirWordsData:"",
        timelineData:"",
        timeData:"",
        modalTimer:'modalTimer',
        modalVideo:'modalVideo',
        historyId:'carouselHistory',
        computeId:'carouselComputing',
        t: null,
        afk: null,
        lastActive: null,
        active:null,
        stillActive:null
    },
    mounted: function(){
        this.GetData();
        //this.resetTimer();
    },
    
    methods:{
        GetData: function(){
            fetch("data/WomenInComputingData.json",{
            	mode: 'cors'
            })
            .then(response => response.json())
            .then(data =>{
                this.womenComputingData = data.womenComputingData;
                this.buildingFutureData = data.buildingFutureData;
                this.inTheirWordsData = data.inTheirWordsData;
                this.timelineData = data.timelineData;
                this.timeData = data.timeData;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        //Timer functions
        resetTimer:function(){
            clearTimeout(this.t);
            clearTimeout(this.afk);
            if(this.active){
                this.t = setTimeout(this.toAlert, this.timeData.timeout);
                //console.log("timer set");
            }
            else if(this.active==null){
                this.active=true;
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
            //this.active=false;
            this.$refs[this.computeId].reset();
            this.$refs[this.historyId].reset();
        },
        //modal popup
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
            this.stillActive=info.active;
            this.$refs[this.modalVideo].geturl(info.video);
            $('#modalVideo').modal();
        },
        videoModalClose:function(){
            this.active=true;
            if(this.stillActive){
                this.resetTimer();
            }
        },
        //selection
        itemselect:function(item){
            if(item!=this.lastActive){
                try{
                    this.$refs[this.lastActive].reset();
                    var target = $('#'+this.lastActive);
                    $(target).css('animation', 'slidein 1s infinite');
                    setTimeout(function(){$(target).css('animation', 'none');},1000);
                }catch(e){
                    //console.log(e.message);
                }
                this.lastActive = item;
            }
        }
    }
})