//register components
Vue.component('womanComputing', womanComputing)
Vue.component('buildingFuture', buildingFuture)
Vue.component('theirWords', theirWords)
Vue.component('modalOverlay', modalOverlay)
Vue.component('timeLine', timeLine)
Vue.component('tubieOverlay', tubieOverlay)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        womenComputingData:"",
        buildingFutureData:"",
        inTheirWordsData:"",
        modalTimer:'modalTimer',
        modalVideo:'modalVideo',
        slideSpeed:2000,
        timeout:7000,
        quitout:20000,
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
            $('#carouselHistory').carousel(0);
            $('#carouselComputing').carousel(0);
            $('#carouselHistory').carousel('pause');
            $('#carouselComputing').carousel('pause');
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
        }
        //selection
    }
})