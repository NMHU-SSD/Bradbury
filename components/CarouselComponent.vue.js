var CarouselComponent = {
    name: "carousel-component",
    props: ['slides','id','height'],
    computed: {
        /*setHeight: function(){
            if(this.height){
                return this.height;
            }
            else{
                return 50;
            }
        }
        :style="{ height: setHeight + '%' }"
        :class="[ slide.featuredMedia.title=="Did you know..."? 'main-dyk': 'main-holder' ]"*/
    },
    template:
    `<div :id="id" class="carousel" data-ride="carousel" data-interval=false>
        <div class="carousel-inner" :style="{ height: height+'px' }">
            <template v-for="(slide,index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >

                  <div class="carousel-caption">
                    <div class="row no-gutters">
                        <div class="col main-content">
                            <h2 :class="(slide.featuredMedia.header=='Did you know...') ? 'main-dyk-header' : 'main-header'">{{ slide.featuredMedia.header }}</h2>
                            <div :class="(slide.featuredMedia.header=='Did you know...') ? 'img-dyk-wrapper' : 'img-wrapper'" :style="{ height: height+'px' }">
                                <img :src="slide.src">
                            </div>
                            <h4 v-if="slide.featuredMedia.caption" class="main-caption">{{ slide.featuredMedia.caption }}</h4>
                            <div v-else-if="slide.featuredMedia.title" :class="(slide.featuredMedia.header=='Did you know...') ? 'main-dyk' : 'main-holder'">
                                <h2>{{ slide.featuredMedia.title }}</h2>
                                <h4>{{ slide.featuredMedia.body }}</h4>
                            </div>
                        </div>
                        <div class="col-4 side-content">
                            <h4>{{ slide.highlight }}</h4>
                            <!--div class="vid-wrapper" v-if="slide.video">
                                    <iframe :src="slide.video" frameborder="0" allow="picture-in-picture" allowfullscreen></iframe>
                            </div-->
                            <h3 class="blue">{{ slide.title }}</h3>
                            <p class="blue">{{ slide.body }}</p>
                        </div>
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