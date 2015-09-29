var express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , app = express()
    , serialport = require('serialport')
    , keypress = require('keypress')
    , calibrator = require('./calibrator.js')
    , nconf = require('nconf')
    ,path = require('path');

///////////Load Configuration/
nconf.use('file', { file: './config.json' });
nconf.load();
//nconf.set('CommPortName', '/dev/ttyUSB0');
//nconf.set('CommPortBaud', '4800');
//nconf.set('WebPort', '8181');
//console.log(nconf.get('dessert'));






///Serial Port Params
//portName = "/dev/ttyUSB0";            // get port name from the command line
if(!nconf.get('CommPortName')){
    portName = "/dev/ttyUSB0";
    nconf.set('CommPortName',portName);
} else {
    portName = nconf.get('CommPortName');
    }
console.log ("The ComPort is set to " +portName);

//baud = 4800;
//baud = nconf.get('CommPortBaud');
if(!nconf.get('CommPortBaud')){
    baud = 4800;
    nconf.set('CommPortBaud',baud);
} else {
    baud = nconf.get('CommPortBaud');
}
console.log ("The ComPort Baud is set to " +baud);

//////////////////

/////////////////////

//webport = 8181;
//webport = nconf.get('WebPort');
if(!nconf.get('WebPort')){
    webport = 8080;
    nconf.set('WebPort',webport);
} else {
    webport = nconf.get('WebPort');
}
console.log ("The Web Port is set to " +webport);
///////////////////
//Save Configuration
nconf.save(function (err) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Configuration saved successfully.');
});




////////////



var CalIsotope,CalUnits,CalActivity,serialData,ScannedBarcode,LastBarCode,StatusString;
ScannedBarcode = "";
//////Set up web server

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(express.static(__dirname + '/Views'));
//Store all HTML files in views folder.
app.use(express.static(__dirname + '/Scripts'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){
    res.sendFile('index.html');
    //It will find and locate index.html from View or Scripts
});

app.get('/about',function(req,res){
    res.sendFile(path.join(__dirname + '/Views/about.html'));
});


app.get('/settings',function(req,res){
    res.sendFile(path.join(__dirname + '/Views/settings.html'));

});
app.post('/settings',function(req,res){
    var user = "Theo";
    console.log(user);
    res.render(path.join(__dirname + '/Views/settings.html'),{ user:user });

});

app.get('/data', function(req, res, next){

    //serialData ='~1 Tc-99m 35.1 1.293 GBq';
    //LastBarCode ='E2841 /n';

/*    var data = '{"data":[' +
        '{"CalibratorData":"'+serialData+'" , ' +
        '"BarcodeData":"'+ LastBarCode +'"}]}';*/
    //res.json({msg: 'This is CORS-enabled for all origins!'});
    if(!serialData){
        StatusString="No Comm";
        res.json({Status:StatusString,
            BarcodeData:LastBarCode});

    } else {

        res.json({
            Status: StatusString,
            CalIsotope: calibrator.IsotopeA100(serialData),
            CalActivity: calibrator.ActivityA100(serialData),
            CalUnits: calibrator.UnitsA100(serialData),
            BarcodeData: LastBarCode
        });
    }
//Erase LastBarcode when value has been retrieved
    LastBarCode = ""
});

app.get('/listports', function(req, res, next){

    var PortList = {
        options: []
    };


    var PortName="";
    var i = 0;
    serialport.list(function (err, ports) {
        ports.forEach(function(port) {
            i=i+1;
            //console.log(i);
            PortList.options.push({value: i+'', text: port.comName});
            //console.log(PortList);console.log("PortName=" + port.comName);
            //PortName = (port.comName);
            //PortList[PortName]  = "Test";
            //res.json({PortName:(port.comName)})
        });
        res.json(PortList);
        console.log(PortList);
    });



});


// accept get request at /user
app.get('/test', function (req, res) {
    res.send('Got a get request at /test');
    myPort.write("A\n C\n E\n G\n I\n J\n I\n G\n E\n C\n A\n");
});

// accept get request at /user
app.get('/resetcomm', function (req, res) {
    myPort.close();
    myPort.open();

    console.log("comm has been reset");
    res.send('Comm has been reset');
});

app.get('/reboot', function (req, res) {
    var exec = require('child_process').exec;
    exec('sudo reboot', function (error, stdout, stderr) {
        StatusString="Rebooting...";
        res.json({Status:StatusString});
        // output is in stdout
    });
});

app.get('/shutdown', function (req, res) {
    var exec = require('child_process').exec;
    exec('sudo shutdown -h now', function (error, stdout, stderr) {
        res.send('Shutting down....');
        // output is in stdout
    });
});

app.get('/control/:isotope', function(req, res) {
    var isotope = req.params.isotope;

    switch(isotope)
    {
        case "Tc-99m":
            console.log("A");
            myPort.write("A\n");
            break;
        case "Mo-99":
            console.log("B");
            myPort.write("B\n");
            break;
        case "Tl-201":
            console.log("C");
            myPort.write("C\n");
            break;
        case "I-123":
            console.log("D");
            myPort.write("D\n");
            break;
        case "Xe-133":
            console.log("E");
            myPort.write("E\n");
            break;
        case "Ga-67":
            console.log("F");
            myPort.write("F\n");
            break;
        case "In-111":
            console.log("G");
            myPort.write("G\n");
            break;
        case "I-131":
            console.log("H");
            myPort.write("H\n");
            break;
        case "Cs-137":
            console.log("I");
            myPort.write("I\n");
            break;
        case "Co-57":
            console.log("J");
            myPort.write("J\n");
            break;
        case "#2":
            console.log("K");
            myPort.write("K\n");
            break;
        case "#1":
            console.log("L");
            myPort.write("L\n");
            break;
        case "OTHER":
            console.log("M");
            myPort.write("M\n");
            break;
        case "BKGND":
            console.log("P");
            myPort.write("P\n");
            break;
        case "TEST":
            console.log("D");
            myPort.write("D\n");
            break;
        default:
            console.log("Not recognised Isotope");
        //res.send("Not recognised Isotope " +isotope);
    }





    res.send(isotope);
});



app.listen(webport, function(){
    console.log('CORS-enabled web server listening on port ' + webport);
});


/////////////////////////////

/////////////////Set up Serial Port Functions
SerialPort = serialport.SerialPort;    // make a local instance of it
var myPort = new SerialPort(portName, {
    baudRate: baud,
    // look for return and newline at the end of each data packet:
    parser: serialport.parsers.readline('\n')
});

// these are the definitions for the serial events:
myPort.on('open', showPortOpen);
myPort.on('data', saveLatestData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

// these are the functions called when the serial events occur:
function showPortOpen() {
    console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function saveLatestData(data) {
    console.log("Serial Data:"+data);
    serialData = data;
    StatusString = "OK";
}

function showPortClose() {
    console.log('port closed.');
    StatusString = "Comm Closed";
}

function showError(error) {
    console.log('Serial port error: ' + error);
    StatusString = "Comm Error";
}
///////////////////////////////////////////////


// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    //console.log('got "keypress"', ch); //original script

    ScannedBarcode = ScannedBarcode + ch;


    /*
     if (key.ctrl && key.name == 'c') {
     process.stdin.pause();
     }
     */
    if (key && key.name == 'enter') {

        //ScannedBarcode = ScannedBarcode; //Add +"/n" if CR is required
        console.log("Barcode:"+ScannedBarcode);
        LastBarCode = ScannedBarcode;
        ScannedBarcode ="";
    }
});
//process.stdin.setRawMode(true); //Use this to output one letter at a time
process.stdin.resume();
