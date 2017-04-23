const React=require("react");
const TreeView=require("./treeview");
const E=React.createElement;
const data=require("./manual");
const Homebar=require("./homebar");
const KPosCal=require("./kposcal");
var openCorpus=null,closeCorpus=null;
if (typeof KsanaCorpus!=="undefined") {
	openCorpus=KsanaCorpus.openCorpus;
	closeCorpus=KsanaCorpus.closeCorpus;
}else{
	const KSANACORPUS="ksana-corpus";
	openCorpus=require(KSANACORPUS).openCorpus;
	closeCorpus=require(KSANACORPUS).closeCorpus;
}


const Logger=require("./logger");
const styles={
	treeview:{height:"90%",overflow:"auto"},
	download:{color:"yellow"},
	label:{color:"white"},
	err:{color:"yellow",background:"red"},
	button:{background:"silver",color:"black",border:"1px solid"}
}
const builder=require("./builder");
const parseRoute=function(route){
	var regex = /[?#&]([^=#]+)=([^&#]*)/g, params = {}, match ;
	while(match = regex.exec(route)) {
	  params[match[1]] = match[2];
	}
	return params;
}
class Main extends React.Component {
	constructor(props){
		super(props);
		this.state={data,objurl:null,err:null,building:false,logs:[]};
	}
	componentDidMount(){
		var hash=window.location.hash;
		if (hash.match(/%[0-9A-Fa-f]/)) {
			hash=decodeURIComponent(hash);
		}
		const params=parseRoute(hash);
		if (params.c) {
			this.openCorpus(params.c)
		}
	}
	openCorpus(id){
		openCorpus(id,(err,cor)=>{
			cor.get([],cache=>{
				this.setState({data:cache,cor})
			})
		})
	}
	openfile(e){
		const id=e.target.files[0];
		closeCorpus(id);
		this.openCorpus(id);
	}
	log(){
		var args = Array.prototype.slice.call(arguments);
		const logs=this.state.logs;
		args.unshift(new Date());
		logs.push(args);
		this.setState({logs});
	}
	build(e){
		this.setState({logs:[],starttime:new Date(),building:true,built:false,err:null});
		builder.start(e.target.files,this.log.bind(this),
			(err,objurl,downloadname,size)=>{
			if (err) {
				this.setState({err});
				return;
			}
			const path=objurl+"#"+downloadname.replace(/\..+/,"")+"*"+size;
			openCorpus(path,(err,cor)=>{
				cor.get([],cache=>{
					this.setState({data:cache,cor,built:true})
				})
			})			
			this.setState({objurl,downloadname});
		});
	}
	inspect(){
		this.setState({building:false,built:false});
	}
	render(){
		return E("div",{},
			E(Homebar,{openfile:this.openfile.bind(this),build:this.build.bind(this)}),
			E(KPosCal,{cor:this.state.cor}),
			this.state.err?E("span",{style:styles.err},this.state.err):null,
			(this.state.objurl&&!this.state.building)?
				E("a",{href:this.state.objurl,style:styles.download,
					download:this.state.downloadname},"download (right click, Save Link As)"):null,

			this.state.built?E("button",{onClick:this.inspect.bind(this)},"Inspect Built Corpus"):null,
			this.state.building?
			E(Logger,{logs:this.state.logs,starttime:this.state.starttime}):
			E("div",{style:styles.treeview},
				E(TreeView,{cor:this.state.cor,data:this.state.data}))
		)
	}
}
module.exports=Main;