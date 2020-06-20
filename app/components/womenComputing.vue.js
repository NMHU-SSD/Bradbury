var womanComputing = {
    name: "woman-computing",
    props: ['slides', 'helper', 'header', 'height', 'speed','id'],
    data:function(){
        return{
            active:false
        }
    },
    mounted:function(){
    },
    methods:{
        toggle:function(){
            this.active = !this.active;
            if(this.active){
                $('#'+this.id).carousel('cycle');
            }else{
                $('#'+this.id).carousel(0);
                $('#'+this.id).carousel('pause');
            }
        },
        paused:function(){
            //this.active = false;
            //$('#'+this.id).carousel('pause');
        },
        tubieClicked:function(index){
            this.$emit('tubieclicked', index);
        }
    },
    template:
    `<div :id="id" style="height: 756px;" class="carousel" data-ride="carousel" data-wrap=false :data-interval="speed">
        <div class="carousel-inner" @click="toggle">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]">
                  
                  <div v-if="index==0" class="carousel-caption">
                    
                    <div class="row">
                        <div class="col-4">
                            <div class="img-main-large img-shadow red">
                                <h2>TEST TEXT</h2>
                            </div>
                        </div>
                        <div class="col">
                            <div class="kens-wrapper title-screen">
                                <img :src="slide.medias.main">
                            </div>
                        </div>
                    </div>
                  </div>

                  <div v-if="index!=0" class="carousel-caption">
                      <div class="row no-gutters">
                          <div class="col-3">
                              <h3 class="content-head">{{ slide.title }}</h3>
                          </div>
                          <div class="col-6 img-main inner-shadow">
                              <div class="kens-wrapper img-main">
                              <img :src="slide.medias.main" class="">
                              </div>
                          </div>
                          <div class="col-3">
                              <div class="red" style="height: 7%;"></div>
                              <p class="content-body">{{ slide.body }}</p>
                              <button type="button" class="img-tubie" data-toggle="modal" data-target="#tubie" @click="tubieClicked(index)">
                                  <div class="tubie-wrapper">
                                      <img src="Toobie/Toobie_solo2.png">
                                  </div>
                              </button>
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
    
    <ol class="carousel-indicators">
        <li v-for="(slide, index) in slides" :data-target="['#' + id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')"></li>
    </ol>

  <a class="carousel-control-prev" :href="['#' + id]" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" :href="['#' + id]" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}