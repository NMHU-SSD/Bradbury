var timeLine={
    name:"time-line",
    props:['height','tubie'],
    template:
    `<div id=timeline :style="{height: this.height}">
        <div class="timeline-banner">
            <div class="timeline-header red">
                <h4>Legacy of Women in \n Los Alamos Computing</h4>
                <h2>Explore the timeline</h2>
            </div>
            <div class="tubie-container-left">
                <tubie-overlay id="tubie-timeline" :display="tubie" position="left"/>
            </div>
        </div>

        <div class="outer-holder">
            <div class="timeline-holder">
                <!--iframe src="https://www.google.com/"/-->
                <iframe class="yellow"/>
            </div>
        </div>
    </div>`
}