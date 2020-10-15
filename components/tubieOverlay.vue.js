var tubieOverlay = {
    name:"tubie-overlay",
    props:['id','display','position'],
    data:function(){
        return{
            setRight:true,
            animationTime:200
        }
    },
    mounted:function(){
        this.initTubie();
    },
    methods:{
        initTubie:function(){
            $('[data-toggle="popover"]').popover();
        },
        seturl:function(data){
            //this.$emit('seturl');
            console.log(data);
        },
        hopAnimation:function(){
            var tubieId = $('#'+this.id);
            $(tubieId).css({'margin-top':'-10%', 'transition':this.animationTime+'ms'});
            setTimeout(function(){$(tubieId).css('margin-top', '0');}, this.animationTime);
        //data-trigger="focus"
        }
    },
    template:
    `<div :id="id" :class="['tubie-wrapper tubie-'+position]" @click="hopAnimation">
        <div class="tubie-img" data-container="body" tabindex="0" data-toggle="popover" 
            data-placement="top"  data-html="true" :title="display.body" 
            data-content="<img src='assets/customs/VideoPlaybutton-black.png' class='play-img'>
            <p class='body-font redtext'>WATCH VIDEO</p>"
        />
    </div>`
}