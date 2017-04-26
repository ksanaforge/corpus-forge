(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var createWebCorpus = null;
if (typeof KsanaCorpusBuilder !== "undefined") {
	createWebCorpus = KsanaCorpusBuilder.createWebCorpus;
} else {
	var KSANACORPUSBUILDER = "ksana-corpus-builder";
	createWebCorpus = require(KSANACORPUSBUILDER).createWebCorpus;
}

var start = function start(files, logger, cb) {
	createWebCorpus(files, logger, function (err, corpus, written) {
		if (err) {
			cb(err);
		} else {
			try {
				logger(written + " unicode characters indexed.");
				corpus.writeKDB(null, function (bloburl, size) {
					logger("ROM ready. " + size + " bytes");
					cb(0, bloburl, corpus.id + ".cor", size);
				});
			} catch (e) {
				cb(e.message || e);
			}
		}
	});
};
module.exports = { start: start };

/*
	var composes=["第零編"],categories=[], groupid;	
	const capture=function(){return true;}
	const on_compose_close=function(tag,closing,kpos,tpos){
		const compose=this.popText();
		composes.push(compose);
	}
	const fileStart=function(fn,i){
		const at=fn.lastIndexOf("/");
		console.log(fn)
		fn=fn.substr(at+1);
		groupid=fn.substr(0,fn.length-4);//remove .xml
	}
	const on_category_close=function(tag,closing,kpos,tpos){
		const cat=this.popText();
		this.putGroup(groupid+";"+(composes.length-1)+"@"+cat,kpos,tpos);
	}
	corpus.setHandlers(
		{"類":capture,"編":capture},
		{"類":on_category_close,"編":on_compose_close},
		{fileStart}  
	);
*/

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var E = React.createElement;
var styles = {
	button: { background: "silver", color: "black", border: "1px solid" }
};

var Homebar = function (_React$Component) {
	_inherits(Homebar, _React$Component);

	function Homebar() {
		_classCallCheck(this, Homebar);

		return _possibleConstructorReturn(this, (Homebar.__proto__ || Object.getPrototypeOf(Homebar)).apply(this, arguments));
	}

	_createClass(Homebar, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.refs.sourcefile.directory = true;
			this.refs.sourcefile.webkitdirectory = true;
		}
	}, {
		key: "render",
		value: function render() {
			return E("span", {}, E("label", {}, E("span", { style: styles.button }, "Open .cor"), E("input", { type: "file", style: { display: "none" },
				accept: ".cor", onChange: this.props.openfile })), E("label", {}, E("span", { style: styles.button }, "Build .cor"), E("input", { ref: "sourcefile", type: "file", style: { display: "none" },
				multiple: true, onChange: this.props.build })));
		}
	}]);

	return Homebar;
}(React.Component);

module.exports = Homebar;

},{"react":"react"}],3:[function(require,module,exports){
"use strict";

var React = require("react");
var E = React.createElement;
var Main = require("./main");
var ReactDOM = require("react-dom");

ReactDOM.render(E(Main), document.getElementById("root"));

},{"./main":6,"react":"react","react-dom":"react-dom"}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var E = React.createElement;
var styles = {
	button: { background: "silver", color: "black", border: "1px solid" },
	label: { color: "silver" },
	input: { width: "10em" }
};
var kposFromRange = function kposFromRange(r) {
	var kpos = r ? r.range : '';
	if (r.start == r.end) kpos = r.start;
	return kpos;
};

var KPosCal = function (_React$Component) {
	_inherits(KPosCal, _React$Component);

	function KPosCal(props) {
		_classCallCheck(this, KPosCal);

		var _this = _possibleConstructorReturn(this, (KPosCal.__proto__ || Object.getPrototypeOf(KPosCal)).call(this, props));

		var address = '1p1.0100';
		_this.state = { kpos: 0, address: address };
		return _this;
	}

	_createClass(KPosCal, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (!this.state.kpos) {
				var r = nextProps.cor ? nextProps.cor.parseRange(this.state.address) : 0;
				var kpos = kposFromRange(r);
				this.setState({ kpos: kpos });
			}
		}
	}, {
		key: "fromKPos",
		value: function fromKPos(e) {
			var kpos = parseInt(e.target.value, 10);
			if (isNaN(kpos)) kpos = 0;
			var address = this.props.cor.stringify(kpos);
			this.setState({ kpos: kpos, address: address });
		}
	}, {
		key: "toKPos",
		value: function toKPos(e) {
			var address = e.target.value;
			var r = this.props.cor.parseRange(address);
			var kpos = kposFromRange(r);
			this.setState({ address: address, kpos: kpos });
		}
	}, {
		key: "render",
		value: function render() {
			if (!this.props.cor) return E("span", {}, "");
			return E("span", {}, E("span", { style: styles.label }, "kpos:"), E("input", { style: styles.input,
				onChange: this.fromKPos.bind(this), value: this.state.kpos }), E("span", { style: styles.label }, "address"), E("input", { style: styles.input,
				onChange: this.toKPos.bind(this), value: this.state.address }));
		}
	}]);

	return KPosCal;
}(React.Component);

