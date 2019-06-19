function isValidQuery(query){
	var wordsCheck = [
		 "alter",
		 "delete",
		 "truncate",
		 "insert",
		 "drop",
		 "update", 
		 "into" 
	];
	
	var status = true;
	
	var cont = 0;
	
	var word = "";
	
	while(status && cont<wordsCheck.length){
		
		word = wordsCheck[cont];
		
		if(query.indexOf(word)>=0){
			status = false;
		}
		
		cont++;
	}
	
	return status;
}

function showQuery(){
	
	$.response.headers.set("Access-Control-Allow-Origin", "*");
	
	$.response.contentType = "application/json";
		
	var params = JSON.parse($.request.body.asString());
		
	var conn = $.hdb.getConnection();
	
	//var query = params.data.replace(/'/g, '"');
	
	var query = params.data;
	
	if(!isValidQuery(query)){
		
		$.response.setBody(JSON.stringify({
			message: "Comando não permitido"
		}));
		
		$.response.status = $.net.http.Error;
			
		conn.close(); 
		
		return;
		
	}
	
	var rs = conn.executeQuery(query);
	
	var data = [];
	
	var rslength = rs.length;
	
	var i = 0;
	
	for (i = 0; i < rslength; i++)
    {
		data.push(rs[i]);
    }       


	
	$.response.setBody(JSON.stringify(data));
	$.response.status = $.net.http.OK;
	
	conn.close(); 
}

showQuery();