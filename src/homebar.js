const React=require("react");
const E=React.createElement;
const styles={
	button:{background:"silver",color:"black",border:"1px solid"}
}
class Homebar extends React.Component {

	componentDidMount(){
		this.refs.sourcefile.directory=true;
		this.refs.sourcefile.webkitdirectory =true;
	}

	render(){ return E("span",{},
		E("label",{},
			E("span",{style:styles.button},"Open .cor"),
			E("input",{type:"file",style:{display:"none"},
				accept:".cor",onChange:this.props.openfile})
		),
		E("label",{},
			E("span",{style:styles.button},"Build .cor"),
			E("input",{ref:"sourcefile",type:"file",style:{display:"none"},
				multiple:true,onChange:this.props.build})
		)
	)}
}
module.exports=Homebar;