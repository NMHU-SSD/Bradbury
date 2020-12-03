var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','display','position','spec'],
    data:function(){
        return{
            setRight:true,
            animationTime:200,
            vid:false
        }
    },
    mounted:function(){
        if(this.display.video != undefined){
            this.vid = true;
        }
        this.initTubie();
    },
    updated:function(){
        this.videoButton();
    },
    methods:{
        initTubie:function(){
            //inject footer html
            var foot = ""
            if(this.vid){
                foot = "<div class='footer-div'>"+
            "<img src='assets/customs/VideoPlaybutton-black.png' class='play-img'>"+
            "<p class='body-font redtext'>WATCH VIDEO</p></div>";
            }
            
            $('#pop-'+this.id).popover({
                html:true,
                content: foot
            });
            
            //add on click listener
            $(document).on("click", ".popover #"+this.id, this.seturl);
        },
        seturl:function(){
            this.$emit('seturl');
        },
        hopAnimation:function(){
            var tubieId = $('#'+this.id);
            $(tubieId).css({'margin-top':'-10%', 'transition':this.animationTime+'ms'});
            setTimeout(function(){$(tubieId).css('margin-top', '0');}, this.animationTime);
        },
        videoButton:function(){
            //id play button
            $('.play-img').attr('id',this.id);
            //data-trigger="focus"
        }
    },
    template:
    `<div :id="id" :class="['tubie-wrapper tubie-'+position]" @click="hopAnimation()+videoButton()">
        <div :id="'pop-'+id" :class="'tubieBasic tubie-'+spec" data-container="body" tabindex="0" data-toggle="popover" 
            data-trigger="focus" data-placement="top" :title="display.body"/>
    </div>`
}