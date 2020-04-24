function gtag(type, name, other) {
}
function PING(type, name) {
}

function getData(e, attrName) {
    return e.getAttribute('data-' + attrName);
}
function setData(e, attrName, attrVal = '') {
    e.setAttribute('data-' + attrName, attrVal);
}
function debounce(fn, threshold) {
    let timeout;
    threshold = threshold || 100;
    return function debounced() {
        clearTimeout(timeout);
        let args = arguments;
        let _this = this;
        function delayed() {
            fn.apply(_this, args);
        }
        timeout = setTimeout(delayed, threshold);
    };
}

function concatStr(strings, separator = ' ') {
    return strings.join(separator);
}

function getPercentage(x, percent) {
    return (x * percent) / 100;
}
function getRandFloor(min = 0, max = 255) {
    return getRandDecimal(min, max, 0);
}
function getRandNum(min = 0, max = 255) {
    return Math.round(getRandDecimal(min, max, 0));
}
function getRandDecimal(min = 0, max = 1, precision = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function makeArray(collection) {
    return Array.from(collection);
}
function get_rand_array_item(mixed_arr) {
    return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
}
function get_rand_obj_item(obj) {
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}
function updateProps(obj, propSet) {
    for (let prop in propSet) {
        if (propSet.hasOwnProperty(prop)) {
            obj[prop] = propSet[prop];
        }
    }
}
function addProp(obj, propName, propVal = undefined) {
    Object.defineProperty(obj, propName, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: propVal
    });
    return obj[propName];
}

function getRandColour() {
    return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
}
function getRandColourRGBA(maxO = 1, maxR = 255, maxG = 255, maxB = 255) {
    return 'rgba(' + getRandFloor(0, maxR) + ',' + getRandFloor(0, maxG) + ',' + getRandFloor(0, maxB) + ',' + getRandDecimal(0, maxO) + ')';
}

function getCssDimension(val, unit = 'px') {
    return val + unit;
}
function randRadius() {
    return getRandomArbitrary(5, 150);
}
function randWidth() {
    return getRandomArbitrary(2, 15);
}
function getDimensions(e) {
    return { w: e.clientWidth, h: e.clientHeight };
}
function hide(e) {
    e.style.display = 'none';
}
function addClass(e, classes) {
    e.classList.add(classes);
}
function removeClass(e, classes) {
    e.classList.remove(classes);
}
function hasClass(e, classes) {
    return e.classList.contains(classes);
}

function addDiv(id = '', classes = '', parent = document.body) {
    let div = document.createElement('DIV');
    div.id = id;
    div.className = classes;
    parent.appendChild(div);
    return div;
}
function addText(txt = '', root) {
    root.appendChild(document.createTextNode(txt));
}
function getElementsBySelector(selector) {
    return document.querySelectorAll(selector);
}
function getElementsByTag(tagName) {
    return document.querySelectorAll(tagName);
}
function getElementsByClass(className) {
    return document.getElementsByClassName(className);
}
function getElementById(elementID) {
    return window[elementID];
}

