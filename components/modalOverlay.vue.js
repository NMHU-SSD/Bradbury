var modalOverlay= {
    name:"modal-overlay",
    props:['countdown', 'id','message'],
    data:function(){
        return{
            count:null,
            player:null,
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
            captions:null
        }
    },
    mounted(){
        this.player= videojs(this.$refs.videoPlayer, this.setup, function onPlayerReady() {
            //console.log('onPlayerReady', this);
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
        geturl:function(url,capts){
            this.player.src({type: 'video/mp4', src: url});
            this.player.volume(0.5);
            if(capts!=null)
                this.captions = capts;
        },
        //Video Modal on-events
        stopVideo:function(){
            if(this.player!=null){
                this.player.pause();
                this.player.muted(false);
                if(this.player.isFullscreen()){
                   this.player.exitFullscreen();
                }
                this.captions = null;
                this.$emit('stopvideo',this.id);
            }
        },
        endOfVideo:function(){
            this.player.currentTime(0);
            $('#videoWindow .vjs-big-play-button').css('display', 'block');
            this.player.getChild('bigPlayButton').on('click', function() {
              this.player.play();
            })
            clearTimeout(this.videoTimeout);
            this.videoTimeout = setTimeout(this.stopVideo, this.countdown);
        },
        pausedVideo:function(){
            clearTimeout(this.videoTimeout);
            this.videoTimeout = setTimeout(this.stopVideo, this.countdown);
        },
        playingVideo:function(){
            clearTimeout(this.videoTimeout);
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
    template:
    `<div :id="id" class="modal fade" tabindex="-1" role="dialog" data-backdrop="true" @:displayModal="timer" @click.self="stopVideo">
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
            <!--track kind='captions' src='data/captions/Oceans_eng.vtt' srclang='en' label='English' /-->
            <template v-for="(caps, index) in captions">
                <track kind='captions' :src="caps.file" :srclang="caps.lang" :label="caps.label" />
            </template>
            </video>
          </div>
        </div>

      </div>
    </div>`
}