void Dashboard.getScoopCount()
{
	get_clientsites = Client_Sites[Status == "Open"].ID.getAll();
	getStrtCount = 0;
	getPermCount = 0;
	getInstCount = 0;
	getOvrlCount = 0;
	getPtoCount = 0;
	for each  clients in get_clientsites
	{
		//	info clients ;
		getScoops = Scoops[Client_Sites.ID == clients] sort by Added_Time desc;
		//		info getScoops ;
		if(getScoops.Scoop_Name == "STRT")
		{
			getStrtCount = getStrtCount + 1;
		}
		else if(getScoops.Scoop_Name == "PERM")
		{
			getPermCount = getPermCount + 1;
		}
		else if(getScoops.Scoop_Name == "INST")
		{
			getInstCount = getInstCount + 1;
		}
		else if(getScoops.Scoop_Name == "OVRL")
		{
			getOvrlCount = getOvrlCount + 1;
		}
		else if(getScoops.Scoop_Name == "PTO")
		{
			getPtoCount = getPtoCount + 1;
		}
	}
	info getStrtCount;
	info getPtoCount;
	info getOvrlCount;
	info getInstCount;
	info getPermCount;
}
