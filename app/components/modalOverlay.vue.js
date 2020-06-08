var modalOverlay= {
    name:"modal-overlay",
    props:['countDown'],
    data:function(){
        return{
            count: 3,
            active: false
        }
    },
    methods:{
        activated:function(){
            this.active = true;
        },
        timer:function(){
            if(this.count > 0){
                setTimeout(()=> {
                    this.count -= 1;
                    this.timer()
                }, 1000)
            }
        }
    },
    template:
    `<div class="modal" id="modalTemp" tabindex="-1" role="dialog">
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