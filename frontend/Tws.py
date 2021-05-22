import asyncio
import websockets
import json
import time
import logging


context = {
    'density': 0,
    'epaisseur': 0,
    'weight': 0,
    'volume': 0,
    'surface': 0,
    'peri': 0,
    'effectif': 0,
    'moy_diam': 0,
    'ecartype': 0,
    'variance': 0,
    # 'max_diam': 0,
    # 'min_diam': 0,
    'vect_cell_diam': [1, 2, 3, 2, 1],
    'vect_cell_ord': [1, 2, 3, 2, 1],
    
    
    
}


async def quality_test_handler(websocket):
    '''
    send action = {'action' : 'make_test','data' : j, } to start a test
    '''

    try:
        data = await websocket.recv()
        received_json = json.JSONDecoder().decode(data)
        print('data recevied from front end %s ', received_json)

        if received_json['action'] == 'make_test':
            print('sending data to client...')
            msg = json.JSONEncoder().encode(context)
        
            await websocket.send(msg)
            print('data sent')

        if received_json['action'] == 'reset_scale':
            pass

    except Exception as e:
        print(e)
        received_json['data'] = 'warning'
        msg = json.JSONEncoder().encode(received_json)
        await websocket.send(msg)
        print('warning sent to front end')


# Create websocket server
INTERFACE = {
    '/quality_test_handler': quality_test_handler,

}


async def connection_opened(websocket, path):

    print("websocket url path : %s", path)

    await INTERFACE[path](websocket)


def start_server():

    start_server = websockets.serve(connection_opened, "0.0.0.0", 8080)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


start_server()
