var womanComputing = {
    name: "woman-computing",
    props: ['id', 'slides', 'header', 'speed', 'header'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null,
            splash: true,
            first: true,
            end: false,
            count:0
        }
    },
    methods:{
        reset:function(){
            this.splash=true;
            this.count=0;
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
        }
    },
    template:
    `<div :id="id" @click="selected">
        <a :data-target="['#' + 'carousel-'+id]" data-slide-to="0" :href="['#' + 'carousel-'+id]">
            <div v-show="splash" class="row no-gutters row-full">
                <slideshow-component :id="'slide-'+id" :images="slideImages" :speed="speed" :header="header" position="left"/>
            </div>
        </a>

        <div v-show="!splash" :id="'carousel-'+id" class="carousel" data-ride="carousel" data-wrap="false" data-interval="false">
            <div class="carousel-inner gradient-green">
                <template v-for="(slide, index) in infoSlides">
                    <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                        <div class="row row-full no-gutters">
                    <!--- Slides Layout Appearence --->
                              <div class="d-none d-sm-block col-sm-6 col-xl-8 img-main">
                                  <img :src="slide.media">
                              </div>
                              <div class="col offset-2 offset-sm-0 ">
                                  <p v-if="slide.title" class="content-body">{{ slide.title }}</p>
                                  <p v-if="slide.body" class="content-body ">{{ slide.body }}</p>
                              </div>
                    <!-- End of slides --->
                        </div>
                        <div class="section-header-computing">
                            <div class="d-none d-sm-block mb-md-2 computing-header red">
                                <img :src="header">
                            </div>
                        </div>
                        <div class="tubie-container-right">
                              <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie"/>
                        </div> 
                        <div class="banner yellow"></div>         
                    </div>          
            </template>
        </div>

        <ol class="carousel-indicators">
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