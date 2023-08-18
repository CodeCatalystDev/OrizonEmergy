void Webhook.Create_PTO(int WR_ID, int clietsiteid, Map Data_Map)
{
	getWebhookResponse = Webhook_Response[ID == input.WR_ID];
	if(isNull(getWebhookResponse.Response) == false)
	{
		DataResp = getWebhookResponse.Response.toList();
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
				if(fet_scooptype.Scoop_Name == "PTO")
				{
					getPto = INST[Client_Sites == clietsiteid && Scoop_ID == Data_Map.get("scoopId")];
					MeterSwapRequested = if(Data_Map.get("Meter_Swap_Requested") != "",Data_Map.get("Meter_Swap_Requested"),"");
					ptoID = getPto.ID;
					if(getPto.count() == 0)
					{
						//no data in webhook response for these fields
						//AppName
						//Available in Hierarchy Groups
						//Image Test
						//File upload test
						ptoID = insert into PTO
						[
							Added_User=zoho.loginuser
							Scoop_ID=Data_Map.get("scoopId")
							Client_Sites=clietsiteid
							Workflow_Stage_Name=workFlowStageNameID
							Meter_Swap_Requested=MeterSwapRequested
							Scoop_Type="PTO"
						];
						getScoopName = if(fet_scooptype.Scoop_Name != "",fet_scooptype.Scoop_Name,"");
						getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
						getWebhookResponse.PTO_Status="Created";
						getscoops = Scoops[Client_Sites == clietsiteid && PTO == ptoID && Workflow_Stage_Name == workFlowStageNameID];
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
							info "Scoop Create";
							consolScoop = insert into Scoops
							[
								Added_User=zoho.loginuser
								Scoop_Name=getScoopName
								Stage=getStageName
								Client_Sites=clietsiteid
								PTO=ptoID
								Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"")
								Workflow_Stage_Name=workFlowStageNameID
							];
							thisapp.update_leadID_toAllscoops(clietsiteid);
						}
					}
					else
					{
						getPto.Scoop_ID=if(Data_Map.get("scoopId") != "",Data_Map.get("scoopId"),"");
						getPto.Workflow_Stage_Name=workFlowStageNameID;
						getscoops = Scoops[Client_Sites == clietsiteid && PTO == ptoID && Workflow_Stage_Name == workFlowStageNameID];
						getScoopName = if(fet_scooptype.Scoop_Name != "",fet_scooptype.Scoop_Name,"");
						getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
						getWebhookResponse.PTO_Status="Updated";
						info getscoops + "INST Stage";
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
								PTO=getPto.ID
								Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"")
								Workflow_Stage_Name=workFlowStageNameID
							];
							thisapp.update_leadID_toAllscoops(clietsiteid);
						}
					}
					getWebhookResponse.PTO_ID=ptoID;
				}
			}
		}
		getWebhookResponse.Scoops_ID=consolScoop;
	}
}
