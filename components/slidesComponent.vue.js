var slidesComponent={
    name:"slides-component",
    props:['images','speed','id','tubie','title1','title2','memo1','memo2'],
    data:function(){
        return{
            index:0,
            currentImg: null,
            seconds: 0,
            head:true
        }
    },
    mounted:function(){
        //this.initShow();
        //setTimeout(this.changeMult, this.speed);
    },
    methods:{
        switchOut:function(){
            this.head= !this.head;
            this.$emit('switchout');
        },
        reset:function(){
            this.head= true;
        },
        slideshow:function(){
            var fadeId = $('#'+this.id);
            //$(fadeId).css('filter', 'brightness(0)');
            setTimeout(this.changeImg, 1000);
            setTimeout(function(){
                $(fadeId).css('filter', 'brightness(50%)')}, 1000);
            
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
            console.log(this.currentImg);
            //:style="'animation: kenburns 20s infinite'"
        }
    },
    watch:{
        images:function(){
            var slideId = $('#'+this.id);
            if(this.images!=null){
                this.currentImg = this.images[this.index].img;
                //console.log(this.id, this.currentImg);
                if(this.images[this.index].position){
                    $(slideId).css('object-position', this.images[this.index].position);
                }
                this.index++;
                setTimeout(this.slideshow, this.speed);
            }
        }
    },
    template:
    `
    <div id="top-slide" class="slideshow-container whitetext">
            <h1 v-show=head class="top yellow title-font shadow-text-big">Sustainable Supercomputing</h1>
            <h1 v-show=!head class="top green title-font">Supercomputers Drive Sustainablilty</h1>
            <img :id="id" :src="currentImg">
            <div v-show=head class="center body-font shadow-text">{{ memo1 }}</div>
            <div v-show=!head class="center body-font shadow-text">{{ memo2 }}</div>
            <div class="tubie-container">
                <tubie-overlay id="tubie-show" :display="tubie" spec="def"/>
            </div>
            <div class="banner red">
                <div class="interest next-section" @click="switchOut()"></div>
                <p v-show=head class="title-font">See how supercomputers drive a sustainable future</p>
                <p v-show=!head class="title-font">Sustainable supercomputing</p>
            </div>
        </div>`
}