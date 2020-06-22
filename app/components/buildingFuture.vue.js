var buildingFuture = {
    name: "building-future",
    props: ['id', 'slides',  'speed', 'header', 'height'],
    data:function(){
        return{
            fade:true,
            img:0,
            currentImg:null
        }
    },
    template:
    `<div :id="id" :style="{height: this.height}" class="carousel" data-ride="carousel" data-interval=false>
        <div class="carousel-inner gradient-green">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >

                    <div class="row">
                          <div class="col-4 red">
                              <div class="img-main-large circle-wrap img-shadow">

                                <div v-if="index==0">
                                    <slideshow-component :images="slide.media"/>
                                </div>

                                <img v-else :src="slide.media">
                              </div>
                          </div>
                          <div class="col side-widget">
                              <h3 v-if="slide.title" class="content-head">{{ slide.title }}</h3>
                              <p v-if="slide.body" class="content-body">{{ slide.body }}</p>

                              <button v-if="index!=0" type="button" class="img-tubie" data-toggle="modal" data-target="#tubie" @click="tubieClicked(index)">
                                  <div class="tubie-wrapper">
                                      <img src="Toobie/Toobie_solo2.png">
                                  </div>
                              </button>
                          </div>
                      </div>
                          <div class="banner yellow"></div>

                </div>          
        </template>
    </div>
  
    <ol class="carousel-indicators">
        <li v-for="(slide, index) in slides" :data-target="['#' + id]" :data-slide-to="index" :class="(index==0 ? 'active' : '')"></li>
    </ol>

  <a class="carousel-control-prev" :href="['#' + id]" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon carousel-icons" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" :href="['#' + id]" role="button" data-slide="next">
    <span class="carousel-control-next-icon carousel-icons" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}