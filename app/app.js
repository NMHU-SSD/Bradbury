//register components
Vue.component('womanComputing', womanComputing)
Vue.component('buildingFuture', buildingFuture)
Vue.component('theirWords', theirWords)
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
        modalTimer:'modalTimer',
        modalVideo:'modalVideo',
        historyId:'carouselHistory',
        computeId:'carouselComputing',
        timeout:30000,
        quitout:10000,
        t: null,
        afk: null,
    },
    mounted: function(){
        this.GetData();
        //this.resetTimer();
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        //Timer functions
        resetTimer:function(){
            clearTimeout(this.t);
            clearTimeout(this.afk);
            $('#carouselHistory').carousel('cycle');
            $('#carouselComputing').carousel('cycle');
            this.t = setTimeout(this.toAlert, this.timeout);
            document.onmousedown = this.resetTimer;
        },
        toAlert:function(){
            console.log("timer");
            document.onmousedown = this.resetTimer;
            this.$refs.timeModal.reset();
            this.displayModal();
            this.afk = setTimeout(this.toDefault, this.quitout);
        },
        toDefault:function(){
            console.log("defaulted");
            $('#'+this.historyId).carousel(0);
            $('#'+this.computeId).carousel(0);
            $('#'+this.historyId).carousel('pause');
            $('#'+this.computeId).carousel('pause');
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
            clearTimeout(this.t);
            clearTimeout(this.afk);
            $('#'+'modalVideo').modal();
            this.$refs.vidModal.geturl(url);
        },
        //selection
        itemtoggle:function(item){
            target = item.currentTarget.id;
            $('#'+target).toggleClass('open');
        }
    }
})