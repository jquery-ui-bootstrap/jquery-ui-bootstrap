$(function () {
    //####### Buttons
    $("button,.button,#sampleButton").button();
    $("#btn-with-icon").button({
        text: true,
        icons: {
            primary: "ui-icon-play"
        }
    });

    $("#progressbar").progressbar({
      value: 37
    });

    $("#button-with-icon" ).button({
      icons: {
        primary: "ui-icon-locked"
      },
      text: true
    });
    $("#button-with-icon2" ).button({
      icons: {
        primary: "ui-icon-play"
      },
      text: true
    });
    $("#button-with-icon3" ).button({
      icons: {
        primary: "ui-icon-stop"
      },
      text: true
    });
    // Buttonset
    $('#radioset').buttonset();
    $("#format").buttonset();

    //####### Toolbar
	$("#play").button({
	    text: false,
	    icons: {
	        primary: "ui-icon-play"
	    }
	});
    $("#shuffle").button();
    $("#repeat").buttonset();

    // Split button

    $( "#rerun" )
    .button()
    .click(function() {
        alert( "Running the last action" );
    })
    .next()
    .button({
        text: false,
        icons: {
            primary: "ui-icon-triangle-1-s"
        }
    })
    .click(function() {
        var menu = $( this ).parent().next().show().position({
            my: "left top",
            at: "left bottom",
            of: this
        });
        $( document ).one( "click", function() {
            menu.hide();
        });
        return false;
    }).parent()
    .buttonset()
    .next()
    .hide()
    .menu();
    //####### Accordion
    $("#menu-collapse").accordion({
        header: "h3"
    });

    // Dialog Link
    $('#dialog_link').click(function () {
        $('#dialog_simple').dialog('open');
        return false;
    });

    // Modal Link
    $('#modal_link').click(function () {
        $('#dialog-message').dialog('open');
        return false;
    });
    //hover states on the static widgets
    $('#dialog_link, #modal_link, ul#icons li').hover(
        function () {
            $(this).addClass('ui-state-hover');
        }, function () {
            $(this).removeClass('ui-state-hover');
        }
    );

    // Dialog Simple
    $('#dialog_simple').dialog({
        autoOpen: false,
        width: 600,
        buttons: {
            "Ok": function () {
                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    //####### Dialogs
    $("#dialog-message").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });

    // Remove focus from buttons
    $('.ui-dialog :button').blur();

    //####### Tabs
    $('#tabs2, #tabs, #tabs3').tabs();

    // Dynamic tabs
    var tabTitle = $( "#tab_title" ),
        tabContent = $( "#tab_content" ),
        tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
        tabCounter = 2;

    var tabs = $( "#tabs2" ).tabs();

    // modal dialog init: custom buttons and a "close" callback reseting the form inside
    var dialog = $( "#dialog2" ).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Add: function() {
                addTab();
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
        }
    });

    // addTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find( "form" ).submit(function( event ) {
        addTab();
        dialog.dialog( "close" );
        event.preventDefault();
    });

    // actual addTab function: adds new tab using the input from the form above
    function addTab() {
        var label = tabTitle.val() || "Tab " + tabCounter,
            id = "tabs-" + tabCounter,
            li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
            tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
        tabs.tabs( "refresh" );
        tabCounter++;
    }

    // addTab button: just opens the dialog
    $( "#add_tab" )
        .button()
        .click(function() {
            dialog.dialog( "open" );
        });

    // close icon: removing the tab on click
    $( "#tabs2" ).on( "click",'span.ui-icon-close', function() {

        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });

    //Combination examples (tabs) and open dialog
    $('#sampleButton').on('click', function(event){
        event.preventDefault();
        $('#dialog_simple').dialog({
            autoOpen: true,
            modal: true,
            width: 600,
            buttons: {
                "Save": function () {
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    //####### Datepicker
    $('#datepicker').datepicker({
        inline: true
    });

    //####### Slider

    // Horizontal slider
    $('#h-slider').slider({
        range: true,
        values: [17, 67]
    });

    // Vertical slider
    $("#v-slider").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 60,
        slide: function (event, ui) {
            $("#amount").val(ui.value);
        }
    });
    $("#amount").val($("#v-slider").slider("value"));

    // Autocomplete
    var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

    $("#tags").autocomplete({
        source: availableTags
    });

    //####### Menu
    $("#menu").menu();

    //####### Spinner

    var spinner = $( "#spinner" ).spinner();

    $( "#disable" ).click(function() {
        if ( spinner.spinner( "option", "disabled" ) ) {
            spinner.spinner( "enable" );
        } else {
            spinner.spinner( "disable" );
        }
    });
    $( "#destroy" ).click(function() {
        if ( spinner.data( "ui-spinner" ) ) {
            spinner.spinner( "destroy" );
        } else {
            spinner.spinner();
        }
    });
    $( "#getvalue" ).click(function() {
        alert( spinner.spinner( "value" ) );
    });
    $( "#setvalue" ).click(function() {
        spinner.spinner( "value", 5 );
    });

    //####### Tooltip

    $( "#tooltip" ).tooltip();
    /**
     * Tooltip top
     */
    $( "#tooltip-top" ).tooltip({
        position: {
            my: "center bottom-15",
            at: "center top",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                .addClass( "arrow bottom" )
                .addClass( feedback.vertical )
                .addClass( feedback.horizontal )
                .appendTo( this );
            }
        }
    });
    /**
     * Tooltip right
     */
    $( "#tooltip-right" ).tooltip({
        position: {
            my: "left+15 left",
            at: "right center",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                .addClass( "arrow left" )
                .addClass( feedback.vertical )
                .addClass( feedback.horizontal )
                .appendTo( this );
            }
        }
    });
    $( "#tooltip-left" ).tooltip({
        position: {
            my: "right-15 center",
            at: "left center",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                .addClass( "arrow right" )
                .addClass( feedback.vertical )
                .addClass( feedback.horizontal )
                .appendTo( this );
            }
        }
    });
    /**
     * Tooltip bottom
     */
    $( "#tooltip-bottom" ).tooltip({
        position: {
            my: "center top+15",
            at: "center bottom",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                .addClass( "arrow top" )
                .addClass( feedback.vertical )
                .addClass( feedback.horizontal )
                .appendTo( this );
            }
        }
    });
    /*
    * Extra
    * */
    // File input (using http://filamentgroup.com/lab/jquery_custom_file_input_book_designing_with_progressive_enhancement/)
    if ($.fn.customFileInput){
        $('#file').customFileInput({
            button_position : 'right'
        });
    }

    //####### Wijmo
    if ($.fn.wijmenu){
        $("#menu1").wijmenu({ trigger: ".wijmo-wijmenu-item", triggerEvent: "click" });
    }

    // Select a Date Range with datepicker
    $( "#rangeBa" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
            $( "#rangeBb" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#rangeBb" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
            $( "#rangeBa" ).datepicker( "option", "maxDate", selectedDate );
        }
    });
    //####### Toolbar with Font Awesome
    $("#play-fa").button({
        text: false,
        icons: {
            primary: "icon-play"
        }
    });
    $("#stop-fa").button({
        text: false,
        icons: {
            primary: "icon-stop"
        }
    });
    $("#prev-fa").button({
        text: false,
        icons: {
            primary: "icon-fast-backward"
        }
    });
    $("#next-fa").button({
        text: false,
        icons: {
            primary: "icon-fast-forward"
        }
    });
    $("#shuffle-fa").button();
    $("#repeat-fa").buttonset();

    // ############ Button with icon (Font Awesome)
    $("#button-with-icon-fa" ).button({
        icons: {
            primary: "icon-lock"
        },
        text: false
    });
    $("#button-with-icon2-fa" ).button({
        icons: {
            primary: "icon-play"
        },
        text: false
    });
    $("#button-with-icon3-fa" ).button({
        icons: {
            primary: "icon-stop"
        },
        text: false
    });

    // Split button (Font Awesome)

    $( "#rerun-fa" )
        .button()
        .click(function() {
            alert( "Running the last action" );
        })
        .next()
        .button({
            text: false,
            icons: {
                primary: "icon-caret-down"
            }
        })
        .click(function() {
            var menu = $( this ).parent().next().show().position({
                my: "left top",
                at: "left bottom",
                of: this
            });
            $( document ).one( "click", function() {
                menu.hide();
            });
            return false;
        }).parent()
        .buttonset()
        .next()
        .hide()
        .menu();



            
                var mydata = [
                    {id:"1",invdate:"2010-05-24",name:"test",note:"note",tax:"10.00",total:"2111.00"} ,
                    {id:"2",invdate:"2010-05-25",name:"test2",note:"note2",tax:"20.00",total:"320.00"},
                    {id:"3",invdate:"2007-09-01",name:"test3",note:"note3",tax:"30.00",total:"430.00"},
                    {id:"4",invdate:"2007-10-04",name:"test",note:"note",tax:"10.00",total:"210.00"},
                    {id:"5",invdate:"2007-10-05",name:"test2",note:"note2",tax:"20.00",total:"320.00"},
                    {id:"6",invdate:"2007-09-06",name:"test3",note:"note3",tax:"30.00",total:"430.00"},
                    {id:"7",invdate:"2007-10-04",name:"test",note:"note",tax:"10.00",total:"210.00"},
                    {id:"8",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"21.00",total:"320.00"},
                    {id:"9",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
                    {id:"11",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"12",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"13",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
                    {id:"14",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"15",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"16",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
                    {id:"17",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"18",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"19",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
                    {id:"21",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"22",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"23",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
                    {id:"24",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"25",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"26",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
                    {id:"27",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
                    {id:"28",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
                    {id:"29",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}
                ];
    
                jQuery("#jqGrid01").jqGrid({
                    data: mydata,
                    datatype: "local",
                    height: 250,
                    rowNum: 10,
                    rowList: [10,20,30],
                    colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
                    colModel:[
                        {name:'id',index:'id', width:60, sorttype:"int",search:true},
                        {name:'invdate',index:'invdate', width:90, sorttype:"date", formatter:"date"},
                        {name:'name',index:'name', width:100},
                        {name:'amount',index:'amount', width:80, align:"right",sorttype:"float", formatter:"number"},
                        {name:'tax',index:'tax', width:80, align:"right",sorttype:"float"},        
                        {name:'total',index:'total', width:80,align:"right",sorttype:"float"},        
                        {name:'note',index:'note', width:150, sortable:false}        
                    ],
                    pager: "#jqGridPager01",
                    viewrecords: true,
                    caption: "Sample jqGrid Table",
                    hidegrid:false,
                    altRows: true                
                });
                
                jQuery("#jqGrid01")
                    .jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
                    .jqGrid('setSelection', '3');
            
});