function send_data_to_websocket(data, url) {
    // var socket = new WebSocket('ws://'+window.location.hostname+':8080/' + url);
    var socket = new WebSocket('ws://localhost:8080/' + url);
    
  
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
        set_result(js_tree);
        set_graph_cell_diam(js_tree);
        set_graph_cell_order(js_tree);
   
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
    document.getElementById('density').innerText = data['density'];
    document.getElementById('epaisseur').innerText = data['epaisseur'];
    document.getElementById('weight').innerText = data['weight'];
    document.getElementById('volume').innerText = data['volume'];
    document.getElementById('surface').innerText = data['surface'];
    document.getElementById('peri').innerText = data['peri'];
    document.getElementById('effectif').innerText = data['effectif'];
    document.getElementById('moy_diam').innerText = data['moy_diam'];
    document.getElementById('ecartype').innerText = data['ecartype'];
    document.getElementById('variance').innerText = data['variance'];
    document.getElementById('view').src="http://192.168.0.206/viewtest.jpg?" + new Date().getTime();
    
    document.getElementById('result').classList.add('show');

   
  }
  
  function remove_result() {
    document.getElementById('result').classList.remove('show');
  }



function set_graph_cell_diam(data) {
    var labelss= [];
    for(let i = 0;i<data['vect_cell_diam'].length;i++)
    labelss.push(i);


    var ctx = document.getElementById('graph_cell_diam').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:labelss,
            datasets: [{
                label: '# of Votes',
                data: data['vect_cell_diam'],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

function set_graph_cell_order(data) {
    var labelss= [];
    for(let i = 0;i<data['vect_cell_ord'].length;i++)
    labelss.push(i);


    var ctx = document.getElementById('vect_cell_ord').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:labelss,
            datasets: [{
                label: '# of Votes',
                data: data['vect_cell_ord'],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}