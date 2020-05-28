//register components
Vue.component('carouselComponent', CarouselComponent)

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
            fetch("./Data.json")
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