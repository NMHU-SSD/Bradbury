var buildingFuture = {
    name: "building-future",
    props: ['slides', 'header'],
    template:
    `<div id="carouselHistory" class="carousel" data-ride="carousel" data-interval="30000">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >

                  <div class="carousel-caption">
                      <div class="banner">
                          <div class="yellow"></div>
                          <div class="red"></div>
                          <img :src="header" class="banner-img-top">
                      </div>
                      <div class="row">
                          <div class="col-6">
                              <div class="kens-wrapper img-main-large img-shadow">
                              <img :src="slide.media">
                              </div>
                          </div>
                          <div class="col side-widget">
                              <h3>{{ slide.title }}</h3>
                              <p>{{ slide.body }}</p>
                          </div>
                      </div>
                  </div>
                </div>
            
        </template>
    </div>
  

  <a class="carousel-control-prev" href="carouselHistory" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="carouselHistory" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}