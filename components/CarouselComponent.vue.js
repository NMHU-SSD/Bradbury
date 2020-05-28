var CarouselComponent = {
    name: "carousel-component",
    props: ['slides', 'id'],
    template:
    `<div :id="'carouselMain'+id" class="carousel slide" data-ride="carousel" >
        <div class="carousel-inner">
            <template v-for="(slide,index) in slides">
                <div :class="['carousel-item', (index==0 ? 'active' : '')]" >

                  <!-- <img src="https://picsum.photos/1000" class="d-block w-100" alt="..."> -->

                  <div class="carousel-caption">
                    <h5>{{slide.title}}</h5>
                    <div class="row">
                        <div class="col">
                            <p>{{slide.body}}</p>
                        </div>
                        <div class="col" v-if="slide.featuredMedia">
                            <div class="img-wrapper">
                                <img :src="slide.featuredMedia.src">
                            </div>
                            <p>{{ slide.featuredMedia.caption }}</p>
                        </div>
                        <div class="col-6" v-if="slide.video">
                            <div class="vid-wrapper">
				  				<iframe :src="slide.video" frameborder="0" allow="picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            
        </template>
    </div>
  

  <a class="carousel-control-prev" :href="'#carouselMain'+id" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" :href="'#carouselMain'+id" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>`
}