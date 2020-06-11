var modalOverlay= {
    name:"modal-overlay",
    props:['countdown'],
    data:function(){
        return{
            count: 0,
            active: false
        }
    },
    mounted:function(){
        this.reset();
    },
    methods:{
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
        }
    },
    template:
    `<div class="modal center" id="modalTemp" tabindex="-1" role="dialog" v-on:displayModal="timer">
      <div class="modal-dialog helper" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Are you still there?</h5>
          </div>
          <div class="modal-body">
            <p>Press screen before {{ count }}</p>
          </div>
        </div>
      </div>
    </div>`
}