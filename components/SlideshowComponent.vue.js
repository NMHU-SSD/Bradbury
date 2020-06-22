var SlideshowComponent = {
    name: "slideshow-component",
    props: ['images'],
	data: function(){
		return {
			index: 0
		}
	},
	mounted: function(){
		this.slideshow()
	},
	methods: {
		slideshow: function(){
            var x = document.getElementsByClassName("slideshow")[0].children;
            for (var i = 0; i < x.length; i++) {
              x[i].style.display = "none";  
            }
            this.index++;
            if (this.index > x.length) {this.index = 1}    
            x[this.index-1].style.display = "block";  
            setTimeout(this.slideshow, 9000);    
		}
	},
    template:
    `<div class="slideshow">
    		<img class="slide fade-animation d-block w-100" :src="image" v-for="image in images">
			
            <img class="slide fade-animation d-block w-100" src="https://picsum.photos/200">
            <img class="slide fade-animation d-block w-100"  src="https://picsum.photos/200">
            <img class="slide fade-animation d-block w-100"  src="https://picsum.photos/200">
      </div>`
}