void Webhook.Create_PERM(int WR_ID, int clietsiteid, Map Data_Map)
{
	getWebhookResponse = Webhook_Response[ID == input.WR_ID];
	if(isNull(getWebhookResponse.Response) == false)
	{
		// 		DataResp = getWebhookResponse.Response.toList();
		// 		Data_Map = Map();
		// 		for each  eachData in DataResp
		// 		{
		// 			Data_Map.put(eachData.toMap().get("name"),eachData.toMap().get("value"));
		// 		}
		workFlowStageNameID = Workflow_Stages[Workflow_Stage_Name == Data_Map.get("stageName")].ID;
		if(isNull(Data_Map.get("scoopType")) == false)
		{
			getScoopType = Data_Map.get("scoopType");
			fet_scooptype = Scoop_Types[Scoop_Full_Name == getScoopType];
			if(fet_scooptype.count() > 0)
			{
				if(fet_scooptype.Scoop_Name == "PERM")
				{
					getPerm = INST[Client_Sites == clietsiteid && Scoop_ID == Data_Map.get("scoopId")];
					permID = getPerm.ID;
					if(getPerm.count() == 0)
					{
						/*no data in webhook response for these fields
				Date Building Permit Submitted
				Building Permit Application
				Date Building Permit Received*
				Building Permit Approval
				Date MicroGen Permit Submitted
				MicroGen Application
				MicroGen Approval
				Date MicroGen Permit Received
				Installation Date Booked */
						permID = insert into PERM
						[
							Added_User=zoho.loginuser
							Scoop_ID=Data_Map.get("scoopId")
							Client_Sites=clietsiteid
							Workflow_Stage_Name=workFlowStageNameID
							Scoop_Type="PERM"
						];
						getScoopName = fet_scooptype.Scoop_Name;
						getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
						getWebhookResponse.PERM_Status="Created";
						getscoops = Scoops[Client_Sites == clietsiteid && PERM == permID && Workflow_Stage_Name == workFlowStageNameID];
						consolScoop = ifnull(getscoops.ID,null);
						if(getscoops.count() > 0)
						{
							getscoops.Stage=getStageName;
							getscoops.Scoop_Name=getScoopName;
							getscoops.Client_Sites=clietsiteid;
							getscoops.Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"");
							getscoops.Workflow_Stage_Name=workFlowStageNameID;
						}
						else
						{
							info "Scoop Create";
							consolScoop = insert into Scoops
							[
								Added_User=zoho.loginuser
								Scoop_Name=getScoopName
								Stage=getStageName
								Client_Sites=clietsiteid
								PERM=permID
								Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"")
								Workflow_Stage_Name=workFlowStageNameID
							];
							thisapp.update_leadID_toAllscoops(clietsiteid);
						}
					}
					else
					{
						getPerm.Scoop_ID=if(Data_Map.get("scoopId") != "",Data_Map.get("scoopId"),"");
						getPerm.Workflow_Stage_Name=workFlowStageNameID;
						getscoops = Scoops[Client_Sites == clietsiteid && PERM == permID && Workflow_Stage_Name == workFlowStageNameID];
						getScoopName = fet_scooptype.Scoop_Name;
						getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
						info getscoops + "INST Stage";
						getWebhookResponse.PERM_Status="Updated";
						consolScoop = getscoops.ID;
						if(getscoops.count() > 0)
						{
							getscoops.Stage=getStageName;
							getscoops.Scoop_Name=getScoopName;
							getscoops.Client_Sites=clietsiteid;
							getscoops.Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"");
							getscoops.Workflow_Stage_Name=workFlowStageNameID;
						}
						else
						{
							consolScoop = insert into Scoops
							[
								Added_User=zoho.loginuser
								Scoop_Name=getScoopName
								Stage=getStageName
								Client_Sites=clietsiteid
								PERM=getPerm.ID
								Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"")
								Workflow_Stage_Name=workFlowStageNameID
							];
							thisapp.update_leadID_toAllscoops(clietsiteid);
						}
					}
					getWebhookResponse.PERM_ID=permID;
				}
			}
		}
		getWebhookResponse.Scoops_ID=consolScoop;
	}
}
