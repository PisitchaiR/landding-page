//  dot nav don't config
const dotNav = (elem, easing) => {
    function scrollIt(destination, duration = 200, easing = 'linear', callback) {
        const easings = {
            linear(t) { return t; },
            easeInQuad(t) { return t * t; },
            easeOutQuad(t) { return t * (2 - t); },
            easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
            easeInCubic(t) { return t * t * t; },
            easeOutCubic(t) { return (--t) * t * t + 1; },
            easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
            easeInQuart(t) { return t * t * t * t; },
            easeOutQuart(t) { return 1 - (--t) * t * t * t; },
            easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
            easeInQuint(t) { return t * t * t * t * t; },
            easeOutQuint(t) { return 1 + (--t) * t * t * t * t; },
            easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
        };
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
            if (callback) {
                callback();
            }
            return;
        }
        function scroll() {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = easings[easing](time);
            window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
            if (window.pageYOffset === destinationOffsetToScroll) {
                if (callback) {
                    callback();
                }
                return;
            }
            requestAnimationFrame(scroll);
        }
        scroll();
    }

    //  in viewport

    const inViewport = (el) => {
        let allElements = document.getElementsByTagName(el);
        let windowHeight = window.innerHeight;
        const elems = () => {
            for (let i = 0; i < allElements.length; i++) {  //  loop through the sections
                let viewportOffset = allElements[i].getBoundingClientRect();  //  returns the size of an element and its position relative to the viewport
                let top = viewportOffset.top;  //  get the offset top
                if(top < windowHeight){  //  if the top offset is less than the window height
                    allElements[i].classList.add('in-viewport');  //  add the class
                } else{
                    allElements[i].classList.remove('in-viewport');  //  remove the class
                }
            }
        }
        elems();
        window.addEventListener('scroll', elems);
    }
    inViewport('section');

    //  dot nav

    const allSecs = document.getElementsByTagName(elem);
    const nav = document.getElementById('dot-nav');
    const scrollSpeed = '1000';
    let allVis = document.getElementsByClassName('in-viewport'),
        allDots;
    for (let i = 0; i < allSecs.length; i++) {
        allSecs[i].classList.add('section-' + i);
    }

    //  add the dots

    const buildNav = () => {
        for (let i = 0; i < allSecs.length; i++) {
            const dotCreate = document.createElement('a');
            dotCreate.id = 'dot-' + i;
            dotCreate.classList.add('dots');
            dotCreate.href = '#';
            dotCreate.setAttribute('data-sec', i);
            nav.appendChild(dotCreate);
        }
    }
    buildNav();

    //  nav position

    let navHeight = document.getElementById('dot-nav').clientHeight;
    let hNavHeight = navHeight / 2;
    document.getElementById('dot-nav').style.top = 'calc(50% - ' + hNavHeight + 'px)';

    //  onscroll

    const dotActive = () => {
        allVis = document.getElementsByClassName('in-viewport');
        allDots = document.getElementsByClassName('dots');
        visNum = allVis.length;
        let a = visNum - 1;
        for (let i = 0; i < allSecs.length; i++) {
            allDots[i].classList.remove('active');
        }
        document.getElementById('dot-' + a).classList.add('active');
    }
    dotActive();
    window.onscroll = function(){ dotActive(); };

    //  click stuff

    const scrollMe = (e) => {
        let anchor = e.currentTarget.dataset.sec;
        scrollIt(document.querySelector('.section-' + anchor), scrollSpeed, easing);
        e.preventDefault();
    }

    allDots = document.getElementsByClassName('dots');
    for (let i = 0; i < allDots.length; i++) {
        allDots[i].addEventListener('click', scrollMe);
    }

}

dotNav('section', 'easeInOutCubic');

// part of work or extension
// page8
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length };
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

window.onscroll = function() {
    console.log(document.body.scrollTop)
    console.log(document.documentElement.scrollTop)
    scrollFunction()
    scrollFunction2()
    scrollGraph()
};


function scrollFunction() {
    if (document.documentElement.scrollTop > 200) {
        document.getElementById("head1").style.top = 5 + '%'
        document.getElementById("head1").style.top = 0 + '%'
        document.getElementById("head1").style.opacity = 100 + '%'
    } else {
        document.getElementById("head1").style.top = 10 + '%'
        document.getElementById("head1").style.opacity = 5 + '%'
    }
}
function scrollFunction2() {
    if (document.documentElement.scrollTop > 2500) {
        document.getElementById("heading1").style.top = 5 + '%'
        document.getElementById("heading1").style.top = 0 + '%'
        document.getElementById("heading1").style.opacity = 100 + '%'
    } else {
        document.getElementById("heading1").style.top = 10 + '%'
        document.getElementById("heading1").style.opacity = 5 + '%'
    }
}
function scrollGraph() {
    if (document.documentElement.scrollTop > 20) {
        document.getElementById("line").style.height = 13 + '%'
        document.getElementById("line").style.top = 80 + '%'
        document.getElementById("line1").style.height = 17 + '%'
        document.getElementById("line1").style.top = 76 + '%'
        document.getElementById("line2").style.height = 13 + '%'
        document.getElementById("line2").style.top = 80 + '%'
        document.getElementById("line3").style.height = 25 + '%'
        document.getElementById("line3").style.top = 68 + '%'
        
    } else {
        document.getElementById("line").style.height = 5 + '%'
        document.getElementById("line").style.top = 89 + '%'
        document.getElementById("line1").style.height = 5 + '%'
        document.getElementById("line1").style.top = 89 + '%'
        document.getElementById("line2").style.height = 5 + '%'
        document.getElementById("line2").style.top = 89 + '%'
        document.getElementById("line3").style.height = 5 + '%'
        document.getElementById("line3").style.top = 89 + '%'
    }
}
