var transComp= {
    name: "trans-comp",
    props: ['id', 'data','tubie'],
    data:function(){
        return{
            
        }
    },
    methods:{
        reset:function(){
            //console.log(this.id);
            this.first=true;
            this.end=false;
            $("#carousel-"+this.id).carousel(0);
            this.jumpSlide(0);
        },
        seturl:function(index,modal){
            this.$emit('seturl', {index:index, ob:modal});
        }
    },
    template:
    `<div :id="id" class="carousel background tfc size">
        <img :src=data.header class="comp-header">
        <p class="title-text-box body-font half-shadow">{{ data.body }}</p>
        <div class="left-circle circle dark-yellow">
            <div class="tubie-circle tubie-circle-left">
                <tubie-overlay id="tubie-been" :display="tubie.tubie_been" position="none" 
                @seturl="seturl(tubie.tubie_been.video,0)"/>
            </div>
            <ol class="carousel-indicators">
                <li v-for="(slide, index) in data.been" class="yellow" @click="seturl(index,1)"></li>
            </ol>
        </div>
        <div class="right-circle circle yellow">
            <div class="tubie-circle tubie-circle-right">
                <tubie-overlay id="tubie-headed" :display="tubie.tubie_headed" position="none" 
                @seturl="seturl(tubie.tubie_headed.video,0)"/>
            </div>
            <ol class="carousel-indicators">
                <li v-for="(slide, index) in data.headed" class="dark-yellow" @click="seturl(index,2)"></li>
            </ol>
        </div>
    </div>`
}