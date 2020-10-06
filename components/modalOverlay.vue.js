var modalOverlay= {
    name:"modal-overlay",
    props:['countdown', 'id','message'],
    data:function(){
        return{
            count:null,
            player:null,
            index:0,
            currVid:null,
            prevVid:null,
            nextVid:null,
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
            videoTimeout: null,
            source:false,
            isEnded:false
        }
    },
    mounted(){
        this.player= videojs(this.$refs.videoPlayer, this.setup, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });
        this.videoOverlay();
    },
    beforeDestroy(){
        if(this.player){
            this.player.dispose();
        }
    },
    methods:{
        //Timer Modal Functions
        setPurpose:function(){
            if(this.exitout){
                return 'true';
                this.reset();
            }else{
                return 'static';
            }
        },
        timer:function(){
            if(this.count > 0){
                setTimeout(()=> {
                    this.count -= 1;
                    this.timer();
                }, 1000);
            }
        },
        reset:function(){
            this.count = Math.floor(this.countdown / 1000);
        },
        //Video Modal Functions
        geturl:function(url){
            console.log(url);
            this.player.src({type: 'video/mp4', src: url});
            this.source=true;
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
            this.$emit('stopvideo',this.id);
            //console.log("video closed");
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
            this.videoTimeout = setTimeout(this.stopVideo, this.countdown);
        },
        pausedVideo:function(){
            //console.log('video paused');
            clearTimeout(this.videoTimeout);
            this.videoTimeout = setTimeout(this.stopVideo, this.countdown);
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
    `<div :id="id" class="modal fade" tabindex="-1" role="dialog" data-backdrop="true" @:displayModal="timer">
      <div class="modal-dialog modal-xl modal-dialog-centered vid" role="document">

        <div v-if="id=='modalTimer'" class="modal-content">
          <div v-if="message" class="modal-header d-block">
            <h5 class="modal-title">{{ message.header }}</h5>
          </div>
          <div v-if="message" class="modal-body">
            <p>{{ message.body }}{{ count }}</p>
          </div>
        </div>

        <div v-if="id=='modalVid'" class="modal-content">
          <div class="modal-body">
            <video id="videoWindow" ref="videoPlayer" preload="none" class="video-js vjs-big-play-centered web-video" @ended="endOfVideo" @pause="pausedVideo" @play="playingVideo">
            </video>
          </div>
        </div>

      </div>
    </div>`
}