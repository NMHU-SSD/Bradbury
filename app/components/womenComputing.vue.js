var womanComputing = {
    name: "woman-computing",
    props: ['slides', 'header', 'height', 'slideSpeed','timeout','quitout'],
    data: function(){
        return{
            t2: null,
            afk2: null,
            defaulted: true
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
            $('#carouselComputing').carousel({
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
            $('#carouselComputing').carousel(0);
            $('#carouselComputing').carousel('pause');
        }
    },
    components:{
        //modalOverlay: 'modalOverlay'
    },
    template:
    `<div id="carouselComputing" class="carousel" data-ride="carousel" data-wrap=false :data-interval="slideSpeed">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                  
                  <div v-if="index==0" class="carousel-caption">
                    <div class="kens-wrapper title-screen">
                        <img :src="slide.media.main">
                    </div>
                  </div>

                  <div v-if="index!=0" class="carousel-caption">
                      <div class="row no-gutters">
                          <div class="col-7 img-main inner-shadow">
                              <div class="kens-wrapper img-main">
                              <img :src="slide.media.main" class="">
                              </div>
                          </div>
                          <div class="col-5">
                              <div class="red" style="height: 50px;"></div>
                              <h3>{{ slide.title }}</h3>
                              <p>{{ slide.body }}</p>
                              <img :src="slide.media.minor" class="img-widget img-shadow">
                          </div>
                      </div>
                      <div class="banner-bottom">
                          <div class="yellow"></div>
                          <div class="red"></div>
                          <!--img :src="header" class="banner-img-left"-->
                      </div>
                  </div>
                </div>
            
        </template>
    </div>
  

  <a class="carousel-control-prev" href="#carouselComputing" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselComputing" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalTemp">Launch modal</button>
            <modal-overlay></modal-overlay>
</div>`
}