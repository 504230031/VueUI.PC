namespace ap.ui.widget {

    export class radarmap extends ap.core.ui {

        constructor(id: any) {
            super(id);
            this.init();
        }

        //雷达图内容
        public get options(): any {
            return this._control["options"];
        }

        public set options(value: any) {
            this._control["options"] = value;
        }

        //小圆半径
        public get smallr(): any {
            return this._control["smallr"];
        }

        public set smallr(value: any) {
            this._control["smallr"] = value;
        }

        //中圆半径
        public get middler(): any {
            return this._control["middler"];
        }

        public set middler(value: any) {
            this._control["middler"] = value;
        }

        //大圆半径
        public get larger(): any {
            return this._control["larger"];
        }

        public set larger(value: any) {
            this._control["larger"] = value;
        }

        //最大长度
        public get maxr(): any {
            return this._control["maxr"];
        }

        public set maxr(value: any) {
            this._control["maxr"] = value;
        }

        public init() {
            Vue.component("ap-radarmap", {
                template:
                '<canvas v-bind:height="innerheight" v-bind:width="innerwidth"></canvas>',
                props:
                {
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
                        options: [],//雷达图内容
                        nameoptions: [],
                        avgoptions: [],
                        actualoptions: [],
                        circlex: this.innerwidth / 2,//圆点为DIV中心
                        circley: this.innerheight / 2,
                        smallr: 50,
                        middler: 100,
                        larger: 150,
                        maxr: 170,
                        isfirst: true
                    }
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
                            ctx.strokeStyle = "#000000";//设置线条颜色

                            //把中心点放到500,200坐标处
                            if (self.isfirst == true) {//第一次加载设置圆心
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
                                } else {
                                    tmpangle.push((360 / tmpoptions.length * tmpangle.length).toFixed(2));
                                }
                            }

                            //画线
                            for (var k = 0; k < tmpoptions.length; k++) {
                                var x; var y;
                                if (k == 0) {//第一条线
                                    ctx.beginPath();
                                    ctx.moveTo(0, -self.maxr);
                                    ctx.lineTo(0, 0);
                                    ctx.stroke();
                                    ctx.fillText(tmpoptions[k].rtitle, ((self.getTextWidth(tmpoptions[k].rtitle)) / 2) * -1, -self.maxr - 10);
                                } else {
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
                    getTextWidth(str) {
                        var w = $('body').append($('<span stlye="display:none;" id="textWidth"/>')).find('#textWidth').html(str).width();
                        $('#textWidth').remove();
                        return w;
                    },
                    setSinLen(circler, circleangle): any {
                        return Math.sin(2 * Math.PI / 360 * circleangle) * circler
                    },
                    setCosLen(circler, circleangle): any{
                        return Math.cos(2 * Math.PI / 360 * circleangle) * circler
                    },
                    setProportion(val, base): any {
                        if (val == base) {
                            return 1;
                        } else if (val > base) {
                            return ((val % base) / base).toFixed(2);
                        } else {                            
                            while (val < base) {
                                val = val * 10;
                            }

                            return ((val / 10) / base).toFixed(2);
                        }
                    },
                    setCircleValue(ctx, tmpoptions, tmpangle) {
                        var self = this;

                        for (var i = 0; i < tmpoptions.length; i++) {
                            var x; var y;
                            if (i == 0) {//第一条线
                                ctx.fillText(tmpoptions[i].ravg, ((self.getTextWidth(tmpoptions[i].rtitle)) / 2) * -1, -self.middler - 10);
                            } else {
                                x = self.setSinLen(self.middler, tmpangle[i]);
                                y = self.setCosLen(self.middler, tmpangle[i]);

                                ctx.fillText(tmpoptions[i].ravg, x, -y);
                            }
                        }                        
                    },
                    setLine(ctx, tmpoptions, tmpangle) {
                        var self = this;

                        var linePosition = [];
                        for (var i = 0; i < tmpoptions.length; i++) {
                            var profitX, profitY, len;

                            if (tmpoptions[i].ravg == 0) {//平均值为0时需按照另一种比例来算
                                if (tmpoptions[i].ractual == 0)
                                    len = self.middler;
                                else if (tmpoptions[i].ractual > 0)
                                    len = self.middler + (self.smallr * self.setProportion(tmpoptions[i].ractual, 50));
                                else
                                    len = self.middler - (self.middler * self.setProportion(tmpoptions[i].ractual, 100));
                            } else if (tmpoptions[i].ravg > 0) {
                                //小于平均值的0.5倍
                                if (tmpoptions[i].ractual < tmpoptions[i].ravg * 0.5) {
                                    len = 0.5 * self.middler - (self.middler * 0.1);
                                }
                                //大于平均值的1.5倍
                                else if (tmpoptions[i].ractual > tmpoptions[i].ravg * 1.5) {
                                    len = 1.5 * self.middler + (self.middler * 0.1);
                                }
                                else {
                                    len = tmpoptions[i].ractual / tmpoptions[i].ravg * self.middler;
                                }
                            } else {
                                //小于平均值的0.5倍
                                if (tmpoptions[i].ractual < tmpoptions[i].ravg * 1.5) {
                                    len = 0.5 * self.middler - (self.middler * 0.1);
                                }
                                //大于平均值的1.5倍
                                else if (tmpoptions[i].ractual > tmpoptions[i].ravg * 0.5) {
                                    len = 1.5 * self.middler + (self.middler * 0.1);
                                }
                                else {
                                    len = 200 - (tmpoptions[i].ractual / tmpoptions[i].ravg * self.middler);
                                }
                            }

                            if (i == 0) {
                                linePosition.push({ "productiveX": "0", "productiveY": -len });
                            } else {
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
                    var self = this;
                    ap.core.ui.CONTROLS[this.$el.id]._control = this.$root.$children.filter((ctl, index) => { return ctl.$el.id == this.$el.id })[0];
                }
            })

        }
    }

}