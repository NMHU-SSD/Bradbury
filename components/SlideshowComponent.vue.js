var slideshowComponent={
    name:"slideshow-component",
    props:['images','speed','id','tubie','memo','title1','title2'],
    data:function(){
        return{
            index:0,
            currentImg: null,
            seconds: 0,
            head:true
        }
    },
    mounted:function(){
        //console.log(this.images);
        //this.initShow();
    },
    methods:{
        switchOut:function(){
            this.head= !this.head;
            console.log(this.head);
            this.$emit('switchout');
        },
        slideshow:function(){
            //console.log("slideshow");
            var fadeId = $('#'+this.id);
            $(fadeId).css('filter', 'brightness(0)');
            setTimeout(this.changeImg, 1000);
            setTimeout(function(){
                $(fadeId).css('filter', 'brightness(50%)')}, 1000);
            setTimeout(this.slideshow, this.speed);
        },
        changeImg:function(){
            //console.log("change Image");
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
        initShow:function(){
            this.seconds = Math.floor(this.speed / 1000);
            console.log(this.images);
            
            var slideId = $('#'+this.id);
            this.currentImg = this.images[this.index].img;
            console.log(this.speed);
                if(this.images[this.index].position){
                    $(slideId).css('object-position', this.images[this.index].position);
                }
                this.index++;
                setTimeout(this.slideshow, this.speed);
            //:style="'animation: kenburns 20s infinite'"
        }
    },
    watch:{
        images:function(){
            console.log("Watch triggered");
            var slideId = $('#'+this.id);
            if(this.images!=null){
                this.currentImg = this.images[this.index].img;
                if(this.images[this.index].position){
                    $(slideId).css('object-position', this.images[this.index].position);
                }
                this.index++;
                setTimeout(this.slideshow, this.speed);
            }
        }
    },
    template:
    `<div class="slideshow-container">
        <h1 v-show=head class="top yellow title-font">Sustainable Supercomputing</h1>
        <h1 v-show=!head class="top green title-font">Supercomputers Drive Sustainablilty</h1>
        <img :id="id" class="splash-img" :src="currentImg">
        <div class="center body-font shadow-text">{{ memo }}</div>
        <div class="tubie-container">
            <tubie-overlay id="tubie-show" :display="tubie"/>
        </div>
        <div class="banner red">
            <div class="next-section" @click="switchOut()"></div>
            <p v-show=head class="title-font">See how supercomputers drive a sustainable future</p>
            <p v-show=!head class="title-font">Sustainable supercomputing</p>
        </div>
    </div>`
}