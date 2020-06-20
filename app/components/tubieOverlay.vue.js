var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','display'],
    template:
    `<div :id="id" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">

        <div v-if="display!=null" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ display.header }}</h5>
          </div>
          <div class="modal-body" style="height: 800px">
            <p>{{ display.body }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>`
}