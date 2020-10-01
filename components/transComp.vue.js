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
        seturl:function(index){
            url = this.slides[index].video;
            this.$emit('seturl', {index,url});
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
        <div class="left-circle circle" @click="seturl(0)">
        </div>
        <div class="right-circle circle" @click="seturl(0)">
        </div>
    </div>`
}