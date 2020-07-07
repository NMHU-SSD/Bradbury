var modalOverlay= {
    name:"modal-overlay",
    props:['countdown', 'id', 'exitout','message'],
    data:function(){
        return{
            count:null,
            title: null
        }
    },
    methods:{
        setPurpose:function(){
            if(this.exitout){
                return 'true';
                this.reset();
            }else{
                return 'static';
            }
        },
        timer:function(){
            if(this.count > 0){
                setTimeout(()=> {
                    this.count -= 1;
                    this.timer();
                }, 1000);
            }
        },
        reset:function(){
            this.count = Math.floor(this.countdown / 1000);
        },
        geturl:function(url){
            $("#modalVideo").attr('src', url.link);
            this.title=url.videoTitle;
        },
        stopVideo:function(){
            $("#modalVideo").attr('src', '');
        }
    },
    template:
    `<div :id="id" class="modal fade" tabindex="-1" role="dialog" :data-backdrop="(exitout=='true' ? 'true' : 'static')" @:displayModal="timer">
      <div v-if="message" class="modal-dialog modal-xl modal-dialog-centered" role="document">

        <div v-if="id=='modalTimer'" class="modal-content">
          <div class="modal-header d-block">
            <h5 class="modal-title">{{ message.header }}</h5>
          </div>
          <div class="modal-body">
            <p>{{ message.body }}{{ count }}</p>
          </div>
        </div>

        <div v-if="id=='modalVideo'" class="modal-content">
          <div class="modal-body">
            <div class="web-wrapper">
                <iframe id="modalVideo" src="" frameborder=0></iframe>
            </div>
          </div>
          <div class="modal-footer">
            <h1 class="mr-auto">{{ title }}</h1>
            <button @click="stopVideo" type="button" class="btn btn-secondary btn-lg mr-1" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>`
}