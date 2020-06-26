var theirWords = {
    name: "their-words",
    props: ['videos','note','header'],
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
    `<div class="container-fluid">
            <div class="row">
                <div class="col-6">
                    <div class="row vid-top">
                        <div v-for="video in (videos || []).slice(0, 2)" class="col">
                            <img src="https://picsum.photos/700/400" class="vid-thumb shadow" @click="seturl(test)">
                        </div>
                    </div>
                    <div class="row">
                        <div v-for="video in (videos || []).slice(2,4)" class="col">
                            <img src="https://picsum.photos/700/400" class="vid-thumb shadow">
                        </div>
                    </div>
                    <div class="row">
                        <div v-for="video in (videos || []).slice(4,6)" class="col">
                            <img src="https://picsum.photos/700/400" class="vid-thumb shadow">
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <img class="words-header" :src="header">
                    <p class="content-body">{{ note }}</p>
                </div>
            </div>
        </div>`
}