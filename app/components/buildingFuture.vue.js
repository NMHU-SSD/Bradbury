var buildingFuture = {
    name: "building-future",
    props: ['id', 'slides', 'header', 'speed', 'header', 'height', 'videosdata'],
    data:function(){
        return{
            slideImages: null,
            videoData: null
        }
    },
    mounted:function(){
        //this.checkitem();
    },
    methods:{
        seturl:function(url){
            this.$emit('seturl', url);
        },
        checkitem:function(){
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
    `<div :id="id" :style="{height: this.height}" class="carousel" data-ride="carousel" data-interval=false>
        <div class="carousel-inner gradient-green">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >

                    <div class="row row-full">
                        <div v-if="index==0" class="col red">
                            <slideshow-component :images="slideImages"/>
                        </div>

                        <div v-else class="col-4 red">
                            <div v-if="slide.media" class="img-main-large">
                                <div class="circle-wrap img-shadow kens-wrapper">
                                    <img :src="slide.media">
                                </div>
                            </div>
                        </div>

                          <div v-if="index!=0" :class="['col', (slide.media ? 'side-widget' : 'vid-slide')]">
                              <p v-if="slide.title" class="content-body">{{ slide.title }}</p>
                              <p v-if="slide.body" class="content-body">{{ slide.body }}</p>

                            <div class="slide-holder">
                                <their-words v-if="!slide.media" style="height: 75%" @seturl="seturl($event)" :note="videoData.body" :videos="videoData.videos" :header="videoData.header"/>
                            </div>
                          </div>
                      </div>

                        <div class="banner yellow">
                            <div v-if="index!=0" class="tubie-container">
                                  <tubie-overlay id="tubie" :display="slide.tubie"/>
                            </div>
                        </div>
                        <img v-if="index!=0" class="section-header" :src="header">
                </div>          
        </template>
    </div>
  
    <ol class="carousel-indicators">
        <li v-for="(slide, index) in slides" :data-target="['#' + id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')"></li>
    </ol>

  <a class="carousel-control-prev" :href="['#' + id]" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon carousel-icons" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" :href="['#' + id]" role="button" data-slide="next">
    <span class="carousel-control-next-icon carousel-icons" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}