var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    lineNumbers: true,
    matchBrackets: true,
    mode: "application/x-httpd-php",
    indentUnit: 4,
    indentWithTabs: true,
    theme: 'monokai'
});

var myCodeMirrorRawResponse = CodeMirror.fromTextArea(document.getElementById("responseRaw"), {
    lineNumbers: true,
    matchBrackets: true,
    mode: "application/x-httpd-php",
    indentUnit: 4,
    indentWithTabs: true,
    theme: 'monokai'
});

$('.iframeView .CodeMirror').hide();

var iframeViewSize = function(){
    $('.iframeView').width( $('body').width() - ( $( ".codeSite" ).width()+$('.splitter').width() ) );
};

$( ".codeSite" ).resizable({ 
    handleSelector: ".splitter",
    resizeHeight: false,
    onDragStart: function(){$('.blockIframe').show()},
    onDrag: iframeViewSize,
    onDragEnd: function(){$('.blockIframe').hide()}
});

if( localStorage.history ){

    var storage = JSON.parse(localStorage.history);

    window.historyRes = storage.historyRes;
    window.historyCurrent = storage.historyRes.length;
    $('.history .next').hide();

}else{

    window.historyRes = [];
    window.historyCurrent = -1;
    $('.history').find('.back, .next').hide();

}  

var iframe = $('#response')[0].contentWindow.document;
iframe = $(iframe).find('html');

var saveStorage = function(){

    localStorage.setItem('history', JSON.stringify({
        historyRes : historyRes,
        historyCurrent : historyCurrent
    }) );

}

$('#send').click(function(){

    var code = escape( myCodeMirror.getValue() );
    $('.iframeView').css('opacity','0.2');
    $.ajax({
        url : './',
        method: "POST",
        data : { 
            code : code,
            server : $('#server').val() != 'this' ? $('#server').val() : undefined
        },
    }).done(function(data,txt, jqXHR){

            var time = new Date().toLocaleString();

            historyRes.push({
                    data : data,
                    code : code,
                    time : time,
                    info : jqXHR.getAllResponseHeaders()
                });
            
            historyCurrent = historyRes.length -1;
            
            saveStorage();

            $('.history span').text( time );
            
            $('.history .back').show();
            $('.history .next').hide();

            iframe.html( data );
            myCodeMirrorRawResponse.setValue( data );
            $('.iframeView').css('opacity','');

    }).fail(function( jqXHR, textStatus ){
        alert( jqXHR.getAllResponseHeaders() );
        $('.iframeView').css('opacity','');
    });

});

$('.history .back').click(function() {

    iframe.html( historyRes[--historyCurrent].data );
    myCodeMirror.setValue(unescape( historyRes[historyCurrent].code) );
    myCodeMirrorRawResponse.setValue(unescape( historyRes[historyCurrent].data) );
    $('.history span').text( historyRes[historyCurrent].time );

    $('.history .next').show();
    if( historyCurrent == 0 ) $('.history .back').hide();
});

$('.history .next').click(function() {

    iframe.html( historyRes[++historyCurrent].data );
    myCodeMirror.setValue(unescape( historyRes[historyCurrent].code) );
    myCodeMirrorRawResponse.setValue(unescape( historyRes[historyCurrent].data) );
    $('.history span').text( historyRes[historyCurrent].time );

    $('.history .back').show();
    if( historyCurrent == ( historyRes.length -1 ) ) $('.history .next').hide();

});

$('.raw').click(function(){

    if( $('.iframeView .CodeMirror').is(':visible') ) {
        $('.iframeView .CodeMirror').hide();
        $('.iframeView iframe').show();
    } else {
        iframeViewSize();
        $('.iframeView .CodeMirror').show();
        if( historyRes[historyCurrent] && historyRes[historyCurrent].data ) myCodeMirrorRawResponse.setValue(unescape( historyRes[historyCurrent].data) );
        $('.iframeView iframe').hide();
    } 

});

$('.info').click( function(){
    alert( historyRes[historyCurrent].info );
});

$('.history span').click(function(){
   
    var html = '<div class="historyW"><div>';
    
    for(var i = historyRes.length -1 ; i >= 0; i-- ) {
        html += '<div index="'+i+'"><span>'+historyRes[i].time+'</span><i class="icon-cancel-circled"></i></div>';
    };
   
    html += '</div><button class="deleteAll">Delete All</button><button class="exit">Exit</button></div>';

    $('body').append($(html));

    $('.historyW').css('margin-left', $('body').width()/2-$('.historyW').width()/2 );

    $('.historyW .deleteAll').click(function(){

        if( confirm('Delete History ?') ){
            window.historyRes = [];
            window.historyCurrent = -1;
            localStorage.setItem('history', JSON.stringify({
                historyRes : historyRes,
                historyCurrent : historyCurrent
            }) );
        }
    });

    $('.historyW .exit').click(function(){
        $('.historyW').remove();
    });

    $('.historyW i.icon-cancel-circled').click(e => {
        if( confirm('Delete Entry ?') ){
            historyRes.splice(parseInt($(e.target).parent().attr('index')), 1);
            $(e.target).parent().remove();
            saveStorage();
        }
    });

    $('.historyW span').click(e => {

        var i = parseInt($(e.target).parent().attr('index'));

        iframe.html( historyRes[i].data );
        myCodeMirror.setValue(unescape( historyRes[i].code) );
        myCodeMirrorRawResponse.setValue(unescape( historyRes[i].data) );
        $('.history span').text( historyRes[i].time );

        historyCurrent = i;

        if( historyCurrent >= historyRes.length -1 ) $('.history .next').show();
        if( historyCurrent == 0 ) $('.history .back').hide();

     });   

});
