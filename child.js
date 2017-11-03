process.on('message', function(c) {
 
    if (c=="exit") {
        /* Only Exit the Client when the Parent has finished 
           processing all the messages, and tells the client
           it is save to exit
        */
        process.exit();
    }
    b=0;
    while (b<51) {
    process.send(b++);
    }
    /*
        Send a identifiable last message to tell the parent that the client has 
        now sent all the messages that it will send and can be exited. 
    */
    setTimeout(function() {
        process.send('LastMessageExitNow');
    }, 100000);
    

});
