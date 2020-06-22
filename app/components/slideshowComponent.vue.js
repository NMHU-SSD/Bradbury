var slideshowComponent={
    name:"slideshow-component",
    props:['images'],
    data:function(){
        return{
            currentImg: null,
            fade:true
        }
    },
    mounted:function(){
      this.slideshow();
        console.log(this.images);
        console.log(this.currentImg);
    },
    methods:{
        tubieClicked:function(index){
            this.$emit('tubieclicked', index);
        },
        slideshow:function(){
            
            imgList= this.images[0].media;
            this.currentImg = imgList[this.img].img;           
            this.fade=false;

            if(this.img < imgList.length-1){
                this.img++;
            }else{
                this.img=0;
            }
            setTimeout(this.slideshow, 5000);
        }
    },
    watch:{
        images:function(){
            if(this.images != null){
                this.slideshow();
            }
        },
        currentImg:function(){
            this.fade=true;
        }
    },
    template:
    `<transition name="fade">
        <img v-show="fade" :src="currentImg">
    </transition>`
}