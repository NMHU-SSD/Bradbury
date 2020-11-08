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
        //setTimeout(this.changeMult, this.speed);
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
            var slideId = $('#'+this.id);
            this.currentImg = this.images[this.index].img;
            if(this.images[this.index].position){
                $(slideId).css('object-position', this.images[this.index].position);
            }else{
                $(slideId).css('object-position', 'center');
            }
            if(this.index < this.images.length-1){
                this.index++;
            }else{
                this.index=0;
            }
        },
        changeMult:function(adjust){
            for(x=0; x<3; i++){
                var colId = $('#'+this.id+x);
                this.currentImg = this.images[x].img
                if(x>this.images.length-1){
                    x=0;
                }
            }
        },
        initShow:function(){
            this.seconds = Math.floor(this.speed / 1000);
            //:style="'animation: kenburns 20s infinite'"
        }
    },
    watch:{
        images:function(){
            var slideId = $('#'+this.id);
            if(this.images!=null){
                this.currentImg = this.images[this.index].img;
                //console.log(this.images[this.index].img);
                if(this.images[this.index].position){
                    $(slideId).css('object-position', this.images[this.index].position);
                }
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
        <div v-show=true class="splash-background">
            <img v-if=true :id="id" class="splash-img" :src="currentImg">
        </div>
    </div>`
}