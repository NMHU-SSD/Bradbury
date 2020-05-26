var CarouselComponent = {
    name: "carouselComponent",
    props: ['contents'],
    computed:{
        hasTitle(){
            return this.contents();
        }
    },
    template:
    `<div v-if="contents.length > 0" id="carouselMain" class="carousel slide" data-ride="carousel" data-interval=false>
        
        <div class="carousel-inner">
            
            <div class="carousel-item active">
                <img class="d-block w-100" src="https://picsum.photos/500/400" alt="First slide">
                <div class="carousel-caption">
                    <div class="row">
                        <h1>{{ contents[0].title }}</h1>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>{{ contents[0].body }}</p>                   
                        </div>
                       <div class="col">
                            <div class="img-wrapper">
                                <img :src="contents[0].featuredMedia.src">
                            </div>
                            <p >{{ contents[0].featuredMedia.caption }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-for="content in contents.slice(1)" class="carousel-item">
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
                                <img :src="contents[0].featuredMedia.src">
                            </div>
                            <p>{{ content.featuredMedia.caption }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
            
        <a class="carousel-control-prev" href="#carouselMain" role="button" data-slide="prev">
            <span aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselMain" role="button" data-slide="next">
            <span aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>`
}