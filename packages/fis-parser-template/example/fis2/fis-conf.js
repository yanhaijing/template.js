fis.config.merge({
    modules: {
        parser: {
            tmpl: 'template'
        }
    },
    roadmap: {
        path : [
            {
                //前端模板
                reg : '**.tmpl',
                //当做类js文件处理，可以识别__inline, __uri等资源定位标识
                isJsLike : true,
                //只是内嵌，不用发布
                release : false
            }
        ]
    },
    settings: {
        parser: {
            template: {
                'sTag': '<%',
                'eTag': '%>',
                'global': 'mytemplate',
                'compress': true
            }
        }
    }
});
