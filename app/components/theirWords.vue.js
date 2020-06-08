var theirWords = {
    name: "their-words",
    props: ['videos1','videos2','note'],
    template:
    `<div style="height: 700px;">
        <div class="container">
            <div class="row vid-top">
                <div v-for="video in videos1" class="col">
                    <img src="https://picsum.photos/300/170" class="vid-thumb shadow">
                </div>
            </div>
            <div class="row">
                <div v-for="video in videos2" class="col">
                    <img src="https://picsum.photos/300/170" class="vid-thumb shadow">
                </div>
            </div>
        </div>

              <h4 class="red-text">{{ note }}</h4>
              <div class="yellow"></div>
              <div class="red"></div>
              <!--img src="https://picsum.photos/700/170" class="banner-img"-->
        
    </div>`
}