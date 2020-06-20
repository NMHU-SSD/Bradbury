var theirWords = {
    name: "their-words",
    props: ['videos','note'],
    data:function(){
        return{
            timeline: true,
            test:'https://www.youtube.com/watch?v=s_4rIQmOw28'
        }
    },
    methods:{
        seturl:function(url){
            this.$emit('seturl', url);
        }
    },
    template:
    `<div id="theirWords">
        <div class="container-fluid">
            <div class="row vid-top">
                <div v-for="video in (videos || []).slice(0, 3)" class="col">
                    <img src="https://picsum.photos/700/400" class="vid-thumb shadow" @click="seturl(test)">
                </div>
            </div>
            <div class="row">
                <div v-for="video in (videos || []).slice(3)" class="col">
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