var buildingFuture= {
    name: "building-future",
    props: ['id', 'slides', 'header', 'speed', 'header', 'height', 'videosdata'],
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
            $('#'+this.id).carousel(0);
            this.count==0;
            this.first=true;
            this.end=false;
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
        <div v-show="splash" class="row row-full">
            <div class="col">
                <slideshow-component :id="'slide-'+id" :images="slideImages" :speed="speed" :height="height" :header="header"/>
            </div>
        </div>

        <div v-show="!splash" :id="'carousel-'+id" :style="{height: this.height}" class="carousel" data-ride="carousel" data-wrap=false data-interval=false>
            <div class="carousel-inner gradient-green">
                <template v-for="(slide, index) in infoSlides">
                    <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                        <!--- Slides Layout Appearence --->
                        <div class="row row-full">
                            <div class="col-0 col-sm-4 red">
                                <div v-if="slide.media" class="img-main-large">
                                    <div class="circle-wrap img-shadow">
                                        <img :src="slide.media">
                                    </div>
                                </div>
                            </div>

                            <div :class="['col', (slide.media ? 'side-widget' : 'add-slide')]">
                                  <p v-if="slide.title" class="content-body">{{ slide.title }}</p>
                                  <p v-if="slide.body" class="content-body">{{ slide.body }}</p>

                                <div v-if="slide.videoSlide" class="container-fluid">
                                    <div class="row mt-5">
                                        <div class="col-6">
                                            <div class="row">
                                                <div v-for="video in videoData.videos" class="col-6 video-container">
                                                    <img src="https://picsum.photos/700/400" class="vid-thumb shadow" @click="seturl(video)">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 pl-5">
                                            <img class="words-header" :src="videoData.header">
                                            <p class="content-body">{{ videoData.body }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of slides --->
                        <div class="banner yellow"></div>
                        <div class="section-header">
                            <img :src="header">
                        </div>
                        <div class="tubie-container-right">
                              <tubie-overlay id="tubie" :display="slide.tubie"/>
                        </div>         
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