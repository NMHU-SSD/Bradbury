var timeLine={
    name:"time-line",
    props:['id','height','tubie','webpage'],
    methods:{
        seturl:function(){
            this.$emit('seturl', this.tubie.vid);
        },
        selected:function(){
            this.$emit('selected', this.id);
        }
    },
    template:
    `<div :id=id :style="{height: this.height}" @click="selected">
        
        <div class="timeline-banner">
            <div  v-if="tubie!=null" class="tubie-container-left">
                <tubie-overlay id="tubie-timeline" :display="tubie" @seturl="seturl" position="left"/>
            </div>
            <div class="timeline-header red row">
                <div class="col-3"/>
                <h2 class="col-6 title-font">Explore the timeline</h2>
                <h4 class="col col-sm-0 col-md-0">Legacy of Women in \n Los Alamos Computing</h4>
            </div>
        </div>

        <div class="timeline-holder">
            <iframe width="100%" height="auto" :src="webpage"></iframe>
        </div>
    </div>`
}