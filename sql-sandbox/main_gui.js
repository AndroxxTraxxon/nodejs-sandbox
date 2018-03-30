String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

class Person{
    constructor(name = {first: '', middle: '', last: ''}, gender = '', parents = [], id = undefined){
        this.name = name;
        this.gender = gender;
        this.parents = parents;
        if(id == undefined){
            this.id = (JSON.stringify(this.name) + new Date().toUTCString()).hashCode();
        }else{
            this.id = id;
        }
        if(Person.family.length == 0){
            Person.root = this;
        }
        Person.family.push(this);
        return this;
    };

    createChild(name, gender, spouse = undefined){
        var parents = {};
        return new Person(name, gender, parents);
    };

    addParent(parent, title = undefined){
        if (title == undefined){
            if(parent.gender.toLowerCase() == 'male'){
                title = "Father";
            }else{
                title = "Mother";
            }
        }
        this.parents.push({"title": title, "id": parent.id});
    }
    removeParent(id){
        for(var i = 0; i < this.parents.length; i++){
            if (this.parents[i].id == id){
                this.parents = this.parents.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    createParent(name, gender, stepParent = false){
        var newParent = new Person(name, gender, undefined);
        this.addParent(newParent);
        return newParent;
    }

    static loadFamily(filename = "family.json"){
        const fs = require('fs');

    };

    static getPerson(ID = undefined){
        return Person.family.find(target => target.id === ID);
    };

    getChildren(){
        return Person.family.filter(function(child){
            for(var i = 0; i < child.parents.length; i++){
                if (child.parents[i].id == this.id){
                    return true;
                }
            }
            return false;
        });
    }

    static getRoot(){
        return this.getPerson(root);
    }
}
Person.family = [];
Person.root = undefined;

class sqlAdmin{
    constructor(element, options){
        var defaults = {
            name: 'SQLApp',
            title: 'Sample SQL App',
            canvas: {
                class: "appCanvas"
            },
            element: {
                class: "appRoot"
            },
            filePaths: {
                family: "family.json"
            }
        };
        this.currentPosition = [0,0];

        this.settings = defaults;
        Object.assign(this.settings, options);
        this.appElement = element;
        this.appElement.style = "background-color: #abc;";
        this.appElement.id = this.settings.name;
        this.appElement.classList.add(this.settings.element.class)

        
        this.initCanvas();
        this.initLoadingOverlay();
        this.showLoadingOverlay();
        this.loadData();
        this.selectRootPerson();
        this.hideLoadingOverlay();
    }

    initLoadingOverlay(){

    }

    showLoadingOverlay(){

    }

    hideLoadingOverlay(){

    }

    loadData(){
        Person.loadFamily(this.settings.filePaths.family);
    }

    selectRootPerson(){

    }

    initCanvas(){
        console.log("Creating Canvas...");
        
        this.appCanvas = document.createElement("canvas");
        this.appCanvas.classList.add(this.settings.canvas.class);
        this.appCanvas.height = window.height - window.menubar.height;
        this.appElement.appendChild(this.appCanvas);
        console.log("Canvas Created.");
    }

}

function initApp(options){
    var appdiv = document.createElement("div");
    document.body.appendChild(appdiv);
    app = new sqlAdmin(appdiv);
}
var app = undefined;
window.onload = initApp;