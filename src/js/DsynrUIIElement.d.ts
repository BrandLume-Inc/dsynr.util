declare class DsynrUIIElement implements DsynrUI {
    parent: HTMLElement;
    itself: HTMLElement;
    content: HTMLElement;
    root: HTMLElement;
    namePrefix: string;
    nameSuffix: string;
    constructor();
    show(): void;
    hide(): void;
    destroy(): void;
    updatePref(preferences?: object): void;
    protected defaults(): void;
    protected setup(): void;
    protected setName(context: string, name: string): string;
    protected setActive(): void;
}
