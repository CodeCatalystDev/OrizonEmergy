void update_leadID_toAllscoops(int ClientSite_id)
{
	fet_client_Leadid = Client_Sites[ID == ClientSite_id];
	for each  fet_strt in STRT[Client_Sites == fet_client_Leadid.ID]
	{
		if(fet_client_Leadid.Crm_LeadID != "")
		{
			fet_strt.Lead_ID=fet_client_Leadid.Crm_LeadID;
		}
	}
	for each  fet_ovrl in OVRL[Client_Sites == fet_client_Leadid.ID]
	{
		if(fet_client_Leadid.Crm_LeadID != "")
		{
			fet_ovrl.Lead_ID=fet_client_Leadid.Crm_LeadID;
		}
	}
	for each  fet_Inst in INST[Client_Sites == fet_client_Leadid.ID]
	{
		if(fet_client_Leadid.Crm_LeadID != "")
		{
			fet_Inst.Lead_ID=fet_client_Leadid.Crm_LeadID;
		}
	}
	for each  fet_Perm in PERM[Client_Sites == fet_client_Leadid.ID]
	{
		if(fet_client_Leadid.Crm_LeadID != "")
		{
			fet_Perm.Lead_ID=fet_client_Leadid.Crm_LeadID;
		}
	}
	for each  fet_PTO in PTO[Client_Sites == fet_client_Leadid.ID]
	{
		if(fet_client_Leadid.Crm_LeadID != "")
		{
			fet_PTO.Lead_ID=fet_client_Leadid.Crm_LeadID;
		}
	}
	//For loop for other scoop types
	//info fet_client_Leadid.ID ;
	for each  fetch_scoop in Scoops[Client_Sites == fet_client_Leadid.ID]
	{
		if(fet_client_Leadid.Crm_LeadID != "")
		{
			fetch_scoop.Lead_ID=fet_client_Leadid.Crm_LeadID;
		}
	}
}
