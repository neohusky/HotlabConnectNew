/**
 * Created by theokitsos on 3/06/15.
 */


exports.IsotopeA100 = function (r) {

    var Isotope;


    Isotope = r.substr(0,9); //left 9
//~1 Tc-99m

    Isotope = Isotope.substr(-6); //right 6
//Tc-99m

    Isotope  = Isotope.trim();
//Tc-99m


//console.log(Activity);
//console.log(Units);

    return Isotope;



};

exports.ActivityA100 = function (r) {

    Units = r.substr(-3);
    Units = Units.trim();

// console.log(Units);

    ActivityString = r.substr(-11);
//  console.log(ActivityString)
    ActivityString = ActivityString.substr(0,7);//removes units
    ActivityString = ActivityString.trim();
    Activity = parseFloat(ActivityString);

    if (Units == "GBq"){
	//Console.log("Units is GBq");
        Activity = Activity * 1000;
	//Console.log(Activity);
        Units = "MBq"
    }

    if (Activity <0){
        Activity = 0;
    }
//console.log(Activity);
//console.log(Units);

    return Activity;


};
exports.UnitsA100 = function (r) {

    var Isotope;
    var Units;
    var Activity;
    var ActivityString;

    Units = r.substr(-3);
    Units = Units.trim();

// console.log(Units);

    ActivityString = r.substr(-10);

    ActivityString = ActivityString.substr(0,7);//removes units
    ActivityString = ActivityString.trim();
    Activity = parseFloat(ActivityString);

    if (Units = "GBq"){
        Activity = Activity * 1000;
        Units = "MBq"
    }

//console.log(Activity);
//console.log(Units);

    return Units

};


/*



 Isotopestring = Left(inputstring, 9);
 Isotopestring = Right(Isotopestring, 6); //removes the tilde
 Isotopestring = Trim(Isotopestring); //removes the blanks


 //////////////////////////Check units are SI
 Unitstring = Right(inputstring, 3)
 Unitstring = Trim(Unitstring)
 If Unitstring = "GBq" Or Unitstring = "MBq" Then
 // do nothing as this is the correct string/units
 Else
 MsgBox "The calibrator is not set to SI units.  Please correct and retry.", vbCritical, "Error- non-SI units."
 Exit Function
 End If


 'Get the activity
 Activitystring = Right(inputstring, 11)
 Activitystring = Left(Activitystring, 7) 'removes units
 Activitystring = Trim(Activitystring)  'removes blanks

 'check activity measured is not negative
 If Left(Activitystring, 1) = "-" Then
 MsgBox "The calibrator reading is negative.  Please check the calibrator and retry, or seek assistance.", vbCritical, "Error- negative units."
 Exit Function
 End If

 'change activity string to single data type for maths.

 'Convertedactivitystring = CSng(Activitystring)
 Convertedactivitystring = CDbl(Activitystring) 'Changed to doble to allow for decimal value


 ' Check units and if GBq then multiply by 1000. Need to round the integer for decimal point after any multiplication.
 If Unitstring = "GBq" Then
 Convertedactivitystring = Convertedactivitystring * 1000
 End If
 ' Don't want to strip Decimal 'strip decimal points

 'Convertedactivitystring = Int(Convertedactivitystring) 'debug note- this may have to be a double not a single.



 */
