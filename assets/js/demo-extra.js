$(function(){
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
    if ($.fn.jqGrid){
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
    }
})