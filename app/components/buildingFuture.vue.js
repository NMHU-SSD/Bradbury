var buildingFuture = {
    name: "building-future",
    props: ['slides'],
    template:
    `<div id="carouselHistory" class="carousel" data-ride="carousel" data-interval="30000">
        <div class="carousel-inner">
            <template v-for="(slide, index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >
                    <!--img src="https://picsum.photos/1000/800" class="d-block w-100" alt="..."-->

                  <div class="carousel-caption">
                      <div class="row">
                          <!--img src="https://picsum.photos/700/200"-->
                          <div class="col-6">
                              <div class="kens-wrapper img-main-large img-shadow">
                              <img :src="slide.media">
                              </div>
                          </div>
                          <div class="col">
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