class DsynrWp {

    ready(): void {
        d.lfn('DsynrUtilWp');
        d.getPageScripts(d);
    }

    getForm(formName: string, parent: HTMLElement = document.body): void {
        d.lfn('getForm');
        if (d.requestDataset[formName] != undefined) {
            d.l(formName + ' Previously loaded / Reinstantiating from memory...');
            d.addFetchedData(d.requestDataset[formName], parent);
        } else {
            d.ajax(d.domain + 'form/' + formName + '?min', formName);
        }
    }

    ajax(params = {}, parent: HTMLElement = document.body): void {
        d.lfn('ajax / ' + name);
        let formData: object = d.mergeObjs({action: 'dw_ajax'}, params);
        d.l(formData);
        // @ts-ignore
        d.ajax(ajxRequest.ajaxurl, false, formData, true, parent, 'POST');
    }
}

let dw = new DsynrWp();