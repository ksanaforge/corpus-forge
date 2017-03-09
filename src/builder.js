var createWebCorpus=null
try {
	createWebCorpus=require("ksana-corpus-builder").createWebCorpus;
} catch(e){
	createWebCorpus=require("ksana-corpus-lib").createWebCorpus;
}


const start=function(files,logger,cb){
	createWebCorpus(files,logger,function(err,corpus,written){
		if (err) {
			cb(err);
		} else {
			try{
				logger("Use Chrome Devtool to inspect output json");
				logger(written +" unicode characters indexed.");
				corpus.writeKDB(null,function(bloburl,size){
					logger("ROM ready. "+size+" bytes");
					cb(0,bloburl,"taixu.cor",size);
				});				
			} catch(e){
				cb(e.message||e);
			}
		}
	});	
}
module.exports={start}


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