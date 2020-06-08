//register components
Vue.component('womanComputing', womanComputing)
Vue.component('buildingFuture', buildingFuture)
Vue.component('theirWords', theirWords)
Vue.component('modalOverlay', modalOverlay)

//Vue
var app = new Vue({
    el: '#app',
    data:{
        womenComputingData:"",
        buildingFutureData:"",
        inTheirWordsData:"",
        slideSpeed:4000,
        timeout:3000,
        quitout:3000
    },
    mounted: function(){
        this.GetData()
    },
    
    methods:{
        GetData: function(){
            fetch("womenInComputingData.json")
            .then(response => response.json())
            .then(data =>{
                this.womenComputingData = data.womenComputingData;
                this.buildingFutureData = data.buildingFutureData;
                this.inTheirWordsData = data.inTheirWordsData;
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
})