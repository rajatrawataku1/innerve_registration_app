
var pr_code_value="innerve2k17";
var regex_value_for_college_name = /[a-zA-Z][a-zA-Z ]+/;
//var regex_value_for_college_name = /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/;
var regex_value_for_email_value= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
var regex_value_for_telephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

function login_function_for_frontend(){
  var pr_code_input = $("#pr_team_code_value").val();
  var college_name_value_input = $("#college_name_value_entry").val();

  if($("#pr_team_code_value").val()!="" && regex_value_for_college_name.test(college_name_value_input))
  {
    $(".preloader-wrapper").addClass("active");
    var main_data = {"pr_code_value_back":$("#pr_team_code_value").val(),"college_name_value_back":college_name_value_input};

    $.ajax({
        type: 'POST',
        crossOrigin:true,
        data: JSON.stringify(main_data),
            contentType: 'application/json',
                    url: 'http://ec2-54-162-178-71.compute-1.amazonaws.com/authorisation',
                    success: function(data) {
                        console.log('success');
                        console.log(JSON.stringify(data.val));
                        if(data.val=="valid_authorisation")
                        {
                          $(".preloader-wrapper").removeClass("active");
                          $("#colege_name_value_out").val($("#college_name_value_entry").val());
                          $("#starting_page_pr_team").css("display","none");
                          $("#colege_name_value_out").prop("readonly", true);
                          $("#registration_main_div").css("display","block");
                          $("#pr_team_code_value").val("");
                          $("#college_name_value_entry").val("");
                        }
                       else
                       if(data.val=="invalid_authorisation") {
                         $(".preloader-wrapper").removeClass("active");
                         $("#modal1").children().children().children().text("");
                         $("#modal1").children().children().children().append("Wrong PR Code");
                         $('#modal1').modal('open');
                         $("#pr_team_code_value").val("");
                       }
                      console.log(data.val);
                     },

                      error: function(){
                        $(".preloader-wrapper").removeClass("active");
                        $("#modal1").children().children().children().text("");
                        $("#modal1").children().children().children().append("Server error");
                        $('#modal1').modal('open');
                        $("#pr_team_code_value").val("");
                      }
          });
  }
  else {
      console.log("hello");
      $("#modal1").children().children().children().text("");
      if(pr_code_input=="")
      {
        $("#modal1").children().children().children().append("Enter PR CODE<br>");
      }

      if(college_name_value_input=="")
      {
        $("#modal1").children().children().children().append("Enter College Name (No Symbols are allowed) <br>");
      }
      else
        if(!regex_value_for_college_name.test(college_name_value_input))
      {
        $("#modal1").children().children().children().append("Enter College Name Properly");
      }
      $('#modal1').modal('open');
    }
}

