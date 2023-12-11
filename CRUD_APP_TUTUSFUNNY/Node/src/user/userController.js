var getDataControllerfn = async(req,res)=>{
  var employee = await userService.getDataFromDBService();
  res.send({"status":true,"data":employee});
}