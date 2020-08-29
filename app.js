//register components
Vue.component('building-future', buildingFuture)
Vue.component('did-you-know', didYouKnow)
Vue.component('slideshow-component', slideshowComponent)
Vue.component('tubie-overlay', tubieOverlay)
Vue.component('modal-overlay', modalOverlay)


//Vue
var app = new Vue({
    el: '#app',
    data:{
        title:"",
        drive:"",
        sustainable:""
    },
    mounted: function(){
        this.GetData();
        //this.resetTimer();
    },
    
    methods:{
        GetData: function(){
            fetch("./content/Data.json",{
                mode: 'cors'
            })
            .then(response => response.json())
            .then(data =>{
                this.title = data.title;
                this.drive = data.drive;
                this.sustainable = data.sustainable;
                //console.log(this.drive);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
         //Timer modal functions
        resetTimer:function(){
            clearTimeout(this.t);
            clearTimeout(this.afk);
            if(this.active){
                this.t = setTimeout(this.toAlert, this.timeData.timeout);
                //console.log("timer set");
            }
            else if(this.active==null){
                this.active=true;
            }
            document.onmousedown = this.resetTimer;
        }
    }
})