var buildingFuture = {
    name: "building-future",
    props: ['slides', 'header', 'height', 'slideSpeed','timeout','quitout'],
    data: function(){
        return{
            t: null,
            afk: null
        }
    },
    mounted:function(){
        this.setTimer()
    },
    methods:{
        //Timer functions
        setTimer:function(){
            window.onload = this.resetTimer;
            document.onmousemove = this.resetTimer;
        },
        resetTimer:function(){
            clearTimeout(this.t);
            this.t = setTimeout(this.toAlert, this.timeout);
            clearTimeout(this.afk);
            $('#carouselHistory').carousel({
                pause: false
            });
        },
        toAlert:function(){
            console.log("timer");
            this.afkTimer();
        },
        afkTimer:function(){
            this.afk = setTimeout(this.toDefault, this.quitout);
            document.onmousemove = this.setTimer;
        },
        toDefault:function(){
            console.log("defaulted");
            $('#carouselHistory').carousel(0);
            $('#carouselHistory').carousel('pause');
        },
    },
    template:
    `<div id="carouselHistory" class="carousel" data-ride="carousel" :data-interval="slideSpeed">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                  <div v-if="index==0" class="carousel-caption">
                    <div class="kens-wrapper title-screen">
                        <img :src="slide.media">
                    </div>
                  </div>

                  <div v-if="index!=0" class="carousel-caption">
                      <div class="banner">
                          <div class="yellow"></div>
                          <div class="red"></div>
                          <!--img :src="header" class="banner-img-top"-->
                      </div>
                      <div class="row">
                          <div class="col-6">
                              <div class="kens-wrapper img-main-large img-shadow">
                              <img :src="slide.media">
                              </div>
                          </div>
                          <div class="col side-widget">
                              <h3 v-if="slide.title">{{ slide.title }}</h3>
                              <p v-if="slide.body">{{ slide.body }}</p>
                          </div>
                      </div>
                  </div>
                </div>
            
        </template>
    </div>
  

  <a class="carousel-control-prev" href="#carouselHistory" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselHistory" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}