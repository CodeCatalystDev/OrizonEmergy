void Webhook.createScoops(int WR_ID)
{
	try 
	{
		closerEmailid = "";
		//Common Email Regex
		email_regex = "[a-z0-9]+@[a-z]+\.[a-z]{2,3}";
		//Common Phone Regex
		phone_regex = "\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*";
		//workflow lookup mapped at line no147
		getWebhookResponse = Webhook_Response[ID == input.WR_ID];
		getWebhookResponse.CRM="Not Updated";
		getWebhookResponse.Client_Site_Status="Not Updated";
		getWebhookResponse.STRT="Not Updated";
		getWebhookResponse.INST="Not Updated";
		getWebhookResponse.PERM_Status="Not Updated";
		getWebhookResponse.PTO_Status="Not Updated";
		getWebhookResponse.OVRL_Status="Not Updated";
		if(isNull(getWebhookResponse.Response) == false)
		{ 
			DataResp = getWebhookResponse.Response.toList();
			info DataResp;
			if(DataResp.size() > 0)
			{
				Data_Map = Map();
				for each  eachData in DataResp
				{
					Data_Map.put(eachData.toMap().get("name"),eachData.toMap().get("value"));
				}
				salesRepValueList = List();
				if(Data_Map.get("salesRep") != null)
				{
					salesResp = Data_Map.get("salesRep").toList();
					if(salesResp.size() > 0)
					{
						salesrep_crmid = List();
						curr_salesrep = null;
						curr_salesrep_email = "";
						for each  salesRepData in salesResp
						{
							//Validate Sales Rep Name - Pending
							getSalesRep = Sales_Rep[Sales_Rep == salesRepData] sort by Added_Time asc range from 0 to 0;
							if(getSalesRep.count() > 0)
							{
								salesRepValueList.add(getSalesRep);
								fet_sale = Sales_Rep[ID == getSalesRep];
								salesrep_crmid.add(fet_sale.crm_id);
								curr_salesrep = fet_sale.ID;
								curr_salesrep_email = ifnull(fet_sale.Email,"");
							}
							else
							{
								//Insert Firstname, lastname, Fullname, Badge
								salesRepID = insert into Sales_Rep
								[
									Added_User=zoho.loginuser
									Sales_Rep=salesRepData
								];
								curr_salesrep = salesRepID;
								salesRepValueList.add(salesRepID);
								createCrm = thisapp.ZohoCRM.salesReptoCrm(salesRepID);
								salesrep_crmid.add(createCrm.get("id"));
								//Create Sales Rep in CRM
								//Add CRM ID in this list salesrep_crmid
							}
						}
					}
				}
				if(Data_Map.get("closerEmail") != null)
				{
					email_validate = Data_Map.get("closerEmail").matches(email_regex);
					if(email_validate == true)
					{
						closerEmailid = Data_Map.get("closerEmail");
					}
				}
				//Fetch Scoop Type
				if(isNull(Data_Map.get("scoopType")) == false)
				{
					getScoopType = Data_Map.get("scoopType");
					fet_scooptype = Scoop_Types[Scoop_Full_Name == getScoopType.trim()];
				}
				workFlowStageNameID = null;
				//Fetch workflowstage name and get id to map in create and update in Creator and CRM functionalities - April - 5th
				workFlowStageNameID = Workflow_Stages[Workflow_Stage_Name == Data_Map.get("stageName")].ID;
				if(workFlowStageNameID == null)
				{
					inse_wf = insert into Workflow_Stages
					[
						Added_User=zoho.loginuser
						Workflow_Stage_Name=Data_Map.get("stageName")
						Scoop_Name=fet_scooptype.ID
					];
					crmid_wfstage = thisapp.ZohoCRM.Create_Workflow_Stage(inse_wf);
					fet_workflowstage = Workflow_Stages[ID == inse_wf];
					fet_workflowstage.CRM_ID=crmid_wfstage;
					workFlowStageNameID = inse_wf;
				}
				if(Data_Map.get("clientSiteId") != null)
				{
					//Check Client Site
					client_site_check = Client_Sites[clientsiteid == Data_Map.get("clientSiteId")];
					wsStageName = Workflow_Stages[ID == workFlowStageNameID];
					clietsiteid = client_site_check.ID;
					get_region = if(Data_Map.get("customerAddress") != null,Data_Map.get("customerAddress").getsuffix(",").getsuffix(" ,").getprefix(",").trim(),null);
					//fet_reg = Region[Region_Name.get_region.equalsIgnoreCase() == true];
					if(client_site_check.clientsiteid == Data_Map.get("clientSiteId"))
					{
						info "Clientsite Update";
						client_site_check.Sales_Person_Name1=curr_salesrep;
						client_site_check.Sales_Person_Email1=curr_salesrep_email;
						client_site_check.Parent_Group_Name=if(Data_Map.get("parentGroupName") != "",Data_Map.get("parentGroupName"),"");
						client_site_check.Closer_Email=closerEmailid;
						client_site_check.Grand_Parent_Group_Name=if(Data_Map.get("grandparentGroupName") != "",Data_Map.get("grandparentGroupName"),"");
						client_site_check.Essential_Adders=if(Data_Map.get("essentialAdders") != "",Data_Map.get("essentialAdders"),"");
						client_site_check.Site_Survey_Appointment_Date=if(Data_Map.get("siteSurveyAppointmentDate") != null && Data_Map.get("siteSurveyAppointmentDate") != "",Data_Map.get("siteSurveyAppointmentDate").toDate("dd-MMM-yyyy"),null);
						//firstPayment,secondPayment,remainderPayment values are returned as Image - Pending in update because of Image Upload API issue
						// 				client_site_check.First_Payment=Data_Map.get("firstPayment");
						// 				client_site_check.Second_Payment=Data_Map.get("secondPayment");
						// 				client_site_check.Remainder_Payment=Data_Map.get("remainderPayment");
						client_site_check.CGH_Exceptioned_Date=if(Data_Map.get("cghExceptionedDate") != null && Data_Map.get("cghExceptionedDate") != "",Data_Map.get("cghExceptionedDate").toDate("dd-MMM-yyyy"),null);
						client_site_check.CGH_Approved_Date=if(Data_Map.get("cghApprovedDate") != null && Data_Map.get("cghApprovedDate") != "",Data_Map.get("cghApprovedDate").toDate("dd-MMM-yyyy"),null);
						client_site_check.CGH_Loan_Confirmation_Page=if(Data_Map.get("cghLoanConfirmationPage") != "",Data_Map.get("cghLoanConfirmationPage"),"");
						client_site_check.Buyers_Remorse_Period_End=if(Data_Map.get("buyersRemorsePeriodEnd") != "",Data_Map.get("buyersRemorsePeriodEnd"),"");
						client_site_check.Financing_Approved=if(Data_Map.get("financingApproved") != "",Data_Map.get("financingApproved"),"");
						finance_submitted = if(Data_Map.get("financingSubmitted") != "",Data_Map.get("financingSubmitted"),"");
						if(finance_submitted == "N/A")
						{
							finance_submitted = null;
						}
						else
						{
							finance_submitted = finance_submitted.toDate();
						}
						client_site_check.Date_Financing_was_Submitted=finance_submitted;
						client_site_check.Install_Completed=if(Data_Map.get("installComplete") != "",Data_Map.get("installComplete"),"");
						client_site_check.Meter_Swap_Requested=if(Data_Map.get("meterSwapRequested") != "",Data_Map.get("meterSwapRequested"),"");
						client_site_check.Sales_Rep=if(Data_Map.get("salesRep") != "",Data_Map.get("salesRep"),"");
						client_site_check.First_Name=if(Data_Map.get("firstName") != "",Data_Map.get("firstName"),"");
						client_site_check.Last_Name=if(Data_Map.get("lastName") != "",Data_Map.get("lastName"),"");
						client_site_check.Customer_Address.address_line_1=if(Data_Map.get("customerAddress") != null,Data_Map.get("customerAddress").getprefix(","),null);
						client_site_check.Customer_Address.district_city=if(Data_Map.get("customerAddress") != null,Data_Map.get("customerAddress").getsuffix(","),null);
						// 				client_site_check.Region = ifnull(fet_reg.ID,null);
						// 				client_site_check.Region_Name = ifnull(fet_reg.Region_Name,null);
						email_validate = if(Data_Map.get("customerEmail") != null,Data_Map.get("customerEmail").matches(email_regex),null);
						if(email_validate == true)
						{
							client_site_check.Customer_Email=if(Data_Map.get("customerEmail") != null,Data_Map.get("customerEmail"),null);
						}
						getCustomerPhone = if(Data_Map.get("customerPhone") != null,Data_Map.get("customerPhone"),null);
						if(getCustomerPhone != null)
						{
							getCustomerPhone = getCustomerPhone.getAlphaNumeric().removeAllAlpha();
							getCustomerPhone_cond = getCustomerPhone.matches(phone_regex);
							if(getCustomerPhone_cond == true)
							{
								client_site_check.Customer_Phone=getCustomerPhone;
							}
						}
						client_site_check.Scoop_ID=if(Data_Map.get("scoopId") != "",Data_Map.get("scoopId"),"");
						client_site_check.Webhook_Response=input.WR_ID;
						//set workflow stage name - added on April 5th
						if(wsStageName.Workflow_Stage_Name == "OVRL Scoop")
						{
							curr_workflowsttage = client_site_check.Workflow_Stage_Name;
							client_site_check.Workflow_Stage_Name=ifnull(curr_workflowsttage,null);
						}
						else
						{
							client_site_check.Workflow_Stage_Name=ifnull(workFlowStageNameID,null);
						}
						client_site_check.Scoop_Type=ifnull(fet_scooptype.ID,null);
						client_site_check.Scoop_Types=if(fet_scooptype.Scoop_Name != "",fet_scooptype.Scoop_Name,"");
						client_site_check.Scoop_Type_Drp=if(fet_scooptype.Scoop_Name != "",fet_scooptype.Scoop_Name,"");
						existval = List();
						existval.addAll(client_site_check.All_Scoop_Types);
						existval.add(fet_scooptype.ID);
						client_site_check.All_Scoop_Types=existval.distinct();
						client_site_check.Sales_Person_Name=salesRepValueList;
						/*Missing Fields - Added by Lakshmi - June 07 *** Starts Here */
						client_site_check.Missing_Fields_Status="Update";
						client_site_check.Project_ID=if(Data_Map.get("projectId") != null,Data_Map.get("projectId"),null);
						client_site_check.Total_Including_Adders_Taxes=if(Data_Map.get("totalIncludingAddersTaxes") != null,Data_Map.get("totalIncludingAddersTaxes"),0);
						client_site_check.System_size_kW=if(Data_Map.get("systemSize") != null,Data_Map.get("systemSize"),0);
						client_site_check.Base_Essential_Adders_System_Cost_Include_GST=if(Data_Map.get("baseEssentialAddersSystemCost") != null,Data_Map.get("baseEssentialAddersSystemCost"),0);
						client_site_check.Payment_Financing_Method1=if(Data_Map.get("paymentMethod") != null,Data_Map.get("paymentMethod"),null);
						client_site_check.Contract_Signed_Date=if(Data_Map.get("contractSignedDate") != null && Data_Map.get("contractSignedDate") != "",Data_Map.get("contractSignedDate").toDate(),null);
						client_site_check.Initial_Deposit_Amount=if(Data_Map.get("initialDepositAmount") != null,Data_Map.get("initialDepositAmount"),0);
						client_site_check.Second_Deposit_Amount=if(Data_Map.get("secondDepositAmount") != null,Data_Map.get("secondDepositAmount"),0);
						client_site_check.AR_Account_Reference_Number=if(Data_Map.get("arNum") != "",Data_Map.get("arNum"),"");
						/*Missing Fields - Added by Lakshmi - June 07 *** Ends Here */
						thisapp.ZohoCRM.Client_Sites_To_Create_Lead(clietsiteid,WR_ID);
						CreateClient = "ClientSite Updated";
						getWebhookResponse.Client_Site_Status="Updated";
						getWebhookResponse.Client_Sites_ID=clietsiteid;
						addNotesResp = "CRM " + getWebhookResponse.CRM + "\n";
						addNotesResp = addNotesResp + CreateClient + "\n";
					}
					else
					{
						info "Clientsite Create";
						getSalesRep = if(Data_Map.get("salesRep") != "",Data_Map.get("salesRep"),"");
						getFirstName = if(Data_Map.get("firstName") != "",Data_Map.get("firstName"),"");
						getLastName = if(Data_Map.get("lastName") != "",Data_Map.get("lastName"),"");
						line1 = if(Data_Map.get("customerAddress") != "",Data_Map.get("customerAddress"),"");
						line2 = if(Data_Map.get("customerAddress") != "",Data_Map.get("customerAddress"),"");
						if(line1 != null)
						{
							line1 = line1.getprefix(",");
						}
						if(line2 != null)
						{
							line2 = line2.getsuffix(",");
						}
						getclientsiteid = if(Data_Map.get("clientSiteId") != "",Data_Map.get("clientSiteId"),"");
						getscoopid = if(Data_Map.get("scoopId") != "",Data_Map.get("scoopId"),"");
						finance_submitted = if(Data_Map.get("financingSubmitted") != "",Data_Map.get("financingSubmitted"),"");
						if(finance_submitted == "N/A")
						{
							finance_submitted = null;
						}
						else
						{
							finance_submitted = finance_submitted.toDate();
						}
						emailid = "";
						if(Data_Map.get("customerEmail") != null)
						{
							email_validate = Data_Map.get("customerEmail").matches(email_regex);
							if(email_validate == true)
							{
								emailid = Data_Map.get("customerEmail");
							}
						}
						cust_phone = "";
						if(Data_Map.get("customerPhone") != null && Data_Map.get("customerPhone") != "")
						{
							getCustomerPhone = Data_Map.get("customerPhone").getAlphaNumeric().removeAllAlpha();
							getCustomerPhone_cond = getCustomerPhone.matches(phone_regex);
							if(getCustomerPhone_cond == true)
							{
								cust_phone = getCustomerPhone;
							}
						}
						//Insert Client Site
						//set workflow stage name - added on April 5th
						//Added by Lakshmi for missing fields on June 7th from line number 248 - 256
						//				Base_Essential_Adders_System_Cost_Include_GST = Data_Map.get("baseEssentialAddersSystemCost")
						//Fetch Closer Email from Sales rep
						//Region = fet_reg.ID
						//Region_Name = fet_reg.Region_Name
						fet_closerid = Sales_Rep[Email == closerEmailid];
						ovrlWorfklowStageDetails = Workflow_Stages[Workflow_Stage_Name == Data_Map.get("ovrlStageName")];
						strtWorflowStageDetails = Workflow_Stages[Workflow_Stage_Name == Data_Map.get("strtStageName")];
						permWorkflowStageDetails = Workflow_Stages[Workflow_Stage_Name == Data_Map.get("permStageName")];
						ptoWorkflowStageDetails = Workflow_Stages[Workflow_Stage_Name == Data_Map.get("ptoStageName")];
						instWorkflowStageDetails = Workflow_Stages[Workflow_Stage_Name == Data_Map.get("instStageName")];
						clietsiteid = insert into Client_Sites
						[
							Added_User=zoho.loginuser
							Sales_Person_Name1=curr_salesrep
							Sales_Person_Email1=curr_salesrep_email
							Closer_Name=ifnull(fet_closerid,null)
							Closer_Email=closerEmailid
							AR_Account_Reference_Number=if(Data_Map.get("arNum") != "",Data_Map.get("arNum"),"")
							Sales_Rep=getSalesRep
							Sales_Person_Name=ifnull(salesRepValueList,null)
							First_Name=getFirstName
							Last_Name=getLastName
							Customer_Address.address_line_1=line1
							Customer_Address.district_city=line2
							Customer_Phone=cust_phone
							Customer_Email=emailid
							clientsiteid=getclientsiteid
							Scoop_ID=getscoopid
							Scoop_Type_Drp=if(fet_scooptype.Scoop_Name != "",fet_scooptype.Scoop_Name,"")
							Status="Open"
							Parent_Group_Name=if(Data_Map.get("parentGroupName") != "",Data_Map.get("parentGroupName"),"")
							Grand_Parent_Group_Name=if(Data_Map.get("grandparentGroupName") != "",Data_Map.get("grandparentGroupName"),"")
							Essential_Adders=if(Data_Map.get("essentialAdders") != "",Data_Map.get("essentialAdders"),"")
							Site_Survey_Appointment_Date=if(Data_Map.get("siteSurveyAppointmentDate") != "",Data_Map.get("siteSurveyAppointmentDate"),"")
							CGH_Exceptioned_Date=if(Data_Map.get("cghExceptionedDate") != "",Data_Map.get("cghExceptionedDate"),"")
							CGH_Approved_Date=if(Data_Map.get("cghApprovedDate") != "",Data_Map.get("cghApprovedDate"),"")
							Date_Financing_was_Submitted=finance_submitted
							CGH_Loan_Confirmation_Page=if(Data_Map.get("cghLoanConfirmationPage") != "",Data_Map.get("cghLoanConfirmationPage"),"")
							Buyers_Remorse_Period_End=if(Data_Map.get("buyersRemorsePeriodEnd") != "",Data_Map.get("buyersRemorsePeriodEnd"),"")
							Financing_Approved=if(Data_Map.get("financingApproved") != "",Data_Map.get("financingApproved"),"")
							Install_Completed=if(Data_Map.get("installComplete") != "",Data_Map.get("installComplete"),"")
							Meter_Swap_Requested=if(Data_Map.get("meterSwapRequested") != "",Data_Map.get("meterSwapRequested"),"")
							Workflow_Stage_Name=ifnull(workFlowStageNameID,null)
							Scoop_Type=ifnull(fet_scooptype.ID,null)
							Scoop_Types=if(fet_scooptype.Scoop_Name != "",fet_scooptype.Scoop_Name,"")
							All_Scoop_Types=ifnull(fet_scooptype.ID,null)
							Webhook_Response=input.WR_ID
							Project_ID=if(Data_Map.get("projectId") != null,Data_Map.get("projectId"),null)
							Total_Including_Adders_Taxes=if(Data_Map.get("totalIncludingAddersTaxes") != null,Data_Map.get("totalIncludingAddersTaxes"),0)
							Base_Essential_Adders_System_Cost_Include_GST=if(Data_Map.get("baseEssentialAddersSystemCost") != null,Data_Map.get("baseEssentialAddersSystemCost"),0)
							System_size_kW=if(Data_Map.get("systemSize") != null,Data_Map.get("systemSize"),0)
							Payment_Financing_Method1=if(Data_Map.get("paymentMethod") != null,Data_Map.get("paymentMethod"),null)
							Contract_Signed_Date=if(Data_Map.get("contractSignedDate") != null,Data_Map.get("contractSignedDate").toDate(),null)
							Initial_Deposit_Amount=if(Data_Map.get("initialDepositAmount") != null,Data_Map.get("initialDepositAmount"),0)
							Second_Deposit_Amount=if(Data_Map.get("secondDepositAmount") != null,Data_Map.get("secondDepositAmount"),0)
							OVRL_Stage_Name=ifnull(ovrlWorfklowStageDetails.ID,null)
							STRT_Stage_Name=ifnull(strtWorflowStageDetails.ID,null)
							PERM_Stage_Name=ifnull(permWorkflowStageDetails.ID,null)
							PTO_Stage_Name=ifnull(ptoWorkflowStageDetails.ID,null)
							INST_Stage_Name=ifnull(instWorkflowStageDetails.ID,null)
							Missing_Fields_Status="Create"
						];
						//	Scoop_Type_Name=fet_scooptype.Scoop_Name
						//Date_Financing_was_Submitted=Data_Map.get("financingSubmitted")
						CreateClient = "ClientSite Created";
						getWebhookResponse.Client_Site_Status="Created";
						thisapp.ZohoCRM.Client_Sites_To_Create_Lead(clietsiteid,WR_ID);
						addNotesResp = "CRM " + getWebhookResponse.CRM + "\n";
						addNotesResp = addNotesResp + CreateClient + "\n";
					}
					//Checking Scoop Type
					if(isNull(Data_Map.get("scoopType")) == false)
					{
						getScoopType = Data_Map.get("scoopType");
						fet_scooptype = Scoop_Types[Scoop_Full_Name == getScoopType];
						if(fet_scooptype.Scoop_Name == "STRT")
						{
							thisapp.Webhook.Create_STRT(WR_ID,clietsiteid,Data_Map);
							addNotesResp = addNotesResp + "STRT " + getWebhookResponse.STRT + "\n";
						}
						else if(fet_scooptype.Scoop_Name == "OVRL")
						{
							thisapp.Webhook.Create_OVRL(WR_ID,salesRepValueList,clietsiteid,Data_Map);
							addNotesResp = addNotesResp + "OVRL " + getWebhookResponse.OVRL_Status + "\n";
						}
						else if(fet_scooptype.Scoop_Name == "PTO")
						{
							thisapp.Webhook.Create_PTO(WR_ID,clietsiteid,Data_Map);
							addNotesResp = addNotesResp + "PTO " + getWebhookResponse.PTO_Status + "\n";
						}
						else if(fet_scooptype.Scoop_Name == "INST")
						{
							thisapp.Webhook.Create_INST(WR_ID,clietsiteid,Data_Map);
							addNotesResp = addNotesResp + "INST " + getWebhookResponse.INST + "\n";
						}
						else if(fet_scooptype.Scoop_Name == "PERM")
						{
							thisapp.Webhook.Create_PERM(WR_ID,clietsiteid,Data_Map);
							addNotesResp = addNotesResp + "PERM " + getWebhookResponse.PERM_Status + "\n";
						}
						getWebhookResponse.Add_Notes=addNotesResp;
						getWebhookResponse.Client_Sites_ID=clietsiteid;
					}
					fet_clientsite_rec = Client_Sites[ID == clietsiteid];
					if(fet_clientsite_rec.count() > 0 && fet_clientsite_rec.Deal_ID != null && fet_clientsite_rec.Deal_ID != "")
					{
						thisapp.ZohoCRM.UpdateDeal(clietsiteid);
						for each  rec_scoops in Scoops[Client_Sites == clietsiteid]
						{
							rec_scoops.Deal_ID=fet_clientsite_rec.Deal_ID.toLong();
						}
					}
				}
			}
			else
			{
				logInfo = insert into Log
				[
					Added_User=zoho.loginuser
					Module="Create Scoops"
					Message="Response Error - " + getWebhookResponse.ID + " - " + getWebhookResponse.Response
				];
			}
		}
	}
	catch (e)
	{
		logInfo = insert into Log
		[
			Added_User=zoho.loginuser
			Module="Create Scoops"
			Message=e
		];
		getWebhookResponse.Error_Reason=e;
	}
}
