var slideshowComponent={
    name:"slideshow-component",
    props:['images','speed','id','height','header','position'],
    data:function(){
        return{
            index:0,
            currentImg: null,
            seconds: 0,
            kenburn: 'kenburns '+this.seconds+'s infinite'
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
        }
    },
    watch:{
        images:function(){
            if(this.images!=null){
                this.currentImg = this.images[this.index].img;
                this.index++;
                setTimeout(this.slideshow, this.speed);
            }
        }
    },
    template:
    `<div class="col slideshow-container">
        <div :class="['splash-title-holder', (position!='left' ? 'splash-right' : '')]">
            <div :class="['splash-title red', (position!='left' ? 'title-right' : 'title-left')]">
                <img :src="header">
            </div>
        </div>
        <div class="splash-background">
            <img :id="id" class="splash-img" :src="currentImg">
        </div>
    </div>`
}