const CorpusBuilder=require("ksana-corpus-builder");
const createCorpus=CorpusBuilder.createCorpus;

const start=function(files,cb){
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
	var options={name:"taixu",inputFormat:"accelon3",
		article:"文",subtoc:"文",
		bitPat:"taixu",
		groupPrefix:composes,
		articleFields:["head","ptr","def","p"],
		title:"太虛大師全書",
		autoStart:true}; //set textOnly not to build inverted

	var corpus=createCorpus(options);
	corpus.setHandlers(
		{"類":capture,"編":capture},
		{"類":on_category_close,"編":on_compose_close},
		{fileStart}  
	);

	corpus.addBrowserFiles(files,function(err){		
		if (err) {
			cb&&cb(err)
		} else {
			corpus.writeKDB(null,function(bloburl,size){
				cb&&cb(0,bloburl,"taixu.cor",size);
			});
		}
	});	
}
module.exports={start}