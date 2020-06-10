var buildingFuture = {
    name: "building-future",
    props: ['slides', 'header', 'height', 'speed'],
    
    template:
    `<div id="carouselHistory" class="carousel" data-ride="carousel" :data-interval="speed">
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
                              <h3 v-if="slide.title" class="content-head">{{ slide.title }}</h3>
                              <p v-if="slide.body" class="content-body">{{ slide.body }}</p>
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