var transComp= {
    name: "trans-comp",
    props: ['id', 'data','tubie'],
    data:function(){
        return{
            
        }
    },
    methods:{
        reset:function(){
            this.first=true;
            this.end=false;
            $("#carousel-"+this.id).carousel(0);
            this.jumpSlide(0);
        },
        seturl:function(obj,modal){
            if(modal==0)
                this.$emit('seturl', {index:obj.video, ob:modal, caps:obj.captions});
            else
                this.$emit('seturl', {index:obj, ob:modal});
        }
    },
    template:
    `<div :id="id" class="carousel background tfc size">
        <img :src=data.header class="comp-header">
        <p class="title-text-box body-font content-body half-shadow">{{ data.body }}</p>
        <div class="left-circle circle dark-yellow">
            <div class="tubie-circle tubie-circle-left">
                <tubie-overlay id="tubie-been" :display="tubie.tubie_been" position="none" spec="def"
                @seturl="seturl(tubie.tubie_been,0)"/>
            </div>
            <ol class="carousel-indicators">
                <li v-for="(slide, index) in data.been" class="yellow" @click="seturl(index,1)"></li>
            </ol>
        </div>
        <div class="right-circle circle yellow">
            <div class="tubie-circle tubie-circle-right">
                <tubie-overlay id="tubie-headed" :display="tubie.tubie_headed" position="none" spec="dyk"
                @seturl="seturl(tubie.tubie_headed,0)"/>
            </div>
            <ol class="carousel-indicators">
                <li v-for="(slide, index) in data.headed" class="dark-yellow" @click="seturl(index,2)"></li>
            </ol>
        </div>
    </div>`
}