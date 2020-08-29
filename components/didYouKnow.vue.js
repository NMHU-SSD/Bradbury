var didYouKnow= {
    name: "did-you-know",
    props: ['id', 'slides','slideImages'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null,
            videoData: null,
            splash: true,
            first:true,
            end: false,
            count:0
        }
    },
    methods:{
        reset:function(){
            this.splash=true;
            this.first=true;
            this.end=false;
            this.count=0;
        },
        seturl:function(url){
            this.$emit('seturl', {'video':url, 'active':true});
        },
        setNext:function(currIndex){
            let nextIndex=currIndex;
            if(currIndex==this.videosdata.videos.length){
                nextIndex=0;
                //console.log("current video playing is from index: "+nextIndex);
            }
            //console.log("next video is from index: "+nextIndex);
            this.$emit('othervids', {'next':this.videosdata.videos[nextIndex], 'index':nextIndex});
        },
        setPrev:function(currIndex){
            let prevIndex=currIndex;
            if(currIndex<0){
                prevIndex=this.videosdata.videos.length-1;
                //console.log("changed to: "+prevIndex);
            }
            //console.log("video sent from index: "+prevIndex);
            this.$emit('othervids', {'prev':this.videosdata.videos[prevIndex], 'index':prevIndex});
        },
        otherVids:function(index){
            prevVid=null;
            nextVid=null;
            if(index == 0){
                const last=this.videosdata.videos.length-1;
                prevVid=this.videosdata.videos[last];
                nextVid=this.videosdata.videos[1];
            }
            else if(index == this.videosdata.videos.length-1){
                prevVid=this.videosdata.videos[index-1];
                nextVid=this.videosdata.videos[0];
            }else{
                prevVid=this.videosdata.videos[index-1];
                nextVid=this.videosdata.videos[index+1];
            }
            this.$emit('othervids', {'prev':prevVid, 'next':nextVid, 'index':index});
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

                        <!--- Slides Layout Appearence --->
                        <div class="row no-gutters">
                            <div v-if="slide.featuredMedia" class="col-8 img-main">
                                <img :src="slide.featuredMedia.src" class="fill-img" alt="slide.alt">
                            </div>

                            <div class="col yellow text-side pl-3 pr-3">
                                  <p v-if="slide.title" class="content-title">{{ slide.title }}</p>
                                  <p v-if="slide.body" class="content-body">{{ slide.body }}</p>
                            </div>
                        </div><!--- End layout ---->
                        <div class="tubie-container-left">
                            <tubie-overlay id="test-tubie"/>
                        </div>
                        <div class="banner red"></div>
                    </div>          
            </template>
        </div>

        <ol class="carousel-indicators">
            <li v-for="(slide, index) in infoSlides" :data-target="['#' + 'carousel-'+id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')" @click="jumpSlide(index)"></li>
        </ol>

          <a class="carousel-control-prev" :href="['#' + 'carousel-'+id]" role="button" data-slide="prev" @click="prevSlide">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" :href="['#' + 'carousel-'+id]" role="button" data-slide="next" @click="nextSlide">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

    </div>
</div>`
}