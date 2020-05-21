//routes
var routes = [
    {path:'/', component: ComponentBox}
];

//router
var router = new VueRouter({
    routes: routes,
    base:'/'
});

//Vue
var app = new Vue({
    el: '#app',
    router: router,
    data:{
        contents:[]
    },
    mounted: function(){
        this.GetData()
    },
    methods:{
        GetData: function(){
            fetch("./DemoData.json")
            .then(response => response.json())
            .then(data =>{this.contents = data.contents; 
            })
            .catch((error) => {console.error('Error:', error);
            });
        }
    }
})