/*let date1 = new Date('01.05.2016');
let date2 = new Date('01.08.2017');
if(date1.valueOf() < date2.valueOf()) {
    console.log("Yes it is!");
}*/

function prepend(where, what) {
    "use strict";
    let whereCont = document.querySelector(where);
    whereCont.insertBefore(what, whereCont.firstElementChild);
}

function deleteTextNode(eleme, r) {
    "use strict";

    let elements = document.querySelectorAll(eleme);
    let elem = elements[0].childNodes;
    console.log(elem.length);

    for(let el of elem) {
        if(el.nodeType == 3) {
            el.remove();
        }
        if(el.nodeType == 1 && r == true) {
            deleteTextNode(el);
        }
    }

    console.log(elem.length);


}

let obj = {
    textNode : 0
};
let objClass = {};


function scanDom(tag) {
    "use strict";
    let nodes;
    if(typeof tag == "string") {
        nodes = document.querySelectorAll(tag);
    }
    else {
        nodes = tag;
        if(nodes.hasChildNodes()) {
            nodes = nodes.childNodes;
        }
        else {
            return;
        }
    }
    top:
    for(let node of nodes) {
        if(node.nodeType === 1) {
            getTags(node.tagName);
            if(node.hasAttributes()) {
                hasClass(node.attributes);
            }

            if(node.hasChildNodes()){
                let childs = node.childNodes;
                let childCount = childs.length;
                for(let i = 0; i < childCount; i++){
                    if(childs[i].nodeType === 3) {
                        getTextNode();
                        ++i;
                        if(i == childCount) {
                            continue top;
                        }
                    }
                    scanDom(childs[i]);
                }
            }
        } else if (node.nodeType === 3) {
            getTextNode();
        }
    }


    printResult();

    function getTags(tag){
        let curTag = tag.toLowerCase();
        if(obj.hasOwnProperty(curTag)){
            obj[curTag]++;
        } else {
            obj[curTag] = 1;
        }

    }

    function hasClass(element) {
        let attr = element;
        for(let attrib of attr) {
            if(attrib.name == "class"){
                let arr = attrib.nodeValue.split(" ");
                arr.forEach(el => {
                    if(objClass.hasOwnProperty(el)) {
                        objClass[el]++;
                    } else {
                        objClass[el] = 1;
                    }

                });
            }
        }

    }


    function getTextNode() {

        obj.textNode += 1;
    }

    function printClassRes(){
        for(let classes in objClass){
            console.log("Элементов с классом " + classes + ": " + objClass[classes]);
        }
    }

    function printResult() {
        for(let tag in obj) {
            if(tag == "textNode") {
                console.log("Текстовых узлов: " + obj[tag]);
            }
            else{
                console.log("Тэгов " + tag + ": " + obj[tag]);
            }
        }
        printClassRes();
    }


}

scanDom("body");

/*
let divv = document.createElement("div");
divv.innerHTML = "0";
prepend("#container", divv);*/

/*deleteTextNode("#container");*/


