//# sourceMappingURL=DsynrSite.js.map
//# sourceMappingURL=DsynrUI.js.map
class DsynrUIIElement {
    constructor(element, preferences) {
        this.selfAbort = false;
        this.prefAttr = 'dsynr-pref';
        d.lfn('DsynrUIIElement');
        this.content = element;
        let self = this;
        if (DsynrUIIElement.instances.length > 0) {
            DsynrUIIElement.instances.forEach(function (instance, index) {
                if (instance.content === element) {
                    self.selfAbort = true;
                    d.l("already instantiated, aborting...");
                    return;
                }
            });
        }
        if (!this.selfAbort) {
            this.preferences = preferences;
            this.setPref();
            this.setParent();
            DsynrUIIElement.instances.push(this);
            d.l(DsynrUIIElement.instances);
        }
    }
    setPref() {
        d.lfn('setPref');
        // d.l(this.preferences);
        if (Object.keys(this.preferences).length > 0) {
            d.l('Object.keys(preferences).length:' + Object.keys(this.preferences).length);
            // d.l(Object.keys(preferences).length > 0);
            //d.updateProps(this, preferences);
        }
        else {
            let options = d.getData(this.content, this.prefAttr);
            d.l(options);
            if (options !== null) {
                d.l('parsing preferences : ' + options);
                this.preferences = d.IsJson(options) ? JSON.parse(options) : d.conf[options];
            }
        }
        d.updateProps(this, this.preferences);
    }
    setup() {
    }
    setParent() {
        d.lfn('setParent');
        d.l(this.parent);
        if (this.parent === undefined) {
            // @ts-ignore
            this.parent = 'parent';
        }
        if (typeof this.parent === 'string') {
            d.l(this.parent);
            if (this.parent == 'parent') {
                this.parent = this.content.parentElement;
            }
            else {
                this.parent = d.getElementById(this.parent);
            }
        }
        d.l(this.parent);
    }
    setDefaults(reset = false) {
        d.lfn('setDefaults super ');
        this.animate = d.addProp(this, 'animate', true, reset);
        this.animateClass = d.addProp(this, 'animateClass', 'animated', reset);
        this.animateInClass = d.addProp(this, 'animateInClass', d.concatStr([this.animateClass, 'fadeIn']), reset);
        this.animateOutClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, 'fadeOut']), reset);
        this.animateAttentionClass = d.addProp(this, 'animateOutClass', d.concatStr([this.animateClass, 'heartBeat']), reset);
    }
    addListeners() {
    }
    setActive() {
    }
    attention() {
    }
    show() {
    }
    hide() {
    }
    destroy() {
        d.lfn('destroy');
        this.instance.remove();
    }
    setName(context, name) {
        return d.concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}
