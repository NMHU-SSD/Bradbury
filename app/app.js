//register components
Vue.component('womanComputing', womanComputing)
Vue.component('buildingFuture', buildingFuture)
Vue.component('theirWords', theirWords)
Vue.component('modalOverlay', modalOverlay)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        womenComputingData:"",
        buildingFutureData:"",
        inTheirWordsData:"",
        slideSpeed:40000,
        timeout:7000,
        quitout:3000,
        countdown: 3,
        t: null,
        afk: null,
    },
    mounted: function(){
        this.GetData();
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
            $('#modalTemp').modal();
            this.$refs.modal.timer();
            setTimeout(function(){$('#modalTemp').modal('hide')}, this.quitout);
            document.onmousedown = this.resetTimer;
        }
        //selection
    }
})