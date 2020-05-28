var TitleComponent={
    name:"titleComponent",
    props: ['contents'],
    /*mounted:{
        setID:function(){
            this.id = this._uid;
        }
    },*/
    template:
    `<div v-for="(content,index) in contents" :id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            
            <div class="carousel-item active">
                <img class="d-block w-100" src="https://picsum.photos/1000/400" alt="First slide">
                <div class="carousel-caption">
                    <div class="row">
                        <h1>H1 Title</h1>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>fjfjajf jfljfoein oivijfaoi ofijaieonfjfjajf jfljfoein oivijfaoi ofijaieonfjfjajf jfljfoein oivijfaoi ofijaieonfjfjajf jfljfoein oivijfaoi ofijaieon</p>                   
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="carousel-item">
                <img class="d-block w-100" src="https://picsum.photos/1000/400" alt="First slide">
                <div class="carousel-caption">
                    <div class="row">
                        <h1>H1 Title</h1>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>fjfjajf jfljfoein oivijfaoi ofijaieonfjfjajf jfljfoein oivijfaoi ofijaieonfjfjajf jfljfoein oivijfaoi ofijaieonfjfjajf jfljfoein oivijfaoi ofijaieon</p>                   
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
            
        <!-- Carousel Controls-->
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>`
}