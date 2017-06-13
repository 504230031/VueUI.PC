var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ap;
(function (ap) {
    var ui;
    (function (ui) {
        var widget;
        (function (widget) {
            var emoticon = (function (_super) {
                __extends(emoticon, _super);
                function emoticon(id) {
                    var _this = _super.call(this, id) || this;
                    _this.init();
                    return _this;
                }
                Object.defineProperty(emoticon.prototype, "options", {
                    //表情内容
                    get: function () {
                        return this._control["options"];
                    },
                    set: function (value) {
                        this._control["options"] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                emoticon.prototype.init = function () {
                    Vue.component("ap-emoticon", {
                        template: '<div>' +
                            ' <span class="face" v-for="(itemface,indexface) in options"><img v-bind:title="itemface.text" v-on:click="chooseFace(itemface.text,itemface.name)" v-bind:src="getFace(itemface.name)" /></span>' +
                            '</div>',
                        props: {
                            itemcallback: {
                                type: Function
                            }
                        },
                        data: function () {
                            return {
                                options: [
                                    { "text": "微笑", "name": "weixiao" },
                                    { "text": "撇嘴", "name": "pizui" },
                                    { "text": "色", "name": "se" },
                                    { "text": "发呆", "name": "fadai" },
                                    { "text": "得意", "name": "deyi" },
                                    { "text": "流泪", "name": "liulei" },
                                    { "text": "害羞", "name": "haixiu" },
                                    { "text": "闭嘴", "name": "bizui" },
                                    { "text": "睡觉", "name": "shuijiao" },
                                    { "text": "大哭", "name": "daku" },
                                    { "text": "尴尬", "name": "gangga" },
                                    { "text": "发怒", "name": "danu" },
                                    { "text": "调皮", "name": "tiaopi" },
                                    { "text": "呲牙", "name": "ciya" },
                                    { "text": "惊讶", "name": "jingya" },
                                    { "text": "难过", "name": "nanguo" },
                                    { "text": "酷", "name": "ku" },
                                    { "text": "冷汗", "name": "lenghan" },
                                    { "text": "抓狂", "name": "zhuakuang" },
                                    { "text": "吐", "name": "tu" },
                                    { "text": "偷笑", "name": "touxiao" },
                                    { "text": "可爱", "name": "keai" },
                                    { "text": "白眼", "name": "baiyan" },
                                    { "text": "傲慢", "name": "aoman" },
                                    { "text": "饥饿", "name": "er" },
                                    { "text": "困", "name": "kun" },
                                    { "text": "惊恐", "name": "jingkong" },
                                    { "text": "流汗", "name": "liuhan" },
                                    { "text": "憨笑", "name": "haha" },
                                    { "text": "大兵", "name": "dabing" },
                                    { "text": "奋斗", "name": "fendou" },
                                    { "text": "咒骂", "name": "ma" },
                                    { "text": "疑问", "name": "wen" },
                                    { "text": "嘘", "name": "xu" },
                                    { "text": "晕", "name": "yun" },
                                    { "text": "折磨", "name": "zhemo" },
                                    { "text": "衰", "name": "shuai" },
                                    { "text": "骷髅", "name": "kulou" },
                                    { "text": "敲打", "name": "da" },
                                    { "text": "再见", "name": "zaijian" },
                                    { "text": "擦汗", "name": "cahan" },
                                    { "text": "抠鼻", "name": "wabi" },
                                    { "text": "鼓掌", "name": "guzhang" },
                                    { "text": "糗大了", "name": "qioudale" },
                                    { "text": "坏笑", "name": "huaixiao" },
                                    { "text": "左哼哼", "name": "zuohengheng" },
                                    { "text": "右哼哼", "name": "youhengheng" },
                                    { "text": "哈欠", "name": "haqian" },
                                    { "text": "鄙视", "name": "bishi" },
                                    { "text": "委屈", "name": "weiqu" },
                                    { "text": "哭了", "name": "ku" },
                                    { "text": "快哭了", "name": "kuaikule" },
                                    { "text": "阴险", "name": "yinxian" },
                                    { "text": "亲亲", "name": "qinqin" },
                                    { "text": "示爱", "name": "kiss" },
                                    { "text": "吓", "name": "xia" },
                                    { "text": "可怜", "name": "kelian" },
                                    { "text": "菜刀", "name": "caidao" },
                                    { "text": "西瓜", "name": "xigua" },
                                    { "text": "啤酒", "name": "pijiu" },
                                    { "text": "篮球", "name": "lanqiu" },
                                    { "text": "乒乓", "name": "pingpang" },
                                    { "text": "咖啡", "name": "kafei" },
                                    { "text": "饭", "name": "fan" },
                                    { "text": "猪头", "name": "zhutou" },
                                    { "text": "玫瑰", "name": "hua" },
                                    { "text": "凋谢", "name": "diaoxie" },
                                    { "text": "爱心", "name": "love" },
                                    { "text": "心碎", "name": "xinsui" },
                                    { "text": "蛋糕", "name": "dangao" },
                                    { "text": "闪电", "name": "shandian" },
                                    { "text": "炸弹", "name": "zhadan" },
                                    { "text": "刀", "name": "dao" },
                                    { "text": "足球", "name": "qiu" },
                                    { "text": "瓢虫", "name": "chong" },
                                    { "text": "便便", "name": "dabian" },
                                    { "text": "月亮", "name": "yueliang" },
                                    { "text": "太阳", "name": "taiyang" },
                                    { "text": "礼物", "name": "liwu" },
                                    { "text": "拥抱", "name": "yongbao" },
                                    { "text": "强", "name": "qiang" },
                                    { "text": "弱", "name": "ruo" },
                                    { "text": "握手", "name": "woshou" },
                                    { "text": "胜利", "name": "shengli" },
                                    { "text": "佩服", "name": "peifu" },
                                    { "text": "勾引", "name": "gouyin" },
                                    { "text": "拳头", "name": "quantou" },
                                    { "text": "差劲", "name": "chajin" },
                                    { "text": "干杯", "name": "cheer" },
                                    { "text": "NO", "name": "no" },
                                    { "text": "OK", "name": "ok" },
                                    { "text": "给力", "name": "geili" },
                                    { "text": "飞吻", "name": "feiwen" },
                                    { "text": "跳跳", "name": "tiao" },
                                    { "text": "发抖", "name": "fadou" },
                                    { "text": "怄火", "name": "dajiao" },
                                    { "text": "转圈", "name": "zhuanquan" },
                                    { "text": "磕头", "name": "ketou" },
                                    { "text": "回头", "name": "huitou" },
                                    { "text": "跳绳", "name": "tiaosheng" },
                                    { "text": "挥手", "name": "huishou" },
                                    { "text": "激动", "name": "jidong" },
                                    { "text": "街舞", "name": "tiaowu" },
                                    { "text": "献吻", "name": "xianwen" },
                                    { "text": "左太极", "name": "zuotaiji" },
                                    { "text": "右太极", "name": "youtaiji" }
                                ]
                            };
                        },
                        watch: {},
                        created: function () {
                        },
                        methods: {
                            chooseFace: function (text, name) {
                                var self = this;
                                if (self.itemcallback) {
                                    this.itemcallback(text, name);
                                }
                            },
                            getFace: function (img) {
                                return "../../images/face/" + img + ".gif";
                            }
                        },
                        mounted: function () {
                            var _this = this;
                            ap.core.ui.CONTROLS[this.$el.id]._control = this.$root.$children.filter(function (ctl, index) { return ctl.$el.id == _this.$el.id; })[0];
                        }
                    });
                };
                return emoticon;
            }(ap.core.ui));
            widget.emoticon = emoticon;
        })(widget = ui.widget || (ui.widget = {}));
    })(ui = ap.ui || (ap.ui = {}));
})(ap || (ap = {}));
