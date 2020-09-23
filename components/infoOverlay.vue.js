var infoOverlay= {
    name:"info-overlay",
    props:['id','slides','tubie'],
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
    mounted(){
    },
    methods:{
        seturl:function(){
            $('#'+this.id).modal('hide');
            this.$emit('seturl');
        },
        getCover:function(index){
            console.log(index);
        },
        nextSlide:function(){
            this.count++;
            this.first=false;
            if(this.count==this.slides.length-1){
                this.end=true;
            }
            $("#carousel-"+this.buddy+" .carousel-control-next").trigger('click');
        },
        prevSlide:function(){
            this.count--;
            this.end=false;
            if(this.count==0){
                this.first=true;
            }
            $("#carousel-"+this.buddy+" .carousel-control-prev").trigger('click');
        },
        jumpSlide:function(index){
            this.count=index;
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
        }
    },
    template:
    `<div :id="id" class="modal fade" tabindex="-1" role="dialog" data-backdrop=true>
<div class="modal-dialog modal-xl modal-dialog-centered" role="document">
<div id="modalInfo" class="modal-content">
 <div class="modal-body">
    <div :id="'carousel-'+id" class="carousel" data-wrap="false" data-interval="false">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                <!--- Base Layout Appearence --->
                    <div class="main-page">
                        <img :src="slide.img" class="page-cover">
                        <div class="ribbon red">
                            <img :src="slide.logo">
                            <div class="tubie-container">
                                <tubie-overlay :id="'tubie-'+id+index" :display="slide.tubie" @seturl="seturl"/>
                            </div>
                        </div>
                        <div class="banner green"></div>
                    </div>
                <!--- End layout ---->
                </div>          
            </template>
        </div>
        <ol class="carousel-indicators">
            <li v-for="(slide, index) in slides" :data-target="['#' + 'carousel-'+id]" :data-slide-to="index" :class="" @click="jumpSlide(index)"></li>
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
</div>
</div>
</div>`
}