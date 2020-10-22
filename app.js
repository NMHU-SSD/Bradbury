//register components
Vue.component('building-future', buildingFuture)
Vue.component('slideshow-component', slideshowComponent)
Vue.component('tubie-overlay', tubieOverlay)
Vue.component('modal-overlay', modalOverlay)


//Vue
var app = new Vue({
    el: '#app',
    data:{
        title:"",
        drive:"",
        sustainable:"",
        timeData:"",
        t: null,
        afk: null,
        active:null,
        showData:true
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
                this.timeData = data.timeData;
                this.title = data.title;
                this.drive = data.drive;
                this.sustainable = data.sustainable;
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
            this.showData = true;
            this.$refs.top.reset();
            this.$refs.style1.reset();
            this.$refs.dyk.reset();
            this.$refs.style2.reset();
            this.$refs.dyk2.reset();
            console.log("toDefault");
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
        //getter and setter videos
        passVids:function(videos){
            this.$refs[this.modalVideo].setVideos(videos);
        },
        //video modal popups
        videoModalClose:function(){
            this.active=true;
            this.resetTimer();
            /*if(this.stillActive){
                this.resetTimer();
            }*/
        },
        switchData:function(){
            if(this.showData){
                this.$refs.style1.reset();
                this.$refs.dyk.reset();
            }
            else{
                this.$refs.style2.reset();
                this.$refs.dyk2.reset();
            }
            this.showData = !this.showData;
            //console.log(this.showData);
        }
    }
})