var infoOverlay= {
    name:"info-overlay",
    props:['id','slides','tubie','spec','countdown'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null,
            videoData: null,
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
            videoTimeout: null,
            source:false,
            isEnded:false
        }
    },
    mounted(){
        if(this.spec=="vid"){
            this.player= videojs(this.$refs.videoPlayer, this.setup, function onPlayerReady() {
                console.log('onPlayerReady', this);
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
        getCover:function(index){
            //console.log(index);
            $('#carousel-'+this.id).carousel(index);
            this.jumpSlide(index);
        },
        getVideo:function(index){
            //console.log(index);
            $('#carousel-'+this.id).carousel(index);
            this.jumpSlide(index);
        },
        //carousel
        nextSlide:function(){
            this.count++;
            this.first=false;
            if(this.count==this.slides.length-1){
                this.end=true;
            }
        },
        prevSlide:function(){
            this.count--;
            this.end=false;
            if(this.count==0){
                this.first=true;
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
        },
        //Video Modal Functions
        geturl:function(video){
            console.log(video);
            this.player.src({type: 'video/mp4', src: video});
            this.source=true;
            //this.currVid=video;
            if(this.nextVid==null && this.prevVid==null){
                $('#videoWindow .vjs-overlay-next').css('display', 'none');
                $('#videoWindow .vjs-overlay-prev').css('display', 'none');
            }
        },
        //Video Modal on-events
        stopVideo:function(){
            this.prevVid=null;
            this.nextVid=null;
            this.player.pause();
            this.player.src('');
            this.player.muted(false);
            this.source=false;
            //this.$emit('stopvideo');
            //console.log("video closed");
        },
        inactiveUser:function(){
            this.stopVideo();
            //$('#'+this.id).modal('hide');
        },
        endOfVideo:function(){
            //console.log('video ended');
            if(this.nextVid!=null){
                this.isEnded=true;
            }
            this.player.currentTime(0);
            $('#videoWindow .vjs-big-play-button').css('display', 'block');
            this.player.getChild('bigPlayButton').on('click', function() {
              this.player.play();
            })
            if(this.nextVid!=null){
                $('#videoWindow .vjs-overlay-next').css('display', 'block');
                $('#videoWindow .vjs-overlay-prev').css('display', 'block');
            }
            clearTimeout(this.videoTimeout);
            this.videoTimeout = setTimeout(this.inactiveUser, this.countdown);
        },
        pausedVideo:function(){
            //console.log('video paused');
            clearTimeout(this.videoTimeout);
            this.videoTimeout = setTimeout(this.inactiveUser, this.countdown);
        },
        playingVideo:function(){
            clearTimeout(this.videoTimeout);
            $('#videoWindow .vjs-big-play-button').css('display', 'none');
            if(this.isEnded){
                this.isEnded=false;
            }
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
                },{
                    content:'Next',
                    showBackground: true,
                    start: 'ended',
                    end: 'play',
                    align: 'right',
                    class:'vjs-overlay-next'
                },{
                    content:'Prev',
                    showBackground: true,
                    start: 'ended',
                    end: 'play',
                    align: 'left',
                    class:'vjs-overlay-prev'
                }]
              });
        }
    },
    template:
    `<div :id="id" class="modal fade" tabindex="-1" role="dialog" data-backdrop=true>
<div :class="['modal-dialog modal-xl modal-dialog-centered', spec]" role="document">
<div class="modal-content">
 <div class="modal-body">
    <video v-if="spec=='vid'" id="videoWindow" ref="videoPlayer" preload="none" 
                        class="video-js vjs-big-play-centered web-video"
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
                            <div class="tubie-container">
                                <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie" @seturl="seturl"/>
                            </div>
                        </div>
                        <div v-if="spec=='vid'" class="ribbon red row">
                            <div class="col tubie-container-left">
                                <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie" @seturl="seturl"/>
                            </div>
                            <h3 class="col-3 offset-2">where we've been</h3>
                            <h2 class="col-3 ml-auto">A Long History of Supercomputing</h2>
                        </div>
                        <div class="banner green"></div>
                    </div>
            <!--- End layout ---->
                </div>          
            </template>
        </div>
        <ol class="carousel-indicators">
            <li v-for="(slide, index) in slides" :data-target="['#' + 'carousel-'+id]" :data-slide-to="index" :class="" @click="jumpSlide(index)"></li>
        </ol>
        <a v-show="!first" class="carousel-control-prev" :href="['#' + 'carousel-'+id]" role="button" data-slide="prev" @click="prevSlide">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a v-show="!end" class="carousel-control-next" :href="['#' + 'carousel-'+id]" role="button" data-slide="next" @click="nextSlide">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
</div>
</div>
</div>`
}