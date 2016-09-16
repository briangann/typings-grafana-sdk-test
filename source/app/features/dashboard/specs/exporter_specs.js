System.register(['test/lib/common', '../exporter'], function(exports_1) {
    var common_1, exporter_1;
    return {
        setters:[
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (exporter_1_1) {
                exporter_1 = exporter_1_1;
            }],
        execute: function() {
            common_1.describe('given dashboard with repeated panels', function () {
                var dash, exported;
                common_1.beforeEach(function (done) {
                    dash = {
                        rows: [],
                        templating: { list: [] }
                    };
                    dash.templating.list.push({
                        name: 'apps',
                        current: {},
                        options: []
                    });
                    dash.rows.push({
                        repeat: 'test',
                        panels: [
                            { id: 2, repeat: 'apps', datasource: 'gfdb' },
                            { id: 2, repeat: null, repeatPanelId: 2 },
                        ]
                    });
                    dash.rows.push({
                        repeat: null,
                        repeatRowId: 1
                    });
                    var datasourceSrvStub = {
                        get: common_1.sinon.stub().returns(Promise.resolve({
                            name: 'gfdb',
                            meta: { id: "testdb" }
                        }))
                    };
                    var exporter = new exporter_1.DashboardExporter(datasourceSrvStub);
                    exporter.makeExportable(dash).then(function (clean) {
                        exported = clean;
                        done();
                    });
                });
                common_1.it('exported dashboard should not contain repeated panels', function () {
                    common_1.expect(exported.rows[0].panels.length).to.be(1);
                });
                common_1.it('exported dashboard should not contain repeated rows', function () {
                    common_1.expect(exported.rows.length).to.be(1);
                });
                common_1.it('should replace datasource refs', function () {
                    var panel = exported.rows[0].panels[0];
                    common_1.expect(panel.datasource).to.be("${DS_GFDB}");
                });
            });
        }
    }
});
//# sourceMappingURL=exporter_specs.js.map