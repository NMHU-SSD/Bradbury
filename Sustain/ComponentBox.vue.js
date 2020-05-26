var ComponentBox = {
    name: "componentBox",
    props:['contents'],
    template: 
    `<div v-for="content in contents" class="carousel-item active">
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
    </div>`
}