module.exports = KPosCal;

},{"react":"react"}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var E = React.createElement;
var styles = {
	log: { color: "green" },
	timestamp: { color: "silver" },
	error: { color: "red" },
	warn: { color: "orange" },
	normal: { color: "green" },
	container: { height: "95%", overflow: "auto" }
};

var Logger = function (_React$Component) {
	_inherits(Logger, _React$Component);

	function Logger() {
		_classCallCheck(this, Logger);

		return _possibleConstructorReturn(this, (Logger.__proto__ || Object.getPrototypeOf(Logger)).apply(this, arguments));
	}

	_createClass(Logger, [{
		key: "renderLog",
		value: function renderLog(_log, key) {
			var log = _log.slice();
			var style = styles.normal;
			var timestamp = log.shift();
			if (styles[log[0]]) {
				style = styles[log.shift()];
			}
			var logmessage = log.join(" ");
			var ts = timestamp.toTimeString().substr(0, 8);
			return E("div", { key: key, style: styles.log }, E("span", {}, " ", E("span", { style: style }, logmessage)));
		}
	}, {
		key: "render",
		value: function render() {
			return E("div", { style: styles.container }, E("div", { style: styles.timestamp }, new Date().toString().replace(/GMT.+/, ""), ",started at: " + this.props.starttime.toString().replace(/GMT.+/, "")), this.props.logs.map(this.renderLog.bind(this)));
		}
	}]);

	return Logger;
}(React.Component);

module.exports = Logger;

},{"react":"react"}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var TreeView = require("./treeview");
var E = React.createElement;
var data = require("./manual");
var Homebar = require("./homebar");
var KPosCal = require("./kposcal");
var _openCorpus = null,
    closeCorpus = null;
if (typeof KsanaCorpus !== "undefined") {
	_openCorpus = KsanaCorpus.openCorpus;
	closeCorpus = KsanaCorpus.closeCorpus;
} else {
	var KSANACORPUS = "ksana-corpus";
	_openCorpus = require(KSANACORPUS).openCorpus;
	closeCorpus = require(KSANACORPUS).closeCorpus;
}

