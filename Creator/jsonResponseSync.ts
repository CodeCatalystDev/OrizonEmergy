void jsonResponseSyncFunction()
{
	for each  webhookResp in duplicate_of_Webhook_Response[ID != null && Webhook_Response_ID == null] sort by Added_Time asc range from 0 to 300
	{
		fet_webh = Webhook_Response[New_Resp == "New Data" && Response == webhookResp.Response];
		if(fet_webh.count() == 0)
		{
			WebhookInfo = insert into Webhook_Response
			[
				Added_User=zoho.loginuser
				Response=webhookResp.Response
				New_Resp="New Data"
			];
			webhookResp.Webhook_Response_ID=WebhookInfo;
		}
		else
		{
			webhookResp.Clientsite_in_CRM=fet_webh.Clientsite_in_CRM;
			webhookResp.Deal_in_CRM=fet_webh.Deal_in_CRM;
			webhookResp.Webhook_Response_ID=fet_webh.ID;
			webhookResp.Overall_Status=fet_webh.Overall_Status;
			webhookResp.CRM=fet_webh.CRM;
			webhookResp.Client_Site_Status=fet_webh.Client_Site_Status;
			webhookResp.Client_Sites_ID=fet_webh.Client_Sites_ID;
			webhookResp.STRT_ID=fet_webh.STRT_ID;
			webhookResp.OVRL_ID=fet_webh.OVRL_ID;
			webhookResp.Scoops_ID=fet_webh.Scoops_ID;
			webhookResp.PERM_ID=fet_webh.PERM_ID;
			webhookResp.INST_ID=fet_webh.INST_ID;
			webhookResp.PTO_ID=fet_webh.PTO_ID;
			webhookResp.Type_field=fet_webh.Type_field;
			webhookResp.Missing_Fields_Update=fet_webh.Missing_Fields_Update;
			webhookResp.Scoop=fet_webh.Scoop;
			webhookResp.STRT=fet_webh.STRT;
			webhookResp.INST=fet_webh.INST;
			webhookResp.PERM_Status=fet_webh.PERM_Status;
			webhookResp.PTO_Status=fet_webh.PTO_Status;
			webhookResp.OVRL_Status=fet_webh.OVRL_Status;
			webhookResp.Deal_ID=fet_webh.Deal_ID;
			webhookResp.Lead_ID=fet_webh.Lead_ID;
		}
	}
}
