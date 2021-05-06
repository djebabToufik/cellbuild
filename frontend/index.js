function send_data_to_websocket(data, url) {
  var socket = new WebSocket('ws://'+window.location.hostname+':8080/' + url);

  socket.onopen = function(e) {
    console.log("[open] Connection established");
    console.log("Sending to server");

    socket.send(JSON.stringify(data));
  };
  
  socket.onmessage = function(event) {
      console.log('received data')
      var js_tree = JSON.parse(event.data);
      console.log(js_tree);
      //document.getElementById("result").innerText = event.data;
      stop_waiting_window();
      if (js_tree['data']!=-1)
      set_result(js_tree['data']) 
  
  };
  
  socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {

      console.log('[close] Connection died');
    }
  };
  
  socket.onerror = function(error) {
    console.log(`[error] ${error.message}`);
  };


}
  
URL_QUALITY_HANDLER = "quality_test_handler";
URL_LINE_DATA = "line_data_handler"

  function get_test() {

    var j = {
      'production_id':5,
        'supervisor_id' : 7,
        'weight': 0,
        'Area':0 ,
        'circumference': 0,
        'z': 0,
        'density': 0,
        'note' : 'from IOTEXM100',
        'csrfmiddlewaretoken':'' 
    
    }
    
var action = {
    'action' : 'make_test',
    'data' : j,

}
send_data_to_websocket(action,URL_QUALITY_HANDLER)

start_waiting_window()
  }

  function reset_scale() {

    var j = {
      'production_id':5,
        'supervisor_id' : 7,
        'weight': 0,
        'Area':0 ,
        'circumference': 0,
        'z': 0,
        'density': 0,
        'note' : 'from IOTEXM100',
        'csrfmiddlewaretoken':'' 
    
    }
    
var action = {
    'action' : 'reset_scale',
    'data' : j,

}
send_data_to_websocket(action,URL_QUALITY_HANDLER)

start_waiting_window()
  }

function start_waiting_window() {
  var wait = document.getElementById('wait');
  wait.classList.add('show');
}



function stop_waiting_window() {
  var wait = document.getElementById('wait');
  wait.classList.remove('show');
}

function set_result(data) {
  var view = document.getElementById('view');
  // var test = document.getElementById('test');
  var result = document.getElementById('result');
  view.parentNode.removeChild(view);
  // test.parentNode.removeChild(test);
  document.getElementById('area').innerText = data['Area'];
  document.getElementById('circumference').innerText = data['circumference'];
  document.getElementById('weight').innerText = data['weight'];
  document.getElementById('thickness').innerText = data['z'];
  document.getElementById('density').innerText = data['density'];
  result.classList.add('show');
  var p = document.createElement('p');
  var img2 = document.createElement('img');
  // img2.setAttribute('src','view.jpg' + new Date().getTime());
  img2.src="http://192.168.0.5/viewtest.jpg?" + new Date().getTime();
  p.setAttribute('id','view');
  p.appendChild(img2);
  document.getElementById('result').appendChild(p);
  // var p2 = document.createElement('p');
  // var img2 = document.createElement('img');
  // img2.src="http://192.168.0.5/test.jpg?" + new Date().getTime();
  // p2.setAttribute('id','test');
  // p2.appendChild(img2);
  // document.getElementById('result').appendChild(p2);
 
} 

function remove_result() {
  document.getElementById('result').classList.remove('show');
}