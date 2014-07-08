! function (t, i, e, s) {
    function n(i, e) {
        var s = this;
        return this.options = t.extend({}, o, e), this.currentSlide = 0, this.cssSupport = this.css.isSupported("transition") && this.css.isSupported("transform") ? !0 : !1, this.offset = this.options.circular ? 2 : 0, this.options.beforeInit.call(this), this.parent = i, this.init(), this.play(), this.options.afterInit.call(this), {
            current: function () {
                return -s.currentSlide + 1
            },
            reinit: function () {
                s.init()
            },
            play: function () {
                s.play()
            },
            pause: function () {
                s.pause()
            },
            next: function (t) {
                s.slide(1, !1, t)
            },
            prev: function (t) {
                s.slide(-1, !1, t)
            },
            jump: function (t, i) {
                s.slide(t - 1, !0, i)
            },
            nav: function (t) {
                s.navigation.wrapper && s.navigation.wrapper.remove(), s.options.navigation = t ? t : s.options.navigation, s.navigation()
            },
            arrows: function (t) {
                s.arrows.wrapper && s.arrows.wrapper.remove(), s.options.arrows = t ? t : s.options.arrows, s.arrows()
            }
        }
    }
    var a = "glide",
        o = {
            autoplay: 4e3,
            hoverpause: !0,
            circular: !0,
            animationDuration: 500,
            animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
            arrows: !0,
            arrowsWrapperClass: "slider-arrows",
            arrowMainClass: "slider-arrow",
            arrowRightClass: "slider-arrow--right",
            arrowRightText: "next",
            arrowLeftClass: "slider-arrow--left",
            arrowLeftText: "prev",
            navigation: !0,
            navigationCenter: !0,
            navigationClass: "slider-nav",
            navigationItemClass: "slider-nav__item",
            navigationCurrentItemClass: "slider-nav__item--current",
            keyboard: !0,
            touchDistance: 60,
            beforeInit: function () {},
            afterInit: function () {},
            beforeTransition: function () {},
            afterTransition: function () {}
        };
    n.prototype.build = function () {
        this.bindings(), this.slides.length > 1 && (this.options.circular && this.circular(), this.options.arrows && this.arrows(), this.options.navigation && this.navigation()), this.events()
    }, n.prototype.circular = function () {
        this.firstClone = this.slides.filter(":first-child").clone().width(this.slides.spread), this.lastClone = this.slides.filter(":last-child").clone().width(this.slides.spread), this.wrapper.append(this.firstClone).prepend(this.lastClone).width(this.parent.width() * (this.slides.length + 2)).trigger("clearTransition").trigger("setTranslate", [-this.slides.spread])
    }, n.prototype.navigation = function () {
        this.navigation.items = {}, this.navigation.wrapper = t("<div />", {
            "class": this.options.navigationClass
        }).appendTo(this.options.navigation === !0 ? this.parent : this.options.navigation);
        for (var i = 0; i < this.slides.length; i++) this.navigation.items[i] = t("<a />", {
            href: "#",
            "class": this.options.navigationItemClass,
            "data-distance": i
        }).appendTo(this.navigation.wrapper);
        this.navigation.items[0].addClass(this.options.navigationCurrentItemClass), this.options.navigationCenter && this.navigation.wrapper.css({
            left: "50%",
            width: this.navigation.wrapper.children().outerWidth(!0) * this.navigation.wrapper.children().length,
            "margin-left": -(this.navigation.wrapper.outerWidth(!0) / 2)
        })
    }, n.prototype.arrows = function () {
        this.arrows.wrapper = t("<div />", {
            "class": this.options.arrowsWrapperClass
        }).appendTo(this.options.arrows === !0 ? this.parent : this.options.arrows), this.arrows.right = t("<a />", {
            href: "#",
            "class": this.options.arrowMainClass + " " + this.options.arrowRightClass,
            "data-distance": "1",
            html: this.options.arrowRightText
        }).appendTo(this.arrows.wrapper), this.arrows.left = t("<a />", {
            href: "#",
            "class": this.options.arrowMainClass + " " + this.options.arrowLeftClass,
            "data-distance": "-1",
            html: this.options.arrowLeftText
        }).appendTo(this.arrows.wrapper)
    }, n.prototype.bindings = function () {
        var i = this,
            e = this.options,
            s = this.css.getPrefix();
        this.wrapper.bind({
            setTransition: function () {
                t(this).css(s + "transition", s + "transform " + e.animationDuration + "ms " + e.animationTimingFunc)
            },
            clearTransition: function () {
                t(this).css(s + "transition", "none")
            },
            setTranslate: function (e, n) {
                i.cssSupport ? t(this).css(s + "transform", "translate3d(" + n + "px, 0px, 0px)") : t(this).css("margin-left", n)
            }
        })
    }, n.prototype.events = function () {
        this.options.touchDistance && this.parent.on({
            "touchstart MSPointerDown": t.proxy(this.events.touchstart, this),
            "touchmove MSPointerMove": t.proxy(this.events.touchmove, this),
            "touchend MSPointerUp": t.proxy(this.events.touchend, this)
        }), this.arrows.wrapper && t(this.arrows.wrapper).children().on("click touchstart", t.proxy(this.events.arrows, this)), this.navigation.wrapper && t(this.navigation.wrapper).children().on("click touchstart", t.proxy(this.events.navigation, this)), this.options.keyboard && t(e).on("keyup.glideKeyup", t.proxy(this.events.keyboard, this)), this.options.hoverpause && this.parent.on("mouseover mouseout", t.proxy(this.events.hover, this)), t(i).on("resize", t.proxy(this.events.resize, this))
    }, n.prototype.events.navigation = function (i) {
        this.wrapper.attr("disabled") || (i.preventDefault(), this.slide(t(i.currentTarget).data("distance"), !0))
    }, n.prototype.events.arrows = function (i) {
        this.wrapper.attr("disabled") || (i.preventDefault(), this.slide(t(i.currentTarget).data("distance"), !1))
    }, n.prototype.events.keyboard = function (t) {
        this.wrapper.attr("disabled") || (39 === t.keyCode && this.slide(1), 37 === t.keyCode && this.slide(-1))
    }, n.prototype.events.hover = function (t) {
        this.pause(), "mouseout" === t.type && this.play()
    }, n.prototype.events.resize = function () {
        this.dimensions(), this.slide(0)
    }, n.prototype.disableEvents = function () {
        this.wrapper.attr("disabled", !0)
    }, n.prototype.enableEvents = function () {
        this.wrapper.attr("disabled", !1)
    }, n.prototype.events.touchstart = function (t) {
        var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
        this.events.touchStartX = i.pageX, this.events.touchStartY = i.pageY, this.events.touchSin = null
    }, n.prototype.events.touchmove = function (t) {
        var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
            e = i.pageX - this.events.touchStartX,
            s = i.pageY - this.events.touchStartY,
            n = Math.abs(e << 2),
            a = Math.abs(s << 2),
            o = Math.sqrt(n + a),
            r = Math.sqrt(a);
        this.events.touchSin = Math.asin(r / o), this.events.touchSin * (180 / Math.PI) < 45 && t.preventDefault()
    }, n.prototype.events.touchend = function (t) {
        var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
            e = i.pageX - this.events.touchStartX;
        e > this.options.touchDistance && this.events.touchSin * (180 / Math.PI) < 45 ? this.slide(-1) : e < -this.options.touchDistance && this.events.touchSin * (180 / Math.PI) < 45 && this.slide(1)
    }, n.prototype.slide = function (i, e, s) {
        this.pause(), this.options.beforeTransition.call(this);
        var n = this,
            a = e ? 0 : this.currentSlide,
            o = -(this.slides.length - 1),
            r = !1,
            h = !1;
        0 === a && -1 === i ? (r = !0, a = o) : a === o && 1 === i ? (h = !0, a = 0) : a += -i;
        var p = this.slides.spread * a;
        this.options.circular && (p -= this.slides.spread, (h || r) && this.disableEvents(), h && (p = this.slides.spread * (o - 2)), r && (p = 0)), this.cssSupport ? this.wrapper.trigger("setTransition").trigger("setTranslate", [p]) : this.wrapper.stop().animate({
            "margin-left": p
        }, this.options.animationDuration), this.options.circular && ((r || h) && this.afterAnimation(function () {
            n.wrapper.trigger("clearTransition"), n.enableEvents()
        }), h && this.afterAnimation(function () {
            h = !1, n.wrapper.trigger("setTranslate", [-n.slides.spread])
        }), r && this.afterAnimation(function () {
            r = !1, n.wrapper.trigger("setTranslate", [n.slides.spread * (o - 1)])
        })), this.options.navigation && this.navigation.wrapper && t(this.parent).children("." + this.options.navigationClass).children().eq(-a).addClass(this.options.navigationCurrentItemClass).siblings().removeClass(this.options.navigationCurrentItemClass), this.currentSlide = a, this.afterAnimation(function () {
            n.options.afterTransition.call(n), "undefined" !== s && "function" == typeof s && s()
        }), this.play()
    }, n.prototype.play = function () {
        var t = this;
        this.options.autoplay && (this.auto = setInterval(function () {
            t.slide(1, !1)
        }, this.options.autoplay))
    }, n.prototype.pause = function () {
        this.options.autoplay && (this.auto = clearInterval(this.auto))
    }, n.prototype.afterAnimation = function (t) {
        setTimeout(function () {
            t()
        }, this.options.animationDuration + 10)
    }, n.prototype.dimensions = function () {
        this.slides.spread = this.parent.width(), this.wrapper.width(this.slides.spread * (this.slides.length + this.offset)), this.slides.add(this.firstClone).add(this.lastClone).width(this.slides.spread)
    }, n.prototype.init = function () {
        this.wrapper = this.parent.children(), this.slides = this.wrapper.children(), this.dimensions(), this.build()
    }, n.prototype.css = {
        isSupported: function (t) {
            var n = !1,
                a = "Khtml ms O Moz Webkit".split(" "),
                o = e.createElement("div"),
                r = null;
            if (t = t.toLowerCase(), o.style[t] !== s && (n = !0), n === !1) {
                r = t.charAt(0).toUpperCase() + t.substr(1);
                for (var h = 0; h < a.length; h++)
                    if (o.style[a[h] + r] !== s) {
                        n = !0;
                        break
                    }
            }
            return i.opera && i.opera.version() < 13 && (n = !1), ("undefined" === n || n === s) && (n = !1), n
        },
        getPrefix: function () {
            if (!i.getComputedStyle) return "";
            var t = i.getComputedStyle(e.documentElement, "");
            return "-" + (Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/) || "" === t.OLink && ["", "o"])[1] + "-"
        }
    }, t.fn[a] = function (i) {
        return this.each(function () {
            t.data(this, "api_" + a) || t.data(this, "api_" + a, new n(t(this), i))
        })
    }
}(jQuery, window, document),
function () {
    function t() {}

    function i(t, i) {
        this.path = t, "undefined" != typeof i && null !== i ? (this.at_2x_path = i, this.perform_check = !1) : (this.at_2x_path = t.replace(/\.\w+$/, function (t) {
            return "@2x" + t
        }), this.perform_check = !0)
    }

    function e(t) {
        this.el = t, this.path = new i(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
        var e = this;
        this.path.check_2x_variant(function (t) {
            t && e.swap()
        })
    }
    var s = "undefined" == typeof exports ? window : exports,
        n = {
            check_mime_type: !0,
            force_original_dimensions: !0
        };
    s.Retina = t, t.configure = function (t) {
        null === t && (t = {});
        for (var i in t) n[i] = t[i]
    }, t.init = function (t) {
        null === t && (t = s);
        var i = t.onload || function () {};
        t.onload = function () {
            var t, s, n = document.getElementsByTagName("img"),
                a = [];
            for (t = 0; t < n.length; t++) s = n[t], a.push(new e(s));
            i()
        }
    }, t.isRetina = function () {
        var t = "(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";
        return s.devicePixelRatio > 1 ? !0 : s.matchMedia && s.matchMedia(t).matches ? !0 : !1
    }, s.RetinaImagePath = i, i.confirmed_paths = [], i.prototype.is_external = function () {
        return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }, i.prototype.check_2x_variant = function (t) {
        var e, s = this;
        return this.is_external() ? t(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in i.confirmed_paths ? t(!0) : (e = new XMLHttpRequest, e.open("HEAD", this.at_2x_path), e.onreadystatechange = function () {
            if (4 != e.readyState) return t(!1);
            if (e.status >= 200 && e.status <= 399) {
                if (n.check_mime_type) {
                    var a = e.getResponseHeader("Content-Type");
                    if (null === a || !a.match(/^image/i)) return t(!1)
                }
                return i.confirmed_paths.push(s.at_2x_path), t(!0)
            }
            return t(!1)
        }, e.send(), void 0) : t(!0)
    }, s.RetinaImage = e, e.prototype.swap = function (t) {
        function i() {
            e.el.complete ? (n.force_original_dimensions && (e.el.setAttribute("width", e.el.offsetWidth), e.el.setAttribute("height", e.el.offsetHeight)), e.el.setAttribute("src", t)) : setTimeout(i, 5)
        }
        "undefined" == typeof t && (t = this.path.at_2x_path);
        var e = this;
        i()
    }, t.isRetina() && t.init(s)
}(), setTimeout(function () {
    $(".bg-wrapper").removeClass("visuallyhidden").addClass("animated fadeIn")
}, 300), setTimeout(function () {
    $("nav").removeClass("visuallyhidden").addClass("animated bounceInDown")
}, 600), setTimeout(function () {
    $(".macbook").removeClass("visuallyhidden").addClass("animated bounceInUp")
}, 1300), setTimeout(function () {
    $(".main-text__heading").removeClass("visuallyhidden").addClass("animated fadeIn")
}, 1400), setTimeout(function () {
    $(".main-text__cta").find("h2").removeClass("visuallyhidden").addClass("animated fadeIn")
}, 2500), setTimeout(function () {
    $(".main-text__cta").find("button").removeClass("visuallyhidden").addClass("animated fadeIn")
}, 3500);
var glide = $(".slider").glide({
    autoplay: 5e3,
    arrows: !1,
    animationDuration: 700,
    animationTimingFunc: "cubic-bezier(.30,1.02,.18,1.03)",
    navigation: "false"
}).data("api_glide");
$(".slider-arrow--right").on("click touchstart", function () {
    return glide.next(), !1
}), $(".slider-arrow--left").on("click touchstart", function () {
    return glide.prev(), !1
}), -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && ($("h2").css("font-weight", "400"), $(".btn").css("font-weight", "600"), $("nav").css("font-weight", "600"));