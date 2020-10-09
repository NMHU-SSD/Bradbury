var transComp= {
    name: "trans-comp",
    props: ['id', 'data'],
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
        },
        selected:function(){
            console.log("selected");
            //this.$emit('selected', this.id);
        }
    },
    template:
    `<div :id="id" class="carousel background tfc size">
        <img :src=data.header class="comp-header">
        <p class="title-text-box body-font half-shadow">{{ data.body }}</p>
        <div class="left-circle circle dark-yellow">
            <ol class="carousel-indicators">
                <li v-for="(slide, index) in data.been" class="yellow" @click="seturl(index,1)"></li>
            </ol>
        </div>
        <div class="right-circle circle yellow">
            <ol class="carousel-indicators">
                <li v-for="(slide, index) in data.headed" class="dark-yellow" @click="seturl(index,2)"></li>
            </ol>
        </div>
    </div>`
}