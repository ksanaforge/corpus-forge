const React=require("react");
const TreeView=require("./treeview");
const E=React.createElement;
const data=require("./manual");
const {openCorpus}=require("ksana-corpus");
const styles={
	treeview:{height:"90%",overflow:"auto"},
	download:{color:"yellow"},
	label:{color:"white"},
	button:{background:"silver",color:"black",border:"1px solid"}
}
const builder=require("./builder");
class Main extends React.Component {
	constructor(props){
		super(props);
		this.state={data,objurl:null};
	}
	openfile(e){
		const id=e.target.files[0];
		openCorpus(id,(err,db)=>{
			db.get([],cache=>{

				this.setState({data:cache,db})
			})
		})
	}
	build(e){
		builder.start(e.target.files,(err,objurl,downloadname,size)=>{
			const path=objurl+"#"+downloadname.replace(/\..+/,"")+"*"+size;
			openCorpus(path,(err,db)=>{
				db.get([],cache=>{
					this.setState({data:cache,db})
				})
			})			
			this.setState({objurl,downloadname});
		});
	}
	render(){
		return E("div",{},
			E("label",{},
				E("span",{style:styles.button},"Open COR"),
				E("input",{type:"file",style:{display:"none"},
					accept:".cor",onChange:this.openfile.bind(this)})
			),

			E("label",{},
				E("span",{style:styles.button},"Select Source File"),
				E("input",{type:"file",style:{display:"none"},
					multiple:true,onChange:this.build.bind(this)})
			),

			this.state.objurl?
				E("a",{href:this.state.objurl,style:styles.download,
					download:this.state.downloadname},"download"):null,

			E("div",{style:styles.treeview},
				E(TreeView,{db:this.state.db,data:this.state.data}))
		)
	}
}
module.exports=Main;