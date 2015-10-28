var net = require('net');
var sleep = require('sleep');

var port = process.env.port || 2300;

net.createServer(function (connection) {
  
  connection.name = connection.remoteAddress;
  console.log("Client [" + connection.name + "] connected.\n")
  
  connection.on('data', function (data) {
    
    console.log("Receive data: " + data);
    
    if(data.toString().trim() === 'smdr') validate();
    if(data.toString().trim() === 'PCCSMDR') sendSmdr();
    
  });

  connection.on('end', function () {
    
    console.log("Client [" + connection.name + "] disconnected.\n")
    
  });
  
  function validate(){
    
      console.log("Sending enter password ...");
      connection.write("Enter Password: ")
      
  };
  
  function sendSmdr(){
    
    console.log("Receive valid password")
      
    connection.write("081313 1610 0036 00338 9                             41101        62485755               033                    \n");
    sleep.sleep(2);
    connection.write("081313 1652 0005 00034 7  *00 *799                   66000           13537                   116                \n");
    sleep.sleep(1);
    connection.write("081313 1726 0000 00000 E                              7392            *791         \n");
  
  }
  
}).listen(port);

console.log("Chat server running at port " + port + "\n");