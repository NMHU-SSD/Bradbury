var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','display'],
    data:function(){
        return{
            setRight:true,
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
        }
    },
    template:
    `<div v-if="display!=null" class="tubie-wrapper">
        <div v-if="display.header" class="tubie-img" data-container="body" tabindex="0" data-toggle="popover" data-placement="top" data-trigger="focus" :title="display.header" :data-content="display.body"/>

        <div v-else class="tubie-img-left" @click="seturl"/>
    </div>`
}