function execute(){
	$.response.contentType = "application/json";
	
	var params = JSON.parse($.request.body.asString());
		
	var connection = $.hdb.getConnection();

	var storedProcedure = connection.loadProcedure(params.base, params.name);
	
	var rs;
	
	if(params.params === undefined){
		rs= storedProcedure();
	} else {
		switch(params.params.length){	
			case 1: 
				rs= storedProcedure(params.params[0]);
				break;
				
			case 2: 
				rs= storedProcedure(params.params[0], params.params[1]);
				break;
				
			case 3: 
				rs= storedProcedure(params.params[0], params.params[1], params.params[2]);
				break;
				
			case 4: 
				rs= storedProcedure(params.params[0], params.params[1], params.params[2], params.params[3]);
				break;
				
			case 5: 
				rs= storedProcedure(params.params[0], params.params[1], params.params[2], params.params[3], params.params[4]);
				break;
				
			default: 
				rs= storedProcedure();
				break;
		}
	}
    
    var data = [];
	
	var i = 0;
	
	for (i = 0; i < (rs.REG).length; i++)
    {
		data.push(rs.REG[i]);
    }       

	$.response.setBody(JSON.stringify(data));
	$.response.status = $.net.http.OK;
	
	connection.close(); 
}

execute();