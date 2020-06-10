var theirWords = {
    name: "their-words",
    props: ['videos1','videos2','note'],
    template:
    `<div id="theirWords">
        <div class="container-fluid">
            <div class="row vid-top">
                <div v-for="video in videos1" class="col">
                    <img src="https://picsum.photos/700/400" class="vid-thumb shadow">
                </div>
            </div>
            <div class="row">
                <div v-for="video in videos2" class="col">
                    <img src="https://picsum.photos/700/400" class="vid-thumb shadow">
                </div>
            </div>
        </div>

              <div class="banner-span">
                          <div class="yellow"></div>
                          <div class="red"></div>
                          <h4 class="red-text">{{ note }}</h4>
              </div>
              <!--img src="https://picsum.photos/700/170" class="banner-img"-->
        
    </div>`
}