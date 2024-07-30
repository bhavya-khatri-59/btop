console.log("vtopHeader.js is running");
let intervalId;
let injected = false;

let code = `
    <span class="navbar-text px-0 px-sm-2 mx-0 mx-sm-1 text-light"></span>
    <button class="btn btn-primary border-primary shadow-none" type="button" style="background: rgba(13,110,253,0);border-style: none;" onclick="Array.from(document.getElementsByTagName('a')).filter((e) => e.dataset.url)[130].click()" id="nav_short">Course Page</button>
    <button class="btn btn-primary border-primary shadow-none" type="button" style="background: rgba(13,110,253,0);border-style: none;" onclick="Array.from(document.getElementsByTagName('a')).filter((e) => e.dataset.url)[149].click();" id="nav_short">Marks View</button>
    <button class="btn btn-primary border-primary shadow-none" type="button" style="background: rgba(13,110,253,0);border-style: none;" onclick="Array.from(document.getElementsByTagName('a')).filter((e) => e.dataset.url)[133].click()" id="nav_short">DA Upload</button>

`

function shortcut() {
    let target = document.getElementById('vtopHeaderBarControl');
    if(target && !injected) {
        console.log("true");
        target.innerHTML = code + target.innerHTML;
        injected = true;
    }
    else if (!target && injected){
        console.log("false");
        injected = false;
    }
}

shortcut();

intervalId(shortcut, 1000);