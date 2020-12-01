var womanComputing = {
    name: "woman-computing",
    props: ['id', 'slides', 'header', 'speed','tubie'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null,
            splash: true,
            first: true,
            end: false,
            count:0,
            lastScroll:null,
            line:null,
            tutorial:null
        }
    },
    methods:{
        //interaction
        reset:function(){
            this.splash=true;
            this.count=0;
            this.first=true;
            this.end=false;
            this.toTop();
        },
        seturl:function(url){
            this.$emit('seturl', url);
        },
        selected:function(){
            this.splash=false;
            this.$emit('selected', this.id);
        },
        //slide actions
        nextSlide:function(){
            this.count++;
            this.first=false;
            if(this.count==this.infoSlides.length-1){
                this.end=true;
            }
            //this.scrollpanel(this.count);
            this.toTop();
        },
        prevSlide:function(){
            this.count--;
            this.end=false;
            if(this.count==0){
                this.first=true;
            }
            //this.scrollpanel(this.count);
            this.toTop();
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
            //this.scrollpanel(this.count);
            this.toTop();
        },
        //scroll action
        toTop:function(){
            if(this.lastScroll != null){
                let scrollDiv = document.getElementById(this.lastScroll);
                scrollDiv.scrollTop=0;
            }
        },
        //splash screen
        imgPosition:function(position){
            if(position != undefined){
                return "object-position: "+position;
            }else{
                return "";
            }
        },
        changeLine:function(){
            var rand = Math.floor(Math.random()*this.tubie.lines.length);
            this.line = this.tubie.lines[rand];
        },
        //tubie dialouge
        perSlideLines:function(slide){
            if(this.tubie.active){
                return this.line;
            }else{
                return slide.tubie;
            }
        }
    },
    watch:{
        slides:function(){
            if(this.slides!=null){
                this.slideImages = this.slides.slideShow;
                this.infoSlides = this.slides.slides;
            }
        },
        tubie:function(){
            if(this.tubie!=null){
                this.changeLine();
                this.tutorial = this.tubie.tutorial[0];
            }
        }
    },
    template:
    `
    <div :id="id">
    <div v-show="splash & tubie.active" class="tubie-splash-right tubie-splash" @focusout="changeLine()">
        <tubie-overlay :id="'tubie-'+id" spec="def" :display="tutorial" />
    </div>
    <div class="screen" @click="selected()">
        <a :data-target="['#' + 'carousel-'+id]" data-slide-to="0" :href="['#' + 'carousel-'+id]">
            <div v-show="splash" class="row no-gutters">
                <slideshow-component :id="'slide-'+id" :images="slideImages" :speed="speed" :header="header" position="left"/>
            </div>
        </a>
        
        <div v-show="!splash" :id="'carousel-'+id" class="carousel" data-ride="carousel" data-wrap="false" data-interval="false">
            <div class="carousel-inner gradient-green">
                <template v-for="(slide, index) in infoSlides">
                    <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                        <div class="row row-full no-gutters">
                              <div class="col-12 col-sm-6 col-xl-9 img-main pic-holder">
                                  <img :src="slide.media" :style="imgPosition(slide.position)" :alt="slide.alt">
                              </div>
                              <div :id="'text'+id+index" class="col text-side offset-2 offset-sm-0">
                                  <p v-if="slide.body" class="content-body content-pad">{{ slide.body }}</p>
                              </div>
                        </div>
                        <div class="section-header-computing">
                            <div class="d-none d-sm-block mb-md-2 computing-header red">
                                <img :src="header">
                            </div>
                        </div>
                        <div class="tubie-container-right" @focusout="changeLine()">
                              <tubie-overlay :id="'tubie-'+id+index" :display="perSlideLines(slide)"/>
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