var womanComputing = {
    name: "woman-computing",
    props: ['slides', 'header'],
    template:
    `<div id="carouselComputing" class="carousel" data-ride="carousel" data-interval="30000">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >

                  <div class="carousel-caption">
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
                          <img :src="header" class="banner-img-left">
                      </div>
                  </div>
                </div>
            
        </template>
    </div>
  

  <a class="carousel-control-prev" href="carouselComputing" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="carouselComputing" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}