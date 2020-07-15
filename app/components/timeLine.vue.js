var timeLine={
    name:"time-line",
    props:['id','tubie','webpage'],
    methods:{
        seturl:function(){
            this.$emit('seturl', this.tubie);
        },
        selected:function(){
            this.$emit('selected', this.id);
        }
    },
    template:
    `<div :id=id @click="selected">
        
        <div class="timeline-banner">
            <div v-if="tubie!=null" class="tubie-container-left">
                <tubie-overlay id="tubie-timeline" :display="tubie" @seturl="seturl"/>
            </div>
            <div class="timeline-header red row no-gutters">
                <h2 class="offset-4 offset-md-3 col-8 col-md-6 align-self-center title-font">Explore the timeline</h2>
                <h4 class="d-none d-sm-block col align-self-center ml-2 mr-3 body-font">Legacy of Women in \n Los Alamos Computing</h4>
            </div>
        </div>

        <div class="timeline-holder">
            <iframe :src="webpage" width="800" height="600" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
    </div>`
}