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
    let nodes = document.querySelectorAll(tag);
    for(let node of nodes) {
        if(node.nodeType === 1) {
            let tagName = node.tagName;
            getTags(tagName);
            if(node.hasAttributes()) {
                let attr = node.attributes;
                hasClass(attr);
            }

            if(node.hasChildNodes()){
                console.log(node);
                let childs = node.childNodes;
                let childCount = node.childElementCount;
                for(let i = 0; i < childCount; i++){
                    scanDom(childs[i]);
                }
            }
        }
        else if(node.nodeType === 3) {
            getTextNode();
        }
    }

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


}

scanDom("body");

console.log("Объект 1: " + obj + ". Объект 2: " + objClass);

/*
let divv = document.createElement("div");
divv.innerHTML = "0";
prepend("#container", divv);*/

/*deleteTextNode("#container");*/


