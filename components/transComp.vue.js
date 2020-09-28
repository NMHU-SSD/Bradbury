var transComp= {
    name: "trans-comp",
    props: ['id', 'header','slides'],
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
        seturl:function(url){
            this.$emit('seturl', url);
        },
        setcover:function(index){
            this.$emit('setcover', index);
        },
        selected:function(){
            console.log("selected");
            //this.$emit('selected', this.id);
        }
    },
    template:
    `<div class="background green size">
        <img :src=header class="comp-header">
        <p class="title-text-box half-shadow"></p>
        <div class="left-circle circle" @click="setcover(0)">
        </div>
        <div class="right-circle circle" @click="setcover(0)">
        </div>
    </div>`
}