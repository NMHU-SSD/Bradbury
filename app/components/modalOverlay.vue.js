var modalOverlay= {
    name:"modal-overlay",
    props:['countdown', 'id','message'],
    data:function(){
        return{
            count:null,
            title: null,
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
            isEnded:false
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
        //VideoJS Captions
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
        geturl:function(video){
            this.player.src({type: 'video/mp4', src: video.link});
            this.player.volume(0.5);
            if(video.captions){
                this.setCaptions(video.captions);
            }
            this.title=video.videoTitle;
            this.currVid=video;
            if(this.nextVid==null && this.prevVid==null){
                $('#videoWindow .vjs-overlay-next').css('display', 'none');
                $('#videoWindow .vjs-overlay-prev').css('display', 'none');
            }
        },
        setVideos:function(videos){
            if(videos.prev){
                this.prevVid=videos.prev;
            }
            if(videos.next){
                this.nextVid=videos.next;
            }
            this.index=videos.index;
        },
        nextClick:function(){
            this.index+=1;
            this.$emit('getnext', this.index);
            this.prevVid= this.currVid;
            this.resetCaptions();
            this.geturl(this.nextVid);
            this.player.play();
        },
        prevClick:function(){
            this.index-=1;
            this.$emit('getprev', this.index);
            this.nextVid= this.currVid;
            this.resetCaptions();
            this.geturl(this.prevVid);
            this.player.play();
        },
        //Video Modal on-events
        stopVideo:function(){
            this.prevVid=null;
            this.nextVid=null;
            this.player.pause();
            this.player.muted(false);
            this.resetCaptions();
            this.$emit('stopvideo');
        },
        endOfVideo:function(){
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
        inactiveUser:function(){
            if(this.player!=null){
               this.player.exitFullscreen();
                this.stopVideo();
               }
            $('#modalVideo').modal('hide');
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
    `<div :id="id" class="modal fade" tabindex="-1" role="dialog" data-backdrop="true" @:displayModal="timer" @click.self="inactiveUser">
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
            <div v-show="isEnded" class="playlist-buttons next-button" @click="nextClick"></div>
            <div v-show="isEnded" class="playlist-buttons prev-button" @click="prevClick"></div>
          </div>
        </div>

      </div>
    </div>`
}