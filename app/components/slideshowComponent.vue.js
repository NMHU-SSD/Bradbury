var slideshowComponent={
    name:"slideshow-component",
    props:['images','speed'],
    data:function(){
        return{
            index:0,
            currentImg: null,
            seconds: 0,
            fade:true
        }
    },
    mounted:function(){
        this.toSeconds();
        this.slideshow();
    },
    methods:{
        slideshow:function(){
            this.currentImg = this.images[this.index].img;
            this.fade=false;
            if(this.index < this.images.length-1){
                this.index++;
            }else{
                this.index=0;
            }
            setTimeout(this.slideshow, this.speed);
        },
        toSeconds:function(){
            this.seconds = Math.floor(this.speed / 1000);
        }
    },
    watch:{
        images:function(){
            if(this.images != null){
                //this.slideshow();
            }
        }
    },
    template:
    `<div class="kens-wrapper">
        <img v-show="fade" :style="'animation: kenburns '+seconds+'s infinite'" class="d-block w-100 object-fit" :src="currentImg">
    </div>`
}