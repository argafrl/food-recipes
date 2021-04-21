class AppBar extends HTMLElement {
    constructor() {
        super();        
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render () {
        this.shadowDOM.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">  
        <style>
            .navbar{
                background-color: #f75454;
            }
        </style>
        <nav class="navbar navbar-dark bg-dark fixed-top justify-content-center">
            <div class="navbar-text">
                <h1 class="navbar-brand mb-0 h1">Food Recipes</h1>
            </div>
        </nav>`;
    }
}

customElements.define("app-bar", AppBar);