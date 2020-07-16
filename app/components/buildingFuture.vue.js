var buildingFuture= {
    name: "building-future",
    props: ['id', 'slides', 'header', 'speed', 'header', 'videosdata'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null,
            videoData: null,
            splash: true,
            first:true,
            end: false,
            count:0
        }
    },
    methods:{
        reset:function(){
            this.splash=true;
            this.first=true;
            this.end=false;
            this.count=0;
        },
        seturl:function(url){
            this.$emit('seturl', url);
        },
        selected:function(){
            this.splash=false;
            this.$emit('selected', this.id);
        },
        nextSlide:function(){
            this.count++;
            this.first=false;
            if(this.count==this.infoSlides.length-1){
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
            }else if(index==this.infoSlides.length-1){
                this.end=true;
                this.first=false;
            }else{
                this.end=false;
                this.first=false;
            }
        }
    },
    watch:{
        slides:function(){
            if(this.slides!=null){
                this.slideImages = this.slides[0].media;
                this.infoSlides = this.slides.slice(1);
            }
        },
        videosdata:function(){
            if(this.videosdata !=null){
                this.videoData = this.videosdata;
            }
        }
    },
    template:
    `<div :id="id" @click="selected">
        <a :data-target="['#' + 'carousel-'+id]" data-slide-to="0" :href="['#' + 'carousel-'+id]">
            <div v-show="splash" class="row no-gutters row-full">
                <slideshow-component :id="'slide-'+id" :images="slideImages" :speed="speed" :header="header"/>
            </div>
        </a>

        <div v-show="!splash" :id="'carousel-'+id" class="carousel" data-wrap="false" data-interval="false">
            <div class="carousel-inner gradient-green">
                <template v-for="(slide, index) in infoSlides">
                    <div :class="['carousel-item', (index==0 ? 'active' : '')]" >

                        <!--- Slides Layout Appearence --->
                        <div class="row row-full">
                            <div v-if="slide.media" class="d-none d-sm-block col-sm-4 red">
                                <div class="img-main-large">
                                    <div class="circle-wrap img-shadow">
                                        <img :src="slide.media">
                                    </div>
                                </div>
                            </div>

                            <div :class="['col', (slide.media ? 'side-widget' : '')]">
                                  <p v-if="slide.title" class="content-body">{{ slide.title }}</p>
                                  <p v-if="slide.body" class="content-body">{{ slide.body }}</p>
                        <!--- In Their Words----->
                                <div v-if="slide.videoSlide" class="container-fluid pt-5 pb-lg-5 mr-md-5 fix-width">
                                    <div class="row">
                                        <div class="col-12 col-sm-6">
                                            <div class="row">
                                                <div v-for="video in videoData.videos" class="col-6 col-lg-4 mb-4 vid-col">
                                                    <img :src="video.img" class="vid-thumb" @click="seturl(video)">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 pl-md-5 pr-md-5">
                                            <img class="d-none d-sm-block words-header" :src="videoData.header">
                                            <p class="content-body pl-0 mr-0">{{ videoData.body }}</p>
                                        </div>
                                    </div>
                                </div><!--- In Their Words----->
                            </div>
                        </div>
                <!-- End of slides --->
                        <div class="d-none d-sm-block section-header">
                                <img :src="header">
                            </div>
                            <div class="tubie-container-right">
                                  <tubie-overlay id="tubie" :display="slide.tubie"/>
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
</div>`
}