///<reference path="../../headers/common.d.ts" />
System.register(['angular', 'lodash', './dynamic_dashboard_srv'], function(exports_1) {
    var angular_1, lodash_1, dynamic_dashboard_srv_1;
    var DashboardExporter;
    return {
        setters:[
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (dynamic_dashboard_srv_1_1) {
                dynamic_dashboard_srv_1 = dynamic_dashboard_srv_1_1;
            }],
        execute: function() {
            DashboardExporter = (function () {
                function DashboardExporter(datasourceSrv) {
                    this.datasourceSrv = datasourceSrv;
                }
                DashboardExporter.prototype.makeExportable = function (dash) {
                    var _this = this;
                    var dynSrv = new dynamic_dashboard_srv_1.DynamicDashboardSrv();
                    dynSrv.process(dash, { cleanUpOnly: true });
                    var inputs = [];
                    var datasources = {};
                    var promises = [];
                    for (var _i = 0, _a = dash.rows; _i < _a.length; _i++) {
                        var row = _a[_i];
                        lodash_1.default.each(row.panels, function (panel) {
                            if (panel.datasource !== undefined) {
                                promises.push(_this.datasourceSrv.get(panel.datasource).then(function (ds) {
                                    var refName = 'DS_' + ds.name.toUpperCase();
                                    datasources[panel.datasource] = {
                                        name: refName,
                                        type: 'datasource',
                                        pluginId: ds.meta.id,
                                    };
                                    panel.datasource = '${' + refName + '}';
                                }));
                            }
                        });
                    }
                    return Promise.all(promises).then(function () {
                        lodash_1.default.each(datasources, function (value, key) {
                            inputs.push(value);
                        });
                        dash["__inputs"] = inputs;
                        return dash;
                    });
                };
                DashboardExporter.prototype.export = function (dashboard) {
                    return this.makeExportable(dashboard).then(function (clean) {
                        var blob = new Blob([angular_1.default.toJson(clean, true)], { type: "application/json;charset=utf-8" });
                        var wnd = window;
                        wnd.saveAs(blob, clean.title + '-' + new Date().getTime());
                    });
                };
                return DashboardExporter;
            })();
            exports_1("DashboardExporter", DashboardExporter);
        }
    }
});
//# sourceMappingURL=exporter.js.map