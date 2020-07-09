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
        timeout:30000,
        quitout:10000,
        t: null,
        afk: null,
        lastActive: null,
        active:false
    },
    mounted: function(){
        this.GetData();
        //this.SetData();
        this.resetTimer();
        
    },
    
    methods:{
        GetData: function(){
            fetch("womenInComputingData.json")
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
        SetData:function(){
            this.timeout = this.timeData.timeout;
            this.quitout = this.timeData.quitout;
        },
        //Timer functions
        resetTimer:function(){
            clearTimeout(this.t);
            clearTimeout(this.afk);
            console.log(this.active);
            if(this.active){
                this.t = setTimeout(this.toAlert, this.timeout);
            }else{
                this.active=true;
            }
            document.onmousedown = this.resetTimer;
        },
        toAlert:function(){
            document.onmousedown = this.resetTimer;
            this.$refs.timeModal.reset();
            this.displayModal();
            this.afk = setTimeout(this.toDefault, this.quitout);
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
                $('#'+'modalTimer').modal('hide')}, this.quitout);
            document.onmousedown = this.resetTimer;
            
        },
        displayVideo:function(url){
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            $('#modalVideo').modal();
            this.$refs[this.modalVideo].geturl(url);
        },
        //selection
        itemselect:function(item){
            if(item!=this.lastActive){
                try{
                    //close last carousel
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