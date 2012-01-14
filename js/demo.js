$(function () {

    // Accordion
    $("#accordion").accordion({
        header: "h3"
    });

    // Tabs
    $('#tabs2, #tabs').tabs();

    // Buttons
    $('button').button();

    // Anchors, Submit
    $('.button,#sampleButton').button();

    // Buttonset
    $('#radioset').buttonset();
    $("#format").buttonset();


    // Dialog
    $('#dialog').dialog({
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

    // Dialog Link
    $('#dialog_link').click(function () {
        $('#dialog').dialog('open');
        return false;
    });

    // Modal Link
    $('#modal_link').click(function () {
        $('#dialog-message').dialog('open');
        return false;
    });

    // Datepicker
    $('#datepicker').datepicker({
        inline: true
    });

    // Slider
    $('#slider').slider({
        range: true,
        values: [17, 67]
    });

    // Progressbar
    $("#progressbar").progressbar({
        value: 20
    });

    //hover states on the static widgets
    $('#dialog_link, #modal_link, ul#icons li').hover(

    function () {
        $(this).addClass('ui-state-hover');
    }, function () {
        $(this).removeClass('ui-state-hover');
    });

    // Autocomplete
    var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

    $("#tags").autocomplete({
        source: availableTags
    });


    // Dialogs
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



    // Vertical slider
    $("#slider-vertical").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 60,
        slide: function (event, ui) {
            $("#amount").val(ui.value);
        }
    });
    $("#amount").val($("#slider-vertical").slider("value"));


    // Split button
    $("#rerun").button().click(function () {
        alert("Running the last action");
    }).next().button({
        text: false,
        icons: {
            primary: "ui-icon-triangle-1-s"
        }
    }).click(function () {
        alert("Could display a menu to select an action");
    }).parent().buttonset();


    var $tab_title_input = $("#tab_title"),
        $tab_content_input = $("#tab_content");
    var tab_counter = 2;

    // tabs init with a custom tab template and an "add" callback filling in the content
    var $tabs = $("#tabs2").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a></li>",
        add: function (event, ui) {
            var tab_content = $tab_content_input.val() || "Tab " + tab_counter + " content.";
            $(ui.panel).append("<p>" + tab_content + "</p>");
        }
    });

    // modal dialog init: custom buttons and a "close" callback reseting the form inside
    var $dialog = $("#dialog2").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Add: function () {
                addTab();
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        open: function () {
            $tab_title_input.focus();
        },
        close: function () {
            $form[0].reset();
        }
    });

    // addTab form: calls addTab function on submit and closes the dialog
    var $form = $("form", $dialog).submit(function () {
        addTab();
        $dialog.dialog("close");
        return false;
    });

    // actual addTab function: adds new tab using the title input from the form above


    function addTab() {
        var tab_title = $tab_title_input.val() || "Tab " + tab_counter;
        $tabs.tabs("add", "#tabs-" + tab_counter, tab_title);
        tab_counter++;
    }

    // addTab button: just opens the dialog
    $("#add_tab").button().click(function () {
        $dialog.dialog("open");
    });

    // close icon: removing the tab on click
    // note: closable tabs gonna be an option in the future - see http://dev.jqueryui.com/ticket/3924
    $("#tabs span.ui-icon-close").live("click", function () {
        var index = $("li", $tabs).index($(this).parent());
        $tabs.tabs("remove", index);
    });

    // Filament datepicker
    $('#rangeA').daterangepicker();
    $('#rangeBa, #rangeBb').daterangepicker();


    // Dynamic tabs
    var $tab_title_input = $("#tab_title"),
        $tab_content_input = $("#tab_content");
    var tab_counter = 2;

    // tabs init with a custom tab template and an "add" callback filling in the content
    var $tabs = $("#tabs2").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a></li>",
        add: function (event, ui) {
            var tab_content = $tab_content_input.val() || "Tab " + tab_counter + " content.";
            $(ui.panel).append("<p>" + tab_content + "</p>");
        }
    });

    // modal dialog init: custom buttons and a "close" callback reseting the form inside
    var $dialog = $("#dialog2").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Add: function () {
                addTab();
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        open: function () {
            $tab_title_input.focus();
        },
        close: function () {
            $form[0].reset();
        }
    });

    // addTab form: calls addTab function on submit and closes the dialog
    var $form = $("form", $dialog).submit(function () {
        addTab();
        $dialog.dialog("close");
        return false;
    });

    // actual addTab function: adds new tab using the title input from the form above

    function addTab() {
        var tab_title = $tab_title_input.val() || "Tab " + tab_counter;
        $tabs.tabs("add", "#tabs-" + tab_counter, tab_title);
        tab_counter++;
    }

    // addTab button: just opens the dialog
    $("#add_tab").button().click(function () {
        $dialog.dialog("open");
    });

    // close icon: removing the tab on click
    // note: closable tabs gonna be an option in the future - see http://dev.jqueryui.com/ticket/3924
    $("#tabs span.ui-icon-close").live("click", function () {
        var index = $("li", $tabs).index($(this).parent());
        $tabs.tabs("remove", index);
    });


    // File input (using http://filamentgroup.com/lab/jquery_custom_file_input_book_designing_with_progressive_enhancement/)
    $('#file').customFileInput({
        button_position : 'right'
    });


    //Wijmo
    $("#menu1").wijmenu({ trigger: ".wijmo-wijmenu-item", triggerEvent: "click" });
    //$(".wijmo-wijmenu-text").parent().bind("click", function () {
    //    $("#menu1").wijmenu("hideAllMenus");
    //});
    //$(".wijmo-wijmenu-link").hover(function () {
    //    $(this).addClass("ui-state-hover");
    //}, function () {
    //    $(this).removeClass("ui-state-hover");
    //});

    //Toolbar
    $("#play, #shuffle").button();
    $("#repeat").buttonset();


});