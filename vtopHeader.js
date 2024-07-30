console.log("vtopHeader.js is running");
let interval;
let inject = false;

let code = `
    <span class="navbar-text px-0 px-sm-2 mx-0 mx-sm-1 text-light"></span>
    <button class="btn btn-primary border-primary shadow-none" type="button" style="background: rgba(13,110,253,0);border-style: none;" onclick="Array.from(document.getElementsByTagName('a')).filter((e) => e.dataset.url)[130].click()" id="nav_short">Course Page</button>
    <button class="btn btn-primary border-primary shadow-none" type="button" style="background: rgba(13,110,253,0);border-style: none;" onclick="Array.from(document.getElementsByTagName('a')).filter((e) => e.dataset.url)[149].click();" id="nav_short">Marks View</button>
    <button class="btn btn-primary border-primary shadow-none" type="button" style="background: rgba(13,110,253,0);border-style: none;" onclick="Array.from(document.getElementsByTagName('a')).filter((e) => e.dataset.url)[133].click()" id="nav_short">DA Upload</button>

`

function shortcut() {
    let t = document.getElementById('vtopHeaderBarControl');
    if(t && !inject) {
        console.log("true");
        t.innerHTML = code + t.innerHTML;
        inject = true;
    }
    else if (!t && inject){
        console.log("false");
        inject = false;
    }
    images = document.getElementsByTagName('img')
    if(images[0].src == "https://vtop.vit.ac.in/vtop/assets/img/VITLogoEmblem.png"){
    images[0].src = browser.runtime.getURL('icons/btop.png')
    }
    for(i = 1; i < images.length; i++) {
    if(images[i].src === "https://vtop.vit.ac.in/vtop/users/image/?id=23BAI0137") {
        images[i].src = browser.runtime.getURL('images/pfp.png')
    }
    }
}

shortcut();

interval = setInterval(shortcut, 1000);