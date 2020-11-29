var buildingFuture= {
    name: "building-future",
    props: ['id', 'slides', 'header', 'speed', 'videosdata','tubie'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null,
            videoData: null,
            splash: true,
            first:true,
            end: false,
            count:0,
            lastScroll:null,
            line:null,
            tutorial:null
        }
    },
    methods:{
        //interactions
        reset:function(){
            this.splash=true;
            this.first=true;
            this.end=false;
            this.count=0;
            this.toTop();
        },
        selected:function(){
            this.splash=false;
            this.$emit('selected', this.id);
        },
        //video handles
        seturl:function(obj){
            this.$emit('seturl', {'video':obj, 'active':true});
        },
        setNext:function(currIndex){
            let nextIndex=currIndex;
            if(currIndex==this.videosdata.videos.length){
                nextIndex=0;
                //console.log("current video playing is from index: "+nextIndex);
            }
            //console.log("next video is from index: "+nextIndex);
            this.$emit('othervids', {'next':this.videosdata.videos[nextIndex], 'index':nextIndex});
        },
        setPrev:function(currIndex){
            let prevIndex=currIndex;
            if(currIndex<0){
                prevIndex=this.videosdata.videos.length-1;
                //console.log("changed to: "+prevIndex);
            }
            //console.log("video sent from index: "+prevIndex);
            this.$emit('othervids', {'prev':this.videosdata.videos[prevIndex], 'index':prevIndex});
        },
        otherVids:function(index){
            prevVid=null;
            nextVid=null;
            if(index == 0){
                const last=this.videosdata.videos.length-1;
                prevVid=this.videosdata.videos[last];
                nextVid=this.videosdata.videos[1];
            }
            else if(index == this.videosdata.videos.length-1){
                prevVid=this.videosdata.videos[index-1];
                nextVid=this.videosdata.videos[0];
            }else{
                prevVid=this.videosdata.videos[index-1];
                nextVid=this.videosdata.videos[index+1];
            }
            this.$emit('othervids', {'prev':prevVid, 'next':nextVid, 'index':index});
        },
        //carousel actions
        nextSlide:function(){
            this.count++;
            this.first=false;
            if(this.count==this.infoSlides.length-1){
                this.end=true;
            }
            //this.scrollpanel(this.count);
            this.toTop();
        },
        prevSlide:function(){
            this.count--;
            this.end=false;
            if(this.count==0){
                this.first=true;
            }
            //this.scrollpanel(this.count);
            this.toTop();
        },
        jumpSlide:function(index){
            this.count=index;
            if(index==0){
                this.first=true;
                this.end=false;
            }else if(index==this.infoSlides.length-1){
                this.end=true;
                this.first=false;
            }else{
                this.end=false;
                this.first=false;
            }
            //this.scrollpanel(this.count);
            this.toTop();
        },
        //scroll actions
        handleScroll: function(el) {
            this.lastScroll = el.srcElement.id;
        },
        scrollpanel:function(index){
            var divId = $('#text'+this.id+index);
            if((divId.offsetHeight + divId.scrollTop) != divId.scrollHeight){
                $(divId).addClass("shadow-scroll");
            }
            //console.log(divId);
        },
        toTop:function(){
            if(this.lastScroll != null){
                let scrollDiv = document.getElementById(this.lastScroll);
                scrollDiv.scrollTop=0;
            }
        },
        //splash screen
        imgPosition:function(position){
            if(position != undefined){
                return "object-position: "+position;
            }else{
                return "";
            }
        },
        changeLine:function(){
            var rand = Math.floor(Math.random()*this.tubie.lines.length);
            this.line = this.tubie.lines[rand];
        },
        //tubie dialogue
        perSlideLines:function(slide){
            if(this.tubie.active=="yes"){
                return this.line;
            }else{
                return slide.tubie;
            }
        }
    },
    watch:{
        slides:function(){
            if(this.slides!=null){
                this.slideImages = this.slides.slideShow;
                this.infoSlides = this.slides.slides;
            }
        },
        tubie:function(){
            if(this.tubie!=null){
                this.changeLine();
                this.tutorial = this.tubie.tutorial[1];
            }
        },
        videosdata:function(){
            if(this.videosdata !=null){
                this.videoData = this.videosdata;
            }
        }
    },
    template:
    `
    <div :id="id">
    <div v-show="splash" class="tubie-splash-right tubie-splash" @focusout="changeLine()">
        <tubie-overlay :id="'tubie-'+id" :display=tutorial />
    </div>
    <div class="screen" @click="selected()">
        <a :data-target="['#' + 'carousel-'+id]" data-slide-to="0" :href="['#' + 'carousel-'+id]">
            <div v-show="splash" class="row no-gutters">
                <slideshow-component :id="'slide-'+id" :images="slideImages" :speed="speed" :header="header"/>
            </div>
        </a>

        <div v-show="!splash" :id="'carousel-'+id" class="carousel" data-wrap="false" data-interval="false">
            <div class="carousel-inner gradient-green">
                <template v-for="(slide, index) in infoSlides">
                    <div :class="['carousel-item', (index==0 ? 'active' : '')]" >

                        <!--- Slides Layout Appearence --->
                        <div :class="['row no-gutters align-items-start',(slide.videoSlide ?'':'row-full')]">
                            <div v-if="slide.media" class="col-12 col-sm-4 red pic-holder">
                                <div class="img-main-large">
                                    <div class="circle-wrap img-shadow">
                                        <img :src="slide.media" :style="imgPosition(slide.position)" :alt="slide.alt">
                                    </div>
                                </div>
                            </div>

                            <div :id="'text'+id+index" :class="['col', (slide.media ? 'side-widget offset-2' : 'words-holder pt-sm-5')]" @scroll="handleScroll">
                                  <p v-if="slide.body" class="content-body content-pad">{{ slide.body }}</p>
                        <!--- In Their Words----->
                                <div v-if="slide.videoSlide" class="words-holder container-fluid mr-md-5 fix-width">
                                    <div class="row words-holder">
                                        <div class="words-holder col-12 col-sm-6 col-lg-6 order-2 order-sm-1">
                                            <div class="vid-container">
                                                <div class="inner-row row">
                                                    <div v-for="(video,index) in videoData.videos" class="col-6 col-xl-4 mb-4 vid-col">
                                                        <img :src="video.img" class="vid-thumb" :alt="video.alt" @click="seturl(video); otherVids(index)">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12 col-sm-4 pl-md-5 pr-md-5 order-1 order-sm-2">
                                            <img class="words-header" :src="videoData.header">
                                            <p class="content-body pl-0 mr-0">{{ videoData.body }}</p>
                                        </div>
                                    </div>
                                </div><!--- In Their Words----->
                            </div>
                        </div>
                <!-- End of slides --->
                        <div class="d-none d-sm-block section-header dark">
                                <img :src="header">
                            </div>
                            <div class="tubie-container-right" @focusout="changeLine()">
                                  <tubie-overlay :id="'tubie-'+id+index" :display="perSlideLines(slide)"/>
                            </div>
                        <div class="banner yellow"></div>
                    </div>          
            </template>
        </div>

        <ol v-show="!splash" class="carousel-indicators">
            <li v-for="(slide, index) in infoSlides" :data-target="['#' + 'carousel-'+id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')" @click="jumpSlide(index)"></li>
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
</div>`
}