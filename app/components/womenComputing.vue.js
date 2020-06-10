var womanComputing = {
    name: "woman-computing",
    props: ['slides', 'header', 'height', 'speed','id'],
    data:function(){
        return{
            active:false
        }
    },
    methods:{
        selected:function(){
          this.$emit('selected', 'carouselComputing')  
        },
        toggle:function(index){
            if(index==0){
                $('#carouselComputing').carousel('pause');
            }else{
                $('#carouselComputing').carousel('cycle');
            }
        },
        paused:function(){
            
        }
    },
    template:
    `<div :id="id" class="carousel" data-ride="carousel" data-wrap=false :data-interval="speed">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                  
                  <div v-if="index==0" class="carousel-caption">
                    <div class="kens-wrapper title-screen">
                        <img :src="slide.media.main">
                    </div>
                  </div>

                  <div v-if="index!=0" class="carousel-caption">
                      <div class="row no-gutters">
                          <div class="col-8 img-main inner-shadow">
                              <div class="kens-wrapper img-main">
                              <img :src="slide.media.main" class="">
                              </div>
                          </div>
                          <div class="col-4">
                              <div class="red" style="height: 7%;"></div>
                              <h3 class="content-head">{{ slide.title }}</h3>
                              <p class="content-body">{{ slide.body }}</p>
                              <img :src="slide.media.minor" class="img-widget img-shadow">
                          </div>
                      </div>
                      <div class="banner-bottom">
                          <div class="yellow"></div>
                          <div class="red"></div>
                          <!--img :src="header" class="banner-img-left"-->
                      </div>
                  </div>
                </div>
            
        </template>
    </div>
  

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