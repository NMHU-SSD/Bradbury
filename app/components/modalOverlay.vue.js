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
            videoTimeout: null
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
        //VideoJS captions
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
        geturl:function(url,capts){
            this.player.src({type: 'video/mp4', src: url});
            this.player.volume(0.5);
            if(capts!=null){
                this.setCaptions(capts);
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
            </video>
          </div>
        </div>

      </div>
    </div>`
}