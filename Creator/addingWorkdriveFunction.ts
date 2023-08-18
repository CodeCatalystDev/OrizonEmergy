void Webhook.addingWorkdriveFunction(int cliensiteid, int WR_ID)
{
	try 
	{
		getClientsiteid = Client_Sites[ID == cliensiteid];
		getWebhookResponse = Webhook_Response[ID == input.WR_ID];
		DataResp = getWebhookResponse.Response.toList();
		if(DataResp.size() > 0)
		{
			Data_Map = Map();
			for each  eachData in DataResp
			{
				Data_Map.put(eachData.toMap().get("name"),eachData.toMap().get("value"));
			}
		}
		fet_cli = Client_Sites[ID == input.cliensiteid];
		urlMap = Map();
		dealMap = Map();
		workdrive_folderid = "";
		if(fet_cli.Workdrive_Folder_ID != null && fet_cli.Workdrive_Folder_ID != "")
		{
			workdrive_folderid = fet_cli.Workdrive_Folder_ID;
		}
		else
		{
			foldername = fet_cli.First_Name + " " + fet_cli.Last_Name + " " + fet_cli.Customer_Address;
			response = zoho.workdrive.createFolder(foldername,"6009vf7684350c79c428a9fa15e11123209e6","workdrive");
			info response;
			workdrive_folderid = response.get("data").get("id");
			fet_cli.Workdrive_Folder_ID=workdrive_folderid;
		}
		URL = Data_Map.toMap().get("engineerPackage").toMap().get("url");
		if(URL != null && getClientsiteid.Engineer_Package == null || getClientsiteid.Engineer_Package == "")
		{
			filename = Data_Map.toMap().get("engineerPackage").toMap().get("name");
			workdriveres = thisapp.Webhook.workdriveFileUpload(URL,getWebhookResponse.ID);
			// 			resp = invokeurl
			// 			[
			// 				url :URL
			// 				type :GET
			// 			];
			if(workdriveres != null)
			{
				uplworkdrive = zoho.workdrive.uploadFile(workdriveres.tostring(),workdrive_folderid,filename,false,"workdrive");
				engineerValue = uplworkdrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Engineer_Package",engineerValue);
				dealMap.put("Engineer_Package",engineerValue);
				fet_cli.Engineer_Package=engineerValue;
			}
		}
		orizonVoiceURL = Data_Map.toMap().get("orizonInvoices").toMap().get("url");
		if(orizonVoiceURL != null && getClientsiteid.Upload_Orizon_Invoices_Add_as_more_are_made == null || getClientsiteid.Upload_Orizon_Invoices_Add_as_more_are_made == "")
		{
			filename1 = Data_Map.toMap().get("orizonInvoices").toMap().get("name");
			voiceUrl = thisapp.Webhook.workdriveFileUpload(orizonVoiceURL,getWebhookResponse.ID);
			// 			orizonVoiceresp = invokeurl
			// 			[
			// 				url :orizonVoiceURL
			// 				type :GET
			// 			];
			if(voiceUrl != null)
			{
				orizonVoiceWorkdrive = zoho.workdrive.uploadFile(voiceUrl.tostring(),workdrive_folderid,filename1,false,"workdrive");
				orizonVoiceValue = orizonVoiceWorkdrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Upload_Orizon_Invoices_Add_as_more_are_made",orizonVoiceValue);
				dealMap.put("Upload_Orizon_Invoices_Add_as_more_are_made",orizonVoiceValue);
				fet_cli.Upload_Orizon_Invoices_Add_as_more_are_made=orizonVoiceValue;
			}
		}
		roofPitchGaugeURL = Data_Map.toMap().get("roofPitchGaugePhoto").toMap().get("url");
		if(roofPitchGaugeURL != null && getClientsiteid.Photo_showing_roof_pitch_with_gauge == null || getClientsiteid.Photo_showing_roof_pitch_with_gauge == "")
		{
			filename2 = Data_Map.toMap().get("roofPitchGaugePhoto").toMap().get("name");
			roofUrl = thisapp.Webhook.workdriveFileUpload(roofPitchGaugeURL,getWebhookResponse.ID);
			// 			roofPitcheresp = invokeurl
			// 			[
			// 				url :roofPitchGaugeURL
			// 				type :GET
			// 			];
			if(roofUrl != null)
			{
				roofPitchWorkdrive = zoho.workdrive.uploadFile(roofUrl.tostring(),workdrive_folderid,filename2,false,"workdrive");
				roofPitchValue = roofPitchWorkdrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Photo_showing_roof_pitch_with_gauge",roofPitchValue);
				dealMap.put("Photo_showing_roof_pitch_with_gauge",roofPitchValue);
				fet_cli.Photo_showing_roof_pitch_with_gauge=roofPitchValue;
			}
		}
		ruralPropertyURL = Data_Map.toMap().get("ruralPropertyVerification").toMap().get("url");
		if(ruralPropertyURL != null && getClientsiteid.Rural_Property_Verification == null || getClientsiteid.Rural_Property_Verification == "")
		{
			filename3 = Data_Map.toMap().get("ruralPropertyVerification").toMap().get("name");
			ruralUrl = thisapp.Webhook.workdriveFileUpload(ruralPropertyURL,getWebhookResponse.ID);
			// 			ruralPropertyresp = invokeurl
			// 			[
			// 				url :ruralPropertyURL
			// 				type :GET
			// 			];
			if(ruralUrl != null)
			{
				ruralPropertyWorkdrive = zoho.workdrive.uploadFile(ruralUrl.tostring(),workdrive_folderid,filename3,false,"workdrive");
				ruralPropertyValue = ruralPropertyWorkdrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Rural_Property_Verification",ruralPropertyValue);
				dealMap.put("Rural_Property_Verification",ruralPropertyValue);
				fet_cli.Rural_Property_Verification=ruralPropertyURL;
			}
		}
		installationAgreeURL = Data_Map.toMap().get("installationAgreement").toMap().get("url");
		if(installationAgreeURL != null && getClientsiteid.Corporate_Upload_Installation_Agreement == null || getClientsiteid.Corporate_Upload_Installation_Agreement == "")
		{
			filename4 = Data_Map.toMap().get("installationAgreement").toMap().get("name");
			installationAgreeRes = thisapp.Webhook.workdriveFileUpload(installationAgreeURL,getWebhookResponse.ID);
			// 			installationAgreeresp = invokeurl
			// 			[
			// 				url :installationAgreeURL
			// 				type :GET
			// 			];
			if(installationAgreeRes != null)
			{
				installationAgreeWorkdrive = zoho.workdrive.uploadFile(installationAgreeRes.tostring(),workdrive_folderid,filename4,false,"workdrive");
				installationAgreeValue = installationAgreeWorkdrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Corporate_Upload_Installation_Agreement",installationAgreeValue);
				dealMap.put("Corporate_Upload_Installation_Agreement",installationAgreeValue);
				fet_cli.Corporate_Upload_Installation_Agreement=installationAgreeValue;
			}
		}
		stampDesignURL = Data_Map.toMap().get("stampedDesign").toMap().get("url");
		if(stampDesignURL != null && getClientsiteid.Engineer_Report_Stamped_Design_Screenshot == null || getClientsiteid.Engineer_Report_Stamped_Design_Screenshot == "")
		{
			stampDesignRes = thisapp.Webhook.workdriveFileUpload(stampDesignURL,getWebhookResponse.ID);
			// 			stampDesignresp = invokeurl
			// 			[
			// 				url :stampDesignURL
			// 				type :GET
			// 			];
			if(stampDesignRes != null)
			{
				filename5 = Data_Map.toMap().get("stampedDesign").toMap().get("name");
				stampDesignWorkdrive = zoho.workdrive.uploadFile(stampDesignRes.tostring(),workdrive_folderid,filename5,false,"workdrive");
				stampDesignValue = stampDesignWorkdrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Engineer_Report_Stamped_Design_Screenshot",stampDesignValue);
				dealMap.put("Engineer_Report_Stamped_Design_Screenshot",stampDesignValue);
				fet_cli.Engineer_Report_Stamped_Design_Screenshot=stampDesignValue;
			}
		}
		approvalExceptionURL = Data_Map.toMap().get("approvalOrException").toMap().get("url");
		if(approvalExceptionURL != null && getClientsiteid.approval_Exception_upload == null || getClientsiteid.approval_Exception_upload == "")
		{
			filename6 = Data_Map.toMap().get("approvalOrException").toMap().get("name");
			approvalResp = thisapp.Webhook.workdriveFileUpload(approvalExceptionURL,getWebhookResponse.ID);
			// 			approvialExceptionResp = invokeurl
			// 			[
			// 				url :approvalExceptionURL
			// 				type :GET
			// 			];
			if(approvalResp != null)
			{
				approvalExceptionDrive = zoho.workdrive.uploadFile(approvalResp.tostring(),workdrive_folderid,filename6,false,"workdrive");
				approvalExceptionValue = approvalExceptionDrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("approval_Exception_upload",approvalExceptionValue);
				dealMap.put("approval_Exception_upload",approvalExceptionValue);
				fet_cli.approval_Exception_upload=approvalExceptionValue;
			}
		}
		preInstallURL = Data_Map.toMap().get("preInstallQASurvey").toMap().get("url");
		if(preInstallURL != null && getClientsiteid.Pre_Install_Quality_Assurance_Survey == null || getClientsiteid.Pre_Install_Quality_Assurance_Survey == "")
		{
			filename7 = Data_Map.toMap().get("preInstallQASurvey").toMap().get("name");
			preInstall = thisapp.Webhook.workdriveFileUpload(preInstallURL,getWebhookResponse.ID);
			// 			preInstallResp = invokeurl
			// 			[
			// 				url :preInstallURL
			// 				type :GET
			// 			];
			if(preInstall != null)
			{
				preInstallDrive = zoho.workdrive.uploadFile(preInstall.tostring(),workdrive_folderid,filename7,false,"workdrive");
				preInstallValue = preInstallDrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Pre_Install_Quality_Assurance_Survey",preInstallValue);
				dealMap.put("Pre_Install_Quality_Assurance_Survey",preInstallValue);
				fet_cli.Pre_Install_Quality_Assurance_Survey=preInstallValue;
			}
		}
		reviseDesignURL = Data_Map.toMap().get("revisedDesign").toMap().get("url");
		if(reviseDesignURL != null && getClientsiteid.Revised_Design_If_needed == null || getClientsiteid.Revised_Design_If_needed == "")
		{
			filename8 = Data_Map.toMap().get("revisedDesign").toMap().get("name");
			reviseDesignRes = thisapp.Webhook.workdriveFileUpload(reviseDesignURL,getWebhookResponse.ID);
			// 			reviseDesignResp = invokeurl
			// 			[
			// 				url :reviseDesignURL
			// 				type :GET
			// 			];
			if(reviseDesignRes != null)
			{
				reviseDesignDrive = zoho.workdrive.uploadFile(reviseDesignRes.tostring(),workdrive_folderid,filename8,false,"workdrive");
				reviseDesignValue = reviseDesignDrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Revised_Design_If_needed",reviseDesignValue);
				dealMap.put("Revised_Design_If_needed",preInstallValue);
				fet_cli.Revised_Design_If_needed=reviseDesignValue;
			}
		}
		microgenappURL = Data_Map.toMap().get("microGenApplication").toMap().get("url");
		if(microgenappURL != null && getClientsiteid.MicroGen_Application == null || getClientsiteid.MicroGen_Application == "")
		{
			filename9 = Data_Map.toMap().get("microGenApplication").toMap().get("name");
			microgenRes = thisapp.Webhook.workdriveFileUpload(microgenappURL,getWebhookResponse.ID);
			// 			microgenResp = invokeurl
			// 			[
			// 				url :microgenappURL
			// 				type :GET
			// 			];
			if(microgenRes != null)
			{
				microgenDrive = zoho.workdrive.uploadFile(microgenRes.tostring(),workdrive_folderid,filename9,false,"workdrive");
				microgenValue = microgenDrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("MicroGen_Application",microgenValue);
				dealMap.put("Revised_Design_If_needed",microgenValue);
				fet_cli.MicroGen_Application=microgenValue;
			}
		}
		utitlityCompanyURL = Data_Map.toMap().get("utilityCompanyConsent").toMap().get("url");
		if(utitlityCompanyURL != null && getClientsiteid.Utility_Company_Third_Party_Consent == null || getClientsiteid.Utility_Company_Third_Party_Consent == "")
		{
			filename10 = Data_Map.toMap().get("utilityCompanyConsent").toMap().get("name");
			utitlityCompanyResp = thisapp.Webhook.workdriveFileUpload(utitlityCompanyURL,getWebhookResponse.ID);
			// 			utitlityCompanyResp = invokeurl
			// 			[
			// 				url :utitlityCompanyURL
			// 				type :GET
			// 			];
			if(utitlityCompanyResp != null)
			{
				utilityCompanyDrive = zoho.workdrive.uploadFile(utitlityCompanyResp.tostring(),workdrive_folderid,filename10,false,"workdrive");
				utilityCompanyValue = utilityCompanyDrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Utility_Company_Third_Party_Consent",utilityCompanyValue);
				dealMap.put("Utility_Company_Third_Party_Consent",utilityCompanyValue);
				fet_cli.Utility_Company_Third_Party_Consent=utilityCompanyValue;
			}
		}
		cghLoanConfirmURL = Data_Map.toMap().get("cghLoanConfirmationPage").toMap().get("url");
		if(cghLoanConfirmURL != null && getClientsiteid.CGH_Loan_Confirmation_Page == null || getClientsiteid.CGH_Loan_Confirmation_Page == "")
		{
			filename11 = Data_Map.toMap().get("cghLoanConfirmationPage").toMap().get("name");
			cghLoanResp = thisapp.Webhook.workdriveFileUpload(cghLoanConfirmURL,getWebhookResponse.ID);
			// 			cghLoanResp = invokeurl
			// 			[
			// 				url :cghLoanConfirmURL
			// 				type :GET
			// 			];
			if(cghLoanResp != null)
			{
				cghLoanDrive = zoho.workdrive.uploadFile(cghLoanResp.tostring(),workdrive_folderid,filename11,false,"workdrive");
				cghLoanValue = cghLoanDrive.get("data").get(0).toMap().get("attributes").toMap().get("Permalink");
				urlMap.put("CGH_Loan_Confirmation_Page",cghLoanValue.toString());
				dealMap.put("CGH_Loan_Confirmation_Page",cghLoanValue.toString());
				fet_cli.CGH_Loan_Confirmation_Page=cghLoanValue.toString();
				info cghLoanValue;
			}
		}
		misFileURL = Data_Map.toMap().get("miscFileUploads").toMap().get("url");
		if(misFileURL != null && getClientsiteid.Misc_File_Uploads == null || getClientsiteid.Misc_File_Uploads == "")
		{
			filename12 = Data_Map.toMap().get("miscFileUploads").toMap().get("name");
			misFileResp = thisapp.Webhook.workdriveFileUpload(misFileURL,getWebhookResponse.ID);
			// 			missFileResp = invokeurl
			// 			[
			// 				url :misFileURL
			// 				type :GET
			// 			];
			if(misFileResp != null)
			{
				miscFileDrive = zoho.workdrive.uploadFile(misFileResp.tostring(),workdrive_folderid,filename12,false,"workdrive");
				miscFileValue = miscFileDrive.get("data").get(0).get("attributes").get("Permalink");
				urlMap.put("Misc_File_Uploads",miscFileValue);
				dealMap.put("Misc_File_Uploads",miscFileValue);
				fet_cli.Misc_File_Uploads=miscFileValue;
			}
		}
		//URL = "https://workflow-file-uploads.s3.us-west-2.amazonaws.com/161f7603-0a9b-4e9b-a3f1-00882611e65a?AWSAccessKeyId=ASIAWLUGWV6AGZNMQTU4&Expires=1689216041&Signature=Ie7jdzi9Hg9aDOGu2%2Bm3M1zZwkk%3D&X-Amzn-Trace-Id=Root%3D1-64af0fc8-0f981cec440562f711e18f0f%3BParent%3D2a7ad9cf4add326f%3BSampled%3D0%3BLineage%3D3d06e507%3A0&x-amz-security-token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIElNOF4I2b7vnzmn7HyE4v1O2fcqWwyXzLJwWlXEQZAXAiAaNAC3W7xFuSU%2FNdVjw0v9JKzGLUpVYT4yRKL7FJ5nsCqUAwjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDQzNzI5NTQyNzQ1NiIMjRXlL%2BfGzFMy1yKVKugCsGhc%2Be4ceNgFTkuUa43E%2BQWpGNA3TWt2mUWHlJCb%2FMmXL3WWx%2FnfcYy1uEZwQXtr%2BFTtEaQhmg6FDzHY9W6l5zaWEx7RrUH0VhqDsR8yUnTztVwZw5PB7M7xeENKrlkR0N4Q8b6RxxRnhJQUdw2G3Q5dn10vDWHgIZdszpfognfpI5T4OPV6jVo8LbDFzJt9izfFWghE3cFbJI7P084WwgwyLAa1of%2BRtWxq%2FIcs0UCLY5ajP315OGcgNgEHubHHZzj%2B2x4H8V7dTOejv45ZFnu6g55dmoP8%2BHnfLFj2mf8I06Pgb9fYN40jIhfXzCCUsfzhwwyFrDlI3jAMp%2FOlwAR5rxTxIDQ1Xh%2FjFa3vxhQ9EAs4fPgr93502ult%2BGCTVyB5gcJ4X65fY7rEIU9VufsEMHPXQZY283Cn76Kv6bUdem0b5%2F1dd1r9wJPQzqt8jX5TJeSDfefnMXzztgE6qaeVrz3snEDOMPL%2Bu6UGOp4B7bjMwg6PfcahsKAs8FwmRJBiD5uBklgwEAhFTJ5UzqEzWHkyddm4d5a50e6fk4fObKTQ%2FRvy0vJRVnGoqoCG04KbQrz2krpdi81eH%2FfBrKM94zOFHg04lYmPYnQdBwdCtjO11Qm3gndQIT3Q3sWpDi6bJSddP8c0pF1R6ZhsEm8%2BPyHcdPsVEhVps6CWUblKLvmuevTnFxkphsJ4sRA%3D";
		///////////////////////////////////////////////////////////////////////////////////
		info urlMap;
		if(fet_cli.Crm_LeadID != null && fet_cli.Crm_LeadID != "" && fet_cli.Deal_ID == null || fet_cli.Deal_ID == "")
		{
			updateresponse = zoho.crm.updateRecord("Leads",fet_cli.Crm_LeadID.tolong(),urlMap);
			info updateresponse;
		}
		else if(fet_cli.Deal_ID != null && fet_cli.Deal_ID != "")
		{
			updateDealresponse = zoho.crm.updateRecord("Deals",fet_cli.Deal_ID.tolong(),dealMap);
			info updateDealresponse;
		}
	}
	catch (e)
	{
		errlist = List();
		errlist.addAll(getWebhookResponse.Error_Reasons);
		errlist.add("Image not Updated");
		getWebhookResponse.Error_Reasons=errlist;
		logInfo = insert into Log
		[
			Added_User=zoho.loginuser
			Module="Insert Images in Workdrive"
			Date_Time=zoho.currenttime
			User=zoho.loginuser
			Status="Failure"
			Message="WebhookResponse - " + getWebhookResponse.ID + " - " + "Clientsite - Deal ID - " + ifnull(fet_cli.Deal_ID,"NoData") + "Clientsite - Lead ID - " + ifnull(fet_cli.Crm_LeadID,"NoData") + e
		];
	}
}
