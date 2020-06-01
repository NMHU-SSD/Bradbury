var womanComputing = {
    name: "woman-computing",
    props: ['slides'],
    template:
    `<div id="carouselComputing" class="carousel" data-ride="carousel" data-interval="30000">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                    <!--img src="https://picsum.photos/1000/800" class="d-block w-100" alt="..."-->

                  <div class="carousel-caption">
                      <div class="row">
                          <div class="col-8 img-main">
                              <div class="kens-wrapper img-main">
                              <img :src="slide.media.main" class="">
                              </div>
                          </div>
                          <div class="col-4 side-widget">
                              <h3>{{ slide.title }}</h3>
                              <p>{{ slide.body }}</p>
                              <img :src="slide.media.minor" class="img-widget img-shadow">
                          </div>
                      </div>
                      <!--img src="https://picsum.photos/700/200"-->
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