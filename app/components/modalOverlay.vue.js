var modalOverlay= {
    name:"modal-overlay",
    props:['countdown'],
    data:function(){
        return{
            count: 3,
            active: false
        }
    },
    methods:{
        timer:function(){
            if(this.count > 0){
                setTimeout(()=> {
                    this.count -= 1;
                    this.timer()
                }, 1000);
            }
            //this.reset();
        },
        reset:function(){
            this.count = 3;
        }
    },
    template:
    `<div class="modal" id="modalTemp" tabindex="-1" role="dialog" v-on:displayModal="timer">
      <div class="modal-dialog" role="document">
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