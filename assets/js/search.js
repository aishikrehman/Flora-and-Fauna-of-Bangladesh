/*!
 * Simple-Jekyll-Search
 * Copyright 2015-2020, Christian Fei
 * Licensed under the MIT License.
 */
! function () {
    "use strict";
    var f = {
        compile: function (r) {
            return i.template.replace(i.pattern, function (t, e) {
                var n = i.middleware(e, r[e], i.template);
                return void 0 !== n ? n : r[e] || t
            })
        },
        setOptions: function (t) {
            i.pattern = t.pattern || i.pattern, i.template = t.template || i.template, "function" == typeof t.middleware && (i.middleware = t.middleware)
        }
    };
    const i = {
        pattern: /\{(.*?)\}/g,
        template: "",
        middleware: function () {}
    };
    var n = function (t, e) {
            var n = e.length,
                r = t.length;
            if (n < r) return !1;
            if (r === n) return t === e;
            t: for (var i = 0, o = 0; i < r; i++) {
                for (var u = t.charCodeAt(i); o < n;)
                    if (e.charCodeAt(o++) === u) continue t;
                return !1
            }
            return !0
        },
        e = new function () {
            this.matches = function (t, e) {
                return n(e.toLowerCase(), t.toLowerCase())
            }
        },
        r = new function () {
            this.matches = function (e, t) {
                return !!e && (e = e.trim().toLowerCase(), (t = t.trim().toLowerCase()).split(" ").filter(function (t) {
                    return 0 <= e.indexOf(t)
                }).length === t.split(" ").length)
            }
        },
        d = {
            put: function (t) {
                if (l(t)) return a(t);
                if (function (t) {
                        return Boolean(t) && "[object Array]" === Object.prototype.toString.call(t)
                    }(t)) return function (n) {
                    const r = [];
                    s();
                    for (let t = 0, e = n.length; t < e; t++) l(n[t]) && r.push(a(n[t]));
                    return r
                }(t);
                return undefined
            },
            clear: s,
            search: function (t) {
                return t ? function (e, n, r, i) {
                    const o = [];
                    for (let t = 0; t < e.length && o.length < i.limit; t++) {
                        var u = function (t, e, n, r) {
                            for (const i in t)
                                if (! function (n, r) {
                                        for (let t = 0, e = r.length; t < e; t++) {
                                            var i = r[t];
                                            if (new RegExp(i).test(n)) return !0
                                        }
                                        return !1
                                    }(t[i], r.exclude) && n.matches(t[i], e)) return t
                        }(e[t], n, r, i);
                        u && o.push(u)
                    }
                    return o
                }(u, t, c.searchStrategy, c).sort(c.sort) : []
            },
            setOptions: function (t) {
                c = t || {}, c.fuzzy = t.fuzzy || !1, c.limit = t.limit || 10, c.searchStrategy = t.fuzzy ? e : r, c.sort = t.sort || o, c.exclude = t.exclude || []
            }
        };

    function o() {
        return 0
    }
    const u = [];
    let c = {};

    function s() {
        return u.length = 0, u
    }

    function l(t) {
        return Boolean(t) && "[object Object]" === Object.prototype.toString.call(t)
    }

    function a(t) {
        return u.push(t), u
    }
    c.fuzzy = !1, c.limit = 10, c.searchStrategy = c.fuzzy ? e : r, c.sort = o, c.exclude = [];
    var p = {
        load: function (t, e) {
            const n = window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            n.open("GET", t, !0), n.onreadystatechange = h(n, e), n.send()
        }
    };

    function h(e, n) {
        return function () {
            if (4 === e.readyState && 200 === e.status) try {
                n(null, JSON.parse(e.responseText))
            } catch (t) {
                n(t, null)
            }
        }
    }
    var m = function y(t) {
            if (!(e = t) || !("undefined" != typeof e.required && e.required instanceof Array)) throw new Error("-- OptionsValidator: required options missing");
            var e;
            if (!(this instanceof y)) return new y(t);
            const r = t.required;
            this.getRequiredOptions = function () {
                return r
            }, this.validate = function (e) {
                const n = [];
                return r.forEach(function (t) {
                    "undefined" == typeof e[t] && n.push(t)
                }), n
            }
        },
        w = {
            merge: function (t, e) {
                const n = {};
                for (const r in t) n[r] = t[r], "undefined" != typeof e[r] && (n[r] = e[r]);
                return n
            },
            isJSON: function (t) {
                try {
                    return t instanceof Object && JSON.parse(JSON.stringify(t)) ? !0 : !1
                } catch (e) {
                    return !1
                }
            }
        };
    ! function (t) {
        let i = {
                searchInput: null,
                resultsContainer: null,
                json: [],
                success: Function.prototype,
                searchResultTemplate: '<div class="py-2 border-bottom"><a href="{url}" title="{desc}">{title}</a><br/>'
                + '<i class="opacity-25 fa-solid fa-clock"></i> {date}<br>'
                + '<i class="opacity-25 fa-solid fa-tag"></i> {category}'
                + '</div>',
                templateMiddleware: Function.prototype,
                sortMiddleware: function () {
                    return 0
                },
                noResultsText: "No results found",
                limit: 10,
                fuzzy: !1,
                debounceTime: null,
                exclude: []
            },
            n;
        const e = function (t, e) {
            e ? (clearTimeout(n), n = setTimeout(t, e)) : t.call()
        };
        var r = ["searchInput", "resultsContainer", "json"];
        const o = m({
            required: r
        });

        function u(t) {
            d.put(t), i.searchInput.addEventListener("input", function (t) {
                -1 === [13, 16, 20, 37, 38, 39, 40, 91].indexOf(t.which) && (c(), e(function () {
                    l(t.target.value)
                }, i.debounceTime))
            })
        }

        function c() {
            i.resultsContainer.innerHTML = ""
        }

        function s(t) {
            i.resultsContainer.innerHTML += t
        }

        function l(t) {
            var e;
            (e = t) && 0 < e.length && (c(), function (e, n) {
                var r = e.length;
                if (0 === r) return s(i.noResultsText);
                for (let t = 0; t < r; t++) e[t].query = n, s(f.compile(e[t]))
            }(d.search(t), t))
        }

        function a(t) {
            throw new Error("SimpleJekyllSearch --- " + t)
        }
        t.SimpleJekyllSearch = function (t) {
            var n;
            0 < o.validate(t).length && a("You must specify the following required options: " + r), i = w.merge(i, t), f.setOptions({
                template: i.searchResultTemplate,
                middleware: i.templateMiddleware
            }), d.setOptions({
                fuzzy: i.fuzzy,
                limit: i.limit,
                sort: i.sortMiddleware,
                exclude: i.exclude
            }), w.isJSON(i.json) ? u(i.json) : (n = i.json, p.load(n, function (t, e) {
                t && a("failed to get JSON (" + n + ")"), u(e)
            }));
            t = {
                search: l
            };
            return "function" == typeof i.success && i.success.call(t), t
        }
    }(window)
}();