var carouselCom = {
    name: "carousel-com",
    props:['id','slide'],
    data:function(){
        return{
            lastScroll:null
        }
    },
    methods:{
        imgPosition:function(position){
            if(position != undefined){
                return "object-position: "+position;
            }else{
                return "";
            }
        },
        getLastScroll:function(){
            this.$emit('getLast',this.lastScroll);
        },
        handleScroll: function(el) {
            this.lastScroll = el.srcElement.id;
            //console.log(el.srcElement.id);
        }
    },
    watch:{
        lastScroll:function(){
            console.log(this.lastScroll);
        }
    },
    template:
    `<div class="row row-full no-gutters">
          <!--div class="col-12 col-sm-6 col-xl-9 img-main pic-holder">
              <img :src="slide.media" :style="imgPosition(slide.position)" :alt="slide.alt" >
          </div-->
          <div :id="'text'+id+index" class="col text-side offset-2 offset-sm-0" @scroll="handleScroll">
              <!--p v-if="slide.body" class="content-body content-pad">{{ slide.body }}</p-->
          </div>
    </div>`
}