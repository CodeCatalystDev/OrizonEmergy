void Data_Run.Update_Data_Dump1()
{
	for each  rec in Webhook_Response[Batch == "Batch1" && Data_Dump_Status == null || Data_Dump_Status == ""] sort by ID asc range from 0 to 8
	{
		thisapp.Webhook.NewScoopFunction(rec.ID);
		rec.Data_Dump_Status="Updated";
	}
}


void Data_Run.Batch1()
{
	for each  rec in Client_Sites[ID != null && Webhook_Response != null && Update_Flag_for_CRM == "Batch 1"] sort by Added_Time asc range from 1381 to 1390
	{
		fet_webh = Webhook_Response[Client_Sites_ID == rec.ID] sort by Added_Time desc range from 0 to 0;
		thisapp.Webhook.NewScoopFunction(fet_webh.ID);
	}
}
