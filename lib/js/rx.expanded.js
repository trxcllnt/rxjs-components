/*
 Copyright (c) Microsoft Corporation.  All rights reserved.
 This code is licensed by Microsoft Corporation under the terms
 of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
 See http://go.microsoft.com/fwlink/?LinkID=220762.
*/
 (function(x, n) {
    var m,
    ia = function() {},
    J = function() {
        return (new Date).getTime()
    },
    V = function(a, b) {
        return a === b
    },
    Q = function(a) {
        return a
    },
    W = function(a) {
        return a.toString()
    },
    X = Object.prototype.hasOwnProperty,
    o = function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) X.call(b, d) && (a[d] = b[d]);
        c.prototype = b.prototype;
        a.prototype = new c;
        a.base = b.prototype;
        return a
    },
    E = function(a, b) {
        for (var c in b) X.call(b, c) && (a[c] = b[c])
    },
    y = Array.prototype.slice,
    K = "Object has been disposed";
    m = "undefined" !== typeof x.module &&
    "undefined" !== typeof x.exports ? x.module.exports: x.Rx = {
        Internals: {}
    };
    m.VERSION = "1.0.10621";
    var ja = function(a, b) {
        return i(function(c) {
            return new p(b.getDisposable(), a.subscribe(c))
        })
    },
    F = function(a, b, c) {
        return i(function(d) {
            var e = new v,
            g = new v,
            d = c(d, e, g);
            e.disposable(a.materialize().select(function(b) {
                return {
                    switchValue: function(a) {
                        return a(b)
                    }
                }
            }).subscribe(d));
            g.disposable(b.materialize().select(function(b) {
                return {
                    switchValue: function(a, c) {
                        return c(b)
                    }
                }
            }).subscribe(d));
            return new p(e, g)
        })
    },
    u = m.Internals.List =
    function() {
        function a(b) {
            this.comparer = b || V;
            this.size = 0;
            this.items = []
        }
        a.fromArray = function(b, c) {
            var d,
            e = b.length,
            g = new a(c);
            for (d = 0; d < e; d++) g.add(b[d]);
            return g
        };
        a.prototype.count = function() {
            return this.size
        };
        a.prototype.add = function(b) {
            this.items[this.size] = b;
            this.size++
        };
        a.prototype.removeAt = function(b) {
            if (0 > b || b >= this.size) throw Error("Argument out of range");
            0 === b ? this.items.shift() : this.items.splice(b, 1);
            this.size--
        };
        a.prototype.indexOf = function(b) {
            var a,
            d;
            for (a = 0; a < this.items.length; a++) if (d =
            this.items[a], this.comparer(b, d)) return a;
            return - 1
        };
        a.prototype.remove = function(b) {
            b = this.indexOf(b);
            if ( - 1 === b) return ! 1;
            this.removeAt(b);
            return ! 0
        };
        a.prototype.clear = function() {
            this.items = [];
            this.size = 0
        };
        a.prototype.item = function(b, a) {
            if (0 > b || b >= count) throw Error("Argument out of range");
            if (a === n) return this.items[b];
            this.items[b] = a
        };
        a.prototype.toArray = function() {
            var b = [],
            a;
            for (a = 0; a < this.items.length; a++) b.push(this.items[a]);
            return b
        };
        a.prototype.contains = function(b) {
            for (var a = 0; a < this.items.length; a++) if (this.comparer(b,
            this.items[a])) return ! 0;
            return ! 1
        };
        return a
    } (),
    ka = function() {
        function a(b, a) {
            this.id = b;
            this.value = a
        }
        a.prototype.compareTo = function(b) {
            var a = this.value.compareTo(b.value);
            0 === a && (a = this.id - b.id);
            return a
        };
        return a
    } (),
    Y = function() {
        function a(b) {
            this.items = Array(b);
            this.size = 0
        }
        a.prototype.count = function() {
            return this.size
        };
        a.prototype.isHigherPriority = function(b, a) {
            return 0 > this.items[b].compareTo(this.items[a])
        };
        a.prototype.percolate = function(b) {
            var a,
            d;
            if (! (b >= this.size || 0 > b)) if (a = Math.floor((b - 1) /
            2), !(0 > a || a === b) && this.isHigherPriority(b, a)) d = this.items[b],
            this.items[b] = this.items[a],
            this.items[a] = d,
            this.percolate(a)
        };
        a.prototype.heapify = function(b) {
            var a,
            d,
            e;
            b === n && (b = 0);
            b >= this.size || 0 > b || (d = 2 * b + 1, e = 2 * b + 2, a = b, d < this.size && this.isHigherPriority(d, a) && (a = d), e < this.size && this.isHigherPriority(e, a) && (a = e), a !== b && (d = this.items[b], this.items[b] = this.items[a], this.items[a] = d, this.heapify(a)))
        };
        a.prototype.peek = function() {
            return this.items[0].value
        };
        a.prototype.removeAt = function(b) {
            this.items[b] =
            this.items[--this.size];
            delete this.items[this.size];
            this.heapify();
            if (this.size < this.items.length >> 2) for (var b = this.items, a = this.items = Array(this.items.length >> 1), d = this.size; 0 < d;) a[d + 0 - 1] = b[d + 0 - 1],
            d--
        };
        a.prototype.dequeue = function() {
            var b = this.peek();
            this.removeAt(0);
            return b
        };
        a.prototype.enqueue = function(b) {
            var c;
            if (this.size >= this.items.length) {
                c = this.items;
                for (var d = this.items = Array(2 * this.items.length), e = c.length; 0 < e;) d[e + 0 - 1] = c[e + 0 - 1],
                e--
            }
            c = this.size++;
            this.items[c] = new ka(a.count++, b);
            this.percolate(c)
        };
        a.prototype.remove = function(b) {
            var a;
            for (a = 0; a < this.size; a++) if (this.items[a].value === b) return this.removeAt(a),
            !0;
            return ! 1
        };
        a.count = 0;
        return a
    } (),
    p = m.CompositeDisposable = function() {
        function a() {
            var b = !1,
            a = u.fromArray(y.call(arguments));
            this.count = function() {
                return a.count()
            };
            this.add = function(d) {
                b ? d.dispose() : a.add(d)
            };
            this.remove = function(d) {
                var e = !1;
                b || (e = a.remove(d));
                e && d.dispose();
                return e
            };
            this.dispose = function() {
                var d,
                e;
                b || (b = !0, d = a.toArray(), a.clear());
                if (d !== n) for (e = 0; e < d.length; e++) d[e].dispose()
            };
            this.clear = function() {
                var b,
                e;
                b = a.toArray();
                a.clear();
                for (e = 0; e < b.length; e++) b[e].dispose()
            };
            this.contains = function(b) {
                return a.contains(b)
            };
            this.isDisposed = function() {
                return b
            };
            this.toArray = function() {
                return a.toArray()
            }
        }
        a.prototype.count = function() {
            return this.count()
        };
        a.prototype.add = function(b) {
            this.add(b)
        };
        a.prototype.remove = function(b) {
            this.remove(b)
        };
        a.prototype.dispose = function() {
            this.dispose()
        };
        a.prototype.clear = function() {
            this.clear()
        };
        a.prototype.contains = function(b) {
            return this.contains(b)
        };
        a.prototype.isDisposed = function() {
            return this.isDisposed()
        };
        a.prototype.toArray = function() {
            return this.toArray()
        };
        return a
    } (),
    L = m.Disposable = function() {
        function a(b) {
            var a = !1;
            this.dispose = function() {
                a || (b(), a = !0)
            }
        }
        a.prototype.dispose = function() {
            this.dispose()
        };
        return a
    } (),
    A = L.create = function(a) {
        return new L(a)
    },
    w = L.empty = new L(function() {}),
    v = m.SingleAssignmentDisposable = function() {
        function a() {
            var b = !1,
            a = null;
            this.isDisposed = function() {
                return b
            };
            this.getDisposable = function() {
                return a
            };
            this.setDisposable =
            function(d) {
                if (null !== a) throw Error("Disposable has already been assigned");
                var e = b;
                e || (a = d);
                e && null !== d && d.dispose()
            };
            this.dispose = function() {
                var d = null;
                b || (b = !0, d = a, a = null);
                null !== d && d.dispose()
            }
        }
        a.prototype.isDisposed = function() {
            return this.isDisposed()
        };
        a.prototype.disposable = function(b) {
            if (b === n) return this.getDisposable();
            this.setDisposable(b)
        };
        a.prototype.dispose = function() {
            this.dispose()
        };
        return a
    } (),
    C = m.SerialDisposable = function() {
        function a() {
            var b = !1,
            a = null;
            this.isDisposed = function() {
                return b
            };
            this.getDisposable = function() {
                return a
            };
            this.setDisposable = function(d) {
                var e = b,
                g = null;
                e || (g = a, a = d);
                null !== g && g.dispose();
                e && null !== d && d.dispose()
            };
            this.dispose = function() {
                var d = null;
                b || (b = !0, d = a, a = null);
                null !== d && d.dispose()
            }
        }
        a.prototype.isDisposed = function() {
            return this.isDisposed()
        };
        a.prototype.disposable = function(a) {
            if (a === n) return this.getDisposable();
            this.setDisposable(a)
        };
        a.prototype.dispose = function() {
            this.dispose()
        };
        a.prototype.dispose = function() {
            this.dispose()
        };
        return a
    } (),
    Z = m.RefCountDisposable =
    function() {
        function a(a) {
            var c = !1,
            d = !1,
            e = 0;
            this.dispose = function() {
                var g = !1; ! c && !d && (d = !0, 0 === e && (g = c = !0));
                g && a.dispose()
            };
            this.getDisposable = function() {
                if (c) return w;
                e++;
                var g = !1;
                return {
                    dispose: function() {
                        var h = !1; ! c && !g && (g = !0, e--, 0 === e && d && (h = c = !0));
                        h && a.dispose()
                    }
                }
            };
            this.isDisposed = function() {
                return c
            }
        }
        a.prototype.dispose = function() {
            this.dispose()
        };
        a.prototype.getDisposable = function() {
            return this.getDisposable()
        };
        a.prototype.isDisposed = function() {
            return this.isDisposed()
        };
        return a
    } (),
    R;
    R = function() {
        function a(a,
        c, d, e, g) {
            this.scheduler = a;
            this.state = c;
            this.action = d;
            this.dueTime = e;
            this.comparer = g ||
            function(a, b) {
                return a - b
            };
            this.disposable = new v
        }
        a.prototype.invoke = function() {
            return this.disposable.disposable(this.invokeCore())
        };
        a.prototype.compareTo = function(a) {
            return this.comparer(this.dueTime, a.dueTime)
        };
        a.prototype.isCancelled = function() {
            return this.disposable.isDisposed()
        };
        a.prototype.invokeCore = function() {
            return this.action(this.scheduler, this.state)
        };
        return a
    } ();
    var s = m.Scheduler = function() {
        function a(a,
        b, c, d) {
            this.now = a;
            this._schedule = b;
            this._scheduleRelative = c;
            this._scheduleAbsolute = d
        }
        var b = function(a, b) {
            var c,
            d,
            e,
            k;
            d = new p;
            k = b.first;
            c = b.second;
            e = null;
            e = function(b) {
                c(b,
                function(b) {
                    var c,
                    h,
                    l;
                    l = h = !1;
                    c = null;
                    c = a.scheduleWithState(b,
                    function(a, b) {
                        h ? d.remove(c) : l = !0;
                        e(b);
                        return w
                    });
                    l || (d.add(c), h = !0)
                })
            };
            e(k);
            return d
        },
        c = function(a, b) {
            var c,
            d,
            e,
            k;
            d = new p;
            k = b.first;
            c = b.second;
            e = function(b) {
                c(b,
                function(b, c) {
                    var h,
                    l,
                    k;
                    k = l = !1;
                    h = a.scheduleWithRelativeAndState(b, c,
                    function(a, b) {
                        l ? d.remove(h) : k = !0;
                        e(b);
                        return w
                    });
                    k || (d.add(h), l = !0)
                })
            };
            e(k);
            return d
        },
        d = function(a, b) {
            var c,
            d,
            e,
            k;
            d = new p;
            k = b.first;
            c = b.second;
            e = function(b) {
                c(b,
                function(b, c) {
                    var h = !1,
                    l = !1,
                    k = a.scheduleWithAbsoluteAndState(b, c,
                    function(a, b) {
                        h ? d.remove(k) : l = !0;
                        e(b);
                        return w
                    });
                    l || (d.add(k), h = !0)
                })
            };
            e(k);
            return d
        },
        e = function(a, b) {
            b();
            return w
        };
        a.prototype.schedule = function(a) {
            return this._schedule(a, e)
        };
        a.prototype.scheduleWithState = function(a, b) {
            return this._schedule(a, b)
        };
        a.prototype.scheduleWithRelative = function(a, b) {
            return this._scheduleRelative(b,
            a, e)
        };
        a.prototype.scheduleWithRelativeAndState = function(a, b, c) {
            return this._scheduleRelative(a, b, c)
        };
        a.prototype.scheduleWithAbsolute = function(a, b) {
            return this._scheduleAbsolute(b, a, e)
        };
        a.prototype.scheduleWithAbsoluteAndState = function(a, b, c) {
            return this._scheduleAbsolute(a, b, c)
        };
        a.prototype.scheduleRecursive = function(a) {
            return this.scheduleRecursiveWithState(a,
            function(a, b) {
                a(function() {
                    b(a)
                })
            })
        };
        a.prototype.scheduleRecursiveWithState = function(a, c) {
            return this.scheduleWithState({
                first: a,
                second: c
            },
            function(a, c) {
                return b(a, c)
            })
        };
        a.prototype.scheduleRecursiveWithRelative = function(a, b) {
            return this.scheduleRecursiveWithRelativeAndState(b, a,
            function(a, b) {
                a(function(c) {
                    b(a, c)
                })
            })
        };
        a.prototype.scheduleRecursiveWithRelativeAndState = function(a, b, d) {
            return this._scheduleRelative({
                first: a,
                second: d
            },
            b,
            function(a, b) {
                return c(a, b)
            })
        };
        a.prototype.scheduleRecursiveWithAbsolute = function(a, b) {
            return this.scheduleRecursiveWithAbsoluteAndState(b, a,
            function(a, b) {
                a(function(c) {
                    b(a, c)
                })
            })
        };
        a.prototype.scheduleRecursiveWithAbsoluteAndState =
        function(a, b, c) {
            return this._scheduleAbsolute({
                first: a,
                second: c
            },
            b,
            function(a, b) {
                return d(a, b)
            })
        };
        a.now = J;
        a.normalize = function(a) {
            0 > a && (a = 0);
            return a
        };
        return a
    } (),
    f = function() {
        function a() {
            var b = this;
            a.base.constructor.call(this, J,
            function(a, d) {
                return d(b, a)
            },
            function(a, d, e) {
                for (; 0 < s.normalize(d););
                return e(b, a)
            },
            function(a, d, e) {
                return b.scheduleWithRelativeAndState(a, d - b.now(), e)
            })
        }
        o(a, s);
        return a
    } (),
    B = s.Immediate = new f,
    la = function() {
        function a() {
            M.queue = new Y(4)
        }
        a.prototype.dispose = function() {
            M.queue =
            null
        };
        a.prototype.run = function() {
            for (var a, c = M.queue; 0 < c.count();) if (a = c.dequeue(), !a.isCancelled()) {
                for (; 0 < a.dueTime - s.now(););
                a.isCancelled() || a.invoke()
            }
        };
        return a
    } (),
    M = function() {
        function a() {
            var b = this;
            a.base.constructor.call(this, J,
            function(a, d) {
                return b.scheduleWithRelativeAndState(a, 0, d)
            },
            function(c, d, e) {
                var g = b.now() + s.normalize(d),
                d = a.queue,
                c = new R(b, c, e, g);
                if (null === d) {
                    e = new la;
                    try {
                        a.queue.enqueue(c),
                        e.run()
                    } finally {
                        e.dispose()
                    }
                } else d.enqueue(c);
                return c.disposable
            },
            function(a, d, e) {
                return b.scheduleWithRelativeAndState(a,
                d - b.now(), e)
            })
        }
        o(a, s);
        a.prototype.scheduleRequired = function() {
            return null === a.queue
        };
        a.prototype.ensureTrampoline = function(a) {
            return this.scheduleRequired() ? this.schedule(a) : a()
        };
        a.queue = null;
        return a
    } (),
    D = s.CurrentThread = new M;
    m.VirtualTimeScheduler = function() {
        function a(b, c) {
            var d = this;
            this.clock = b;
            this.comparer = c;
            this.isEnabled = !1;
            a.base.constructor.call(this,
            function() {
                return d.toDateTimeOffset(d.clock)
            },
            function(a, b) {
                return d.scheduleAbsolute(a, d.clock, b)
            },
            function(a, b, c) {
                return d.scheduleRelative(a,
                d.toRelative(b), c)
            },
            function(a, b, c) {
                return d.scheduleRelative(a, d.toRelative(b - d.now()), c)
            });
            this.queue = new Y(1024)
        }
        o(a, s);
        a.prototype.scheduleRelative = function(a, c, d) {
            c = this.add(this.clock, c);
            return this.scheduleAbsolute(a, c, d)
        };
        a.prototype.start = function() {
            var a;
            if (!this.isEnabled) {
                this.isEnabled = !0;
                do
                if (a = this.getNext(), null !== a) {
                    if (0 < this.comparer(a.dueTime, this.clock)) this.clock = a.dueTime;
                    a.invoke()
                } else this.isEnabled = !1;
                while (this.isEnabled)
            }
        };
        a.prototype.stop = function() {
            return this.isEnabled =
            !1
        };
        a.prototype.advanceTo = function(a) {
            var c;
            if (0 <= this.comparer(this.clock, a)) throw Error("Argument out of range");
            if (!this.isEnabled) {
                this.isEnabled = !0;
                do
                if (c = this.getNext(), null !== c && 0 >= this.comparer(c.dueTime, a)) {
                    if (0 < this.comparer(c.dueTime, this.clock)) this.clock = c.dueTime;
                    c.invoke()
                } else this.isEnabled = !1;
                while (this.isEnabled);
                return this.clock = a
            }
        };
        a.prototype.advanceBy = function(a) {
            a = this.add(this.clock, a);
            if (0 <= this.comparer(this.clock, a)) throw Error("Argument out of range");
            return this.advanceTo(a)
        };
        a.prototype.getNext = function() {
            for (var a; 0 < this.queue.count();) if (a = this.queue.peek(), a.isCancelled()) this.queue.dequeue();
            else return a;
            return null
        };
        a.prototype.scheduleAbsolute = function(a, c, d) {
            var e = this,
            g = new R(e, a,
            function(a, b) {
                e.queue.remove(g);
                return d(a, b)
            },
            c, e.comparer);
            e.queue.enqueue(g);
            return g.disposable
        };
        return a
    } ();
    var f = function() {
        function a() {
            var b = this;
            a.base.constructor.call(this, J,
            function(a, d) {
                var e = x.setTimeout(function() {
                    d(b, a)
                },
                0);
                return A(function() {
                    x.clearTimeout(e)
                })
            },
            function(a,
            d, e) {
                var g,
                d = s.normalize(d);
                g = x.setTimeout(function() {
                    e(b, a)
                },
                d);
                return A(function() {
                    x.clearTimeout(g)
                })
            },
            function(a, d, e) {
                return b.scheduleWithRelativeAndState(a, d - b.now(), e)
            })
        }
        o(a, s);
        return a
    } (),
    ma = s.Timeout = new f,
    t = m.Notification = function() {
        function a() {}
        a.prototype.accept = function(a, c, d) {
            return 1 < arguments.length || "function" === typeof a ? this._accept(a, c, d) : this._acceptObservable(a)
        };
        a.prototype.toObservable = function(a) {
            var c = this,
            a = a || s.Immediate;
            return i(function(d) {
                return a.schedule(function() {
                    c._acceptObservable(d);
                    if ("N" === c.kind) d.onCompleted()
                })
            })
        };
        a.prototype.hasValue = !1;
        a.prototype.equals = function(a) {
            return this.toString() === (a === n || null === a ? "": a.toString())
        };
        return a
    } ();
    t.createOnNext = function(a) {
        var b = new t;
        b.value = a;
        b.hasValue = !0;
        b.kind = "N";
        b._accept = function(a) {
            return a(this.value)
        };
        b._acceptObservable = function(a) {
            return a.onNext(this.value)
        };
        b.toString = function() {
            return "OnNext(" + this.value + ")"
        };
        return b
    };
    t.createOnError = function(a) {
        var b = new t;
        b.exception = a;
        b.kind = "E";
        b._accept = function(a, b) {
            return b(this.exception)
        };
        b._acceptObservable = function(a) {
            return a.onError(this.exception)
        };
        b.toString = function() {
            return "OnError(" + this.exception + ")"
        };
        return b
    };
    t.createOnCompleted = function() {
        var a = new t;
        a.kind = "C";
        a._accept = function(a, c, d) {
            return d()
        };
        a._acceptObservable = function(a) {
            return a.onCompleted()
        };
        a.toString = function() {
            return "OnCompleted()"
        };
        return a
    };
    var G = function() {},
    f = G.prototype;
    f.concat = function() {
        var a = this;
        return i(function(b) {
            var c,
            d = a.getEnumerator(),
            e = !1,
            g = new C;
            c = B.scheduleRecursive(function(a) {
                var c,
                z,
                q = !1;
                if (!e) {
                    try {
                        if (q = d.moveNext()) c = d.current
                    } catch(k) {
                        z = k
                    }
                    if (void 0 !== z) b.onError(z);
                    else if (q) z = new v,
                    g.disposable(z),
                    z.disposable(c.subscribe(function(a) {
                        b.onNext(a)
                    },
                    function(a) {
                        b.onError(a)
                    },
                    function() {
                        a()
                    }));
                    else b.onCompleted()
                }
            });
            return new p(g, c, A(function() {
                e = !0
            }))
        })
    };
    f.catchException = function() {
        var a = this;
        return i(function(b) {
            var c,
            d = a.getEnumerator(),
            e = !1,
            g,
            h;
            g = new C;
            c = B.scheduleRecursive(function(a) {
                var c,
                q,
                k;
                k = !1;
                if (!e) {
                    try {
                        if (k = d.moveNext()) c = d.current
                    } catch(f) {
                        q = f
                    }
                    if (void 0 !== q) b.onError(q);
                    else if (k) q = new v,
                    g.disposable(q),
                    q.disposable(c.subscribe(function(a) {
                        b.onNext(a)
                    },
                    function(b) {
                        h = b;
                        a()
                    },
                    function() {
                        b.onCompleted()
                    }));
                    else if (void 0 !== h) b.onError(h);
                    else b.onCompleted()
                }
            });
            return new p(g, c, A(function() {
                e = !0
            }))
        })
    };
    var $ = G.repeat = function(a, b) {
        b === n && (b = -1);
        var c = new G;
        c.getEnumerator = function() {
            return {
                left: b,
                current: null,
                moveNext: function() {
                    if (0 === this.left) return this.current = null,
                    !1;
                    0 < this.left && this.left--;
                    this.current = a;
                    return ! 0
                }
            }
        };
        return c
    },
    S = G.forEnumerator = function(a) {
        var b =
        new G;
        b.getEnumerator = function() {
            return {
                _index: -1,
                current: null,
                moveNext: function() {
                    if (++this._index < a.length) return this.current = a[this._index],
                    !0;
                    this._index = -1;
                    this.current = null;
                    return ! 1
                }
            }
        };
        return b
    },
    r = m.Observer = function() {},
    T = m.Internals.AbstractObserver = function() {
        function a() {
            this.isStopped = !1
        }
        o(a, r);
        a.prototype.onNext = function(a) {
            this.isStopped || this.next(a)
        };
        a.prototype.onError = function(a) {
            if (!this.isStopped) this.isStopped = !0,
            this.error(a)
        };
        a.prototype.onCompleted = function() {
            if (!this.isStopped) this.isStopped =
            !0,
            this.completed()
        };
        a.prototype.dispose = function() {
            this.isStopped = !0
        };
        return a
    } (),
    N = function() {
        function a(b, c, d) {
            a.base.constructor.call(this);
            this._onNext = b;
            this._onError = c;
            this._onCompleted = d
        }
        o(a, T);
        a.prototype.next = function(a) {
            this._onNext(a)
        };
        a.prototype.error = function(a) {
            this._onError(a)
        };
        a.prototype.completed = function() {
            this._onCompleted()
        };
        return a
    } (),
    H = m.Internals.BinaryObserver = function() {
        function a(a, c) {
            "function" === typeof a && "function" === typeof c ? (this.leftObserver = aa(a), this.rightObserver =
            aa(c)) : (this.leftObserver = a, this.rightObserver = c)
        }
        o(a, r);
        a.prototype.onNext = function(a) {
            var c = this;
            return a.switchValue(function(a) {
                return a.accept(c.leftObserver)
            },
            function(a) {
                return a.accept(c.rightObserver)
            })
        };
        a.prototype.onError = function() {};
        a.prototype.onCompleted = function() {};
        return a
    } (),
    na = function() {
        function a(a, c) {
            this.scheduler = a;
            this.observer = c;
            this.hasFaulted = this.isAcquired = !1;
            this.queue = [];
            this.disposable = new C
        }
        o(a, T);
        a.prototype.ensureActive = function() {
            var a = !1,
            c = this;
            if (!this.hasFaulted &&
            0 < this.queue.length) a = !this.isAcquired,
            this.isAcquired = !0;
            a && this.disposable.disposable(this.scheduler.scheduleRecursive(function(a) {
                var b;
                if (0 < c.queue.length) {
                    b = c.queue.shift();
                    try {
                        b()
                    } catch(g) {
                        throw c.queue = [],
                        c.hasFaulted = !0,
                        g;
                    }
                    a()
                } else c.isAcquired = !1
            }))
        };
        a.prototype.next = function(a) {
            var c = this;
            this.queue.push(function() {
                c.observer.onNext(a)
            })
        };
        a.prototype.error = function(a) {
            var c = this;
            this.queue.push(function() {
                c.observer.onError(a)
            })
        };
        a.prototype.completed = function() {
            var a = this;
            this.queue.push(function() {
                a.observer.onCompleted()
            })
        };
        a.prototype.dispose = function() {
            a.base.dispose.call(this);
            this.disposable.dispose()
        };
        return a
    } (),
    I = r.create = function(a, b, c) {
        b || (b = function(a) {
            throw a;
        });
        c || (c = function() {});
        return new N(a, b, c)
    };
    r.fromNotifier = function(a) {
        return new N(function(b) {
            return a(t.createOnNext(b))
        },
        function(b) {
            return a(t.createOnError(b))
        },
        function() {
            return a(t.createOnCompleted())
        })
    };
    var aa = function(a) {
        return new N(function(b) {
            a(t.createOnNext(b))
        },
        function(b) {
            a(t.createOnError(b))
        },
        function() {
            a(t.createOnCompleted())
        })
    };
    r.prototype.toNotifier = function() {
        var a = this;
        return function(b) {
            return b.accept(a)
        }
    };
    r.prototype.asObserver = function() {
        var a = this;
        return new N(function(b) {
            return a.onNext(b)
        },
        function(b) {
            return a.onError(b)
        },
        function() {
            return a.onCompleted()
        })
    };
    var j = m.Observable = function() {
        function a() {}
        a.prototype.subscribe = function(a, c, d) {
            return this._subscribe(0 === arguments.length || 1 < arguments.length || "function" === typeof a ? I(a, c, d) : a)
        };
        return a
    } (),
    f = j.prototype,
    pa = function() {
        function a(b) {
            a.base.constructor.call(this);
            this._subscribe = function(a) {
                var d = new oa(a);
                D.scheduleRequired() ? D.schedule(function() {
                    d.disposable(b(d))
                }) : d.disposable(b(d));
                return d
            }
        }
        o(a, j);
        a.prototype._subscribe = function(a) {
            return this._subscribe(a)
        };
        return a
    } (),
    oa = function() {
        function a(b) {
            a.base.constructor.call(this);
            this.observer = b;
            this.m = new v
        }
        o(a, T);
        a.prototype.disposable = function(a) {
            return this.m.disposable(a)
        };
        a.prototype.next = function(a) {
            this.observer.onNext(a)
        };
        a.prototype.error = function(a) {
            this.observer.onError(a);
            this.m.dispose()
        };
        a.prototype.completed = function() {
            this.observer.onCompleted();
            this.m.dispose()
        };
        a.prototype.dispose = function() {
            a.base.dispose.call(this);
            this.m.dispose()
        };
        return a
    } (),
    ba = function() {
        function a(b, c, d) {
            a.base.constructor.call(this);
            this.key = b;
            this.underlyingObservable = !d ? c: i(function(a) {
                return new p(d.getDisposable(), c.subscribe(a))
            })
        }
        o(a, j);
        a.prototype._subscribe = function(a) {
            return this.underlyingObservable.subscribe(a)
        };
        return a
    } (),
    qa = m.ConnectableObservable = function() {
        function a(a, c) {
            var d = a.asObservable(),
            e = !1,
            g = null;
            this.connect = function() {
                e || (e = !0, g = new p(d.subscribe(c), A(function() {
                    e = !1
                })));
                return g
            };
            this._subscribe = function(a) {
                return c.subscribe(a)
            }
        }
        o(a, j);
        a.prototype.connect = function() {
            return this.connect()
        };
        a.prototype.refCount = function() {
            var a = null,
            c = 0,
            d = this;
            return i(function(e) {
                var g,
                h;
                c++;
                g = 1 === c;
                h = d.subscribe(e);
                g && (a = d.connect());
                return A(function() {
                    h.dispose();
                    c--;
                    0 === c && a.dispose()
                })
            })
        };
        a.prototype._subscribe = function(a) {
            return this._subscribe(a)
        };
        return a
    } (),
    O = m.Subject = function() {
        function a() {
            a.base.constructor.call(this);
            var b = !1,
            c = !1,
            d = new u,
            e = n,
            g = function() {
                if (b) throw Error(K);
            };
            this.onCompleted = function() {
                var a,
                b;
                g();
                c || (a = d.toArray(), d = new u, c = !0);
                if (a !== n) for (b = 0; b < a.length; b++) a[b].onCompleted()
            };
            this.onError = function(a) {
                var b,
                z;
                g();
                c || (b = d.toArray(), d = new u, c = !0, e = a);
                if (b !== n) for (z = 0; z < b.length; z++) b[z].onError(a)
            };
            this.onNext = function(a) {
                var b,
                e;
                g();
                c || (b = d.toArray());
                if (void 0 !== b) for (e = 0; e < b.length; e++) b[e].onNext(a)
            };
            this._subscribe = function(a) {
                g();
                if (!c) return d.add(a),
                function(a) {
                    return {
                        observer: a,
                        dispose: function() {
                            if (null !==
                            this.observer && !b) d.remove(this.observer),
                            this.observer = null
                        }
                    }
                } (a);
                if (e !== n) return a.onError(e),
                w;
                a.onCompleted();
                return w
            };
            this.dispose = function() {
                b = !0;
                d = null
            }
        }
        o(a, j);
        E(a, r);
        a.prototype.onCompleted = function() {
            this.onCompleted()
        };
        a.prototype.onError = function(a) {
            this.onError(a)
        };
        a.prototype.onNext = function(a) {
            this.onNext(a)
        };
        a.prototype._subscribe = function(a) {
            return this._subscribe(a)
        };
        a.prototype.dispose = function() {
            this.dispose()
        };
        a.create = function(a, c) {
            return new ra(a, c)
        };
        return a
    } (),
    U = m.AsyncSubject =
    function() {
        function a() {
            a.base.constructor.call(this);
            var b = !1,
            c = !1,
            d = null,
            e = !1,
            g = new u,
            h = null,
            l = function() {
                if (b) throw Error(K);
            };
            this.onCompleted = function() {
                var a = !1,
                b,
                h,
                f;
                l();
                c || (b = g.toArray(), g = new u, c = !0, h = d, a = e);
                if (b !== n) if (a) for (f = 0; f < b.length; f++) a = b[f],
                a.onNext(h),
                a.onCompleted();
                else for (f = 0; f < b.length; f++) b[f].onCompleted()
            };
            this.onError = function(a) {
                var b,
                d;
                l();
                c || (b = g.toArray(), g = new u, c = !0, h = a);
                if (b !== n) for (d = 0; d < b.length; d++) b[d].onError(a)
            };
            this.onNext = function(a) {
                l();
                c || (d = a, e = !0)
            };
            this._subscribe = function(a) {
                var q,
                k,
                f;
                l();
                if (!c) return g.add(a),
                function(a) {
                    return {
                        observer: a,
                        dispose: function() {
                            if (null !== this.observer && !b) g.remove(this.observer),
                            this.observer = null
                        }
                    }
                } (a);
                q = h;
                k = e;
                f = d;
                if (null !== q) a.onError(q);
                else {
                    if (k) a.onNext(f);
                    a.onCompleted()
                }
                return w
            };
            this.dispose = function() {
                b = !0;
                d = h = g = null
            }
        }
        o(a, j);
        E(a, r);
        a.prototype.onCompleted = function() {
            this.onCompleted()
        };
        a.prototype.onError = function(a) {
            this.onError(a)
        };
        a.prototype.onNext = function(a) {
            this.onNext(a)
        };
        a.prototype._subscribe =
        function(a) {
            return this._subscribe(a)
        };
        a.prototype.dispose = function() {
            this.dispose()
        };
        return a
    } (),
    P = m.BehaviorSubject = function() {
        function a(b) {
            a.base.constructor.call(this);
            var c = b,
            d = new u,
            e = !1,
            g = !1,
            h = null,
            l = function() {
                if (e) throw Error(K);
            };
            this.onCompleted = function() {
                var a,
                b;
                a = null;
                l();
                g || (a = d.toArray(), d = new u, g = !0);
                if (null !== a) for (b = 0; b < a.length; b++) a[b].onCompleted()
            };
            this.onError = function(a) {
                var b,
                c;
                c = null;
                l();
                g || (c = d.toArray(), d = new u, g = !0, h = a);
                if (null !== c) for (b = 0; b < c.length; b++) c[b].onError(a)
            };
            this.onNext = function(a) {
                var b,
                e;
                b = null;
                l();
                g || (c = a, b = d.toArray());
                if (null !== b) for (e = 0; e < b.length; e++) b[e].onNext(a)
            };
            this._subscribe = function(a) {
                var b;
                l();
                if (!g) return d.add(a),
                a.onNext(c),
                function(a) {
                    return {
                        observer: a,
                        dispose: function() {
                            if (null !== this.observer && !e) d.remove(this.observer),
                            this.observer = null
                        }
                    }
                } (a);
                b = h;
                if (null !== b) a.onError(b);
                else a.onCompleted();
                return w
            };
            this.dispose = function() {
                e = !0;
                h = c = d = null
            }
        }
        o(a, j);
        E(a, r);
        a.prototype.onCompleted = function() {
            this.onCompleted()
        };
        a.prototype.onError =
        function(a) {
            this.onError(a)
        };
        a.prototype.onNext = function(a) {
            this.onNext(a)
        };
        a.prototype._subscribe = function(a) {
            return this._subscribe(a)
        };
        a.prototype.dispose = function() {
            this.dispose()
        };
        return a
    } ();
    P.prototype.toNotifier = r.prototype.toNotifier;
    P.prototype.asObserver = r.prototype.AsObserver;
    var ca = m.ReplaySubject = function() {
        function a(a, c, d) {
            var e = a === n ? Number.MAX_VALUE: a,
            g = c === n ? Number.MAX_VALUE: c,
            h = d || s.currentThread,
            l = [],
            f = new u,
            q = !1,
            k = !1,
            i = function(a) {
                var b = q ? 1: 0,
                c = b + e;
                for (c < e && (c = e); l.length > c;) l.shift();
                for (; l.length > b && a - l[0].timestamp > g;) l.shift()
            },
            j = function(a) {
                var b = h.now();
                l.push({
                    value: a,
                    timestamp: b
                });
                i(b)
            },
            m = function() {
                if (k) throw Error(K);
            };
            this.onNext = function(a) {
                var b = null,
                c,
                d;
                m();
                if (!q) {
                    b = f.toArray();
                    j(t.createOnNext(a));
                    for (d = 0; d < b.length; d++) c = b[d],
                    c.onNext(a)
                }
                if (null !== b) for (d = 0; d < b.length; d++) c = b[d],
                c.ensureActive()
            };
            this.onError = function(a) {
                var b = null,
                c;
                m();
                if (!q) {
                    q = !0;
                    j(t.createOnError(a));
                    b = f.toArray();
                    for (c = 0; c < b.length; c++) b[c].onError(a);
                    f = new u
                }
                if (null !== b) for (c = 0; c < b.length; c++) b[c].ensureActive()
            };
            this.onCompleted = function() {
                var a = null,
                b;
                m();
                if (!q) {
                    q = !0;
                    j(t.createOnCompleted());
                    a = f.toArray();
                    for (b = 0; b < a.length; b++) a[b].onCompleted();
                    f = new u
                }
                if (null !== a) for (b = 0; b < a.length; b++) a[b].ensureActive()
            };
            this._subscribe = function(a) {
                var a = new na(h, a),
                b = function(a) {
                    return {
                        observer: a,
                        dispose: function() {
                            this.observer.dispose();
                            null !== this.observer && !k && f.remove(this.observer)
                        }
                    }
                } (a),
                c;
                m();
                i(h.now());
                f.add(a);
                for (c = 0; c < l.length; c++) l[c].value.accept(a);
                a.ensureActive();
                return b
            };
            this.dispose = function() {
                k =
                !0;
                f = null
            }
        }
        o(a, j);
        E(a, j);
        a.prototype.onNext = function(a) {
            this.onNext(a)
        };
        a.prototype.onError = function(a) {
            this.onError(a)
        };
        a.prototype.onCompleted = function() {
            this.onCompleted()
        };
        a.prototype._subscribe = function(a) {
            return this._subscribe(a)
        };
        a.prototype.dispose = function() {
            this.dispose()
        };
        return a
    } (),
    ra = function() {
        function a(a, c) {
            this.observer = a;
            this.observable = c
        }
        o(a, j);
        E(a, r);
        a.prototype.onCompleted = function() {
            return this.observer.onCompleted()
        };
        a.prototype.onError = function(a) {
            return this.observer.onError(a)
        };
        a.prototype.onNext = function(a) {
            return this.observer.onNext(a)
        };
        a.prototype._Subscribe = function(a) {
            return this.observable.Subscribe(a)
        };
        return a
    } ();
    j.start = function(a, b, c, d) {
        c || (c = []);
        return sa(a, d).apply(b, c)
    };
    var sa = j.toAsync = function(a, b) {
        b || (b = ma);
        return function() {
            var c = new U,
            d = function() {
                var b;
                try {
                    b = a.apply(this, arguments)
                } catch(d) {
                    c.onError(d);
                    return
                }
                c.onNext(b);
                c.onCompleted()
            },
            e = y.call(arguments),
            g = this;
            b.schedule(function() {
                d.apply(g, e)
            });
            return c
        }
    };
    f.multicast = function(a, b) {
        var c = this;
        return "function" ===
        typeof a ? i(function(d) {
            var e = c.multicast(a());
            return new p(b(e).subscribe(d), e.connect())
        }) : new qa(c, a)
    };
    f.publish = function(a) {
        return ! a ? this.multicast(new O) : this.multicast(function() {
            return new O
        },
        a)
    };
    f.publishLast = function(a) {
        return ! a ? this.multicast(new U) : this.multicast(function() {
            return new U
        },
        a)
    };
    f.replay = function(a, b, c, d) {
        return ! a || null === a ? this.multicast(new ca(b, c, d)) : this.multicast(function() {
            return new ca(b, c, d)
        },
        a)
    };
    f.publishValue = function(a, b) {
        return "function" === typeof a ? this.multicast(function() {
            return new P(b)
        },
        a) : this.multicast(new P(a))
    };
    var da = j.never = function() {
        return i(function() {
            return w
        })
    },
    ta = j.empty = function(a) {
        a || (a = B);
        return i(function(b) {
            return a.schedule(function() {
                return b.onCompleted()
            })
        })
    },
    ua = j.returnValue = function(a, b) {
        b || (b = B);
        return i(function(c) {
            return b.schedule(function() {
                c.onNext(a);
                return c.onCompleted()
            })
        })
    },
    ea = j.throwException = function(a, b) {
        b || (b = B);
        return i(function(c) {
            return b.schedule(function() {
                return c.onError(a)
            })
        })
    },
    va = j.generate = function(a, b, c, d, e) {
        e || (e = D);
        return i(function(g) {
            var h =
            !0,
            f = a;
            return e.scheduleRecursive(function(a) {
                var e,
                k;
                try {
                    h ? h = !1: f = c(f),
                    (e = b(f)) && (k = d(f))
                } catch(i) {
                    g.onError(i);
                    return
                }
                if (e) g.onNext(k),
                a();
                else g.onCompleted()
            })
        })
    },
    fa = j.defer = function(a) {
        return i(function(b) {
            var c;
            try {
                c = a()
            } catch(d) {
                return ea(d).subscribe(b)
            }
            return c.subscribe(b)
        })
    };
    j.using = function(a, b) {
        return i(function(c) {
            var d = w,
            e,
            g;
            try {
                e = a(),
                null !== e && (d = e),
                g = b(e)
            } catch(h) {
                return new p(ea(h).subscribe(c), d)
            }
            return new p(g.subscribe(c), d)
        })
    };
    var ga = j.fromArray = function(a, b) {
        b || (b = D);
        return i(function(c) {
            var d =
            0;
            return b.scheduleRecursive(function(b) {
                if (d < a.length) c.onNext(a[d++]),
                b();
                else c.onCompleted()
            })
        })
    },
    i = j.createWithDisposable = function(a) {
        return new pa(a)
    };
    j.create = function(a) {
        return i(function(b) {
            return A(a(b))
        })
    };
    j.range = function(a, b, c) {
        c || (c = D);
        var d = a + b - 1;
        return va(a,
        function(a) {
            return a <= d
        },
        function(a) {
            return a + 1
        },
        function(a) {
            return a
        },
        c)
    };
    f.repeat = function(a) {
        return $(this, a).concat()
    };
    f.retry = function(a) {
        return $(this, a).catchException()
    };
    j.repeat = function(a, b, c) {
        c || (c = D);
        b === n && (b = -1);
        return ua(a,
        c).repeat(b)
    };
    f.select = function(a) {
        var b = this;
        return i(function(c) {
            var d = 0;
            return b.subscribe(function(b) {
                var g;
                try {
                    g = a(b, d++)
                } catch(h) {
                    c.onError(h);
                    return
                }
                c.onNext(g)
            },
            function(a) {
                c.onError(a)
            },
            function() {
                c.onCompleted()
            })
        })
    };
    f.where = function(a) {
        var b = this;
        return i(function(c) {
            var d = 0;
            return b.subscribe(function(b) {
                var g;
                try {
                    g = a(b, d++)
                } catch(h) {
                    c.onError(h);
                    return
                }
                if (g) c.onNext(b)
            },
            function(a) {
                c.onError(a)
            },
            function() {
                c.onCompleted()
            })
        })
    };
    f.groupByUntil = function(a, b, c, d) {
        var e = this;
        b || (b = Q);
        d || (d =
        W);
        return i(function(g) {
            var h = {},
            f = new p,
            i = new Z(f);
            f.add(e.subscribe(function(e) {
                var k,
                j,
                m,
                t,
                o,
                p,
                u,
                s,
                r;
                try {
                    j = a(e),
                    p = d(j)
                } catch(w) {
                    for (r in h) h[r].onError(w);
                    g.onError(w);
                    return
                }
                o = !1;
                try {
                    s = h[p],
                    s || (s = new O, h[p] = s, o = !0)
                } catch(x) {
                    for (r in h) h[r].onError(x);
                    g.onError(x);
                    return
                }
                if (o) {
                    o = new ba(j, s, i);
                    j = new ba(j, s);
                    try {
                        k = c(j)
                    } catch(y) {
                        for (r in h) h[r].onError(y);
                        g.onError(y);
                        return
                    }
                    g.onNext(o);
                    u = new v;
                    f.add(u);
                    t = function() {
                        h[p] !== n && (delete h[p], s.onCompleted());
                        f.remove(u)
                    };
                    u.disposable(k.take(1).subscribe(function() {},
                    function(a) {
                        for (r in h) h[r].onError(a);
                        g.onError(a)
                    },
                    function() {
                        t()
                    }))
                }
                try {
                    m = b(e)
                } catch(A) {
                    for (r in h) h[r].onError(A);
                    g.onError(A);
                    return
                }
                s.onNext(m)
            },
            function(a) {
                for (var b in h) h[b].onError(a);
                g.onError(a)
            },
            function() {
                for (var a in h) h[a].onCompleted();
                g.onCompleted()
            }));
            return i
        })
    };
    f.groupBy = function(a, b, c) {
        return this.groupByUntil(a, b,
        function() {
            return da()
        },
        c)
    };
    f.take = function(a, b) {
        if (0 > a) throw Error("Argument out of range");
        if (0 == a) return ta(b);
        var c = this;
        return i(function(b) {
            var e = a;
            return c.subscribe(function(a) {
                if (0 <
                e && (e--, b.onNext(a), 0 === e)) b.onCompleted()
            },
            function(a) {
                return b.onError(a)
            },
            function() {
                return b.onCompleted()
            })
        })
    };
    f.skip = function(a) {
        if (0 > a) throw Error("Argument out of range");
        var b = this;
        return i(function(c) {
            var d = a;
            return b.subscribe(function(a) {
                if (0 >= d) c.onNext(a);
                else d--
            },
            function(a) {
                return c.onError(a)
            },
            function() {
                return c.onCompleted()
            })
        })
    };
    f.takeWhile = function(a) {
        var b = this;
        return i(function(c) {
            var d = 0,
            e = !0;
            return b.subscribe(function(b) {
                if (e) {
                    try {
                        e = a(b, d++)
                    } catch(h) {
                        c.onError(h);
                        return
                    }
                    if (e) c.onNext(b);
                    else c.onCompleted()
                }
            },
            function(a) {
                return c.onError(a)
            },
            function() {
                return c.onCompleted()
            })
        })
    };
    f.skipWhile = function(a) {
        var b = this;
        return i(function(c) {
            var d = 0,
            e = !1;
            return b.subscribe(function(b) {
                if (!e) try {
                    e = !a(b, d++)
                } catch(h) {
                    c.onError(h);
                    return
                }
                if (e) c.onNext(b)
            },
            function(a) {
                c.onError(a)
            },
            function() {
                c.onCompleted()
            })
        })
    };
    f.selectMany = function(a, b) {
        return b !== n ? this.selectMany(function(c) {
            return a(c).select(function(a) {
                return b(c, a)
            })
        }) : "function" === typeof a ? this.select(a).mergeObservable() : this.select(function() {
            return a
        }).mergeObservable()
    };
    f.finalValue = function() {
        var a = this;
        return i(function(b) {
            var c = !1,
            d;
            return a.subscribe(function(a) {
                c = !0;
                d = a
            },
            function(a) {
                b.onError(a)
            },
            function() {
                if (c) b.onNext(d),
                b.onCompleted();
                else b.onError(Error("Sequence contains no elements."))
            })
        })
    };
    f.toArray = function() {
        return this.scan([],
        function(a, b) {
            a.push(b);
            return a
        }).startWith([]).finalValue()
    };
    f.materialize = function() {
        var a = this;
        return i(function(b) {
            return a.subscribe(function(a) {
                b.onNext(t.createOnNext(a))
            },
            function(a) {
                b.onNext(t.createOnError(a));
                b.onCompleted()
            },
            function() {
                b.onNext(t.createOnCompleted());
                b.onCompleted()
            })
        })
    };
    f.dematerialize = function() {
        var a = this;
        return i(function(b) {
            return a.subscribe(function(a) {
                return a.accept(b)
            },
            function(a) {
                b.onError(a)
            },
            function() {
                b.onCompleted()
            })
        })
    };
    f.asObservable = function() {
        var a = this;
        return i(function(b) {
            return a.subscribe(b)
        })
    };
    f.windowWithCount = function(a, b) {
        var c = this;
        if (0 >= a) throw Error("Argument out of range");
        b === n && (b = a);
        if (0 >= b) throw Error("Argument out of range");
        return i(function(d) {
            var e =
            new v,
            g = new Z(e),
            h = 0,
            f = [],
            i = function() {
                var a = new O;
                f.push(a);
                d.onNext(ja(a, g))
            };
            i();
            e.disposable(c.subscribe(function(c) {
                var d;
                for (d = 0; d < f.length; d++) f[d].onNext(c);
                c = h - a + 1;
                0 <= c && 0 === c % b && (c = f.shift(), c.onCompleted());
                h++;
                0 === h % b && i()
            },
            function(a) {
                for (; 0 < f.length;) f.shift().onError(a);
                d.onError(a)
            },
            function() {
                for (; 0 < f.length;) f.shift().onCompleted();
                d.onCompleted()
            }));
            return g
        })
    };
    f.bufferWithCount = function(a, b) {
        b === n && (b = a);
        return this.windowWithCount(a, b).selectMany(function(a) {
            return a.toArray()
        }).where(function(a) {
            return 0 <
            a.length
        })
    };
    f.startWith = function() {
        var a,
        b;
        a = 0;
        0 < arguments.length && void 0 !== arguments[0].now ? (b = arguments[0], a = 1) : b = B;
        a = y.call(arguments, a);
        return S([ga(a, b), this]).concat()
    };
    f.scan = function(a, b) {
        var c = this;
        return fa(function() {
            var d = !1,
            e;
            return c.select(function(c) {
                d ? e = b(e, c) : (e = b(a, c), d = !0);
                return e
            })
        })
    };
    f.scan1 = function(a) {
        var b = this;
        return fa(function() {
            var c = !1,
            d;
            return b.select(function(b) {
                c ? d = a(d, b) : (d = b, c = !0);
                return d
            })
        })
    };
    f.distinctUntilChanged = function(a, b) {
        var c = this;
        a || (a = Q);
        b || (b = V);
        return i(function(d) {
            var e = !1,
            g;
            return c.subscribe(function(c) {
                var f = !1,
                i;
                try {
                    i = a(c)
                } catch(j) {
                    d.onError(j);
                    return
                }
                if (e) try {
                    f = b(g, i)
                } catch(k) {
                    d.onError(k);
                    return
                }
                if (!e || !f) e = !0,
                g = i,
                d.onNext(c)
            },
            function(a) {
                d.onError(a)
            },
            function() {
                d.onCompleted()
            })
        })
    };
    f.finallyAction = function(a) {
        var b = this;
        return i(function(c) {
            var d = b.subscribe(c);
            return A(function() {
                try {
                    d.dispose()
                } finally {
                    a()
                }
            })
        })
    };
    f.doAction = function(a, b, c) {
        var d = this,
        e;
        0 == arguments.length || 1 < arguments.length || "function" == typeof a ? e = a: (e = function(b) {
            a.onNext(b)
        },
        b = function(b) {
            a.onError(b)
        },
        c = function() {
            a.onCompleted()
        });
        return i(function(a) {
            return d.subscribe(function(b) {
                try {
                    e(b)
                } catch(c) {
                    a.onError(c)
                }
                a.onNext(b)
            },
            function(c) {
                if (b) try {
                    b(c)
                } catch(d) {
                    a.onError(d)
                }
                a.onError(c)
            },
            function() {
                if (c) try {
                    c()
                } catch(b) {
                    a.onError(b)
                }
                a.onCompleted()
            })
        })
    };
    f.skipLast = function(a) {
        var b = this;
        return i(function(c) {
            var d = [];
            return b.subscribe(function(b) {
                d.push(b);
                if (d.length > a) c.onNext(d.shift())
            },
            function(a) {
                c.onError(a)
            },
            function() {
                c.onCompleted()
            })
        })
    };
    f.takeLast = function(a) {
        var b =
        this;
        return i(function(c) {
            var d = [];
            return b.subscribe(function(b) {
                d.push(b);
                d.length > a && d.shift()
            },
            function(a) {
                c.onError(a)
            },
            function() {
                for (; 0 < d.length;) c.onNext(d.shift());
                c.onCompleted()
            })
        })
    };
    f.ignoreElements = function() {
        var a = this;
        return i(function(b) {
            return a.subscribe(ia,
            function(a) {
                b.onError(a)
            },
            function() {
                b.onCompleted()
            })
        })
    };
    f.elementAt = function(a) {
        if (0 > a) throw Error("Argument out of range");
        var b = this;
        return i(function(c) {
            var d = a;
            return b.subscribe(function(a) {
                0 === d && (c.onNext(a), c.onCompleted());
                d--
            },
            function(a) {
                c.onError(a)
            },
            function() {
                c.onError(Error("Argument out of range"))
            })
        })
    };
    f.elementAtOrDefault = function(a, b) {
        var c = this;
        if (0 > a) throw Error("Argument out of range");
        b === n && (b = null);
        return i(function(d) {
            var e = a;
            return c.subscribe(function(a) {
                0 === e && (d.onNext(a), d.onCompleted());
                e--
            },
            function(a) {
                d.onError(a)
            },
            function() {
                d.onNext(b);
                d.onCompleted()
            })
        })
    };
    f.defaultIfEmpty = function(a) {
        var b = this;
        a === n && (a = null);
        return i(function(c) {
            var d = !1;
            return b.subscribe(function(a) {
                d = !0;
                c.onNext(a)
            },
            function(a) {
                c.onError(a)
            },
            function() {
                if (!d) c.onNext(a);
                c.onCompleted()
            })
        })
    };
    f.distinct = function(a, b) {
        var c = this;
        a || (a = Q);
        b || (b = W);
        return i(function(d) {
            var e = {};
            return c.subscribe(function(c) {
                var f,
                i,
                j,
                q = !1;
                try {
                    f = a(c),
                    i = b(f)
                } catch(k) {
                    d.onError(k);
                    return
                }
                for (j in e) if (i === j) {
                    q = !0;
                    break
                }
                q || (e[i] = null, d.onNext(c))
            },
            function(a) {
                d.onError(a)
            },
            function() {
                d.onCompleted()
            })
        })
    };
    f.mergeObservable = function() {
        var a = this;
        return i(function(b) {
            var c = new p,
            d = !1,
            e = new v;
            c.add(e);
            e.disposable(a.subscribe(function(a) {
                var e =
                new v;
                c.add(e);
                e.disposable(a.subscribe(function(a) {
                    b.onNext(a)
                },
                function(a) {
                    b.onError(a)
                },
                function() {
                    c.remove(e);
                    if (d && 1 === c.count()) b.onCompleted()
                }))
            },
            function(a) {
                b.onError(a)
            },
            function() {
                d = !0;
                if (1 === c.count()) b.onCompleted()
            }));
            return c
        })
    };
    f.merge = function(a) {
        var b = this;
        return i(function(c) {
            var d = 0,
            e = new p,
            g = !1,
            f = [],
            i = function(a) {
                var b = new v;
                e.add(b);
                b.disposable(a.subscribe(function(a) {
                    c.onNext(a)
                },
                function(a) {
                    c.onError(a)
                },
                function() {
                    var a;
                    e.remove(b);
                    if (0 < f.length) a = f.shift(),
                    i(a);
                    else if (d--,
                    g && 0 === d) c.onCompleted()
                }))
            };
            e.add(b.subscribe(function(b) {
                d < a ? (d++, i(b)) : f.push(b)
            },
            function(a) {
                c.onError(a)
            },
            function() {
                g = !0;
                if (0 === d) c.onCompleted()
            }));
            return e
        })
    };
    f.switchLatest = function() {
        var a = this;
        return i(function(b) {
            var c = !1,
            d = new C,
            e = !1,
            g = 0,
            f = a.subscribe(function(a) {
                var f = new v,
                h = ++g;
                c = !0;
                d.disposable(f);
                return f.disposable(a.subscribe(function(a) {
                    if (g === h) b.onNext(a)
                },
                function(a) {
                    if (g === h) b.onError(a)
                },
                function() {
                    if (g === h && (c = !1, e)) b.onCompleted()
                }))
            },
            function(a) {
                b.onError(a)
            },
            function() {
                e =
                !0;
                if (!c) b.onCompleted()
            });
            return new p(f, d)
        })
    };
    j.merge = function(a) {
        a || (a = B);
        var b = 1 < arguments.length && arguments[1] instanceof Array ? arguments[1] : y.call(arguments, 1);
        return ga(b, a).mergeObservable()
    };
    f.concat = function() {
        var a = wa,
        b;
        b = arguments;
        var c,
        d;
        c = [];
        for (d = 0; d < b.length; d++) c.push(b[d]);
        b = c;
        b.unshift(this);
        return a.apply(this, b)
    };
    f.concatObservable = function() {
        return this.merge(1)
    };
    var wa = j.concat = function() {
        var a = 1 === arguments.length && arguments[0] instanceof Array ? arguments[0] : y.call(arguments);
        return S(a).concat()
    };
    f.catchException = function(a) {
        return "function" === typeof a ? xa(this, a) : ya([this, a])
    };
    var xa = function(a, b) {
        return i(function(c) {
            var d = new v,
            e = new C;
            d.disposable(a.subscribe(function(a) {
                c.onNext(a)
            },
            function(a) {
                var d;
                try {
                    d = b(a)
                } catch(f) {
                    c.onError(f);
                    return
                }
                a = new v;
                e.disposable(a);
                a.disposable(d.subscribe(c))
            },
            function() {
                c.onCompleted()
            }));
            return e
        })
    },
    ya = j.catchException = function() {
        var a = 1 === arguments.length && arguments[0] instanceof Array ? arguments[0] : y.call(arguments);
        return S(a).catchException()
    };
    f.onErrorResumeNext = function(a) {
        return za([this, a])
    };
    var za = j.onErrorResumeNext = function() {
        var a = 1 === arguments.length && arguments[0] instanceof Array ? arguments[0] : y.call(arguments);
        return i(function(b) {
            var c = 0,
            d = new C,
            e = B.scheduleRecursive(function(e) {
                var f,
                i;
                if (c < a.length) f = a[c++],
                i = new v,
                d.disposable(i),
                i.disposable(f.subscribe(function(a) {
                    b.onNext(a)
                },
                function() {
                    e()
                },
                function() {
                    e()
                }));
                else b.onCompleted()
            });
            return new p(d, e)
        })
    },
    Aa = function() {
        function a(a, c) {
            var d = this;
            this.selector = a;
            this.observer =
            c;
            this.leftQ = [];
            this.rightQ = [];
            this.left = I(function(a) {
                if ("E" === a.kind) d.observer.onError(a.exception);
                else if (0 === d.rightQ.length) d.leftQ.push(a);
                else d.onNext(a, d.rightQ.shift())
            });
            this.right = I(function(a) {
                if ("E" === a.kind) d.observer.onError(a.exception);
                else if (0 === d.leftQ.length) d.rightQ.push(a);
                else d.onNext(d.leftQ.shift(), a)
            })
        }
        a.prototype.onNext = function(a, c) {
            var d;
            if ("C" === a.kind || "C" === c.kind) this.observer.onCompleted();
            else {
                try {
                    d = this.selector(a.value, c.value)
                } catch(e) {
                    this.observer.onError(e);
                    return
                }
                this.observer.onNext(d)
            }
        };
        return a
    } ();
    f.zip = function(a, b) {
        return F(this, a,
        function(a) {
            var d = new Aa(b, a);
            return new H(function(a) {
                return d.left.onNext(a)
            },
            function(a) {
                return d.right.onNext(a)
            })
        })
    };
    var ha;
    ha = function() {
        function a(a, c) {
            var d = this;
            this.selector = a;
            this.observer = c;
            this.rightStopped = this.leftStopped = !1;
            this.left = I(function(a) {
                if ("N" === a.kind) if (d.leftValue = a, d.rightValue !== n) d.onNext();
                else {
                    if (d.rightStopped) d.observer.onCompleted()
                } else if ("E" === a.kind) d.observer.onError(a.exception);
                else if (d.leftStopped = !0, d.rightStopped) d.observer.onCompleted()
            });
            this.right = I(function(a) {
                if ("N" === a.kind) if (d.rightValue = a, d.leftValue !== n) d.onNext();
                else {
                    if (d.leftStopped) d.observer.onCompleted()
                } else if ("E" === a.kind) d.observer.onError(a.exception);
                else if (d.rightStopped = !0, d.leftStopped) d.observer.onCompleted()
            })
        }
        a.prototype.onNext = function() {
            var a;
            try {
                a = this.selector(this.leftValue.value, this.rightValue.value)
            } catch(c) {
                this.observer.onError(c);
                return
            }
            this.observer.onNext(a)
        };
        return a
    } ();
    f.combineLatest =
    function(a, b) {
        return F(this, a,
        function(a) {
            var d = new ha(b, a);
            return new H(function(a) {
                return d.left.onNext(a)
            },
            function(a) {
                return d.right.onNext(a)
            })
        })
    };
    f.takeUntil = function(a) {
        return F(a, this,
        function(a, c) {
            var d = !1,
            e = !1;
            return new H(function(c) { ! e && !d && ("C" === c.kind ? d = !0: "E" === c.kind ? (e = d = !0, a.onError(c.exception)) : (e = !0, a.onCompleted()))
            },
            function(d) {
                e || (d.accept(a), (e = "N" !== d.kind) && c.dispose())
            })
        })
    };
    f.skipUntil = function(a) {
        return F(this, a,
        function(a, c, d) {
            var e = !1,
            f = !1;
            return new H(function(c) {
                if ("E" ==
                c.kind) a.onError(c.exception);
                else e && c.accept(a)
            },
            function(c) {
                if (!f) {
                    if ("N" === c.kind) e = !0;
                    else if ("E" === c.kind) a.onError(c.exception);
                    f = !0;
                    d.dispose()
                }
            })
        })
    };
    j.amb = function() {
        var a = da(),
        b,
        c = 1 === arguments.length && arguments[0] instanceof Array ? arguments[0] : y.call(arguments);
        for (b = 0; b < c.length; b++) a = a.amb(c[b]);
        return a
    };
    f.amb = function(a) {
        return F(this, a,
        function(a, c, d) {
            var e = "N";
            return new H(function(c) {
                "N" === e && (e = "L", d.dispose());
                "L" === e && c.accept(a)
            },
            function(d) {
                "N" === e && (e = "R", c.dispose());
                "R" ===
                e && d.accept(a)
            })
        })
    }
})(this);
