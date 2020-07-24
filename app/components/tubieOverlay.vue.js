var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','display'],
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
            $('[data-toggle="popover"]').popover(); //data-trigger="focus"
        },
        seturl:function(){
            this.$emit('seturl');
        },
        hopAnimation:function(){
            var tubieId = $('#'+this.id);
            $(tubieId).css({'margin-top':'-10%', 'transition':this.animationTime+'ms'});
            setTimeout(function(){
                $(tubieId).css('margin-top', '0');}, this.animationTime);
        }
    },
    template:
    `<div v-if="display!=null" :id="id" class="tubie-wrapper" @click="hopAnimation">
        <div v-if="display.header" class="tubie-img" data-container="body" tabindex="0" data-toggle="popover" data-placement="top"  :title="display.header" :data-content="display.body"/>

        <div v-else class="tubie-img-left" @click="seturl"/>
    </div>`
}