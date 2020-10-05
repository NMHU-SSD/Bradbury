var infoOverlay= {
    name:"info-overlay",
    props:['id','spec','countdown','slides'],
    data:function(){
        return{
            player:null,
            first:true,
            end: false,
            count:0,
            setup:{
                autoplay: true,
				controls: true,
                inactivityTimeout: 5000,
                fluid:true,
                muted:true,
                controlBar: {
                    progressControl: {
                      seekBar: true
                    },
                    volumePanel: true,
                    fullscreenToggle: true,
                    pictureInPictureToggle: false,
                    playbackRateMenuButton: false,
                    captionsButton: false,
                    chaptersButton: false,            
                    subtitlesButton: false,
                  }
            },
            timeout: null,
            source:false,
            videoData:null
        }
    },
    mounted(){
        if(this.spec=="vid"){
            this.player= videojs(this.$refs.videoPlayer, this.setup, function onPlayerReady() {
                //console.log('onPlayerReady', this);
            });
            this.videoOverlay();  
        }
    },
    beforeDestroy(){
        if(this.player){
            this.player.dispose();
        }
    },
    methods:{
        seturl:function(){
            $('#'+this.id).modal('hide');
            this.$emit('seturl');
        },
        startTimer:function(){
            console.log("covers timer");
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.stopVideo, this.countdown);
            //document.onmousedown = this.startTimer;
        },
        getCover:function(index){
            $('#carousel-'+this.id).carousel(index);
            this.jumpSlide(index);
            this.startTimer();
        },
        //carousel
        nextSlide:function(){
            this.count++;
            this.first=false;
            if(this.count==this.slides.length-1){
                this.end=true;
            }
            if(this.player != null){//video
                this.changeVid();
            }
        },
        prevSlide:function(){
            this.count--;
            this.end=false;
            if(this.count==0){
                this.first=true;
            }
            if(this.player != null){//video
                this.changeVid();
            }
        },
        jumpSlide:function(index){
            this.count=index;
            if(index==0){
                this.first=true;
                this.end=false;
            }else if(index==this.slides.length-1){
                this.end=true;
                this.first=false;
            }else{
                this.end=false;
                this.first=false;
            }
            if(this.player != null){//video
                this.changeVid();
            }
        },
        //Video Modal Functions
        changeVid:function(){
            vid=this.slides[this.count];
            this.player.src({type: 'video/mp4', src: vid.video});
        },
        geturl:function(index){
            //console.log(this.slides);
            $('#carousel-'+this.id).carousel(index);
            this.jumpSlide(index);
            ind = this.slides[index];
            this.player.src({type: 'video/mp4', src: ind.video});
            this.source=true;
        },
        //Video Modal on-events
        stopVideo:function(){
            if(this.player!=null){
                this.player.pause();
                this.player.src('');
                this.player.muted(false);
            }
            this.source=false;
            this.$emit('stopvideo',this.id);
            //$('#'+this.id).modal('hide');
            console.log("video closed");
        },
        endOfVideo:function(){
            //console.log('video ended');
            this.player.currentTime(0);
            $('#videoWindow .vjs-big-play-button').css('display', 'block');
            this.player.getChild('bigPlayButton').on('click', function() {
              this.player.play();
            })
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.stopVideo, this.countdown);
        },
        pausedVideo:function(){
            //console.log('video paused');
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.stopVideo, this.countdown);
        },
        playingVideo:function(){
            clearTimeout(this.timeout);
            $('#videoWindow .vjs-big-play-button').css('display', 'none');
            //console.log("playing");
        },
        //Video JS Overlay Plugin
        videoOverlay:function(){
            this.player.overlay({
                debug: false,
                overlays: [{
                  content: '',
                  showBackground: false,
                  start: 'ended',
                  end: 'play',
                  align: 'top-center'
                }]
              });
        }
    },
    template:
    `<div :id="id" class="modal fade" tabindex="-1" role="dialog" data-backdrop=true @click.self="stopVideo">
<div :class="['modal-dialog modal-xl modal-dialog-centered', spec]" role="document">
<div class="modal-content">
 <div class="modal-body">
    <video v-if="spec=='vid'" id="videoWindow" ref="videoPlayer" preload="none"
                        class="video-js vjs-fluid vjs-big-play-centered web-video"
                        @ended="endOfVideo" @pause="pausedVideo" @play="playingVideo"/>
    <div :id="'carousel-'+id" class="carousel" data-wrap="false" data-interval="false">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
            <!--- Base Layout Appearence --->
                    <div v-if="spec=='info'" :class="'main-'+spec">
                        <img :src="slide.img" class="page-cover">
                    </div>
                    <div class="main-footer">
                        <div v-if="spec=='info'" class="ribbon red">
                            <img :src="slide.logo">
                            <div class="tubie-container-right">
                                <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie" position="left" @seturl="seturl"/>
                            </div>
                        </div>
                        <div v-if="spec=='vid'" class="ribbon red row whitetext title-font">
                            <div class="col tubie-container-left">
                                <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie" position="right" @seturl="seturl"/>
                            </div>
                            <h3 class="col-2 offset-2 align-self-center">where we've been</h3>
                            <h2 class="col ml-auto">{{ slide.title }}</h2>
                        </div>
                        <div class="banner green"></div>
                    </div>
            <!--- End layout ---->
                </div>          
            </template>
        </div>
        <ol class="carousel-indicators">
            <li v-for="(slide, index) in slides" :data-target="['#' + 'carousel-'+id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')" @click="jumpSlide(index)"></li>
        </ol>
        <a v-show="!first" :class="'carousel-control-prev control-'+spec" :href="['#' + 'carousel-'+id]" role="button" data-slide="prev" @click="prevSlide">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a v-show="!end" :class="'carousel-control-next control-'+spec" :href="['#' + 'carousel-'+id]" role="button" data-slide="next" @click="nextSlide">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
</div>
</div>
</div>`
}