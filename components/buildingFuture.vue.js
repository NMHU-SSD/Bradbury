var buildingFuture= {
    name: "building-future",
    props: ['id', 'slides','header','buddy','banner','mono'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null,
            videoData: null,
            first:true,
            end: false,
            scrollEnd: false,
            canScroll:false,
            count:0,
            lastScroll:null
        }
    },
    updated:function(){
        //this.scrollpanel(0);
    },
    mounted:function(){
        //this.scrollpanel(0);
    },
    methods:{
        reset:function(){
            this.first=true;
            this.end=false;
            this.toTop();
            $("#carousel-"+this.id).carousel(0);
        },
        seturl:function(url,name){
            let title = name;
            this.$emit('seturl', {src:url,title:title});
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
            $("#carousel-"+this.buddy+" .carousel-control-next").trigger('click');
            this.toTop();
        },
        prevSlide:function(){
            this.count--;
            this.end=false;
            if(this.count==0){
                this.first=true;
            }
            $("#carousel-"+this.buddy+" .carousel-control-prev").trigger('click');
            this.toTop();
        },
        jumpSlide:function(index){
            this.count=index;
            this.toTop();
            $("#carousel-"+this.buddy).carousel(index);
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
        },
        handleScroll: function(el) {
            if((el.srcElement.offsetHeight + el.srcElement.scrollTop) >= el.srcElement.scrollHeight) {
                $('#'+el.srcElement.id).removeClass("shadow-scroll");
            }else{
                $('#'+el.srcElement.id).addClass("shadow-scroll");
            }
            this.lastScroll = el.srcElement.id;
            console.log(el.srcElement.id);
        },
        toTop:function(){
            if(this.lastScroll != null){
                let scrollDiv = document.getElementById(this.lastScroll);
                scrollDiv.scrollTop=0;
            }
        },
        scrollpanel:function(index){
            var divId = document.getElementById('text'+this.id+index);
            console.log(divId);
            if((divId.offsetHeight + divId.scrollTop) >= divId.scrollHeight){
                $('#'+divId.id).removeClass("shadow-scroll");
            }else{
                $('#'+divId.id).addClass("shadow-scroll");
            }
        }
    },
    template:
    `<div :id="id">

        <div :id="'carousel-'+id" class="carousel" data-wrap="false" data-interval="false" data-ride="carousel">
            <div class="carousel-inner">
                <template v-for="(slide, index) in slides">
                    <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                        <div class="row no-gutters">

                    <!--- Base Layout Appearence --->
                            <div v-if="slide.featuredMedia" class="col-12 col-sm-8 img-main green whitetext">
                                <img :src="slide.featuredMedia.src" :class="[banner ? 'fill-img' : 'cropped-img']" 
                                    :style="slide.featuredMedia.position" alt="slide.alt">
                                <div class="shadow-box"/>
                                <h3 class="top-center shadow-text">{{ header }}</h3>
                                <h2 v-if=!banner class="top-left title-font shadow-text-big">Did You Know...</h2>
                                <div v-if="!banner && slide.video" class="watch-video" @click="seturl(slide.video,slide.videoTitle)">
                                    <img src="assets/customs/VideoPlaybutton-black.png" class="play-img" style="margin-right: 5%;">
                                    <p class="body-font" style="color: #bcd1bc;">WATCH VIDEO</p>
                                </div>
                                <h2 class="top-left title-font shadow-text-big">{{ slide.featuredMedia.title }}</h2>
                                <i v-if=slide.featuredMedia.caption class="bottom-right body-font shadow-text" :style="banner ? 'bottom: 5em;' : 'bottom: 2em;'">{{ slide.featuredMedia.caption }}</i>
                            </div>

                            <div :class="['col-12 col-sm-4 margins',(mono? 'lgt-green': 'yellow'),(banner? 'banner-text': 'text-side')]">
                                  <div :class="['stay',(mono ? 'lgt-green' : 'yellow')]">
                                    <p v-if="slide.header" :id="'header'+id+index" class="content-header redtext">{{ slide.header }}</p>
                                    <div v-if="banner && slide.video" class="watch-video" @click="seturl(slide.video, slide.videoTitle)">
                                        <img src="assets/customs/VideoPlaybutton-black.png" class="play-img">
                                        <p class="body-font redtext">WATCH VIDEO</p>
                                    </div>
                                  </div>

                                  <div :id="'text'+id+index" class="scrolling-text" @scroll="handleScroll">
                                    <p v-if="slide.header" class="content-header invis">{{ slide.header }}</p>
                                    <div v-if="banner && slide.video" class="watch-video invis">
                                        <img src="assets/customs/VideoPlaybutton-black.png" class="play-img">
                                        <p class="body-font">WATCH VIDEO</p>
                                    </div>
                                    <p v-if="slide.title" class="bluetext content-title title-font">{{ slide.title }}</p>
                                    <p v-if="slide.body" class="bluetext content-body body-font">{{ slide.body }}</p>
                                  </div>
                        </div>
                    </div>
                    <!--- End layout ---->
                        <div class="tubie-container-left" :style="banner ? 'bottom: 3em;' : 'bottom: 0em;'">
                            <tubie-overlay v-if="banner" :id="'tubie-'+id+index" :display="slide.tubie" spec="consider"/>
                            <tubie-overlay v-else :id="'tubie-'+id+index" :display="slide.tubie" spec="dyk"/>
                        </div>
                        <div v-show=banner :class="['banner', (mono ? 'green':'red')]"></div>
                    </div>          
            </template>
        </div>

        <div v-show=banner>
        <ol class="carousel-indicators">
            <li v-for="(slide, index) in slides" :data-target="['#' + 'carousel-'+id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')" :style="mono?'background: #bcd1bc;':'background: #BBC356;'" @click="jumpSlide(index)"></li>
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