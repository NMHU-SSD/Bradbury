//register components
Vue.component('carousel-component', CarouselComponent)
Vue.component('slideshow-component', SlideshowComponent)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        zones:[]
    },
    mounted: function(){
        this.GetData()
    },
    
    methods:{
        GetData: function(){
            fetch("./content/Data.json")
            .then(response => response.json())
            .then(data =>{
                this.zones = data.zones;
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
})