var Logger = require("./logger");
var styles = {
	treeview: { height: "90%", overflow: "auto" },
	download: { color: "yellow" },
	label: { color: "white" },
	err: { color: "yellow", background: "red" },
	button: { background: "silver", color: "black", border: "1px solid" }
};
var builder = require("./builder");
var parseRoute = function parseRoute(route) {
	var regex = /[?#&]([^=#]+)=([^&#]*)/g,
	    params = {},
	    match;
	while (match = regex.exec(route)) {
		params[match[1]] = match[2];
	}
	return params;
};

var Main = function (_React$Component) {
	_inherits(Main, _React$Component);

	function Main(props) {
		_classCallCheck(this, Main);

		var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

		_this.state = { data: data, objurl: null, err: null, building: false, logs: [] };
		return _this;
	}

	_createClass(Main, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var hash = window.location.hash;
			if (hash.match(/%[0-9A-Fa-f]/)) {
				hash = decodeURIComponent(hash);
			}
			var params = parseRoute(hash);
			if (params.c) {
				this.openCorpus(params.c);
			}
		}
	}, {
		key: "openCorpus",
		value: function openCorpus(id) {
			var _this2 = this;

			_openCorpus(id, function (err, cor) {
				cor.get([], function (cache) {
					_this2.setState({ data: cache, cor: cor });
				});
			});
		}
	}, {
		key: "openfile",
		value: function openfile(e) {
			var id = e.target.files[0];
			closeCorpus(id);
			this.openCorpus(id);
		}
	}, {
		key: "log",
		value: function log() {
			var args = Array.prototype.slice.call(arguments);
			var logs = this.state.logs;
			args.unshift(new Date());
			logs.push(args);
			this.setState({ logs: logs });
		}
	}, {
		key: "build",
		value: function build(e) {
			var _this3 = this;

			this.setState({ logs: [], starttime: new Date(), building: true, built: false, err: null });
			builder.start(e.target.files, this.log.bind(this), function (err, objurl, downloadname, size) {
				if (err) {
					_this3.setState({ err: err });
					return;
				}
				var path = objurl + "#" + downloadname.replace(/\..+/, "") + "*" + size;
				_openCorpus(path, function (err, cor) {
					cor.get([], function (cache) {
						_this3.setState({ data: cache, cor: cor, built: true });
					});
				});
				_this3.setState({ objurl: objurl, downloadname: downloadname });
			});
		}
	}, {
		key: "inspect",
		value: function inspect() {
			this.setState({ building: false, built: false });
		}
	}, {
		key: "render",
		value: function render() {
			return E("div", {}, E(Homebar, { openfile: this.openfile.bind(this), build: this.build.bind(this) }), E(KPosCal, { cor: this.state.cor }), this.state.err ? E("span", { style: styles.err }, this.state.err) : null, this.state.objurl && !this.state.building ? E("a", { href: this.state.objurl, style: styles.download,
				download: this.state.downloadname }, "download (right click, Save Link As)") : null, this.state.built ? E("button", { onClick: this.inspect.bind(this) }, "Inspect Built Corpus") : null, this.state.building ? E(Logger, { logs: this.state.logs, starttime: this.state.starttime }) : E("div", { style: styles.treeview }, E(TreeView, { cor: this.state.cor, data: this.state.data })));
		}
	}]);

	return Main;
}(React.Component);

