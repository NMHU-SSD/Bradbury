var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','lines'],
    template:
    `<div :id="id" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">

        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">I am Tubie</h5>
          </div>
          <div class="modal-body" style="height: 800px">
            <p>This is a hint to provide a tutorial</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary btn-lg">Hold</button>
          </div>
        </div>

      </div>
    </div>`
}