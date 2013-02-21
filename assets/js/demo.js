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
});