module.exports = Main;

},{"./builder":1,"./homebar":2,"./kposcal":4,"./logger":5,"./manual":7,"./treeview":8,"react":"react"}],7:[function(require,module,exports){
"use strict";

module.exports = {
	"名稱": "Corpus Forge",
	"版本": 20170426,
	"語法": {
		"分頁": "pb"
	},
	"版本沿革": {
		"20170320": "支援內嵌圖檔",
		"20170321": "預載欄位gfields",
		"20170415": "支援外部互文標記及svg",
		"20170423": "顯示圖檔",
		"20170426": "支援四種外部欄位"
	}
};

},{}],8:[function(require,module,exports){
'use strict';

var React = require("react");
var E = React.createElement;
var MAXNODES = 500;
var grabNode = function grabNode(key, value, parents, fetch, autoopen, cor) {
    var nodeType = objType(value);
    var theNode;
    var aKey = key + Date.now();
    if (nodeType === 'Object') {
        theNode = E(JSONObjectNode, { data: value, keyName: key, key: aKey, parents: parents, fetch: fetch, autoopen: autoopen, cor: cor });
    } else if (nodeType === 'Array') {
        theNode = E(JSONArrayNode, { data: value, keyName: key, key: aKey, parents: parents, fetch: fetch, autoopen: autoopen, cor: cor });
    } else if (nodeType === 'String') {
        var defer = value.charCodeAt(0) == 0xffff;
        theNode = E(defer ? JSONDeferNode : JSONStringNode, { keyName: key, value: value, key: aKey, parents: parents, fetch: fetch });
    } else if (nodeType === 'Number') {
        theNode = E(JSONNumberNode, { keyName: key, value: value, key: aKey, parents: parents, fetch: fetch, cor: cor });
    } else if (nodeType === 'Boolean') {
        theNode = E(JSONBooleanNode, { keyName: key, value: value, key: aKey, parents: parents, fetch: fetch });
    } else if (nodeType === 'Null') {
        theNode = E(JSONNullNode, { keyName: key, value: value, key: aKey, parents: parents, fetch: fetch });
    } else {
        console.error("How did this happen?", nodeType);
    }
    return theNode;
};

/**
 * Returns the type of an object as a string.
 *
 * @param obj Object The object you want to inspect
 * @return String The object's type
 */
var objType = function objType(obj) {
    var className = Object.prototype.toString.call(obj).slice(8, -1);
    return className;
};

/**
 * Mixin for stopping events from propagating and collapsing our tree all
 * willy nilly. 
 */
var SquashClickEventMixin = {
    handleClick: function handleClick(e) {
        e.stopPropagation();
    }
};

/**
 * Mixin for setting intial props and state and handling clicks on
 * nodes that can be expanded.
 */
var ExpandedStateHandlerMixin = {
    getDefaultProps: function getDefaultProps() {
        return { data: [], initialExpanded: false };
    },
    getInitialState: function getInitialState() {
        var keys = this.props.parents.slice();
        keys.shift();
        keys.push(this.props.keyName);
        var close = keys.length;
        if (this.props.autoopen) for (var i = 0; i < keys.length; i++) {
            if (keys[i] == this.props.autoopen[i]) {
                close--;
            } else break;
        }

        var expanded = this.props.initialExpanded || !close;
        return {
            expanded: expanded,
            createdChildNodes: false
        };
    },
    handleClick: function handleClick(e) {
        e.stopPropagation();
        this.setState({ expanded: !this.state.expanded });
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
        // resets our caches and flags we need to build child nodes again
        this.renderedChildren = [];
        this.itemString = false;
        this.needsChildNodes = true;
    }
};

/**
 * Array node class. If you have an array, this is what you should use to 
 * display it.
 */
var JSONArrayNode = React.createClass({
    mixins: [ExpandedStateHandlerMixin],
    /**
     * Returns the child nodes for each element in the array. If we have
     * generated them previously, we return from cache, otherwise we create 
     * them.
     */
    getChildNodes: function getChildNodes() {
        var childNodes = [];
        if (this.state.expanded && this.needsChildNodes) {
            var len = this.props.data.length;
            if (len > MAXNODES) len = MAXNODES;
            var parents = this.props.parents.slice();
            parents.push(this.props.keyName);
            for (var i = 0; i < len; i += 1) {
                childNodes.push(grabNode(i, this.props.data[i], parents, this.props.fetch, this.props.autoopen, this.props.cor));
            }
            this.needsChildNodes = false;
            this.renderedChildren = childNodes;
        }
        return this.renderedChildren;
    },
    /**
     * flag to see if we still need to render our child nodes
     */
    needsChildNodes: true,
    /**
     * cache store for our child nodes
     */
    renderedChildren: [],
    /**
     * cache store for the number of items string we display
     */
    itemString: false,
    /**
     * Returns the "n Items" string for this node, generating and
     * caching it if it hasn't been created yet.
     */
    getItemString: function getItemString() {
        if (!this.itemString) {
            var lenWord = this.props.data.length === 1 ? ' Item' : ' Items';
            this.itemString = this.props.data.length + lenWord;
        }
        return this.itemString;
    },
    render: function render() {
        var childNodes = this.getChildNodes();
        var childListStyle = {
            display: this.state.expanded ? 'block' : 'none'
        };
        var cls = "array parentNode";
        cls += this.state.expanded ? " expanded" : '';
        return E("li", { className: cls, onClick: this.handleClick }, E("label", {}, this.props.keyName + ":"), E("span", {}, this.getItemString()), E("ol", { style: childListStyle }, childNodes));
    }
});

/**
 * Object node class. If you have an object, this is what you should use to 
 * display it.
 */
var JSONObjectNode = React.createClass({
    mixins: [ExpandedStateHandlerMixin],
    /**
     * Returns the child nodes for each element in the object. If we have
     * generated them previously, we return from cache, otherwise we create 
     * them.
     */
    getChildNodes: function getChildNodes() {
        if (this.state.expanded && this.needsChildNodes) {
            var obj = this.props.data;
            var childNodes = [];
            var parents = this.props.parents.slice();
            parents.push(this.props.keyName);

            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    childNodes.push(grabNode(k, obj[k], parents, this.props.fetch, this.props.autoopen, this.props.cor));
                }
            }
            this.needsChildNodes = false;
            this.renderedChildren = childNodes;
        }
        return this.renderedChildren;
    },
    /**
     * Returns the "n Items" string for this node, generating and
     * caching it if it hasn't been created yet.
     */
    getItemString: function getItemString() {
        if (!this.itemString) {
            var obj = this.props.data;
            var len = 0;
            var lenWord = ' Items';
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    len += 1;
                }
            }
            if (len === 1) {
                lenWord = ' Item';
            }
            this.itemString = len + lenWord;
        }
        return this.itemString;
    },
    /**
     * cache store for the number of items string we display
     */
    itemString: false,
    /**
     * flag to see if we still need to render our child nodes
     */
    needsChildNodes: true,
    /**
     * cache store for our child nodes
     */
    renderedChildren: [],
    render: function render() {
        var childListStyle = {
            display: this.state.expanded ? 'block' : 'none'
        };
        var cls = "object parentNode";
        cls += this.state.expanded ? " expanded" : '';
        return E("li", { className: cls, onClick: this.handleClick }, E("label", {}, this.props.keyName + ":"), E("span", {}, this.getItemString()), E("ul", { style: childListStyle }, this.getChildNodes()));
    }
});

