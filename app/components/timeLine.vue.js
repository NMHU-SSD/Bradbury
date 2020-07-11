var timeLine={
    name:"time-line",
    props:['id','height','tubie','webpage'],
    methods:{
        seturl:function(){
            this.$emit('seturl', this.tubie);
        },
        selected:function(){
            this.$emit('selected', this.id);
        }
    },
    template:
    `<div :id=id :style="{height: this.height}" @click="selected">
        
        <div class="timeline-banner">
            <div class="timeline-header red row">
                <div v-if="tubie!=null" class="col-4 col-md-3 tubie-container-left">
                    <tubie-overlay id="tubie-timeline" :display="tubie" @seturl="seturl" position="left"/>
                </div>
                <h2 class="col-8 col-md-6 align-self-center title-font">Explore the timeline</h2>
                <h4 class="col align-self-center mr-1 body-font">Legacy of Women in \n Los Alamos Computing</h4>
            </div>
        </div>

        <div class="timeline-holder">
            <!--iframe width="100%" height="auto" :src="webpage"></iframe-->
        </div>
    </div>`
}