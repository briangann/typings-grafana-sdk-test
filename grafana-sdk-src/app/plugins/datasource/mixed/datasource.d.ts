/// <reference path="../../../../../public/app/headers/common.d.ts" />
declare class MixedDatasource {
    private $q;
    private datasourceSrv;
    /** @ngInject */
    constructor($q: any, datasourceSrv: any);
    query(options: any): any;
}
export { MixedDatasource, MixedDatasource as Datasource };