/**
 * String node component
 */
var supportimages = ["jpg", "jpeg", "png"];
var showimage = function showimage(e) {
    e.target.src = e.target.dataset.src;
    e.stopPropagation();
    e.preventDefault();
};
var showsvg = function showsvg(e) {
    e.target.innerHTML = e.target.dataset.src;
    e.stopPropagation();
    e.preventDefault();
};
var resolveStyleConflict = function resolveStyleConflict(svgcontent, id) {
    return svgcontent.replace(/st(\d+)/g, function (m, m1) {
        return "st" + id + "-" + m1;
    });
};
var renderString = function renderString(str, parents) {
    var fieldname = "";
    if (parents.length > 2) {
        fieldname = parents[parents.length - 2];
    }
    var src = "img/view-icon.png";
    if (fieldname == "svg" || fieldname == "figure" || fieldname == "table") {
        if (str.indexOf("svg") > -1) {
            str = str.replace(/<!--.+?-->\r?\n?/g, "").replace(/<!DOCTYPE.+?>\r?\n/, "").replace(/<\?xml.+>\r?\n/, "");
            str = resolveStyleConflict(str, Math.random().toString().substr(2));
            return E("div", { style: { background: "gray" }, "data-src": str, onClick: showsvg }, "view SVG");
        }
    } else if (supportimages.indexOf(fieldname) > -1) {
        var data = 'data:img/' + fieldname + ';base64,' + str;
        if (str.length < 4000) {
            //show small image immediately
            return E("img", { src: data });
        } else {
            return E("img", { "data-src": data, src: src, onClick: showimage });
        }
    }
    return str;
};
var JSONStringNode = React.createClass({
    mixins: [SquashClickEventMixin],
    render: function render() {
        return E("li", { className: "string itemNode" }, E("label", {}, this.props.keyName + ":"), E("span", {}, renderString(this.props.value, this.props.parents)));
    }
});