DsynrUIIElement.instances = [];
//# sourceMappingURL=DsynrUIIElement.js.map
///<reference path="../Dsynr.ts"/>
class DsynrModal extends DsynrUIIElement {
    constructor(modalContent, preferences = {}) {
        super(modalContent, preferences);
        if (!this.selfAbort) {
            d.lfn('DsynrModal');
            this.setDefaults();
            this.setup();
        }
    }
    setDefaults(reset = false) {
        d.lfn('setDefaults');
        super.setDefaults();
        let positionClass = 'position-absolute';
        let alignmentClass = 'top left';
        this.adoptParent = d.addProp(this, 'adoptParent', true, reset);
        this.animateModal = d.addProp(this, 'animateModal', true, reset);
        this.autoDestroy = d.addProp(this, 'autoDestroy', true, reset);
        this.displayTogether = d.addProp(this, 'displayTogether', true, reset);
        this.useOverlay = d.addProp(this, 'useOverlay', true, reset);
        this.disableUnderlay = d.addProp(this, 'disableUnderlay', true, reset);
        this.respectBounds = d.addProp(this, 'respectBounds', true, reset);
        this.animateUnderlay = d.addProp(this, 'animateUnderlay', true, reset);
        this.nameSuffix = d.addProp(this, 'nameSuffix', DsynrModal.instances.length.toString(), reset);
        this.namePrefix = d.addProp(this, 'namePrefix', 'dsynrModal', reset);
        this.modalAnimateInClass = d.addProp(this, 'modalAnimateInClass', d.concatStr([this.animateClass, 'flipInX']), reset);
        this.modalAnimateOutClass = d.addProp(this, 'modalAnimateOutClass', d.concatStr([this.animateClass, 'flipOutY']), reset);
        this.modalAnimateAttentionClass = d.addProp(this, 'modalAnimateAttentionClass', d.concatStr([this.animateClass, 'shake']), reset);
        this.overlayClass = d.addProp(this, 'overlayClass', 'o50 bg-dark', reset);
        this.parentSizingClass = d.addProp(this, 'sizingClass', 'wmax hmax', reset);
        this.windowSizingClass = d.addProp(this, 'windowSizingClass', 'vw vh', reset);
        this.underlayClass = d.addProp(this, 'underlayClass', d.concatStr([positionClass, alignmentClass, this.parentSizingClass, 'z1', 'dsynrModalUnderlay']), reset);
        this.instanceClass = d.addProp(this, 'instanceClass', d.concatStr([positionClass, 'z2 o0 rounded nooverflow']), reset);
        this.instanceRootClass = d.addProp(this, 'instanceRootClass', d.concatStr([positionClass, alignmentClass, this.parentSizingClass, 'z3 o0 d-none']), reset);
        this.trigger = d.addProp(this, 'trigger', 'auto', reset);
        this.onModalDestroy = d.addProp(this, 'onModalDestroy', () => {
            this.hide(this.autoDestroy);
        }, reset);
    }
    setup() {
        d.lfn('setup');
        let self = this;
        d.addClass(this.content, 'd-none');
        if (this.trigger != 'auto') {
            d.l('setting trigger to : ' + this.trigger);
            d.addListener(this.trigger, 'click', function () {
                self.show();
            });
            d.l('Modal Trigger READY!');
        }
        else {
            d.l('Triggering Automatically...');
            this.show();
        }
    }
    /**
     * @todo
     * add animationEnd listener for root and then animate modal
     * add optional animationEnd listener for modal
     */
    show() {
        if (DsynrModal.activeInstance !== this) {
            d.lfn('show via : ' + this.trigger);
            d.addClass(this.content, 'o0');
            d.removeClass(this.content, 'd-none');
            if (this.parent === undefined) {
                d.l('parent unavailable, adding modal to body');
                this.parent = document.body;
            }
            this.instanceRoot = d.addDiv(this.setName('root', this.content.id), this.instanceRootClass, this.parent);
            if (this.disableUnderlay) {
                // this.resizeRoot();
                if (this.useOverlay) {
                    this.underlayClass = d.concatStr([this.underlayClass, this.overlayClass]);
                }
                this.underlay = d.addDiv(this.setName('underlay', this.content.id), this.underlayClass, this.instanceRoot);
            }
            else {
                d.removeClass(this.instanceRoot, this.parentSizingClass);
            }
            this.instance = d.addDiv(this.setName('modal', this.parent.id), this.instanceClass, this.instanceRoot);
            this.addListeners();
            //update to detect parent (parent) resizing opposed to just window
            this.instance.appendChild(this.content);
            // window.addEventListener('resize', function () {
            //     modals[modals.length].align();
            // });
            d.removeClass(this.instanceRoot, 'd-none');
            d.removeClass(this.instance, 'o0');
            d.removeClass(this.content, 'o0');
            d.l(this.parent.id);
            if (this.respectBounds) {
                if (this.content.clientHeight > this.parent.clientHeight) {
                    this.instance.style.height = d.getCssDimension(this.parent.clientHeight - 50);
                    this.instance.style.overflowY = 'auto';
                }
                if (this.content.clientWidth > this.parent.clientWidth) {
                    this.instance.style.width = d.getCssDimension(this.parent.clientWidth - 50);
                    this.instance.style.overflowX = 'auto';
                }
            }
            if (this.adoptParent && (this.content.clientHeight > this.parent.clientHeight || this.content.clientWidth > this.parent.clientWidth)) {
                d.lfn('adoptParent');
                d.l('parent cannot accommodate child, adopting body as parent!');
                this.parent = document.body;
                this.parent.append(this.instanceRoot);
                this.resizeRoot();
            }
            this.align();
            this.animateDisplay();
            this.setActive();
        }
    }
    attention() {
        d.lfn('attention');
        this.animateDisplay(true);
    }
    animateDisplay(getAttention = false) {
        d.lfn('animateDisplay');
        if (this.displayTogether) {
            if (this.animate && this.animateUnderlay) {
                if (getAttention) {
                    d.removeClass(this.instanceRoot, this.animateInClass);
                    d.addClass(this.instanceRoot, this.animateAttentionClass);
                    d.removeClass(this.instance, this.modalAnimateInClass);
                    d.addClass(this.instance, this.modalAnimateAttentionClass);
                }
                else {
                    d.addClass(this.instanceRoot, this.animateInClass);
                    d.addClass(this.instance, this.modalAnimateInClass);
                }
            }
            else {
                if (getAttention) {
                    //@todo
                }
                else {
                    d.removeClass(this.instanceRoot, 'o0');
                    d.removeClass(this.instance, 'o0');
                }
            }
        }
        else {
            //@todo animate one after other
        }
    }
    hide(destroy = this.autoDestroy) {
        d.lfn('hide');
        if (this.useOverlay) {
            d.removeClass(this.instanceRoot, this.modalAnimateInClass);
            d.addClass(this.instanceRoot, this.modalAnimateOutClass);
        }
        if (destroy) {
            d.l('TODO ONANIMATIONEND LISTENER...');
            this.destroy();
        }
        DsynrModal.activeInstance = false;
    }
    resizeRoot() {
        d.lfn('resizeRoot');
        if (this.parent == document.body) {
            d.removeClass(this.instanceRoot, this.parentSizingClass);
            d.addClass(this.instanceRoot, this.windowSizingClass);
        }
        else {
            this.instanceRoot.style.width = d.getCssDimension(this.parent.clientWidth);
            this.instanceRoot.style.height = d.getCssDimension(this.parent.clientHeight);
        }
    }
    destroy() {
        d.lfn('destroying modal..');
        this.instanceRoot.remove();
    }
    setActive() {
        d.lfn('setActive');
        this.instanceRoot = this.instanceRoot;
        this.content.focus();
        DsynrModal.activeInstance = this;
    }
    addListeners() {
        d.lfn('addListeners');
        let ths = this;
        if (this.animate) {
            d.l('enabling animation');
            this.instance.addEventListener(d.transitionEvent, ths.modalHidden);
            // this.instance.addEventListener(d.transitionEvent, ths.modalHidden);
        }
        d.addListener(this.instanceRoot.id, 'keydown', function (ev) {
            if (ev.key == 'Escape') {
                ths.hide(ths.autoDestroy);
            }
        });
        d.addListener(this.instanceRoot.id, 'click', function (ev) {
            d.l(ev.target);
            // @ts-ignore
            d.l(ev.target.offsetParent);
            // @ts-ignore
            d.l(ev.target.classList.value);
            // @ts-ignore
            if (ev.target.classList.value == ths.underlayClass) {
                ths.onModalDestroy();
                // if (this.onModalDestroy !== undefined) {
                // } else {
                //     ths.hide(true);
                // }
            }
        });
    }
    blanketHidden(event) {
        // Do something when the transition ends
        let blanket;
        blanket = d.getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(d.transitionEvent, this.blanketHidden);
            blanket.remove();
            // this.isOverlayOn = false;
        }
    }
    align() {
        d.lfn('align');
        if (!this.disableUnderlay) {
            d.addClass(this.instanceRoot, this.parentSizingClass);
        }
        d.centereStage(this.instance);
        if (!this.disableUnderlay) {
            //@todo d.removeClass(this.instanceRoot,this.parentSizingClass);
        }
    }
    modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            this.instanceRoot.classList.add('d-none');
            this.instanceRoot.classList.remove('zoomOut');
            this.instanceRoot.removeEventListener(d.transitionEvent, this.modalHidden);
        }
    }
    static auto(modalClass = 'dsynrModal') {
        d.lfn('auto');
        d.makeArray(d.getElementsByClass(modalClass)).forEach(function (instance) {
            new DsynrModal(instance);
        });
    }
}
//# sourceMappingURL=DsynrModal.js.map
class DsynrSelect extends DsynrUIIElement {
    constructor(select, preferences = {}) {
        super(select, preferences);
        if (!this.selfAbort) {
            d.lfn('DsynrSelect');
            this.setDefaults();
            this.setup();
        }
    }
    setDefaults(reset = false) {
        super.setDefaults();
        d.lfn('setDefaults');
        this.adoptParent = d.addProp(this, 'adoptParent', true, reset);
        this.nameSuffix = d.addProp(this, 'nameSuffix', DsynrSelect.instances.length.toString(), reset);
        this.namePrefix = d.addProp(this, 'namePrefix', 'dsynrEnhancedSelect', reset);
        this.optionPrefix = d.addProp(this, 'namePrefix', d.concatStr([this.namePrefix, 'option'], '-'), reset);
        this.instanceClass = d.addProp(this, 'instanceClasses', d.concatStr([this.namePrefix, 'rounded bg-light shadow p-5']), reset);
        this.showFinder = d.addProp(this, 'showFinder', false, reset);
        this.autoExit = d.addProp(this, 'autoExit', true, reset);
        this.isActive = d.addProp(this, 'isActive', false, reset);
        this.triggerCls = d.addProp(this, 'btnCls', d.concatStr([this.namePrefix, 'trigger btn btn-link'], '-'), reset);
        this.optCls = d.addProp(this, 'optCls', d.concatStr([this.optionPrefix, 'hand p-2']), reset);
        this.optClsActive = d.addProp(this, 'optClsActive', 'active bg-warning rounded', reset);
    }
    setup() {
        d.lfn('setup');
        if (this.content.id === '') {
            this.content.id = 'dsynrSelect-' + DsynrSelect.instances.length;
        }
        this.options = this.content.options;
        this.option = this.options[this.options.selectedIndex];
        this.setTrigger();
        d.l('Select Trigger READY!');
    }
    show() {
        d.lfn('show triggered via : ' + this.trigger.id);
        if (this.isActive) {
            this.attention();
        }
        else {
            this.instance = d.addDiv(this.setName('', this.content.id), this.instanceClass);
            this.instance.tabIndex = 0;
            this.instance.style.outline = 'none';
            let self = this;
            d.makeArray(this.options).forEach(function (o, index) {
                self.addESOption(o, index);
            });
            let ths = this;
            this.modalPref = d.mergeObjs(this.preferences, {
                'trigger': 'auto', 'parent': this.parent, 'adoptParent': this.adoptParent, 'onModalDestroy': () => {
                    ths.destroy();
                }
            });
            this.modal = new DsynrModal(this.instance, this.modalPref);
            this.setActive();
        }
    }
    attention() {
        DsynrSelect.activeInstance = this;
        this.modal.attention();
    }
    update(selectOption) {
        d.lfn('update');
        d.removeClass(this.esPrevOpt, this.optClsActive);
        this.option = selectOption;
        d.addClass(this.option, this.optClsActive);
        this.esPrevOpt = d.getElementById(selectOption.id);
        this.content.selectedIndex = parseInt(d.getData(selectOption, 'index'));
        this.trigger.textContent = this.option.innerText;
        if (this.autoExit) {
            this.destroy();
        }
    }
    addESOption(o, i) {
        d.lfn('addESOption');
        let oid = d.concatStr([this.optionPrefix, this.content.id, i], '-');
        let ocls;
        d.l(this.esPrevOpt);
        ocls = (i == this.content.selectedIndex) ? d.concatStr([this.optCls, this.optClsActive]) : ocls = this.optCls;
        let eso = d.addDiv(oid, ocls, this.instance);
        eso.tabIndex = i;
        eso.style.outline = 'none';
        if (i == this.option.index) {
            this.esPrevOpt = eso;
        }
        let oe = d.getElementById(oid);
        oe.textContent = o.text;
        d.setData(oe, 'index', o.index.toString());
        let self = this;
        d.addListener(oe.id, 'click', function () {
            d.lclk(oe.id);
            self.update(oe);
        });
        d.addListener(oe.id, 'keydown', function (ev) {
            if (ev.key == 'Enter') {
                self.update(oe);
            }
        });
    }
    setTrigger() {
        d.lfn('addTrigger');
        this.trigger = d.addDiv(this.setName('btn', this.content.id), this.triggerCls, this.content.parentElement);
        d.addText(this.option.text, this.trigger);
        let self = this;
        d.addListener(this.trigger.id, 'click', function (ev) {
            ev.preventDefault();
            self.show();
        });
        d.hide(this.content);
    }
    addListeners() {
        d.lfn('d.addListeners...');
        let ths = this;
        d.addListener(this.instance.id, 'focus', ev => {
            d.l('focused!');
        });
        d.addListener(this.instance.id, 'keydown', function (evnt) {
            switch (evnt.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                case 'Tab':
                    ths.next();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    ths.prev();
                    break;
                case 'Escape':
                    ths.destroy();
                    break;
            }
        });
    }
    next() {
        d.lfn('next');
    }
    prev() {
        d.lfn('prev');
    }
    destroy() {
        d.lfn('destroy');
        this.modal.hide(true);
        this.isActive = false;
        DsynrSelect.activeInstance = false;
    }
    setActive() {
        d.lfn('setActive');
        this.isActive = true;
        DsynrSelect.activeInstance = this;
        this.addListeners();
        this.instance.focus();
    }
    static auto(selectClass = 'dsynrSelect') {
        d.lfn('auto');
        d.makeArray(d.getElementsByClass(selectClass)).forEach(function (instance) {
            new DsynrSelect(instance);
        });
    }
}
//# sourceMappingURL=DsynrSelect.js.map
///<reference path="components/DsynrModal.ts"/>
///<reference path="components/DsynrSelect.ts"/>
class Dsynr {
    constructor() {
        this.conf = {};
        this.transitionEvent = this.whichAnimationEvent();
        this.domain = document.baseURI;
        this.requestDataset = {};
        this.totalRequestDatasets = 0;
        this.documentScripts = [];
        this.updateViewportVars();
        this.reqDataReady = new Event('reqDataReady');
    }
    docReady(fn) {
        if (document.readyState == 'complete') {
            fn();
        }
    }
    /**
     * @todo
     */
    gtag(type, name, other) {
    }
    /**
     * @todo
     */
    PING(type, name) {
    }
    /**
     * Get data attribute value of a DOM element
     * @param e
     * @param attrName
     */
    getData(e, attrName) {
        return e.getAttribute('data-' + attrName);
    }
    /**
     * Set data attribute for a DOM element
     * @param e
     * @param attrName
     * @param attrVal
     */
    setData(e, attrName, attrVal = '') {
        e.setAttribute('data-' + attrName, attrVal);
    }
    // debounce so filtering doesn't happen every millisecond
    debounce(fn, threshold) {
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
    concatStr(strings, separator = ' ') {
        return strings.join(separator);
    }
    getPercentage(x, percent) {
        return (x * percent) / 100;
    }
    getRandFloor(min = 0, max = 255) {
        return this.getRandDecimal(min, max, 0);
    }
    getRandNum(min = 0, max = 255) {
        return Math.round(this.getRandDecimal(min, max, 0));
    }
    getRandDecimal(min = 0, max = 1, precision = 2) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
    }
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    makeArray(collection) {
        return Array.from(collection);
    }
    get_rand_array_item(mixed_arr) {
        return mixed_arr[Math.floor(Math.random() * mixed_arr.length)];
    }
    get_rand_obj_item(obj) {
        let keys = Object.keys(obj);
        return obj[keys[keys.length * Math.random() << 0]];
    }
    addProp(obj, propName, propVal = undefined, overwrite = false) {
        if (overwrite || !obj.hasOwnProperty(propName)) {
            Object.defineProperty(obj, propName, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: propVal
            });
        }
        return obj[propName];
    }
    updateProps(obj, propSet) {
        this.lfn('updateProps...');
        for (let prop in propSet) {
            if (propSet.hasOwnProperty(prop)) {
                obj[prop] = propSet[prop];
            }
            this.l(prop + ':' + obj[prop]);
        }
    }
    mergeObjs(main, sub) {
        for (let prop in sub) {
            main[prop] = sub[prop];
        }
        return main;
    }
    hasInstance(objList, obj) {
        this.lfn('hasInstance');
        this.l(objList);
        let hasIt = false;
        objList.forEach((o, i) => {
            if (o === obj) {
                hasIt = true;
                return;
            }
        });
        this.l(hasIt);
        return hasIt;
    }
    getRandColour() {
        return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    }
    getRandColourRGBA(maxO = 1, maxR = 255, maxG = 255, maxB = 255) {
        return 'rgba(' + this.getRandFloor(0, maxR) + ',' + this.getRandFloor(0, maxG) + ',' + this.getRandFloor(0, maxB) + ',' + this.getRandDecimal(0, maxO) + ')';
    }
    /**
     *
     * @param val
     * @param unit
     */
    getCssDimension(val, unit = 'px') {
        return val + unit;
    }
    randRadius() {
        return this.getRandomArbitrary(5, 150);
    }
    randWidth() {
        return this.getRandomArbitrary(2, 15);
    }
    /**
     *
     * @param e
     */
    getDimensions(e) {
        return { w: e.clientWidth, h: e.clientHeight };
    }
    /**
     *
     * @param e
     */
    hide(e) {
        e.style.display = 'none';
    }
    /**
     *
     * @param e
     * @param classes
     */
    addClass(e, classes) {
        e.classList.add(...classes.split(' '));
    }
    /**
     *
     * @param e
     * @param classes
     */
    removeClass(e, classes) {
        e.classList.remove(...classes.split(' '));
    }
    /**
     *
     * @param e
     * @param classes
     */
    hasClass(e, classes) {
        return e.classList.contains(classes);
    }
    addDiv(id = '', classes = '', parent = document.body) {
        let div = document.createElement('DIV');
        div.id = id;
        div.className = classes;
        parent.appendChild(div);
        return div;
    }
    addText(txt = '', root) {
        root.appendChild(document.createTextNode(txt));
    }
    getElementsBySelector(selector) {
        return document.querySelectorAll(selector);
    }
    getElementsByTag(tagName) {
        return document.querySelectorAll(tagName);
    }
    getElementsByClass(className) {
        return document.getElementsByClassName(className);
    }
    getElementById(elementID) {
        return window[elementID];
    }
    addJS(src, id = '') {
        let js = document.createElement('script');
        js.setAttribute('src', src);
        js.id = id;
        document.head.appendChild(js);
    }
    animateIn() {
        this.makeArray(this.getElementsByClass('animated')).forEach((e) => {
            if (this.getData(e, 'ani') !== null && this.getData(e, 'ani') != null && this.isInViewportSlightly(e)) {
                e.classList.remove('o0');
                e.classList.add(e.dataset.ani);
            }
        });
    }
    whichAnimationEvent() {
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
    addListener(eID, event, fn) {
        if (this.getElementById(eID) !== undefined) {
            this.getElementById(eID).addEventListener(event, fn);
        }
    }
    removeListener(eID, event, fn) {
        this.getElementById(eID).removeEventListener(event, fn);
    }
    addEvent(e, listener, fn) {
        this.makeArray(e).forEach((el) => {
            el.addEventListener(listener, fn);
            this.l(el);
        });
    }
    centereStage(e) {
        let dimensions = this.getDimensions(e);
        e.style.marginTop = this.getCssDimension(-(dimensions.h) / 2);
        e.style.marginLeft = this.getCssDimension(-(dimensions.w) / 2);
        e.style.top = '50%';
        e.style.left = '50%';
    }
    updateViewportVars() {
        this.vw = window.innerWidth;
        this.vh = window.innerHeight;
    }
    getBounds(e) {
        return e.getBoundingClientRect();
    }
    isInViewportSlightly(e) {
        let bounding = this.getBounds(e);
        return (bounding.top >= 0 //&&
        // bounding.left >= 0 &&
        // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    isInViewportMostly(e) {
        let bounding = this.getBounds(e);
        return (bounding.top / 2 > -bounding.top);
        // return (getPercentage((e.clientHeight + bounding.top), 50) > -bounding.top);
    }
    serialize(obj) {
        return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
    }
    ajax(url, saveAs = false, data = false, add2dom = true, method = 'GET') {
        this.lfn('ajax ' + url);
        this.curReq = new XMLHttpRequest();
        if (this.curReq) {
            this.curReq.open(method, url, true);
            this.setHeaders(method == 'POST');
            this.curReq.send(this.serialize(data));
            let ths = this;
            this.curReq.addEventListener('readystatechange', function () {
                return ths.stateChanged(ths, saveAs, add2dom);
            });
        }
        else {
            this.failed();
        }
    }
    setHeaders(isPost = false) {
        if (isPost) {
            this.curReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        this.curReq.setRequestHeader('Cache-Control', 'no-cache');
        this.curReq.setRequestHeader('Powered-by', 'Dsynr.com');
    }
    stateChanged(ths, saveAs, add2dom) {
        this.lfn('stateChanged');
        let req = ths.curReq;
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                return ths.succeeded(saveAs, add2dom);
            }
            else {
                this.l('Not ready yet :: ' + req.status + ' / ' + req.readyState);
            }
        }
        else {
            this.l(req);
        }
    }
    failed() {
        this.l('Cannot create an XMLHTTP instance');
        return false;
    }
    succeeded(saveAs, add2dom) {
        this.lfn('succeeded');
        this.totalRequestDatasets++;
        if (typeof saveAs === 'string') {
            this.l('Saving to dataset; Reference key: ' + saveAs);
            // this.requestDataset[saveAs] = this.htmlToElements(this.curReq.response);
            this.requestDataset[saveAs] = this.curReq.response;
        }
        add2dom ? this.addFetchedData(this.curReq.response) : false;
        return this.curReq.response;
    }
    addFetchedData(requestResponse, parent = document.body) {
        let fdp = this.addDiv('dsynrFetchedData-' + this.totalRequestDatasets, 'd-none', parent);
        let ths = this;
        this.addListener(fdp.id, 'reqDataReady', function () {
            ths.showFetchedData(fdp);
        });
        fdp.innerHTML = requestResponse;
        DsynrSelect.auto();
        let fetchedScriptTags = fdp.getElementsByTagName('script');
        for (let i = 0; i < fetchedScriptTags.length; ++i) {
            let scriptSRC = fetchedScriptTags[i].getAttribute('src');
            // @ts-ignore
            if (scriptSRC !== null && !this.documentScripts.includes(scriptSRC)) {
                this.addJS(scriptSRC);
            }
        }
        fdp.dispatchEvent(this.reqDataReady);
    }
    showFetchedData(fdp) {
        this.lfn('showFetchedData');
        this.removeClass(fdp, 'd-none');
        new DsynrModal(fdp);
    }
    getPageScripts(dsynrUtil) {
        function _(parentNode) {
            for (let node of parentNode.children) {
                if (node.hasAttribute('src') && node.getAttribute('src') != null) {
                    dsynrUtil.documentScripts.push(node.getAttribute('src'));
                }
            }
        }
        _(document.head);
        _(document.body);
    }
    IsJson(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    /**
     * Log to the console
     * @param data
     * @param isFormData
     */
    l(data, isFormData = false) {
        if (isFormData) {
            this.l('Logging FormData:');
            for (let key of data.entries()) {
                this.l(key[0] + ' : ' + key[1]);
            }
        }
        else {
            console.log(data);
        }
    }
    /**
     * Log active function name
     * @param functionName
     */
    lfn(functionName) {
        this.l(' {} ' + functionName);
    }
    /**
     * Log click
     * @param element
     */
    lclk(element) {
        this.l('* click ' + element);
    }
}
let d = new Dsynr();
//# sourceMappingURL=Dsynr.js.map