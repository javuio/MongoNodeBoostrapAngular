define(
    {
        init: function () {

            api.get('api/controlPanel/dashboard', function (err,data){
                $('#total:first').text(data.stats.total);
                $('#avg:first').text(Math.round( data.stats.total / data.stats.count));
                $('#highest:first').text(data.stats.highest);
                $('#lowest:first').text(data.stats.lowest);

                $('#count:first').text(data.stats.count);
                $('#newUsers:first').text(data.stats.newUsers);

                var $tblRecentEventsBody = $('#tblRecentEvents:first').find('tbody');
                for(var i=0; i < data.recentEvents.length ; i++ ){
                    var event = data.recentEvents[i];
                    var $tr = $('<tr><td class="createdOn"></td><td class="event"></td><td class="createdBy"></td></tr>');
                    $tr.find('.createdOn:first').text(new Date(event.createdOn).format("mm/dd/yyyy"));
                    $tr.find('.createdBy:first').text(event.createdBy);
                    $tr.find('.event:first').text(event.event);
                    $tblRecentEventsBody.append($tr);
                }
                
            });
        }
    });