const React=require("react");
const E=React.createElement;
const styles={
	button:{background:"silver",color:"black",border:"1px solid"},
	label:{color:"silver"}
}
const kposFromRange=function(r){
	var kpos=r?r.range:'';
	if (r.start==r.end) kpos=r.start;
	return kpos;
}
class KPosCal extends React.Component {
	constructor(props){
		super(props);
		const address='1p1.0100';
		this.state={kpos:0,address};
	}
	componentWillReceiveProps(nextProps){
		if (!this.state.kpos) {
			var r=nextProps.cor?nextProps.cor.parseRange(this.state.address):0;
			const kpos=kposFromRange(r);
			this.setState({kpos});
		}
	}
	fromKPos(e){
		var kpos=parseInt(e.target.value,10);
		if (isNaN(kpos)) kpos=0;
		const address=this.props.cor.stringify(kpos);
		this.setState({kpos,address});
	}
	toKPos(e){
		const address=e.target.value;
		var r=this.props.cor.parseRange(address)
		const kpos=kposFromRange(r);
		this.setState({address,kpos});
	}
	render(){
		if (!this.props.cor)return E("span",{},"");
		return E("span",{},
			E("span",{style:styles.label},"kpos:"),
			E("input",{onChange:this.fromKPos.bind(this),value:this.state.kpos}),
			E("span",{style:styles.label},"address"),
			E("input",{onChange:this.toKPos.bind(this),value:this.state.address})
		)
	}
}

module.exports=KPosCal;
