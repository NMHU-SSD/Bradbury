var CarouselComponent = {
    name: "carouselComponent",
    props: ['contents'],
    template:
    `<div id="carouselMain" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselMain" data-slide-to="0" class="active"></li>
            <li data-target="#carouselMain" data-slide-to="1"></li>
        </ol>

        <div class="carousel-inner">
    <div v-for="content in contents" class="carousel-item active">
        <img class="d-block w-100" src="https://picsum.photos/1000/400" alt="First slide">
        <div class="carousel-caption">

            <div class="row">
                <h1>{{ content.title }}</h1>
            </div>
            <div class="row">
                <div class="col">
                    <p>{{ content.body }}</p>       
                </div>
                <div class="col">
                    <div class="img-wrapper">
                        <img :src="content.featuredMedia.src">
                    </div>
                    <p>{{ content.featuredMedia.caption }}</p>
                </div>
            </div>
        </div>
    </div>
        </div>

        <a class="carousel-control-prev" href="#carouselMain" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselMain" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>`
}