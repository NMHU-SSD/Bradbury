//register components
Vue.component('building-future', buildingFuture)
Vue.component('slides-component', slidesComponent)
Vue.component('tubie-overlay', tubieOverlay)
Vue.component('modal-overlay', modalOverlay)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        title: "",
        drive: "",
        sustainable: "",
        timeData:"",
        t: "",
        afk: null,
        active:false,
        showData:true,
        isLoaded: false

    },
    mounted: function(){
        this.GetData();

        //jump to section
        window.scrollTo({
            bottom: 3840, // scroll so that the element is at the top of the view
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
        this.resetTimer();
        this.$refs.style1.scrollpanel(0);
        this.$refs.dyk.scrollpanel(0);
        this.$refs.style2.scrollpanel(0);
        this.$refs.dyk2.scrollpanel(0);
    },
    destroyed: function(){
        window.removeEventListener('scroll',this.scrollHandle);
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
                this.isLoaded = true;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
         //Timer modal functions
        listeners:function(){
			//prevent multitouch zoom in
			document.addEventListener('touchmove', e => {
			  if (e.touches.length > 1) {  
			     e.preventDefault();
			  }
			}, {passive: false})
			
            $(".interest").on('click', function(){
                app.active= true;
                app.resetTimer();
                //console.log("reset timer", app.active);
            });
            window.addEventListener('scroll',this.scrollHandle);
            
            
            
            
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
        //video modal popups
        displayVideo:function(info){
            if(this.active){
                clearTimeout(this.t);
                clearTimeout(this.afk);
                this.active=false;
            }
            this.$refs.modalVideo.geturl(info);
            $('#modalVideo').modal();
        },
        videoModalClose:function(){
            this.active=true;
            this.resetTimer();
        },
        //Data Switch
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
        },
        //Scroll Event
        scrollHandle:function(el){
            // scroll top using ems
            var toVH = window.innerHeight/3 *2;
            var ele = $('.carousel-control-prev, .carousel-control-next');
            if(window.top.scrollY > toVH){
                ele.addClass("fixedPos");
            }else{
                ele.removeClass("fixedPos");
            }
            //console.log(window.top.scrollY);
        }
    }
})