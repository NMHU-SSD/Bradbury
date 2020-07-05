var slideshowComponent={
    name:"slideshow-component",
    props:['images','speed','id','height','header','position'],
    data:function(){
        return{
            index:0,
            currentImg: null,
            seconds: 0
        }
    },
    mounted:function(){
        this.initShow();
    },
    methods:{
        slideshow:function(){
            var fadeId = $('#'+this.id);
            $(fadeId).css('filter', 'brightness(0)');
            setTimeout(this.changeImg, 1000);
            setTimeout(function(){
                $(fadeId).css('filter', 'brightness(1)')}, 1000);
            
            setTimeout(this.slideshow, this.speed);
        },
        changeImg:function(){
            this.currentImg = this.images[this.index].img;
            if(this.index < this.images.length-1){
                this.index++;
            }else{
                this.index=0;
            }
        },
        initShow:function(){
            this.seconds = Math.floor(this.speed / 1000);
            this.currentImg = this.images[this.index].img;
            this.index++;
            setTimeout(this.slideshow, this.speed);
        }
    },
    template:
    `<div class="slideshow-container">
        <div class="splash-title-holder" :style="(position!='left' ? 'float: right' : 'float: left')">
            <div :class="['red',(position!='left' ? 'splash-title-right' : 'splash-title-left')]">
                <img :src="header">
            </div>
        </div>
        <div :style="{height: this.height}" class="splash-img">
            <!--img :id="id" :style="'animation: kenburns '+seconds+'s infinite'" :src="currentImg"--->
            <img :id="id" class="greyscale" :src="currentImg">
        </div>
    </div>`
}