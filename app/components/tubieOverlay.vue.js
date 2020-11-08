var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','display','spec'],
    data:function(){
        return{
            setRight:true,
            animationTime:200
        }
    },
    mounted:function(){
        this.initTubie();
    },
    methods:{
        initTubie:function(){
            $('[data-toggle="popover"]').popover();
        },
        seturl:function(){
            this.$emit('seturl');
        },
        hopAnimation:function(){
            var tubieId = $('#'+this.id);
            $(tubieId).css({'margin-top':'-10%', 'transition':this.animationTime+'ms'});
            setTimeout(function(){
                $(tubieId).css('margin-top', '0');}, this.animationTime);
            console.log(this.display);
            //data-trigger="focus"
        }
    },
    template:
    `<div v-if="display!=null" :id="id" class="tubie-wrapper" @click="hopAnimation">
        <div v-if="spec=='vid'" class="tubie-img-left" @click="seturl"/>

        <div v-else class="tubie-img" data-container="body" tabindex="0" data-toggle="popover" data-placement="bottom" 
         data-trigger="focus" :title="display.header" :data-content="display.body"/>
    </div>`
}