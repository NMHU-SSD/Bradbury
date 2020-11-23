//register components
Vue.component('building-future', buildingFuture)
Vue.component('slides-component', slidesComponent)
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
    },
    updated: function(){
        this.listeners();
        this.resetTimer();
        this.$refs.style1.scrollpanel(0);
        this.$refs.dyk.scrollpanel(0);
        this.$refs.style2.scrollpanel(0);
        this.$refs.dyk2.scrollpanel(0);
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
        listeners:function(){
            $(".interest").on('click', function(){
                app.active= true;
                app.resetTimer();
                //console.log("reset timer", app.active);
            });
        },
        resetTimer:function(){
            clearTimeout(this.t);
            clearTimeout(this.afk);
            if(this.active){
                this.t = setTimeout(this.toAlert, this.timeData.timeout);
            }
            document.onmousedown = this.resetTimer;
        },
        toAlert:function(){
            this.$refs.timeModal.reset();
            this.displayModal();
            this.afk = setTimeout(this.toDefault, this.timeData.quitout);
        },
        toDefault:function(){
            $('#modalTimer').modal('hide');
            app.active = false;
            this.showData = true;
            this.$refs.top.reset();
            this.$refs.style1.reset();
            this.$refs.dyk.reset();
            this.$refs.style2.reset();
            this.$refs.dyk2.reset();
        },
        displayModal:function(){
            $('#modalTimer').modal();
            this.$refs.timeModal.timer();
            document.onmousedown = this.resetTimer;
        },
        displayVideo:function(info){
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            //this.stillActive=info.active;
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
        },
        switchData:function(){
            if(this.showData){
                this.$refs.style1.reset();
                this.$refs.dyk.reset();
            }
            else{
                this.$refs.style2.reset();
                this.$refs.dyk2.reset();
                setTimeout(function(){
                    app.active=false;
                    app.resetTimer();
                },1);
            }
            this.showData = !this.showData;
        },
        callBuddy:function(count, buddy){
            this.$refs[buddy].jumpSlide(count);
        }
    }
})