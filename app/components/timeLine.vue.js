var timeLine={
    name:"time-line",
    props:['id','tubie','webpage','title','subtitle'],
    methods:{
        seturl:function(){
            this.$emit('seturl', {'video':this.tubie, 'active':false});
        },
        selected:function(){
            this.$emit('selected', this.id);
            this.$emit('othervids', {'prev':null, 'next':null, 'index':0});
        }
    },
    template:
    `<div :id=id @click="selected">
        
        <div class="timeline-banner">
            <div v-if="tubie!=null" class="tubie-container-left">
                <tubie-overlay id="tubie-timeline" :display="tubie" spec="vid" @seturl="seturl"/>
            </div>
            <div class="timeline-header red row no-gutters">
                <h2 class="offset-4 offset-sm-3 col-8 col-sm-6 align-self-center title-font">{{ title }}</h2>
                <h4 class="d-none d-sm-block col align-self-center mr-3 body-font">{{ subtitle }}</h4>
            </div>
        </div>

        <div class="timeline-holder">
            <iframe :src="webpage" width="800" height="600" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
    </div>`
}