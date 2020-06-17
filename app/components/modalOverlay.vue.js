var modalOverlay= {
    name:"modal-overlay",
    props:['countdown', 'id', 'exitout'],
    data:function(){
        return{
            count: 0,
            active: false
        }
    },
    mounted:function(){
        
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
            console.log(url);
            $("#modalVideo").attr('src', url);
        },
        stopVideo:function(){
            $("#modalVideo").attr('src', '');
        }
    },
    template:
    `<div :id="id" class="modal" tabindex="-1" role="dialog" :data-backdrop="(exitout=='true' ? 'true' : 'static')" @:displayModal="timer">
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">

        <div v-if="id=='modalTimer'" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Are you still there?</h5>
          </div>
          <div class="modal-body">
            <p>Press screen before {{ count }}</p>
          </div>
        </div>

        <div v-if="id=='modalVideo'" class="modal-content">
          <div class="modal-body">
            <div class="web-wrapper">
                <iframe id="modalVideo" src="" frameborder=0></iframe>
            </div>
          </div>
          <div class="modal-footer">
            <h2 class="mr-auto">Video Title Here</h2>
            <button @click="stopVideo" type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>`
}