var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','display','position'],
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
    `<div v-if="display!=null && display.image!=null" :class="(position!='left' ? 'tubie-wrapper' : 'tubie-wrapper-left')">
        <img v-if="display.header" tabindex="0" data-toggle="popover" data-placement="top" data-trigger="focus" :title="display.header" :data-content="display.body"  :src="display.image">

        <img v-else @click="seturl" :src="display.image">
    </div>`
}