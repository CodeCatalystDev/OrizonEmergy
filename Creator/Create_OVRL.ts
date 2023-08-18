void Webhook.Create_OVRL(int WR_ID, list salesRepValueList, int clietsiteid, Map Data_Map)
{
	getWebhookResponse = Webhook_Response[ID == input.WR_ID];
	if(isNull(getWebhookResponse.Response) == false)
	{
		// 		DataResp = getWebhookResponse.Response.toList();
		// 		Data_Map = Map();
		// 		for each  eachData in DataResp
		// 		{
		// 		Data_Map.put(eachData.toMap().get("name"),eachData.toMap().get("value"));
		// 		}
		workFlowStageNameID = Workflow_Stages[Workflow_Stage_Name == Data_Map.get("stageName")].ID;
		if(isNull(Data_Map.get("scoopType")) == false)
		{
			//1. Proposal Intake & Presentation
			getScoopType = Data_Map.get("scoopType");
			fet_scooptype = Scoop_Types[Scoop_Full_Name == getScoopType];
			if(fet_scooptype.Scoop_Name == "OVRL")
			{
				get_OVRL = OVRL[Client_Sites == clietsiteid && Scoop_ID == Data_Map.get("scoopId")];
				info get_OVRL + "GetOVRL";
				ovrlID = get_OVRL.ID;
				if(get_OVRL.count() == 0)
				{
					info "Insert OVRL";
					getcontactssigneddate = if(Data_Map.get("contractSignedDate") != null,Data_Map.get("contractSignedDate").toDate("dd-MMM-yyyy"),null);
					getFinancingDate = if(Data_Map.get("financingSubmitted") != null,Data_Map.get("financingSubmitted").toDate("dd-MMM-yyyy"),null);
					getSiteSurveyDate = if(Data_Map.get("siteSurveyAppointmentDate") != null,Data_Map.get("siteSurveyAppointmentDate").toDate("dd-MMM-yyyy"),null);
					getBuildingSubmitDate = if(Data_Map.get("buildingPermitSubmitted") != null,Data_Map.get("buildingPermitSubmitted").toDate("dd-MMM-yyyy"),null);
					getBuildingReceiveDate = if(Data_Map.get("buildingPermitReceived") != null,Data_Map.get("buildingPermitReceived").toDate("dd-MMM-yyyy"),null);
					getMicrogenSubmitDate = if(Data_Map.get("microgenPermitSubmitted") != null,Data_Map.get("microgenPermitSubmitted").toDate("dd-MMM-yyyy"),null);
					getMicrogenApproved = Data_Map.get("microgenApproved");
					firstPayment = if(Data_Map.get("firstPaymentAmount") != null,Data_Map.get("firstPaymentAmount"),0);
					secondPayment = if(Data_Map.get("secondPaymentAmount") != null,Data_Map.get("secondPaymentAmount"),0);
					amtowing = if(Data_Map.get("amountOwing") != null,Data_Map.get("amountOwing"),0);
					thirdpayment = if(Data_Map.get("thirdPaymentAmount") != null,Data_Map.get("thirdPaymentAmount"),0);
					remainderPaymentAmount = if(Data_Map.get("remainderPaymentAmount") != null,Data_Map.get("remainderPaymentAmount"),0);
					PaymentMethod = Data_Map.get("paymentMethod");
					ovrlID = insert into OVRL
					[
						Added_User=zoho.loginuser
						Client_Sites=clietsiteid
						Scoop_ID=Data_Map.get("scoopId")
						Sales_Rep=salesRepValueList
						Third_Payment_Amount=thirdpayment
						Workflow_Stage_Name=workFlowStageNameID
						Contract_Signed_Date=ifnull(getcontactssigneddate,null)
						Date_Financing_was_submitted=ifnull(getFinancingDate,null)
						Corp_Site_Survey_Appointment_Date=ifnull(getSiteSurveyDate,null)
						Date_Building_Permit_Submitted=ifnull(getBuildingSubmitDate,null)
						Date_Building_Permit_Received1=ifnull(getBuildingReceiveDate,null)
						Date_MicroGen_Permit_Submitted1=ifnull(getMicrogenSubmitDate,null)
						First_Payment_Amount=firstPayment
						Second_Payment_Amount=ifnull(secondPayment,0)
						Payment_Method=ifnull(PaymentMethod,"")
						Scoop_Type="OVRL"
						Amount_Owing=ifnull(amtowing,"")
						Remainder_Payment_Amount=ifnull(remainderPaymentAmount,"")
						project_Manager=if(Data_Map.get("Assigned_Project_Manager") != null,Data_Map.get("Assigned_Project_Manager"),null)
						Last_Contact_With_Customer=if(Data_Map.get("Last_Contact_With_Customer") != null,Data_Map.get("Last_Contact_With_Customer"),null)
						Ongoing_Field_Notes=if(Data_Map.get("Notes_Ongoing_Field") != null,Data_Map.get("Notes_Ongoing_Field"),null)
						Account_Review_Conducted=if(Data_Map.get("Account_Review_conducted_Within_3_days_from_sign") != null,Data_Map.get("Account_Review_conducted_Within_3_days_from_sign"),null)
						introductionCallComplete=if(Data_Map.get("Introduction_Call_Complete_Within_3_days_from_si") != null,Data_Map.get("Introduction_Call_Complete_Within_3_days_from_si"),null)
						Verify_Financing_Submitted=if(Data_Map.get("Did_you_verify_Financing_had_been_submitted_or_not") != null,Data_Map.get("Did_you_verify_Financing_had_been_submitted_or_not"),null)
						Verify_Site_Survey_Booked=if(Data_Map.get("Did_you_verify_a_corporate_site_survey_is_booked_a") != null,Data_Map.get("Did_you_verify_a_corporate_site_survey_is_booked_a"),null)
						Did_you_confirm_financing_is_approved_and_site_survey_had_been_completed=if(Data_Map.get("Financing_Approved") != null,Data_Map.get("Financing_Approved"),null)
						Final_Design=if(Data_Map.get("OLD_DO_NOT_USE_Did_you_call_the_client_to_verify_t") != null,Data_Map.get("OLD_DO_NOT_USE_Did_you_call_the_client_to_verify_t"),null)
						City_Permits_Submitted=if(Data_Map.get("Did_you_confirm_city_permits_had_been_submitted") != null,Data_Map.get("Did_you_confirm_city_permits_had_been_submitted"),null)
						City_And_Micro_Gen_Permits=if(Data_Map.get("Did_you_verify_city_permits_had_been_approved_and") != null,Data_Map.get("Did_you_verify_city_permits_had_been_approved_and"),null)
						Exception_Program_Explained=if(Data_Map.get("Did_you_explain_the_customer_about_the_exception_p") != null,Data_Map.get("Did_you_explain_the_customer_about_the_exception_p"),null)
						Loan_Application_Filled=if(Data_Map.get("Did_you_verify_the_CGH_button_appeared_and_the_loa") != null,Data_Map.get("Did_you_verify_the_CGH_button_appeared_and_the_loa"),null)
						Loan_Approved=if(Data_Map.get("Did_you_verify_the_loan_had_been_approved_or_the_c") != null,Data_Map.get("Did_you_verify_the_loan_had_been_approved_or_the_c"),null)
						Post_Survey_Completed=if(Data_Map.get("Did_you_complete_the_Post_Survey_filled_the_field") != null,Data_Map.get("Did_you_complete_the_Post_Survey_filled_the_field"),null)
						Post_Install_Assessment_Booked=if(Data_Map.get("Did_you_confirm_the_client_had_booked_their_post_i") != null,Data_Map.get("Did_you_confirm_the_client_had_booked_their_post_i"),null)
						Misc_File_Uploads=if(Data_Map.get("Misc_File_Uploads") != null,Data_Map.get("Misc_File_Uploads"),null)
						Notes_for_Installers=if(Data_Map.get("Notes_for_Installers") != null,Data_Map.get("Notes_for_Installers"),null)
						Account_Review_Conducted=if(Data_Map.get("accountReviewConducted") != null,Data_Map.get("accountReviewConducted"),null)
						introductionCallComplete=if(Data_Map.get("introductionCallComplete") != null,Data_Map.get("introductionCallComplete"),null)
						Verify_Financing_Submitted=if(Data_Map.get("verifyFinancingSubmitted") != null,Data_Map.get("verifyFinancingSubmitted"),null)
						Verify_Site_Survey_Booked=if(Data_Map.get("verifySiteSurveyBooked") != null,Data_Map.get("verifySiteSurveyBooked"),null)
						Did_you_confirm_financing_is_approved_and_site_survey_had_been_completed=if(Data_Map.get("confirmFinancingApproved") != null,Data_Map.get("confirmFinancingApproved"),null)
						Engineer_Package1=if(Data_Map.get("verifyEngineerPackageCompleted") != null,Data_Map.get("verifyEngineerPackageCompleted"),null)
						Final_Design=if(Data_Map.get("verifyFinalDesign") != null,Data_Map.get("verifyFinalDesign"),null)
						City_Permits_Submitted=if(Data_Map.get("cityPermitsSubmitted") != null,Data_Map.get("cityPermitsSubmitted"),null)
						City_And_Micro_Gen_Permits=if(Data_Map.get("verifyCityAndMicroGenPermits") != null,Data_Map.get("verifyCityAndMicroGenPermits"),null)
						Exception_Program_Explained=if(Data_Map.get("exceptionProgramExplained") != null,Data_Map.get("exceptionProgramExplained"),null)
						Loan_Approved=if(Data_Map.get("verifyLoanApproved") != null,Data_Map.get("verifyLoanApproved"),null)
						Post_Survey_Completed=if(Data_Map.get("postSurveyCompleted") != null,Data_Map.get("postSurveyCompleted"),null)
						Post_Install_Assessment_Booked=if(Data_Map.get("confirmPostInstallAssessmentBooked") != null,Data_Map.get("confirmPostInstallAssessmentBooked"),null)
					];
					getScoopName = fet_scooptype.Scoop_Name;
					getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
					getscoops = Scoops[Client_Sites == clietsiteid && OVRL == ovrlID && Workflow_Stage_Name == workFlowStageNameID];
					consolScoop = getscoops.ID;
					//update the allscoops
					if(getscoops.count() > 0)
					{
						info "Scoop Update";
						getscoops.Stage=getStageName;
						getscoops.Scoop_Name=getScoopName;
						getscoops.Client_Sites=clietsiteid;
						getscoops.Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"");
						//set workflow stage name - added on April 5th
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
							OVRL=ovrlID
							Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"")
							Workflow_Stage_Name=workFlowStageNameID
						];
					}
					thisapp.update_leadID_toAllscoops(clietsiteid);
				}
				else
				{
					info "OVRL Update" + salesRepValueList;
					get_OVRL.Sales_Rep=salesRepValueList;
					get_OVRL.Third_Payment_Amount=thirdpayment;
					get_OVRL.Account_Review_Conducted=if(Data_Map.get("accountReviewConducted") != null,Data_Map.get("accountReviewConducted"),null);
					get_OVRL.introductionCallComplete=if(Data_Map.get("introductionCallComplete") != null,Data_Map.get("introductionCallComplete"),null);
					get_OVRL.Verify_Financing_Submitted=if(Data_Map.get("verifyFinancingSubmitted") != null,Data_Map.get("verifyFinancingSubmitted"),null);
					get_OVRL.Verify_Site_Survey_Booked=if(Data_Map.get("verifySiteSurveyBooked") != null,Data_Map.get("verifySiteSurveyBooked"),null);
					get_OVRL.Did_you_confirm_financing_is_approved_and_site_survey_had_been_completed=if(Data_Map.get("confirmFinancingApproved") != null,Data_Map.get("confirmFinancingApproved"),null);
					get_OVRL.Engineer_Package1=if(Data_Map.get("verifyEngineerPackageCompleted") != null,Data_Map.get("verifyEngineerPackageCompleted"),null);
					get_OVRL.Final_Design=if(Data_Map.get("verifyFinalDesign") != null,Data_Map.get("verifyFinalDesign"),null);
					get_OVRL.City_Permits_Submitted=if(Data_Map.get("cityPermitsSubmitted") != null,Data_Map.get("cityPermitsSubmitted"),null);
					get_OVRL.City_And_Micro_Gen_Permits=if(Data_Map.get("verifyCityAndMicroGenPermits") != null,Data_Map.get("verifyCityAndMicroGenPermits"),null);
					get_OVRL.Exception_Program_Explained=if(Data_Map.get("exceptionProgramExplained") != null,Data_Map.get("exceptionProgramExplained"),null);
					get_OVRL.Loan_Approved=if(Data_Map.get("verifyLoanApproved") != null,Data_Map.get("verifyLoanApproved"),null);
					get_OVRL.Post_Survey_Completed=if(Data_Map.get("postSurveyCompleted") != null,Data_Map.get("postSurveyCompleted"),null);
					get_OVRL.Post_Install_Assessment_Booked=if(Data_Map.get("confirmPostInstallAssessmentBooked") != null,Data_Map.get("confirmPostInstallAssessmentBooked"),null);
					get_OVRL.Contract_Signed_Date=if(Data_Map.get("contractSignedDate") != null,Data_Map.get("contractSignedDate").toDate("dd-MMM-yyyy"),null);
					get_OVRL.Date_Financing_was_submitted=if(Data_Map.get("financingSubmitted") != null,Data_Map.get("financingSubmitted").toDate("dd-MMM-yyyy"),null);
					get_OVRL.Corp_Site_Survey_Appointment_Date=if(Data_Map.get("siteSurveyAppointmentDate") != null,Data_Map.get("siteSurveyAppointmentDate").toDate("dd-MMM-yyyy"),null);
					get_OVRL.Date_Building_Permit_Submitted=if(Data_Map.get("buildingPermitSubmitted") != null,Data_Map.get("buildingPermitSubmitted").toDate("dd-MMM-yyyy"),null);
					get_OVRL.Date_Building_Permit_Received1=if(Data_Map.get("buildingPermitReceived") != null,Data_Map.get("buildingPermitReceived").toDate("dd-MMM-yyyy"),null);
					get_OVRL.Date_MicroGen_Permit_Submitted1=if(Data_Map.get("microgenPermitSubmitted") != null,Data_Map.get("microgenPermitSubmitted").toDate("dd-MMM-yyyy"),null);
					get_OVRL.MicroGen_Approval=if(Data_Map.get("microgenApproved") != null,Data_Map.get("microgenApproved"),null);
					get_OVRL.First_Payment_Amount=if(firstPayment != null,firstPayment,0);
					get_OVRL.Second_Payment_Amount=if(Data_Map.get("secondPaymentAmount") != null,Data_Map.get("secondPaymentAmount"),0);
					firstPayment = if(Data_Map.get("firstPaymentAmount") != null,Data_Map.get("firstPaymentAmount"),0);
					get_OVRL.Remainder_Payment_Amount=if(Data_Map.get("remainderPaymentAmount") != null,Data_Map.get("remainderPaymentAmount"),0);
					get_OVRL.Amount_Owing=if(Data_Map.get("amountOwing") != null,Data_Map.get("amountOwing"),0);
					get_OVRL.Payment_Method=if(Data_Map.get("paymentMethod") != null,Data_Map.get("paymentMethod"),null);
					get_OVRL.Workflow_Stage_Name=workFlowStageNameID;
					get_OVRL.project_Manager=if(Data_Map.get("Assigned_Project_Manager") != null,Data_Map.get("Assigned_Project_Manager"),null);
					get_OVRL.Last_Contact_With_Customer=if(Data_Map.get("Last_Contact_With_Customer") != null,Data_Map.get("Last_Contact_With_Customer"),null);
					get_OVRL.Ongoing_Field_Notes=if(Data_Map.get("Notes_Ongoing_Field") != null,Data_Map.get("Notes_Ongoing_Field"),null);
					get_OVRL.Account_Review_Conducted=if(Data_Map.get("Account_Review_conducted_Within_3_days_from_sign") != null,Data_Map.get("Account_Review_conducted_Within_3_days_from_sign"),null);
					get_OVRL.introductionCallComplete=if(Data_Map.get("Introduction_Call_Complete_Within_3_days_from_si") != null,Data_Map.get("Introduction_Call_Complete_Within_3_days_from_si"),null);
					get_OVRL.Verify_Financing_Submitted=if(Data_Map.get("Did_you_verify_Financing_had_been_submitted_or_not") != null,Data_Map.get("Did_you_verify_Financing_had_been_submitted_or_not"),null);
					get_OVRL.Verify_Site_Survey_Booked=if(Data_Map.get("Did_you_verify_a_corporate_site_survey_is_booked_a") != null,Data_Map.get("Did_you_verify_a_corporate_site_survey_is_booked_a"),null);
					get_OVRL.Did_you_confirm_financing_is_approved_and_site_survey_had_been_completed=if(Data_Map.get("Financing_Approved") != null,Data_Map.get("Financing_Approved"),null);
					get_OVRL.Final_Design=if(Data_Map.get("OLD_DO_NOT_USE_Did_you_call_the_client_to_verify_t") != null,Data_Map.get("OLD_DO_NOT_USE_Did_you_call_the_client_to_verify_t"),null);
					get_OVRL.City_Permits_Submitted=if(Data_Map.get("Did_you_confirm_city_permits_had_been_submitted") != null,Data_Map.get("Did_you_confirm_city_permits_had_been_submitted"),null);
					get_OVRL.City_And_Micro_Gen_Permits=if(Data_Map.get("Did_you_verify_city_permits_had_been_approved_and") != null,Data_Map.get("Did_you_verify_city_permits_had_been_approved_and"),null);
					get_OVRL.Exception_Program_Explained=if(Data_Map.get("Did_you_explain_the_customer_about_the_exception_p") != null,Data_Map.get("Did_you_explain_the_customer_about_the_exception_p"),null);
					get_OVRL.Loan_Application_Filled=if(Data_Map.get("Did_you_verify_the_CGH_button_appeared_and_the_loa") != null,Data_Map.get("Did_you_verify_the_CGH_button_appeared_and_the_loa"),null);
					get_OVRL.Loan_Approved=if(Data_Map.get("Did_you_verify_the_loan_had_been_approved_or_the_c") != null,Data_Map.get("Did_you_verify_the_loan_had_been_approved_or_the_c"),null);
					get_OVRL.Post_Survey_Completed=if(Data_Map.get("Did_you_complete_the_Post_Survey_filled_the_field") != null,Data_Map.get("Did_you_complete_the_Post_Survey_filled_the_field"),null);
					get_OVRL.Post_Install_Assessment_Booked=if(Data_Map.get("Did_you_confirm_the_client_had_booked_their_post_i") != null,Data_Map.get("Did_you_confirm_the_client_had_booked_their_post_i"),null);
					get_OVRL.Misc_File_Uploads=if(Data_Map.get("Misc_File_Uploads") != null,Data_Map.get("Misc_File_Uploads"),null);
					get_OVRL.Notes_for_Installers=if(Data_Map.get("Notes_for_Installers") != null,Data_Map.get("Notes_for_Installers"),null);
					getScoopName = fet_scooptype.Scoop_Name;
					getStageName = if(Data_Map.get("stageName") != "",Data_Map.get("stageName"),"");
					getWebhookResponse.OVRL_Status="Updated";
					getscoops = Scoops[Client_Sites == clietsiteid && OVRL == ovrlID && Workflow_Stage_Name == workFlowStageNameID];
					info getscoops + "OVRL Stage";
					consolScoop = getscoops.ID;
					//update the allscoops
					if(getscoops.count() > 0)
					{
						getscoops.Stage=getStageName;
						getscoops.Scoop_Name=getScoopName;
						getscoops.Client_Sites=clietsiteid;
						getscoops.Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"");
						getscoops.Workflow_Stage_Name=workFlowStageNameID;
					}
					//insert in allscoop
					else
					{
						consolScoop = insert into Scoops
						[
							Added_User=zoho.loginuser
							Scoop_Name=getScoopName
							Stage=getStageName
							Client_Sites=clietsiteid
							OVRL=get_OVRL.ID
							Title=ifnull(Data_Map.get("lastName"),"") + "-" + ifnull(Data_Map.get("customerAddress"),"")
							Workflow_Stage_Name=workFlowStageNameID
						];
					}
					thisapp.update_leadID_toAllscoops(clietsiteid);
					// 					response = thisapp.ZohoCRM.Lead_Conversion(clietsiteid);
					// 					get_OVRL.Deal_ID=response.get("Deals");
					// 					get_OVRL.Account_ID=response.get("Accounts");
					// 					get_OVRL.Contact_ID=response.get("Contacts");
					// 					fet_cl = Client_Sites[ID == input.clietsiteid];
					// 					fet_cl.Deal_ID=response.get("Deals");
					// 					fet_cl.Contact_ID=response.get("Contacts");
					// 					fet_cl.Account_ID=response.get("Accounts");
					// fetch_scoop = Scoops[ID == consolScoop];
					// fetch_scoop.Deal_ID=response.get("Deals");
					// get_OVRL.Deal_ID=response.get("Deals");
				}
				if(get_OVRL.Deal_ID == null || get_OVRL.Deal_ID == "")
				{
					response = thisapp.ZohoCRM.Lead_Conversion(clietsiteid);
					info "LeadConversion - " + response;
					getWebhookResponse.OVRL_Status="Created";
					//Update Deal ID
					getWebhookResponse.Deal_ID=response.get("Deals");
					fetch_scoop = Scoops[ID == consolScoop];
					fetch_scoop.Deal_ID=response.get("Deals");
					fet_ovrl = OVRL[ID == ovrlID];
					fet_ovrl.Deal_ID=response.get("Deals");
					fet_ovrl.Account_ID=response.get("Accounts");
					fet_ovrl.Contact_ID=response.get("Contacts");
					fetClientSite = Client_Sites[ID == clietsiteid];
					fetClientSite.Deal_ID=response.get("Deals");
					getWebhookResponse.OVRL_ID=ovrlID;
					info "OVRL ID in Create OVRL " + ovrlID;
				}
			}
		}
		//	getWebhookResponse.Client_Sites_ID=clietsiteid;
		getWebhookResponse.Scoops_ID=consolScoop;
	}
}
