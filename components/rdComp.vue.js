var rdComp= {
    name: "rd-comp",
    props: ['id', 'covers', 'body'],
    data:function(){
        return{
            slideImages: null,
            infoSlides:null
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
        setcover:function(cover){
            let name = 'modal'+cover.name;
            let logo = cover.logo;
            this.$emit('setcover', {name, logo});
            //console.log(name);
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
    template:
    `<div :id="id" class="background size red">
        <div class="rd-dark"/>
        <div class="row sum-row">
            <img src="assets/customs/R&D100logo-gold.svg" class="col-4 offset-1">
            <p class="col rd-text-box body-font align-self-center half-shadow">{{ body }}</p>
        </div>
        <div class="cover-holder row no-gutters">
            <template v-for="(cover, index) in covers">
                <div class="col-4 cover">
                    <img :src="cover.img" class="cover-img" @click="setcover(cover)">
                    <img :src="cover.logo" class="cover-logo">
                </div>
            </template>
        </div>
    </div>`
}