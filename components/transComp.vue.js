var transComp= {
    name: "trans-comp",
    props: ['id', 'header','slides1','slides2'],
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
            this.$emit('seturl', {ob:modal, index:index});
            //console.log("Comp", index, modal);
        },
        selected:function(){
            console.log("selected");
            //this.$emit('selected', this.id);
        }
    },
    template:
    `<div class="carousel background green size">
        <img :src=header class="comp-header">
        <p class="title-text-box half-shadow"></p>
        <div class="left-circle circle dark-yellow">
            <ol class="carousel-indicators">
                <li v-for="(slide, index) in slides1" class="yellow" @click="seturl(index,1)"></li>
            </ol>
        </div>
        <div class="right-circle circle yellow">
            <ol class="carousel-indicators">
                <li v-for="(slide, index) in slides2" class="dark-yellow" @click="seturl(index,2)"></li>
            </ol>
        </div>
    </div>`
}