function take_registraion_frontend_connect(){

  $(".btn").addClass("disabled");

  var team_name_input=  $("#team_name_value").val();
  var college_name_input = $("#colege_name_value_out").val();
  var telephone_input = $("#telephone_value").val();
  var email_input = $("#email_value").val();
  var team_leader_name_tatti = $("#team_leader_name_value").val();
  var event_type_tatti = $('select :selected').text();

  if(event_type_tatti!="" && regex_value_for_college_name.test(team_name_input) &&  regex_value_for_college_name.test(team_leader_name_tatti)  && team_name_input!="" && regex_value_for_telephone.test(telephone_input) && regex_value_for_email_value.test(email_input))
  {
    console.log('hello');
    $(".preloader-wrapper").addClass("active");

    var main_data = {"team_name_back":$("#team_name_value").val(),"colege_name_value_out_back":$("#colege_name_value_out").val(),"telephone_value_back":$("#telephone_value").val(),"email_value_back":$("#email_value").val(),"team_leader_name_back":$("#team_leader_name_value").val(),"event_name_value":$('#tatti :selected').text()};

    $.ajax({
        type: 'POST',
        crossOrigin:true,
        data: JSON.stringify(main_data),
            contentType: 'application/json',
                    url: 'http://ec2-54-162-178-71.compute-1.amazonaws.com/endpoint',
                    success: function(data) {
                        console.log('success');
                        console.log(JSON.stringify(data.val));
                        if(data.val=="Registred Sucessfully")
                        {
                          $(".preloader-wrapper").removeClass("active");
                          $("#modal1").children().children().children().text("");
                          $("#modal1").children().children().children().append("Registred Sucessfully. <br>"+$("#email_value").val()+" will receive confirmaion email shortly");
                          $('#modal1').modal('open');
                          $("#team_name_value").val("");
                          $("#telephone_value").val("");
                          $("#email_value").val("");
                          $("#team_leader_name_value").val("");
                          $("#tatti").val([]);
                          $('select').material_select('destroy');
                          $('select').material_select();
                          $(".btn").removeClass("disabled");
                       }
                       else
                       if(data.val=="Not Registred Sucessfully") {
                         $(".preloader-wrapper").removeClass("active");
                         $("#modal1").children().children().children().text("");
                         $("#modal1").children().children().children().append("Registred Sucessfully. <br>"+$("#email_value").val()+" will receive confirmaion email shortly");
                         $('#modal1').modal('open');
                         $("#team_name_value").val("");
                         $("#telephone_value").val("");
                         $("#email_value").val("");
                         $("#team_leader_name_value").val("");
                         $("#tatti").val([]);
                         $('select').material_select('destroy');
                         $('select').material_select();
                         $(".btn").removeClass("disabled");

                       }
                       else {
                         $(".preloader-wrapper").removeClass("active");
                         $("#modal1").children().children().children().text("");
                         $("#modal1").children().children().children().append("Registred Sucessfully. <br>"+$("#email_value").val()+" will receive confirmaion email shortly");
                         $('#modal1').modal('open');
                         $("#team_name_value").val("");
                         $("#telephone_value").val("");
                         $("#email_value").val("");
                         $("#team_leader_name_value").val("");
                         $("#tatti").val([]);
                         $('select').material_select('destroy');
                         $('select').material_select();
                         $(".btn").removeClass("disabled");

                        }
                        console.log(data.val);
                      }
                      ,
                      error: function(){

                        $(".preloader-wrapper").removeClass("active");
                        $("#modal1").children().children().children().text("");
                        $("#modal1").children().children().children().append("Not registered with error <br> Please try again");
                        $('#modal1').modal('open');
                        $("#team_name_value").val("");
                        $("#telephone_value").val("");
                        $("#email_value").val("");
                        $("#team_leader_name_value").val("");
                        $("#tatti").val([]);
                        $('select').material_select('destroy');
                        $('select').material_select();
                        $(".btn").removeClass("disabled");
                      }
          });
  }
  else {

    $("#modal1").children().children().children().text("");

    if(event_type_tatti=="")
    {
      $("#modal1").children().children().children().append("Select Your Event <br>");
    }

    if(team_name_input=="")
    {
      $("#modal1").children().children().children().append("Enter Team Name <br>");
    }
    else
    if(!regex_value_for_college_name.test(team_name_input))
    {
      $("#modal1").children().children().children().append("No Special Characters for Team Name  <br>");
    }

    if(team_leader_name_tatti=="")
    {
      $("#modal1").children().children().children().append("Enter Team Leader <br>");
    }
    else
    if(!regex_value_for_college_name.test(team_leader_name_tatti))
    {
      $("#modal1").children().children().children().append("No Special Characters for Team Leader Name  <br>");
    }

    if(telephone_input=="")
    {
      $("#modal1").children().children().children().append("Enter Telephone Number <br> ");
    }
    else
    if(!regex_value_for_telephone.test(telephone_input)){
      $("#modal1").children().children().children().append("Wrong Telephone Number <br>");
    }

    if(email_input=="")
    {
      $("#modal1").children().children().children().append("Enter Email Address <br>");
    }
    else
    if(!regex_value_for_email_value.test(email_input)) {
      $("#modal1").children().children().children().append("Wrong Email Address <br>");
    }
    $(".btn").removeClass("disabled");
    $('#modal1').modal('open');
  }
}