var JSONDeferNode = React.createClass({
    mixins: [SquashClickEventMixin],
    openNode: function openNode(e) {
        var path = this.props.parents.slice();
        path.shift();
        path.push(this.props.keyName);
        this.props.fetch(path);
    },

    render: function render() {
        return E("li", { className: "string itemNode", onClick: this.handleClick }, E("label", {}, this.props.keyName + ":"), E("button", { onClick: this.openNode }, "+"));
    }
});
/**
 * Number node component
 */
var JSONNumberNode = React.createClass({
    mixins: [SquashClickEventMixin],
    getInitialState: function getInitialState() {
        return { text: '' };
    },
    getText: function getText(e) {
        var addr = e.target.innerHTML;
        var r = this.props.cor.parseRange(addr);
        if (!r) return;
        if (r.start == r.end) {
            addr += '-99';
        }
        this.props.cor.getText(addr, function (text) {
            this.setState({ text: text.join("").substr(0, 30) });
        }.bind(this));
    },
    render: function render() {
        var label = this.props.value;
        var translated = this.props.cor ? this.props.cor.stringify(this.props.value) : "";
        if (!parseInt(translated, 10)) {
            translated = "";
        } else translated = " " + translated;

        return E("li", { className: "itemNode",
            onClick: this.handleClick }, E("label", {}, this.props.keyName + ":"), translated ? E("span", {
            title: this.props.value, className: "kpos",
            onClick: this.getText }, translated) : E("span", { className: "number" }, this.props.value), E("span", { className: "ktext" }, this.state.text));
    }
});

/**
 * Null node component
 */
var JSONNullNode = React.createClass({
    mixins: [SquashClickEventMixin],
    render: function render() {
        return E("li", { className: "null itemNode", onClick: this.handleClick }, E("label", {}, this.props.keyName + ":"), E("span", {}, "null"));
    }
});

/**
 * Boolean node component
 */
var JSONBooleanNode = React.createClass({
    mixins: [SquashClickEventMixin],
    render: function render() {
        var truthString = this.props.value ? 'true' : 'false';
        return E("li", { className: "boolean itemNode", onClick: this.handleClick }, E("label", {}, this.props.keyName + ":"), E("span", {}, truthString));
    }
});

/**
 * JSONTree component. This is the 'viewer' base. Pass it a `data` prop and it 
 * will render that data, or pass it a `source` URL prop and it will make 
 * an XMLHttpRequest for said URL and render that when it loads the data.
 * 
 * You can load new data into it by either changing the `data` prop or calling
 * `loadDataFromURL()` on an instance.
 *
 * The first node it draws will be expanded by default. 
 */
var JSONTree = React.createClass({
    fetch: function fetch(path) {
        var _this = this;

        this.props.cor.get(path, function (data) {
            var storepoint = _this.state.data;
            for (var i = 0; i < path.length; i++) {
                if (i < path.length - 1) {
                    storepoint = storepoint[path[i]];
                } else {
                    storepoint[path[i]] = data;
                }
            }
            _this.setState({ data: _this.state.data, autoopen: path });
        });
    },
    getInitialState: function getInitialState() {
        return { data: this.props.data };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    },

    render: function render() {
        var nodeType = objType(this.state.data);
        var rootNode;

        if (nodeType === 'Object') {
            rootNode = E(JSONObjectNode, { data: this.state.data, cor: this.props.cor,
                keyName: "/", initialExpanded: true, parents: [], fetch: this.fetch, autoopen: this.state.autoopen });
        } else if (nodeType === 'Array') {
            rootNode = E(JSONArrayNode, { data: this.state.data, cor: this.props.cor,
                initialExpanded: true, keyName: "(root)", parents: [], fetch: this.fetch, autoopen: this.state.autoopen });
        } else {
            console.error("How did you manage that?");
        }
        return E("ul", { className: "json_tree" }, rootNode);
    }
});
module.exports = JSONTree;

},{"react":"react"}]},{},[3]);
