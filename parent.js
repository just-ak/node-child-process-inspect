console.log('Begin');
global.debugPort = 9230;

if(process.execArgv.indexOf('--debug')   !== -1)   {  
    console.log(`About to Fork ${global.debugPort}`);  
    process.execArgv.push('--debug='   + (global.debugPort++)); 
  }
  if( process.execArgv.indexOf('--inspect') !== -1) { 
    console.log(`About to Fork ${global.debugPort}`);  
    process.execArgv.push('--inspect=' + (global.debugPort++)); 
  }

var child = require('child_process').fork('./child.js');

child.send('This makes the client send 50 messages');


child.on('message',      
            function (c) {
                
                console.log("Got Message : " + JSON.stringify(c));
                
                if (c=="LastMessageExitNow") {
                    /*
                        On Receving the identifying last message text fromt the child,
                        complete any processing, and signal to the client that it is
                        now safe to exit.
                    */
                    child.send('exit');
                }
            }
        );


child.on('close', function () { console.log("Child Closed"); });
child.on('exit', function () { console.log("Child Exited"); });

console.log('End');
  

