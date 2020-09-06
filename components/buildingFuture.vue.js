var buildingFuture= {
    name: "building-future",
    props: ['id', 'slides','header','banner'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null,
            videoData: null,
            first:true,
            end: false,
            count:0
        }
    },
    methods:{
        reset:function(){
            this.first=true;
            this.end=false;
            this.count=0;
        },
        seturl:function(){
            this.$emit('seturl', "https://vjs.zencdn.net/v/oceans.mp4");
        },
        selected:function(){
            console.log("selected");
            //this.$emit('selected', this.id);
        },
        nextSlide:function(){
            this.count++;
            this.first=false;
            if(this.count==this.slides.length-1){
                this.end=true;
            }
            $("#carousel-dyk .carousel-control-next").trigger('click');
        },
        prevSlide:function(){
            this.count--;
            this.end=false;
            if(this.count==0){
                this.first=true;
            }
            $("#carousel-dyk .carousel-control-prev").trigger('click');
        },
        jumpSlide:function(index){
            this.count=index;
            $("#carousel-dyk").carousel(index);
            if(index==0){
                this.first=true;
                this.end=false;
            }else if(index==this.slides.length-1){
                this.end=true;
                this.first=false;
            }else{
                this.end=false;
                this.first=false;
            }
        }
    },
    computed:{
      scrollHeight(){
          var whiteText = $('#header0').height();
          if(whiteText != undefined){
              console.log(whiteText);
              //return whiteText ? whiteText.offsetHeight : 0;
          }
          else{
              console.log("undefined");
          }
      }  
    },
    watch:{
        slides:function(){
            if(this.slides!=null){
                this.slideImages = this.slides[0].media;
                this.infoSlides = this.slides.slice(1);
                //console.log(this.scrollHeight);
            }
        }
    },
    template:
    `<div :id="id">
        <!--a :data-target="['#' + 'carousel-'+id]" data-slide-to="0" :href="['#' + 'carousel-'+id]">
            <div v-show="splash" class="row no-gutters row-full">
                <slideshow-component :id="'slide-'+id" :images="slideImages" speed=5000 position="left"/>
            </div>
        </a-->

        <div :id="'carousel-'+id" class="carousel" data-wrap="false" data-interval="false">
            <div class="carousel-inner">
                <template v-for="(slide, index) in slides">
                    <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                        <div class="row no-gutters">

<!--- Base Layout Appearence --->
                            <div v-if="slide.featuredMedia" class="col-8 img-main green">
                                <img :src="slide.featuredMedia.src" :class="[banner ? 'fill-img' : 'cropped-img']" alt="slide.alt">
                                <div class="shadow-box"/>
                                <h3 class="top-center">{{ header }}</h3>
                                <h2 v-if=!banner class="top-left title-font shadow-text">Did You Know...</h2>
                                <h2 class="top-left title-font">{{ slide.featuredMedia.title }}</h2>
                                <p v-if=slide.featuredMedia.caption class="bottom-right body-font">{{ slide.featuredMedia.caption }}</p>
                            </div>

                            <div class="col yellow text-side" :style="banner ? 'height: calc(55vw - 3em);' : 'height: 55vw;'">
                                  <p v-if="slide.body" :id="'header'+index" class="content-header shadow-text">{{ slide.header }}</p>
                                  <div class="scrolling-text" >
                                  <p v-if="slide.title" class="content-title title-font bluetext">{{ slide.title }}</p>
                                  <p v-if="slide.body" class="content-body body-font bluetext">{{ slide.body }}</p>
                            </div>
                        </div>
                    </div>
<!--- End layout ---->
                        <div class="tubie-container-left" :style="banner ? 'bottom: 3em;' : 'bottom: 0;'" @click="seturl()">
                            <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie"/>
                        </div>
                        <div v-show=banner class="banner red"></div>
                    </div>          
            </template>
        </div>

        <div v-show=banner>
        <ol class="carousel-indicators">
            <li v-for="(slide, index) in slides" :data-target="['#' + 'carousel-'+id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')" @click="jumpSlide(index)"></li>
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