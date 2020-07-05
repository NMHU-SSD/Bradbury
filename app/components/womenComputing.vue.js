var womanComputing = {
    name: "woman-computing",
    props: ['id', 'slides', 'header', 'speed', 'header', 'height'],
    data:function(){
        return{
            slideImages: null
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
            console.log("Logged event");
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
            console.log("clicked");
            //$('#' + this.id).on('slid.bs.carousel', this.checkitem);
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
                          <div class="col-2"/>
                          <div class="col">
                              <img class="img-main" :src="slide.media">
                          </div>
                          <div class="col-4">
                              <p v-if="slide.title" class="content-body">{{ slide.title }}</p>
                              <p v-if="slide.body" class="content-body">{{ slide.body }}</p>
                          </div>
                <!-- End of slides --->

                    </div>
                <!-- Banner --->
                    <div v-if="index!=0" class="section-header-computing">
                        <div class="computing-header red">
                            <img :src="header">
                        </div>
                    </div>
                <!-- End of Banner --->
                    <div class="banner yellow"></div>
                    <div v-if="index!=0" class="tubie-container-right">
                          <tubie-overlay id="tubie" :display="slide.tubie"/>
                    </div>
                </div>          
        </template>
    </div>
  
    <ol class="carousel-indicators">
        <li v-for="(slide, index) in slides" :data-target="['#' + id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')"></li>
    </ol>

  <a class="carousel-control-prev" :href="['#' + id]" @click="changeSlide()" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" :href="['#' + id]" @click="changeSlide()" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}