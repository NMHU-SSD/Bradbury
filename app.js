//register components
Vue.component('carousel-component', CarouselComponent)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        sustainSupercomputing:"",
        drivesSupercomputing:""
    },
    mounted: function(){
        this.GetData()
    },
    
    methods:{
        GetData: function(){
            fetch("./Data.json")
            .then(response => response.json())
            .then(data =>{
                this.sustainSupercomputing = data.sustainSupercomputing;
                this.drivesSupercomputing = data.drivesSupercomputing;
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
})