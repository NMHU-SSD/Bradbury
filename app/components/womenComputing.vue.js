var womanComputing = {
    name: "woman-computing",
    props: ['id', 'slides', 'header', 'speed', 'header', 'height'],
    data:function(){
        return{
            slideImages: null,
            splash: true,
            end: false,
            count:0
        }
    },
    methods:{
        reset:function(){
            $('#'+this.id).carousel(0);
            this.count==0;
            this.splash=true;
            this.end=false;
        },
        seturl:function(url){
            this.$emit('seturl', url);
        },
        selected:function(){
            this.$emit('selected', this.id);
        },
        nextSlide:function(){
            this.count++;
            this.splash=false;
            if(this.count==this.slides.length-1){
                this.end=true;
            }else if(this.end=true){
                this.end=false;
            }
        },
        prevSlide:function(){
            this.count--;
            this.end=false;
            if(this.count==0){
                this.splash=true;
            }else if(this.splash=true){
                this.splash=false;
            }
        },
        jumpSlide:function(index){
            this.count=index;
            if(this.count==0){
                this.splash=true;
                this.end=false;
            }else if(this.count==this.slides.length-1){
                this.end=true;
                this.splash=false;
            }else{
                this.end=false;
                this.splash=false;
            }
        }
    },
    watch:{
        slides:function(){
            if(this.slides!=null){
                this.slideImages = this.slides[0].media;
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
                            <slideshow-component :id="'slide-'+id" :images="slideImages" :speed="speed" :height="height" :header="header" position="left"/>
                        </div>
                    </div>
                    <div v-else class="row row-full">

                <!--- Slides Layout Appearence --->
                          <div class="col-md-0"/>
                          <div class="col">
                              <img class="img-main" :src="slide.media">
                          </div>
                          <div class="col-sm-6 col-md-4">
                              <p v-if="slide.title" class="content-body">{{ slide.title }}</p>
                              <p v-if="slide.body" class="content-body">{{ slide.body }}</p>
                          </div>
                <!-- End of slides --->

                    </div>
                    <div v-if="index!=0">
                        <div class="section-header-computing">
                            <div class="computing-header red">
                                <img :src="header">
                            </div>
                        </div>
                        <div class="banner yellow"></div>
                        <div class="tubie-container-right">
                              <tubie-overlay id="tubie" :display="slide.tubie"/>
                        </div>
                    </div>          
                </div>          
        </template>
    </div>
  
    <ol v-show="!splash" class="carousel-indicators">
        <li v-for="(slide, index) in slides" :data-target="['#' + id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')" @click="jumpSlide(index)"></li>
    </ol>

  <a v-if="!splash" class="carousel-control-prev" :href="['#' + id]" role="button" data-slide="prev" @click="prevSlide">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a v-if="!end" class="carousel-control-next" :href="['#' + id]" role="button" data-slide="next" @click="nextSlide">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}