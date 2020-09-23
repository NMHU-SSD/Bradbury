var carouselComp= {
    name: "carousel-comp",
    props: ['id', 'slides'],
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
            //console.log(this.id);
            this.first=true;
            this.end=false;
            $("#carousel-"+this.id).carousel(0);
            this.jumpSlide(0);
        },
        seturl:function(url){
            this.$emit('seturl', url);
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
        },
        textsideColor(){
            var styling;
            const classes = 'col text-side ';
            if(this.mono){
                if(this.banner){
                    styling= 'background-color: #bcd1bc;';
                }
                else{
                    styling= 'background-color: #bcd1bc;';
                }
            }
            else{
                styling= 'yellow';
            }
            return styling+upCase;
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
    `<div :id="'carousel-'+id" class="carousel" data-wrap="false" data-interval="false">
            <div class="carousel-inner">
                <template v-for="(slide, index) in slides">
                    <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                    <!--- Base Layout Appearence --->
                            <div class="background green size">
                                <img>
                                <div class="title"></div>
                                <p class="title-text-box half-shadow"></p>
                                <div class="left-circle circle">
                                    <div class="arrows left-arrow"></div>
                                    <h3 class="title-font">where\nwe've been</h3>
                                </div>
                                <div class="right-circle circle">
                                    <div class="arrows right-arrow"></div>
                                    <h3 class="title-font">where\nwe're headed</h3>
                                </div>
                            </div>
                    <!--- End layout ---->
                    </div>          
                </template>
            </div>
        </div>`
}