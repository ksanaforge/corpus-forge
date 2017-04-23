const React=require("react");
const E=React.createElement;
const MAXNODES=500;
var grabNode = function (key, value, parents, fetch,autoopen,cor) {
    var nodeType = objType(value);
    var theNode;
    var aKey = key + Date.now();
    if (nodeType === 'Object') {
        theNode = E(JSONObjectNode, {data:value, keyName:key,key:aKey, parents, fetch,autoopen,cor:cor})
    } else if (nodeType === 'Array') {
        theNode = E(JSONArrayNode, {data:value, keyName:key,key:aKey, parents, fetch,autoopen,cor:cor} )
    } else if (nodeType === 'String') {
        const defer=value.charCodeAt(0)==0xffff;
        theNode = E( defer?JSONDeferNode:JSONStringNode, 
            {keyName:key,value:value,key:aKey, parents,fetch} )
    } else if (nodeType === 'Number') {
        theNode = E(JSONNumberNode, {keyName:key,value:value,key:aKey, parents, fetch,cor:cor} )
    } else if (nodeType === 'Boolean') {
        theNode = E(JSONBooleanNode, {keyName:key,value:value,key:aKey, parents, fetch} )
    } else if (nodeType === 'Null') {
        theNode = E(JSONNullNode, {keyName:key,value:value,key:aKey, parents, fetch} )
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
var objType  = function (obj) {
    var className = Object.prototype.toString.call(obj).slice(8, -1);
    return className;
}

/**
 * Mixin for stopping events from propagating and collapsing our tree all
 * willy nilly. 
 */
var SquashClickEventMixin = {
    handleClick: function (e) {
        e.stopPropagation();
    }
};

/**
 * Mixin for setting intial props and state and handling clicks on
 * nodes that can be expanded.
 */
var ExpandedStateHandlerMixin = {
    getDefaultProps: function () {
        return {data:[], initialExpanded: false};
    },
    getInitialState: function () {
        const keys=this.props.parents.slice();
        keys.shift();
        keys.push(this.props.keyName);
        var close=keys.length;
        if (this.props.autoopen) for (var i=0;i<keys.length;i++) {
            if (keys[i]==this.props.autoopen[i]) {
                close--;
            } else break;
        }

        var expanded=this.props.initialExpanded || !close;
        return {
            expanded,
            createdChildNodes: false
        };
    },
    handleClick: function (e) {
        e.stopPropagation();
        this.setState({expanded: !this.state.expanded});
    },
    componentWillReceiveProps: function () {
        // resets our caches and flags we need to build child nodes again
        this.renderedChildren = [];
        this.itemString = false
        this.needsChildNodes= true;
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
    getChildNodes: function () {  
        var childNodes = [];
        if (this.state.expanded && this.needsChildNodes) {
            var len=this.props.data.length;
            if (len>MAXNODES) len=MAXNODES;
            const parents=this.props.parents.slice();
            parents.push(this.props.keyName);
            for (var i = 0; i < len; i += 1) {
                childNodes.push( 
                    grabNode(i, this.props.data[i], parents, this.props.fetch, this.props.autoopen,this.props.cor));
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
    getItemString: function () {
        if (!this.itemString) {
            var lenWord = (this.props.data.length === 1) ? ' Item' : ' Items';
            this.itemString = this.props.data.length + lenWord;
        }
        return this.itemString;
    },
    render: function () {
        var childNodes = this.getChildNodes();
        var childListStyle = {
            display: (this.state.expanded) ? 'block' : 'none'
        };
        var cls = "array parentNode";
        cls += (this.state.expanded) ? " expanded" : '';
        return (
            E("li",{className:cls, onClick:this.handleClick},
                E("label",{},this.props.keyName+":"),
                E("span",{},this.getItemString()),
                E("ol",{style:childListStyle},childNodes)
            )
        );
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
    getChildNodes: function () {
        if (this.state.expanded && this.needsChildNodes) {
            var obj = this.props.data;
            var childNodes = [];
            const parents=this.props.parents.slice();
            parents.push(this.props.keyName);

            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    childNodes.push( grabNode(k, obj[k],parents,this.props.fetch,this.props.autoopen,this.props.cor));
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
    getItemString: function () {
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
            this.itemString = len + lenWord
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
    render: function () {
        var childListStyle = {
            display: (this.state.expanded) ? 'block' : 'none'
        };
        var cls = "object parentNode";
        cls += (this.state.expanded) ? " expanded" : '';
        return (
            E("li", {className:cls,onClick:this.handleClick},
                E("label",{},this.props.keyName+":"),
                E("span",{},this.getItemString()),
                E("ul",{style:childListStyle},
                     this.getChildNodes() 
                )
             )
        );
    }
});

/**
 * String node component
 */
const supportimages=["jpg","jpeg","png"];
const showimage=function(e){
    e.target.src=e.target.dataset.src;
    e.stopPropagation()
    e.preventDefault();
}
const showsvg=function(e){
    e.target.innerHTML=e.target.dataset.src;
    e.stopPropagation()
    e.preventDefault();
}
const resolveStyleConflict=function(svgcontent,id){
    return svgcontent.replace(/st(\d+)/g,function(m,m1){
        return "st"+id+"-"+m1;
    })
}
const renderString=function(str,parents){
    var fieldname="";
    if (parents.length>2 ) {
        fieldname=parents[parents.length-2];
    }
    var src="img/view-icon.png";
    if (fieldname=="svg" || fieldname=="figure" || fieldname=="table") {
        if (str.indexOf("svg")>-1) {
            str=str.replace(/<!--.+?-->\r?\n?/g,"")
            .replace(/<!DOCTYPE.+?>\r?\n/,"").replace(/<\?xml.+>\r?\n/,"");
            str=resolveStyleConflict(str,Math.random().toString().substr(2));
            return E("div",{style:{background:"gray"}, "data-src":str,onClick:showsvg},"view SVG");
        }
    } else if (supportimages.indexOf(fieldname)>-1) {
        const data='data:img/'+fieldname+';base64,'+str;
        if (str.length<4000) { //show small image immediately
            return E("img",{src:data});
        } else {
            return E("img",{"data-src":data,src,onClick:showimage});
        }
    }
    return str;
}
var JSONStringNode = React.createClass({
    mixins: [SquashClickEventMixin],
    render: function () {
        return (
            E("li", {className:"string itemNode"},
                E("label",{},this.props.keyName+":"),
                E("span",{},renderString(this.props.value,this.props.parents))
            )
        );
    }
});

var JSONDeferNode = React.createClass({
    mixins: [SquashClickEventMixin],
    openNode(e){
        const path=this.props.parents.slice();
        path.shift();
        path.push(this.props.keyName);
        this.props.fetch(path);
    },
    render: function () {
        return (
            E("li", {className:"string itemNode",onClick:this.handleClick},
                E("label",{},this.props.keyName+":"),
                E("button",{onClick:this.openNode},"+")
            )
        );
    }
});
/**
 * Number node component
 */
var JSONNumberNode = React.createClass({
    mixins: [SquashClickEventMixin],
    getInitialState:function(){
        return {text:''};
    }
    ,getText:function(e){
        var addr=e.target.innerHTML;
        const r=this.props.cor.parseRange(addr);
        if (!r)return;
        if (r.start==r.end) {
            addr+='-99';
        }
        this.props.cor.getText(addr,function(text){
            this.setState({text:text.join("").substr(0,30)});
        }.bind(this));
    }
    ,render: function () {
        var label=this.props.value;
        var translated=this.props.cor?this.props.cor.stringify(this.props.value):"";
        if (!parseInt(translated,10)) {
            translated="";
        } else translated=" "+translated;

        return (
            E("li", {className:"itemNode",
                onClick:this.handleClick},
                E("label",{},this.props.keyName+":"),
                translated?E("span",{
                    title:this.props.value,className:"kpos",
                    onClick:this.getText},translated)
                :E("span",{className:"number"},this.props.value),
                E("span",{className:"ktext"},this.state.text)

            )
        );
    }
});


/**
 * Null node component
 */
var JSONNullNode = React.createClass({
    mixins: [SquashClickEventMixin],
    render: function () {
        return (
            E("li", {className:"null itemNode",onClick:this.handleClick},
                E("label",{},this.props.keyName+":"),
                E("span",{},"null")
            )
        );
    }
});

/**
 * Boolean node component
 */
var JSONBooleanNode = React.createClass({
    mixins: [SquashClickEventMixin],
    render: function () {
        var truthString = (this.props.value) ? 'true' : 'false';
        return (
            E("li", {className:"boolean itemNode",onClick:this.handleClick},
                E("label",{},this.props.keyName+":"),
                E("span",{},truthString)
            )
        );
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
    fetch:function(path){
        this.props.cor.get(path,data=>{
            var storepoint=this.state.data;
            for (var i=0;i<path.length;i++) {
                if (i<path.length-1) {
                    storepoint=storepoint[path[i]]
                } else {
                    storepoint[path[i]]=data;
                }
            }
            this.setState({data:this.state.data,autoopen:path});
        });
    },
    getInitialState:function(){
        return {data:this.props.data};
    },
    componentWillReceiveProps(nextProps){
        this.setState({data:nextProps.data});
    },
    render: function() {
        var nodeType = objType(this.state.data);
        var rootNode;
        
        if (nodeType === 'Object') {
            rootNode = E(JSONObjectNode,{ data:this.state.data, cor:this.props.cor,
                keyName:"/", initialExpanded:true, parents:[], fetch:this.fetch,autoopen:this.state.autoopen} )
        } else if (nodeType === 'Array') {
            rootNode = E(JSONArrayNode,{ data:this.state.data, cor:this.props.cor,
                initialExpanded:true, keyName:"(root)", parents:[], fetch:this.fetch,autoopen:this.state.autoopen});
        } else {
            console.error("How did you manage that?");
        }
        return (
            E("ul",{className:"json_tree"},rootNode )
        );
    }
});
module.exports=JSONTree;