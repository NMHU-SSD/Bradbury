var infoOverlay= {
    name:"info-overlay",
    props:['id','spec','countdown','slides'],
    data:function(){
        return{
            player:null,
            first:true,
            end: true,
            count:0,
            setup:{
                autoplay: true,
				controls: true,
                inactivityTimeout: 5000,
                fluid:true,
                muted:false,
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
            videoData:null,
            timer:false,
            logo:null
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
        if(this.timer){
            //document.onmousedown = this.startTimer;
        }
    },
    methods:{
        //Caption Functions
        setCaptions:function(capts){
            for(var item in capts){
                var lang = {
                    kind:'captions',
                    srclang:capts[item].lang,
                    label:capts[item].label,
                    src:capts[item].file
                };
                this.player.addRemoteTextTrack(lang, false);
            }
        },
        resetCaptions:function(){
            var tracks = this.player.remoteTextTracks();
            var num = tracks.length;
            if(num>0){
                while(num--){
                    this.player.removeRemoteTextTrack(tracks[num]);
                }
            }
        },
        //Video Modal Functions
        changeVid:function(){
            this.resetCaptions();
            var vid=this.slides[this.count];
            this.player.src({type: 'video/mp4', src: vid.video});
            if(vid.captions){
                this.setCaptions(vid.captions);
            }
        },
        geturl:function(index){
            $('#carousel-'+this.id).carousel(index);
            this.jumpSlide(index);
            var ind = this.slides[index];
            this.player.src({type: 'video/mp4', src: ind.video});
            this.player.volume(0.5);
            if(ind.captions){
                this.setCaptions(ind.captions);
            }
        },
        seturl:function(obj, modal){
            this.stopVideo();
            this.$emit('seturl',{index:obj.video, ob:modal, caps:obj.captions});
        },
        getCover:function(logo){
            $('#carousel-'+this.id).carousel(0);
            this.logo = logo;
            this.jumpSlide(0);
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
        //Video Modal on-events
        stopVideo:function(){
            if(this.player!=null){
                this.player.pause();
                this.player.muted(false);
                if(this.player.isFullscreen()){
                   this.player.exitFullscreen();
                }
                this.resetCaptions();
            }
            this.$emit('stopvideo',this.id);
        },
        endOfVideo:function(){
            this.player.currentTime(0);
            $('#videoWindow .vjs-big-play-button').css('display', 'block');
            this.player.getChild('bigPlayButton').on('click', function() {
              this.player.play();
            })
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.stopVideo, this.countdown);
        },
        pausedVideo:function(){
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.stopVideo, this.countdown);
        },
        playingVideo:function(){
            clearTimeout(this.timeout);
            $('#videoWindow .vjs-big-play-button').css('display', 'none');
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
    watch:{
        slides:function(){
            if(this.slides.length > 1){
                this.end=false;
            }
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
                            <img src="assets/customs/R&D100logo-gold.svg" class="rd-ribbon">
                            <img :src="logo" class="rd-topic">
                            <div v-if="slide.tubie" class="tubie-container-right">
                                <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie" position="left" spec="con"
                                @seturl="seturl(slide.tubie,0)"/>
                            </div>
                        </div>
                        <div v-if="spec=='vid'" class="ribbon red row no-gutters whitetext title-font">
                            <div v-if="slide.tubie" class="col-3 col-sm-2 align-self-end tubie-container-left">
                                <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie" position="right" 
                                @seturl="seturl(slide.tubie,0)"/>
                            </div>
                            <img v-if="id=='modalVideo1'" src="assets/customs/where_weve_been.svg" class="vid-head col-2 align-self-center">
                            <img v-if="id=='modalVideo2'" src="assets/customs/where_were_headed.svg" class="vid-head col-2 align-self-center">
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