var modalOverlay= {
    name:"modal-overlay",
    props:['countdown', 'id', 'exitout','message'],
    data:function(){
        return{
            count:null,
            title: null,
            player:null,
            source:false,
            setup:{
                autoplay: true,
				controls: true,
                inactivityTimeout: 5000,
                fluid:true,
                controlBar: {
                    progressControl: {
                      seekBar: true
                    },
                    volumePanel: true,
                    fullscreenToggle: false,
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
        geturl:function(video){
            this.player.src({type: video.type, src: video.link});
            this.source=true;
            this.title=video.videoTitle;
        },
        stopVideo:function(){
            this.player.pause();
            this.player.src('');
            this.source=false;
            this.$emit('stopvideo');
            //console.log("video closed");
        },
        endOfVideo:function(){
            //console.log('video ended');
            this.player.currentTime(0);
            $('#videoWindow .vjs-big-play-button').css('display', 'block');
            this.player.getChild('bigPlayButton').on('click', function() {
              this.player.play();
            })
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
            //console.log("playing");
        },
        inactiveUser:function(){
            this.stopVideo();
            $('#modalVideo').modal('hide');
        },
        videoOverlay:function(){
            this.player.overlay({
                debug: false,
                overlays: [{
                  content: 'Replay',
                  showBackground: false,
                  start: 'ended',
                  end: 'play',
                  align: 'top-center'
                }]
              });
        }
    },
    template:
    `<div :id="id" class="modal fade" tabindex="-1" role="dialog" :data-backdrop="(exitout=='true' ? 'true' : 'static')" @:displayModal="timer">
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">

        <div v-if="id=='modalTimer'" class="modal-content timer">
          <div v-if="message" class="modal-header d-block">
            <h5 class="modal-title">{{ message.header }}</h5>
          </div>
          <div v-if="message" class="modal-body">
            <p>{{ message.body }}{{ count }}</p>
          </div>
        </div>

        <div v-if="id=='modalVideo'" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button @click="stopVideo" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <video id="videoWindow" ref="videoPlayer" preload="none" class="video-js vjs-big-play-centered web-video" @ended="endOfVideo" @pause="pausedVideo" @play="playingVideo">
            </video>
          </div>
        </div>

      </div>
    </div>`
}