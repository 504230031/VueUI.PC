namespace ap.ui.widget {
    export class h5 extends ap.core.ui {

        constructor(id: any) {
            super(id);
            this.init();
        }

        //组件类型
        public get comType(): any {
            return this._control["comtype"];
        }

        public set comType(value: any) {
            this._control["comtype"] = value;
        }

        //组件文本
        public get comTitle(): any {
            return this._control["comtitle"];
        }

        public set comTitle(value: any) {
            this._control["comtitle"] = value;
        }

        //组件placeholder
        public get comPlaceholder(): any {
            return this._control["complaceholder"];
        }

        public set comPlaceholder(value: any) {
            this._control["complaceholder"] = value;
        }

        //图片路径
        public get imgSrc(): any {
            return this._control["imgsrc"];
        }

        public set imgSrc(value: any) {
            this._control["imgsrc"] = value;
        }

        //二级DIV样式
        public get innerStyle(): any {
            return this._control["innerstyle"];
        }

        public set innerStyle(value: any) {
            this._control["innerstyle"] = value;
        }

        public init():any {
            Vue.component("ap-h5", {
                template: Base64.decode(sessionStorage["ap-h5"]),
                props:
                {
                    outstyle: {
                        type: String,
                        default: ""
                    }
                },
                data: function () {
                    return {
                        innerstyle: "",//top:10px;left:20px;height:50px;width:50px
                        elestyle: "",//元素样式
                        comtype: 0,
                        editshow: false,
                        relativeLeft: "",
                        relativeTop: "",
                        isSelect: false,
                        resizeTarget: "",//边线选择目标
                        moveTarget: "",//移动选择目标
                        imgsrc: "",//图片地址
                        comtitle: "",//文本名称
                        complaceholder: "",//文本placeholder
                        minrem: "0.1rem"//最小间距
                    }
                },
                watch: {

                },
                created: function () {

                },
                methods: {
                    showmousedown: function (e) {
                        var self = this;
                        e = e || arguments.callee.caller.arguments[0];

                        var target = e.target;
                        var className = target.getAttribute("class");

                        if (className != null && className.indexOf("pageitem") >= 0)
                            self.editshow = false;
                        else {
                            self.editshow = true;
                            self.isSelect = true;
                        }

                        if (self.editshow) {
                            if (className && className.indexOf("bar") != -1) {//选中边线
                                if (className == "bar-radius") {
                                    target = target.parentNode;
                                }
                                self.resizeTarget = target;
                                self.moveTarget = "";
                                target.ox = target.clientX;//老的x y 用于计算每次移动的距离
                                target.oy = target.clientY;
                            } else {
                                self.moveTarget = target;
                                self.resizeTarget = "";
                            }
                        }

                        e.preventDefault();
                    },
                    mouseup: function (e) {
                        var self = this;
                        e = e || arguments.callee.caller.arguments[0];

                        self.isSelect = false;

                        self.relativeLeft = "";
                        self.relativeTop = "";

                        self.resizeTarget = "";
                        self.moveTarget = "";
                        e.stopPropagation();
                    },
                    mousemove: function (e) {
                        var self = this;
                        e = e || arguments.callee.caller.arguments[0];

                        if (self.$el == null) {
                            return;
                        }
                        if (self.moveTarget !== "") {
                            var target = self.$el.children[0];
                            var x = e.clientX;
                            var y = e.clientY;

                            if (self.relativeLeft == "") {
                                self.relativeLeft = x - target.offsetLeft;
                                self.relativeTop = y - target.offsetTop;
                            }

                            x = x - self.relativeLeft;
                            y = y - self.relativeTop;
                            var perX = x / 16 + 'rem';//rem相对位置
                            var perY = y / 16 + 'rem';

                            self.innerstyle = self.updateStyle(self.innerstyle, "top", perY);
                            self.innerstyle = self.updateStyle(self.innerstyle, "left", perX);
                        }
                        self.editmousemove(e);

                        e.preventDefault();
                    },
                    editmousemove: function (e) {
                        var self = this;

                        e = e || arguments.callee.caller.arguments[0];
                        if (self.editshow == false || self.isSelect == false) {
                            return;
                        }
                        if (self.resizeTarget !== "") {//缩放
                            var target = $(self.resizeTarget);
                            //上下左右  左上 左下 右上 右下
                            var h = $(target).parent().height();
                            var w = $(target).parent().width();
                            var className = target[0].style.cursor;
                            var parentDom = $(target).parent();
                            var top = parentDom.position().top;
                            var left = parentDom.position().left;
                            e.movementX = e.clientX - target[0].ox;
                            e.movementY = e.clientY - target[0].oy;
                            target[0].ox = e.clientX;
                            target[0].oy = e.clientY;

                            switch (className) {
                                case "n-resize"://上
                                    self.innerstyle = self.updateStyle(self.innerstyle, "height", self.toRem(h - e.movementY));

                                    if (self.compareRem(self.toRem(h - e.movementY)))
                                        self.innerstyle = self.updateStyle(self.innerstyle, "top", self.toRem(top + e.movementY));

                                    self.innerstyle = self.updateStyle(self.innerstyle, "line-height", self.toRem(h - e.movementY));
                                    break;
                                case "e-resize"://右
                                    self.innerstyle = self.updateStyle(self.innerstyle, "width", self.toRem(w + e.movementX));
                                    break;
                                case "s-resize"://下
                                    self.innerstyle = self.updateStyle(self.innerstyle, "height", self.toRem(h + e.movementY));
                                    self.innerstyle = self.updateStyle(self.innerstyle, "line-height", self.toRem(h + e.movementY));
                                    break;
                                case "w-resize"://左
                                    self.innerstyle = self.updateStyle(self.innerstyle, "width", self.toRem(w - e.movementX));

                                    if (self.compareRem(self.toRem(w - e.movementX)))
                                        self.innerstyle = self.updateStyle(self.innerstyle, "left", self.toRem(left + e.movementX));
                                    break;
                                case "nw-resize"://左上
                                    self.innerstyle = self.updateStyle(self.innerstyle, "width", self.toRem(w - e.movementX));
                                    self.innerstyle = self.updateStyle(self.innerstyle, "height", self.toRem(h - e.movementY));

                                    if (self.compareRem(self.toRem(w - e.movementX)))
                                        self.innerstyle = self.updateStyle(self.innerstyle, "left", self.toRem(left + e.movementX));

                                    if (self.compareRem(self.toRem(h - e.movementY)))
                                        self.innerstyle = self.updateStyle(self.innerstyle, "top", self.toRem(top + e.movementY));
                                    self.innerstyle = self.updateStyle(self.innerstyle, "line-height", self.toRem(h - e.movementY));
                                    break;
                                case "ne-resize"://右上
                                    self.innerstyle = self.updateStyle(self.innerstyle, "width", self.toRem(w + e.movementX));
                                    self.innerstyle = self.updateStyle(self.innerstyle, "height", self.toRem(h - e.movementY));

                                    if (self.compareRem(self.toRem(h - e.movementY)))
                                        self.innerstyle = self.updateStyle(self.innerstyle, "top", self.toRem(top + e.movementY));

                                    self.innerstyle = self.updateStyle(self.innerstyle, "line-height", self.toRem(h - e.movementY));
                                    break;
                                case "sw-resize"://左下
                                    self.innerstyle = self.updateStyle(self.innerstyle, "width", self.toRem(w - e.movementX));
                                    self.innerstyle = self.updateStyle(self.innerstyle, "height", self.toRem(h + e.movementY));

                                    if (self.compareRem(self.toRem(w - e.movementX)))
                                        self.innerstyle = self.updateStyle(self.innerstyle, "left", self.toRem(left + e.movementX));

                                    self.innerstyle = self.updateStyle(self.innerstyle, "line-height", self.toRem(h + e.movementY));
                                    break;
                                case "se-resize"://右下
                                    self.innerstyle = self.updateStyle(self.innerstyle, "width", self.toRem(w + e.movementX));
                                    self.innerstyle = self.updateStyle(self.innerstyle, "height", self.toRem(h + e.movementY));
                                    self.innerstyle = self.updateStyle(self.innerstyle, "line-height", self.toRem(h + e.movementY));
                                    break;
                            }
                        }
                    },
                    toRem: function (num) {
                        var self = this;
                        if (num <= 0)
                            return self.minrem;
                        else
                            return (num / 16) + "rem";
                    },
                    updateStyle: function (style, stylename, stylevalue) {
                        var self = this;
                        var _style = "";
                        if (style != undefined) {
                            var a = style.split(';');

                            //监测当前样式是否包含该属性
                            var iscontain = false;
                            for (var j = 0; j < a.length; j++) {
                                if (a[j].indexOf(stylename) >= 0 && a[j].split(':')[0] == stylename) {
                                    iscontain = true;break;
                                }
                            }
                            if (!iscontain) {
                                style += stylename + ":" + stylevalue + ";";
                            }

                            //重新赋值
                            for (var i = 0; i < a.length; i++) {
                                if (a[i].indexOf(stylename) >= 0 && a[i].split(':')[0] == stylename) {
                                    _style += stylename + ":" + stylevalue + ";";
                                }
                                else {
                                    if (a[i] != "") {
                                        _style += a[i] + ";";
                                    }
                                }
                            }
                        }
                        return _style;
                    },
                    compareRem: function (value) {
                        var self = this;

                        if (parseFloat(value.replace("rem", "")) > parseFloat(self.minrem.replace("rem", "")))
                            return true;
                        else
                            return false;
                    }
                },
                mounted: function () {
                    ap.core.ui.CONTROLS[this.$el.id]._control = this.$root.$children.filter(
                        (ctl, index) => { return ctl.$el.id == this.$el.id }
                    )[0];
                }
            })
        }
    }
}