const React=require("react");
const TreeView=require("./treeview");
const E=React.createElement;
const data=require("./manual");
const Homebar=require("./homebar");
const KPosCal=require("./kposcal");
var openCorpus=null
try {
	openCorpus=require("ksana-corpus").openCorpus;
} catch(e){
	openCorpus=require("ksana-corpus-lib").openCorpus;
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
class Main extends React.Component {
	constructor(props){
		super(props);
		this.state={data,objurl:null,err:null,building:false,logs:[]};
	}
	openfile(e){
		const id=e.target.files[0];
		openCorpus(id,(err,cor)=>{
			cor.get([],cache=>{

				this.setState({data:cache,cor})
			})
		})
	}
	log(){
		var args = Array.prototype.slice.call(arguments);
		const logs=this.state.logs;
		args.unshift(new Date());
		logs.unshift(args);
		this.setState({logs});
	}
	build(e){
		this.setState({logs:[],building:true,built:false,err:null});
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
			E(Logger,{logs:this.state.logs}):
			E("div",{style:styles.treeview},
				E(TreeView,{cor:this.state.cor,data:this.state.data}))
		)
	}
}
module.exports=Main;