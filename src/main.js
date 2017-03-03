const React=require("react");
const TreeView=require("./treeview");
const E=React.createElement;
const data={a:1,b:[1,2,3]}
const {openCorpus}=require("ksana-corpus");
const styles={
	treeview:{height:"90%",overflow:"auto"}
}
class Main extends React.Component {
	constructor(props){
		super(props);
		this.state={data};
	}
	openfile(e){
		const id=this.refs.dbid.value;
		openCorpus(id,(err,db)=>{
			db.get([],cache=>{
				this.setState({data:cache,db})
			})
		})
	}

	render(){
		return E("div",{},
			E("input",{defaultValue:"yinshun",ref:"dbid"}),
			E("button",{onClick:this.openfile.bind(this)},"Open"),
			E("div",{style:styles.treeview},
				E(TreeView,{db:this.state.db,data:this.state.data}))
		)
	}
}
module.exports=Main;