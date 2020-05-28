var CarouselComponent = {
    name: "carouselComponent",
    props: ['contents'],
    template:
    `<div v-if="contents > 0">
        <div v-for="(content,index) in contents" id="carouselMain" class="carousel slide" data-ride="carousel" data-interval=false>

            <div v-for="slide in content" :class="['carousel-item', (index===0 ? 'active' : '')]">
                <img class="d-block w-100" src="https://picsum.photos/1000/400" alt="First slide">
                <!--div class="carousel-caption">
                    <div class="row">
                        <h1>Title</h1>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>Bobdy</p>       
                        </div>
                        <!--div class="col">
                            <div class="img-wrapper">
                                <img :src="slide.featuredMedia.src">
                            </div>
                            <p>{{ slide.featuredMedia.caption }}</p>
                        </div>
                    </div>
                </div-->
            </div>

            <a class="carousel-control-prev" href="#carouselMain" role="button" data-slide="prev">
                <span aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselMain" role="button" data-slide="next">
                <span aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>

        </div>
    </div>`
}