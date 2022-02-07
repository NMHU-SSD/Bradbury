//register components
Vue.component('carouselCom', carouselCom)
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
        tubie:"",
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
        this.resetTimer();
        
        //jump to section
        window.scrollTo({
            top: 1600, // scroll so that the element is at the top of the view
            behavior: 'smooth' // smooth scroll
        })
        
        //listener for scrollup
        document.querySelector('#scrollUp').addEventListener('click', function(){
            window.scrollTo({
                top: 3840, // scroll so that the element is at the top of the view
                behavior: 'smooth' // smooth scroll
            })
        })
        
    },
    updated: function(){
        this.listeners();
    },
    methods:{
        GetData: function(){
            fetch("data/WomenData.json",{
            	mode: 'cors'
            })
            .then(response => response.json())
            .then(data =>{
                this.womenComputingData = data.womenComputingData;
                this.buildingFutureData = data.buildingFutureData;
                this.inTheirWordsData = data.inTheirWordsData;
                this.timelineData = data.timelineData;
                this.timeData = data.timeData;
                this.tubie = data.tubie;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        //Timer modal functions
        listeners:function(){
            
            //prevent multitouch zoom in
//            document.addEventListener('touchmove', e => {
//			  if (e.touches.length > 1) {  
//			     e.preventDefault();
//			  }
//			}, {passive: false})
        },
			
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
        //video modal popups
        displayModal:function(){
            $('#'+'modalTimer').modal();
            this.$refs.timeModal.timer();
            setTimeout(function(){
                $('#'+'modalTimer').modal('hide')}, this.timeData.quitout);
            document.onmousedown = this.resetTimer;
        },
        videoModalClose:function(){
            this.active=true;
            if(this.stillActive){
                this.resetTimer();
            }
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
        //selection
        itemselect:function(item){
            if(item!=this.lastActive){
                try{
                    this.$refs[this.lastActive].reset();
                    var target = $('#'+this.lastActive);
                    $(target).css('animation', 'slidein 1s infinite');
                    setTimeout(function(){$(target).css('animation', 'none');},1000);
                }catch(e){
                    //console.log(item);
                }
                if(item=='timeline'){
                    this.active=false;
                    clearTimeout(this.t);
                    clearTimeout(this.afk);
                    //console.log("timer cancelled");
                }else{
                    this.active=true;
                }
                this.lastActive = item;
            }
        }
    }
})