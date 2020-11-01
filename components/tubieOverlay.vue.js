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
        active:function(){
            this.$emit('active');
        },
        hopAnimation:function(){
            var tubieId = $('#'+this.id);
            $(tubieId).css({'margin-top':'-10%', 'transition':this.animationTime+'ms'});
            setTimeout(function(){
                $(tubieId).css('margin-top', '0');}, this.animationTime);
            //data-trigger="focus"
        }
    },
    template:
    `<div :id="id" class="tubie-wrapper" @click="hopAnimation">
        <div :class="'interest tubie-'+spec" data-container="body" tabindex="0" data-toggle="popover" data-placement="top" 
         data-trigger="focus" :title="display.header" :data-content="display.body"/>
    </div>`
}