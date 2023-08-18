void downloadFiel()
{
	//https://creatorapp.zohopublic.com/oren_orizonenergy/orizon-management/report-perma/SalesDashboardImages_Report/4431218000000139021/STRT_Image/image-download/G6F1YYmJy9PrzqhhW8E6zShvaGamAHU24aqM36z9n3UPbueRbZ1BATA9wQ2mSr1YX4fHTZpKmqfXqvVxd9n5pvCu0JW9DHRsPGXW?filepath=/1680611833140_STRT.png
	ima = SalesDashboardImages[ID == 4431218000000139021].STRT_Image;
	v_TLD = "com";
	v_Filename = ima.getSuffix("/image/").getPrefix("\"");
	// specify publish key of published report (not the form)
	v_PublishKey = "G6F1YYmJy9PrzqhhW8E6zShvaGamAHU24aqM36z9n3UPbueRbZ1BATA9wQ2mSr1YX4fHTZpKmqfXqvVxd9n5pvCu0JW9DHRsPGXW";
	// build image src
	v_ImageSrc = "https://creator.zoho." + v_TLD + "/file" + zoho.appuri + "SalesDashboardImages_Report/";
	v_ImageSrc = v_ImageSrc + "443121800000013902" + "/STRT_Image/image-download/" + v_PublishKey;
	v_ImageSrc = v_ImageSrc + "?filepath=/" + v_Filename;
	// yields something like https://creator.zoho.eu/file/myaccount/myapp/MyImages_Report/12345678901234567890/MyImage/image-download/AAAAABBBBBCCCCDDDDEEEFFFGGGGHHHIIIJJJKKLLLMMMNNOOOPPPQQWRRRSSTTUUVVWWXXYYZZ122345567890?filepath=/2138123687628736_MyLogo.png
	// change this to eu (Europe), com (US), com.cn (China), ... 
	info v_ImageSrc;
	// yields something like https://creator.zoho.eu/file/myaccount/myapp/MyImages_Report/12345678901234567890/MyImage/image-down
}
