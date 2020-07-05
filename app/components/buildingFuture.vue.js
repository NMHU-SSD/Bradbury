var buildingFuture= {
    name: "building-future",
    props: ['id', 'slides', 'header', 'speed', 'header', 'height', 'videosdata'],
    data:function(){
        return{
            slideImages: null,
            videoData: null
        }
    },
    mounted:function(){
        this.checkitem();
    },
    methods:{
        seturl:function(url){
            this.$emit('seturl', url);
        },
        checkitem:function(){
            console.log("check items");
            var $this=$('#' + this.id);
            if($('.carousel-inner .item:first').hasClass('active')) {
                $this.children('.left.carousel-control').hide();
                $this.children('.right.carousel-control').show();
            } else if($('.carousel-inner .item:last').hasClass('active')) {
                $this.children('.left.carousel-control').show();
                $this.children('.right.carousel-control').hide();
            } else {
                $this.children('.carousel-control').show();
            }
        },
        changeSlide:function(){
            console.log("init on carousel move");
            $('#' + this.id).on('slid.bs.carousel', this.checkitem);
        },
        selected:function(){
            this.$emit('selected', this.id);
        }
    },
    watch:{
        slides:function(){
            if(this.slides!=null){
                this.slideImages = this.slides[0].media;
            }
        },
        videosdata:function(){
            if(this.videosdata !=null){
                this.videoData = this.videosdata;
            }
        }
    },
    template:
    `<div :id="id" :style="{height: this.height}" class="carousel" data-ride="carousel" data-wrap=false data-interval=false @click="selected">
        <div class="carousel-inner gradient-green">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                    <div v-if="index==0" class="row row-full">
                        <div class="col">
                            <slideshow-component :id="'slide-'+id" :images="slideImages" :speed="speed" :height="height" :header="header"/>
                        </div>
                    </div>

                    <!--- Slides Layout Appearence --->
                    <div v-else class="row row-full">
                        <div class="col-4 red">
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
                                                <img src="https://picsum.photos/700/400" class="vid-thumb shadow" @click="seturl(video.link)">
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
                            <img v-if="index!=0" class="" :src="header">
                        </div>
                        <div v-if="index!=0" class="tubie-container-right">
                              <tubie-overlay id="tubie" :display="slide.tubie"/>
                        </div>
                </div>          
        </template>
    </div>
  
    <ol class="carousel-indicators">
        <li v-for="(slide, index) in slides" :data-target="['#' + id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')"></li>
    </ol>

  <a class="carousel-control-prev" :href="['#' + id]" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" :href="['#' + id]" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}