let transitionEvent = whichAnimationEvent();
function animateIn() {
    makeArray(getElementsByClass('animated')).forEach((e) => {
        if (getData(e, 'ani') !== null && getData(e, 'ani') != null && isInViewportSlightly(e)) {
            e.classList.remove('o0');
            e.classList.add(e.dataset.ani);
        }
    });
}
function whichAnimationEvent() {
    let t, el = document.createElement("fakeelement");
    let animations = {
        "animation": "animationend",
        "OAnimation": "oAnimationEnd",
        "MozAnimation": "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    };
    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

function addListener(eID, event, fn) {
    if (getElementById(eID) !== undefined) {
        getElementById(eID).addEventListener(event, fn);
    }
}
function removeListener(eID, event, fn) {
    getElementById(eID).removeEventListener(event, fn);
}
function addEvent(e, listener, fn) {
    makeArray(e).forEach((el) => {
        el.addEventListener(listener, fn);
        l(el);
    });
}

function centereStage(e) {
    let dimensions = getDimensions(e);
    e.style.marginTop = -(dimensions.h) / 2 + 'px';
    e.style.marginLeft = -(dimensions.w) / 2 + 'px';
    e.style.top = '50%';
    e.style.left = '50%';
}
function updateViewportVars() {
    vw = window.innerWidth;
    vh = window.innerHeight;
}
function getBounds(e) {
    return e.getBoundingClientRect();
}
function isInViewportSlightly(e) {
    let bounding = getBounds(e);
    return (bounding.top >= 0);
}
function isInViewportMostly(e) {
    let bounding = getBounds(e);
    return (bounding.top / 2 > -bounding.top);
}
let vw, vh;

function showBlanket() {
    let blanket = addDiv('blanket', 'z2 position-fixed top left vw vh o0 animated fadeIn', document.body);
    addDiv('blanketcoat', 'position-absolute top left vw vh bg-dark o05', blanket);
    blanket.classList.remove('o0');
    blanket.addEventListener(transitionEvent, blanketHidden);
    isBlanketOn = true;
}
function hideBlanket() {
    let blanket = getElementById('blanket');
    blanket.classList.remove('fadeIn');
    blanket.classList.add('fadeOut');
}
function blanketHidden(event) {
    let blanket = getElementById('blanket');
    if (event.animationName == 'fadeOut') {
        blanket.removeEventListener(transitionEvent, blanketHidden);
        blanket.remove();
        isBlanketOn = false;
    }
}
function showAsModal(e) {
    if (!isBlanketOn) {
        showBlanket();
        let mid = 'dsynrModal-' + e.id;
        addDiv(mid, 'curModal position-absolute z3 animated zoomIn', document.body);
        curModal = getElementById(mid);
        curModal.append(e);
        alignCurModal();
        curModal.focus();
        addModalListeners();
    }
    else {
        alert('MULTI-MODALS NOT YET ENABLED');
    }
}
function closeCurModal() {
    if (isBlanketOn) {
        hideBlanket();
        curModal.classList.remove('zoomIn');
        curModal.classList.add('zoomOut');
    }
}
function alignCurModal() {
    if (isBlanketOn) {
        centereStage(curModal);
    }
}
function addModalListeners() {
    window.addEventListener('resize', alignCurModal);
    addListener('xModal', 'click', closeCurModal);
    curModal.addEventListener(transitionEvent, modalHidden);
}
function modalHidden(event) {
    if (event.animationName == 'zoomOut') {
        curModal.classList.add('d-none');
        curModal.classList.remove('zoomOut');
        curModal.removeEventListener(transitionEvent, modalHidden);
    }
}
let isBlanketOn = false, curModal;

class modal {
    constructor(modalContent, preferences = null) {
        lfn('constructor-modal');
        this.content = modalContent;
        this.setDefaults();
        this.updatePreferences(preferences);
        this.setup();
        this.showModal();
    }
    setDefaults() {
        lfn('setDefaultOptions');
        let positionClasses = 'position-absolute top left';
        this.context = addProp(this, 'context', document.body);
        this.animate = addProp(this, 'animate', true);
        this.isOverlayOn = addProp(this, 'isOverlayOn', false);
        this.useOverlay = addProp(this, 'useOverlay', true);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true);
        this.suffix = addProp(this, 'suffix', totModals.toString());
        this.prefix = addProp(this, 'prefix', 'dsynrModal');
        this.animationClasses = addProp(this, 'animationClasses', 'animated fadeIn');
        this.overlayClasses = addProp(this, 'overlayClasses', 'o05 bg-dark');
        this.underlayClasses = addProp(this, 'underlayClasses', this.stringup([positionClasses, 'z1 wmax hmax']));
        this.modalClasses = addProp(this, 'modalClasses', this.stringup([positionClasses, 'z2']));
        this.rootClasses = addProp(this, 'rootClasses', this.stringup([positionClasses, 'z3 o0']));
    }
    setup() {
        lfn('setup');
        if (this.animate) {
            this.modalClasses = this.stringup([this.modalClasses, this.animationClasses]);
            this.underlayClasses = this.stringup([this.underlayClasses, this.animationClasses]);
        }
        this.root = addDiv(this.setName('root', this.content.id), this.rootClasses, this.context);
        if (this.disableUnderlay) {
            this.root.style.width = getCssDimension(this.context.clientWidth);
            this.root.style.height = getCssDimension(this.context.clientHeight);
            if (this.useOverlay) {
                this.underlayClasses = this.stringup([this.underlayClasses, this.overlayClasses]);
            }
            this.underlay = addDiv(this.setName('underlay', this.content.id), this.underlayClasses, this.root);
        }
        this.theModal = addDiv(this.setName('modal', this.context.id), this.modalClasses, this.root);
        if (this.animate) {
            this.theModal.addEventListener(transitionEvent, this.modalHidden);
        }
        window.addEventListener('resize', this.align);
        this.theModal.appendChild(this.content);
        this.align();
        this.setActive();
    }
    setActive() {
        activeModal = this.root;
        this.content.focus();
    }
    setName(context, n) {
        return this.stringup([this.prefix, context, this.suffix], '-');
    }
    stringup(strings, seperator = ' ') {
        return strings.join(seperator);
    }
    updatePreferences(preferences) {
        lfn('updateOptions');
        let options = getData(this.content, 'dsynr-options');
        if (options !== null) {
            preferences = JSON.parse(options);
        }
        else if (preferences !== null) {
            updateProps(this, preferences);
        }
    }
    showBlanket() {
        let blanket;
        blanket = addDiv('blanket', this.overlayClasses, document.body);
        addDiv('blanketcoat', this.underlayClasses, blanket);
        blanket.classList.remove('o0');
        blanket.addEventListener(transitionEvent, blanketHidden);
        this.isOverlayOn = true;
    }
    hideBlanket() {
        let blanket;
        blanket = getElementById('blanket');
        blanket.classList.remove('fadeIn');
        blanket.classList.add('fadeOut');
    }
    blanketHidden(event) {
        let blanket;
        blanket = getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(transitionEvent, blanketHidden);
            blanket.remove();
            this.isOverlayOn = false;
        }
    }
    showModal() {
        this.content.style.display = '';
        this.root.classList.remove('o0');
        totModals++;
    }
    closeCurModal() {
        if (this.isOverlayOn) {
            this.hideBlanket();
            curModal.classList.remove('zoomIn');
            curModal.classList.add('zoomOut');
        }
    }
    align() {
        if (this.isOverlayOn) {
            centereStage(this.theModal);
        }
    }
    modalHidden(event) {
        if (event.animationName == 'zoomOut') {
            curModal.classList.add('d-none');
            curModal.classList.remove('zoomOut');
            curModal.removeEventListener(transitionEvent, this.modalHidden);
        }
    }
}
function autoModalize(modalClass = 'dsynrModal') {
    lfn('autoModalize');
    makeArray(getElementsByClass(modalClass)).forEach(function (mdl, index) {
        mdl.style.display = 'none';
        l(getData(mdl, 'dsynr-options'));
        let modl = new modal(mdl);
        modals.push(mdl);
    });
}
let activeModal, totModals = 0, modals = [];

(function () {
    updateViewportVars();
})();
