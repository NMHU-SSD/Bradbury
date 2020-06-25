var slideshowComponent={
    name:"slideshow-component",
    props:['images'],
    data:function(){
        return{
            index:0,
            currentImg: null,
            fade:true
        }
    },
    mounted:function(){
      this.slideshow();
    },
    methods:{
        slideshow:function(){
            this.currentImg = this.images[this.index].img; 
            //console.log(this.currentImg);
            
            this.fade=false;
            if(this.index < this.images.length-1){
                this.index++;
            }else{
                this.index=0;
            }
            setTimeout(this.slideshow, 10000);}
    },
    watch:{
        images:function(){
            if(this.images != null){
                //this.slideshow();
            }
        },
        currentImg:function(){
            this.fade=true;
        }
    },
    template:
    `<transition name="fade">
        <img v-show="fade" class="d-block w-100 object-fit" :src="currentImg">
    </transition>`
}