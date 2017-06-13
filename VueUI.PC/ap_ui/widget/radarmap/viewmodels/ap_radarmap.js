var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ap;
(function (ap) {
    var ui;
    (function (ui) {
        var widget;
        (function (widget) {
            var radarmap = (function (_super) {
                __extends(radarmap, _super);
                function radarmap(id) {
                    _super.call(this, id);
                    this.init();
                }
                Object.defineProperty(radarmap.prototype, "options", {
                    //雷达图内容
                    get: function () {
                        return this._control["options"];
                    },
                    set: function (value) {
                        this._control["options"] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(radarmap.prototype, "smallr", {
                    //小圆半径
                    get: function () {
                        return this._control["smallr"];
                    },
                    set: function (value) {
                        this._control["smallr"] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(radarmap.prototype, "middler", {
                    //中圆半径
                    get: function () {
                        return this._control["middler"];
                    },
                    set: function (value) {
                        this._control["middler"] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(radarmap.prototype, "larger", {
                    //大圆半径
                    get: function () {
                        return this._control["larger"];
                    },
                    set: function (value) {
                        this._control["larger"] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(radarmap.prototype, "maxr", {
                    //最大长度
                    get: function () {
                        return this._control["maxr"];
                    },
                    set: function (value) {
                        this._control["maxr"] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                radarmap.prototype.init = function () {
                    Vue.component("ap-radarmap", {
                        template: '<canvas v-bind:height="innerheight" v-bind:width="innerwidth"></canvas>',
                        props: {
                            outheight: {
                                type: String,
                                default: "400px"
                            },
                            isexample: {
                                type: Boolean,
                                default: false
                            },
                            innerheight: {
                                type: String,
                                default: "400"
                            },
                            innerwidth: {
                                type: String,
                                default: "1000"
                            }
                        },
                        data: function () {
                            return {
                                options: [],
                                nameoptions: [],
                                avgoptions: [],
                                actualoptions: [],
                                circlex: this.innerwidth / 2,
                                circley: this.innerheight / 2,
                                smallr: 50,
                                middler: 100,
                                larger: 150,
                                maxr: 170,
                                isfirst: true
                            };
                        },
                        watch: {
                            options: function () {
                                var self = this;
                                var tmpoptions = self.options;
                                //var canvas = self.$el.children[0];
                                var canvas = self.$el;
                                if (canvas.getContext && tmpoptions.length >= 3) {
                                    var ctx = canvas.getContext("2d");
                                    ctx.clearRect(-self.circlex, -self.circley, canvas.width, canvas.height);
                                    ctx.strokeStyle = "#000000"; //设置线条颜色
                                    //把中心点放到500,200坐标处
                                    if (self.isfirst == true) {
                                        ctx.translate(self.circlex, self.circley);
                                        self.isfirst = false;
                                    }
                                    // 画三个圆圈
                                    ctx.beginPath();
                                    ctx.arc(0, 0, self.smallr, 0, Math.PI * 2, true);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.arc(0, 0, self.middler, 0, Math.PI * 2, true);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.arc(0, 0, self.larger, 0, Math.PI * 2, true);
                                    ctx.stroke();
                                    //设置每个扇区角度
                                    var tmptitle = [], tmpavg = [], tmpactual = [], tmpangle = [];
                                    for (var i = 0; i < tmpoptions.length; i++) {
                                        if (i == 0) {
                                            tmpangle.push("0");
                                        }
                                        else {
                                            tmpangle.push((360 / tmpoptions.length * tmpangle.length).toFixed(2));
                                        }
                                    }
                                    //画线
                                    for (var k = 0; k < tmpoptions.length; k++) {
                                        var x;
                                        var y;
                                        if (k == 0) {
                                            ctx.beginPath();
                                            ctx.moveTo(0, -self.maxr);
                                            ctx.lineTo(0, 0);
                                            ctx.stroke();
                                            ctx.fillText(tmpoptions[k].rtitle, ((self.getTextWidth(tmpoptions[k].rtitle)) / 2) * -1, -self.maxr - 10);
                                        }
                                        else {
                                            x = self.setSinLen(self.maxr, tmpangle[k]);
                                            y = self.setCosLen(self.maxr, tmpangle[k]);
                                            ctx.beginPath();
                                            ctx.moveTo(x, -y);
                                            ctx.lineTo(0, 0);
                                            ctx.stroke();
                                            if (x < 0 && -y > 0)
                                                ctx.fillText(tmpoptions[k].rtitle, x - 20, -y + 20);
                                            else if (x < 0 && -y < 0)
                                                ctx.fillText(tmpoptions[k].rtitle, x - 20, -y - 10);
                                            else if (x > 0 && -y > 0)
                                                ctx.fillText(tmpoptions[k].rtitle, x - 10, -y + 20);
                                            else
                                                ctx.fillText(tmpoptions[k].rtitle, x + 10, -y);
                                        }
                                    }
                                    //设置平均值
                                    self.setCircleValue(ctx, tmpoptions, tmpangle);
                                    //连接实际值线
                                    self.setLine(ctx, tmpoptions, tmpangle);
                                }
                            }
                        },
                        created: function () {
                        },
                        methods: {
                            buttonClick: function () {
                            },
                            getTextWidth: function (str) {
                                var w = $('body').append($('<span stlye="display:none;" id="textWidth"/>')).find('#textWidth').html(str).width();
                                $('#textWidth').remove();
                                return w;
                            },
                            setSinLen: function (circler, circleangle) {
                                return Math.sin(2 * Math.PI / 360 * circleangle) * circler;
                            },
                            setCosLen: function (circler, circleangle) {
                                return Math.cos(2 * Math.PI / 360 * circleangle) * circler;
                            },
                            setProportion: function (val, base) {
                                if (val == base) {
                                    return 1;
                                }
                                else if (val > base) {
                                    return ((val % base) / base).toFixed(2);
                                }
                                else {
                                    while (val < base) {
                                        val = val * 10;
                                    }
                                    return ((val / 10) / base).toFixed(2);
                                }
                            },
                            setCircleValue: function (ctx, tmpoptions, tmpangle) {
                                var self = this;
                                for (var i = 0; i < tmpoptions.length; i++) {
                                    var x;
                                    var y;
                                    if (i == 0) {
                                        ctx.fillText(tmpoptions[i].ravg, ((self.getTextWidth(tmpoptions[i].rtitle)) / 2) * -1, -self.middler - 10);
                                    }
                                    else {
                                        x = self.setSinLen(self.middler, tmpangle[i]);
                                        y = self.setCosLen(self.middler, tmpangle[i]);
                                        ctx.fillText(tmpoptions[i].ravg, x, -y);
                                    }
                                }
                            },
                            setLine: function (ctx, tmpoptions, tmpangle) {
                                var self = this;
                                var linePosition = [];
                                for (var i = 0; i < tmpoptions.length; i++) {
                                    var profitX, profitY, len;
                                    if (tmpoptions[i].ravg == 0) {
                                        if (tmpoptions[i].ractual == 0)
                                            len = self.middler;
                                        else if (tmpoptions[i].ractual > 0)
                                            len = self.middler + (self.smallr * self.setProportion(tmpoptions[i].ractual, 50));
                                        else
                                            len = self.middler - (self.middler * self.setProportion(tmpoptions[i].ractual, 100));
                                    }
                                    else if (tmpoptions[i].ravg > 0) {
                                        //小于平均值的0.5倍
                                        if (tmpoptions[i].ractual < tmpoptions[i].ravg * 0.5) {
                                            len = 0.5 * self.middler - (self.middler * 0.1);
                                        }
                                        else if (tmpoptions[i].ractual > tmpoptions[i].ravg * 1.5) {
                                            len = 1.5 * self.middler + (self.middler * 0.1);
                                        }
                                        else {
                                            len = tmpoptions[i].ractual / tmpoptions[i].ravg * self.middler;
                                        }
                                    }
                                    else {
                                        //小于平均值的0.5倍
                                        if (tmpoptions[i].ractual < tmpoptions[i].ravg * 1.5) {
                                            len = 0.5 * self.middler - (self.middler * 0.1);
                                        }
                                        else if (tmpoptions[i].ractual > tmpoptions[i].ravg * 0.5) {
                                            len = 1.5 * self.middler + (self.middler * 0.1);
                                        }
                                        else {
                                            len = 200 - (tmpoptions[i].ractual / tmpoptions[i].ravg * self.middler);
                                        }
                                    }
                                    if (i == 0) {
                                        linePosition.push({ "productiveX": "0", "productiveY": -len });
                                    }
                                    else {
                                        profitX = self.setSinLen(len, tmpangle[i]);
                                        profitY = self.setCosLen(len, tmpangle[i]);
                                        linePosition.push({ "productiveX": profitX, "productiveY": -profitY });
                                    }
                                }
                                ctx.strokeStyle = "rgb(250,0,0)";
                                for (var j = 0; j < linePosition.length; j++) {
                                    if (j < linePosition.length - 1) {
                                        if (j == 0) {
                                            ctx.beginPath();
                                            ctx.moveTo(linePosition[j].productiveX, linePosition[j].productiveY);
                                        }
                                        ctx.lineTo(linePosition[j + 1].productiveX, linePosition[j + 1].productiveY);
                                    }
                                }
                                ctx.closePath();
                                ctx.stroke();
                            }
                        },
                        mounted: function () {
                            var _this = this;
                            var self = this;
                            ap.core.ui.CONTROLS[this.$el.id]._control = this.$root.$children.filter(function (ctl, index) { return ctl.$el.id == _this.$el.id; })[0];
                        }
                    });
                };
                return radarmap;
            }(ap.core.ui));
            widget.radarmap = radarmap;
        })(widget = ui.widget || (ui.widget = {}));
    })(ui = ap.ui || (ap.ui = {}));
})(ap || (ap = {}));
