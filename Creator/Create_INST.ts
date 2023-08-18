void Webhook.Create_INST(int WR_ID, int clietsiteid, Map Data_Map)
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
			if(fet_scooptype.Scoop_Name == "INST")
			{
				getInst = INST[Client_Sites == clietsiteid && Scoop_ID == Data_Map.get("scoopId")];
				instID = getInst.ID;
				if(getInst.count() == 0)
				{
					/*	no data in webhook response for these fields
					Did you Update the Homeowner of Install Status
					Did you Double Check Module Bolt Torques
					Were All Tools Removed from Site
					Was All Garbage and Offcuts Removed, including around Inverter
					Was All Spare Equipment & Parts Removed
					Is the Critter Guard (where applicable) Properly Secured and looks neat and J-Hooks snipped
					Are All Wires Hidden/Neat from Ground View
					Are All End of Rails Cut to Size and neat
					Photo of Logical Layout
					Photo of Physical Layout
					Chief installer inspection drone pictures
					Has the client been walked through the system and how to use the app?
					Has client been able to log into the Monitoring app and see their system?
					Final Equipment Used List
					Has remaining inventory been returned to the warehouse? */
					instID = insert into INST
					[
						Added_User=zoho.loginuser
						Scoop_ID=Data_Map.get("scoopId")
						Client_Sites=clietsiteid
						Workflow_Stage_Name=workFlowStageNameID
						Scoop_Type="INST"
					];
					getWebhookResponse.INST="Created";
					getScoopName = fet_scooptype.Scoop_Name;
					getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
					getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
					getscoops = Scoops[Client_Sites == clietsiteid && INST == instID && Workflow_Stage_Name == workFlowStageNameID];
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
							INST=instID
							Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"")
							Workflow_Stage_Name=workFlowStageNameID
						];
						thisapp.update_leadID_toAllscoops(clietsiteid);
					}
				}
				else
				{
					getScoopName = fet_scooptype.Scoop_Name;
					getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
					getInst.Scoop_ID=if(Data_Map.get("scoopId") != "",Data_Map.get("scoopId"),"");
					getInst.Workflow_Stage_Name=workFlowStageNameID;
					getWebhookResponse.INST="Updated";
					getscoops = Scoops[Client_Sites == clietsiteid && INST == instID && Workflow_Stage_Name == workFlowStageNameID];
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
							INST=getInst.ID
							Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"")
							Workflow_Stage_Name=workFlowStageNameID
						];
						thisapp.update_leadID_toAllscoops(clietsiteid);
					}
				}
				getWebhookResponse.INST_ID=instID;
			}
		}
		getWebhookResponse.Scoops_ID=consolScoop;
	}
}
