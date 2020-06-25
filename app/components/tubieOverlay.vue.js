var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','display'],
    mounted:function(){
        this.initTubie();
    },
    methods:{
        initTubie:function(){
            $('[data-toggle="popover"]').popover();
        }
    },
    template:
    `<div class="tubie-wrapper">
        <img tabindex="0" data-toggle="popover" data-trigger="focus" :title="display.header" :data-content="display.body"  src="Toobie/Toobie_solo2.png">
    </div>`
}