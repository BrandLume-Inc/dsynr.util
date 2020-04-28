abstract class DsynrUIIElement implements DsynrUI {

    static instances: Array<any> = [];

    parent: HTMLElement = document.body;
    instance: HTMLElement;

    protected content: HTMLElement;
    protected namePrefix: string;
    protected nameSuffix: string;
    protected instanceClasses: string;
    protected animationClasses: string;
    protected animate: boolean;

    protected selfAbort: boolean = false;

    private prefAttr: string = 'dsynr-pref';

    protected constructor(element: HTMLElement, preferences: object = {}) {
        lfn('DsynrUIIElement');

        this.content = element;

        let self: DsynrUIIElement = this;
        if (DsynrUIIElement.instances.length > 0) {
            DsynrUIIElement.instances.forEach(function (instance, index) {
                if (instance.content === element) {
                    self.selfAbort = true;
                    l("already instantiated, aborting...");
                    return;
                }
            });
        }

        if (!this.selfAbort) {
            this.setPref(preferences);
            DsynrUIIElement.instances.push(this);
        }
    }

    setDefaults(reset: boolean = false): void {
    }

    setup(): void {
    }

    setPref(preferences: object): void {
        lfn('setPref');
        // l(preferences);

        if (Object.keys(preferences).length > 0) {
            // l('Object.keys(preferences).length:' + Object.keys(preferences).length);
            // l(Object.keys(preferences).length > 0);
            //updateProps(this, preferences);
        } else {
            let options: any = getData(this.content, this.prefAttr);
            if (options !== null) {
                preferences = JSON.parse(options);
            }
        }
        updateProps(this, preferences);
    }

    protected addListeners(): void {
    }

    protected setActive(): void {
    }

    show(): void {
    }

    hide(): void {
    }

    destroy(): void {
    }

    protected setName(context: string, name: string): string {
        return concatStr([this.namePrefix, context, this.nameSuffix], '-');
    }
}
