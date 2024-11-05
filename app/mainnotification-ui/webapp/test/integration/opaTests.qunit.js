sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'mainnotificationui/test/integration/FirstJourney',
		'mainnotificationui/test/integration/pages/NoticesList',
		'mainnotificationui/test/integration/pages/NoticesObjectPage'
    ],
    function(JourneyRunner, opaJourney, NoticesList, NoticesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('mainnotificationui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheNoticesList: NoticesList,
					onTheNoticesObjectPage: NoticesObjectPage
                }
            },
            opaJourney.run
        );
    }
);