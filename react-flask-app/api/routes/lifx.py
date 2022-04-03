from tabnanny import check
import requests
from time import sleep
from pprint import pprint 
from flask import current_app as app, jsonify, request
import json

TOKEN = 'c04948bf6a6cf78326accb4adce7fa0e4366e5804894f62191f6977892e51c3e'

class LIFX:
    def __init__(self, token):
        self.token = token
        self.headers = {'Authorization': f'Bearer {self.token}'}
        # schema = json.load("lifxmap.json")
        # print(schema)
        self.house2 = {0: {'childIds': [],
                          'id': '',
                          'level': 'Account',
                          'name': 'lifxAccount'}
        #                 "homes": [
        #                     {
        #                         "homeName": "",
        #                         "id": "",
        #                         "home": {
        #                             "rooms": [
        #                                 {
        #                                     "roomName": "",
        #                                     "id": "",
        #                                     "room": [
        #                                         {
        #                                         "productName": "",
        #                                         "id": "",
        #                                         "power": "",
        #                                         "brightness": ""
        #                                         }
        #                                     ]
        #                                 }
        #                             ]
        #                         }
        #                     }
        #                 ]
                    }
        self.house = {'homes': {}}
        self.build_home()

    def status(self):
        response = requests.get('https://api.lifx.com/v1/lights/all', headers=self.headers)
        return response.json()

    def toggle_power(self, toggle, location=None, room=None, prod=None):

        state = {'power': toggle}

        if prod is not None:
            prods = f"id:{self.house[location]['rooms'][room]['products'][prod]['id']}"
        elif room is not None:
            prods = f"group_id:{self.house[location]['rooms'][room]['id']}"
        elif location is not None:
            prods = f"location_id:{self.house[location]['id']}"
        else:
            prods = 'all'

        response = requests.put(f'https://api.lifx.com/v1/lights/{prods}/state', data=state, headers=self.headers)
        return response.status_code
    
    # def power_off(self, location=None, room=None, prod=None):

        # if prod is not None:
        #     prods = f"id:{self.house[location]['rooms'][room]['products'][prod]['id']}"
        # elif room is not None:
        #     prods = f"group_id:{self.house[location]['rooms'][room]['id']}"
        # elif location is not None:
        #     prods = f"location_id:{self.house[location]['id']}"
        # else:
        #     prods = 'all'
        
        # state = {'power': 'off'}
        # response = requests.put(f'https://api.lifx.com/v1/lights/{prods}/state', data=state, headers=self.headers)
        # return response.status_code

    def toggle_power2(self, toggle, level, id):

        state = {'power': toggle}

        if level == 'product':
            prods = f"id:{id}"
        elif level == 'room': 
            prods = f"group_id:{level}"
        elif level == 'house':
            prods = f"location_id:{id}"
        else:
            prods = 'all'
            
        response = requests.put(f'https://api.lifx.com/v1/lights/{prods}/state', data=state, headers=self.headers)
        return response.status_code
    
    # def toggle_power3(self, level, id):

    #     state = {'duration': '1'}
  
    #     if level == 'product':
    #         prods = f"id:{id}"
    #     elif level == 'room': 
    #         prods = f"group_id:{level}"
    #     elif level == 'house':
    #         prods = f"location_id:{id}"
    #     else:
    #         prods = 'all'
        
    #     response = requests.put(f'https://api.lifx.com/v1/lights/{prods}/toggle', data=state, headers=self.headers)
    #     print(f'https://api.lifx.com/v1/lights/{prods}/toggle')
    #     return response.status_code
    

    def build_home(self):
        """ Builds a dictionary representation of each home regestered to the account. """

        products = self.status()
        print(products)
        for product in products:
            # pprint.pprint(product)

            location = product['location']
            location_id = location['id']
            location_name = location['name']

            if location_name not in self.house['homes'].keys():
                self.house['homes'][location_name] = {'id': location_id, 'rooms': {}}
            
            room = product['group']
            room_id = room['id']
            room_name = room['name']

            if room_id not in self.house['homes'][location_name]['rooms']:
                self.house['homes'][location_name]['rooms'] = {room_name: {'id': room_id, 'products': {}}}


            room_products = self.house['homes'][location_name]['rooms'][room_name]['products']
            room_products[product['label']] = {'brightness': product['brightness'],
                                            'power': product['power'],
                                            # 'name': product['label'],
                                            'id': product['id'],
                                            'product_type': product['product']['identifier']
                                            }


    def build_home2(self):
        """ Builds a dictionary representation of each home regestered to the account. """


        def check_existance(id):
            # if len(self.house.keys()) == 0:
            #     return False, 0

            for k in self.house.keys():
                if id == self.house[k]['id']:
                    return True, k

            return False, len(self.house.keys()) 

        products = self.status()
        pprint(products)

        for product in products:
            location = product['location']
            location_name = location['name']
            room = product['group']
 
            ### Check if the products location exists in the map, if not add it
            location_exists, lIndex = check_existance(location['id'])
            room_exists, rIndex = check_existance(room['id'])
            product_exists, pIndex= check_existance(product['id']) # Should always be false, so can probably get rid of
            
            print(location_exists, room_exists, product_exists)
            print(lIndex, rIndex, pIndex)

            if location_exists:
                if room_exists:
                    pass
                else:
                    self.house[rIndex] = {'level': 'room',
                                          'id': room['id'],
                                          'name': room['name'],
                                          'childIds': [pIndex+1]
                                         }
                    self.house[lIndex]['childIds'].append(rIndex)

            else:
                self.house[lIndex] = {'level': 'house',
                                      'id': location['id'],
                                      'name': location['name'],
                                      'childIds': [rIndex+1]
                                     }

                self.house[rIndex+1] = {'level': 'room',
                                      'id': room['id'],
                                      'name': room['name'],
                                      'childIds': [pIndex+2]
                                     }
                self.house[0]['childIds'].append(lIndex)


            print(pIndex + location_exists + room_exists)
            self.house[pIndex + (not location_exists) + (not room_exists)] = {'level': 'product',
                                                                  'id': product['id'],
                                                                  'name': product['label'],
                                                                  'power': product['power'],
                                                                  'childIds': []
                                                                 }
            pprint(self.house)



            # if location_name not in self.house['homes'].keys():
            #     self.house['homes'].append({'locationName': location_name, 
            #                                 'id': location_id, 
            #                                 'rooms': []})
            
            # room_id = room['id']
            # room_name = room['name']

            # if room_id not in self.house['homes'][location_name]['rooms']:
            #     self.house['homes'][location_name]['rooms'] = {room_name: {'id': room_id, 'products': {}}}


            # room_products = self.house['homes'][location_name]['rooms'][room_name]['products']
            # room_products[product['label']] = {'brightness': product['brightness'],
            #                                 'power': product['power'],
            #                                 # 'name': product['label'],
            #                                 'id': product['id'],
            #                                 'product_type': product['product']['identifier']
            #                                 }




            # self.house[location_id] = self.house.get(location_id, {'name': location_name, 'rooms': {}})
            # room = product['group']
            # print(self.house)
            # self.house[location_id]['rooms'] = self.house[location['id']].get(room['id'], {'name': room['name']})

            # self.house[location['id']]['rooms'][room['id']]['item'] = self.house[location['id']][room['id']].get(product['uuid'], {'uuid': {}})
            # self.house['name'] = product['label']


@app.route('/api/lifx/blueprint', methods=['POST', 'GET', 'PUT'])
def get_lifx_blueprint():
    lifx = LIFX(TOKEN)
    pprint(lifx.house)
    return lifx.house


@app.route('/api/lifx/blueprint2', methods=['POST', 'GET', 'PUT'])
def get_lifx_blueprint2():
    lifx = LIFX(TOKEN)
    pprint(lifx.house2)
    return lifx.house2

@app.route('/api/lifx/power', methods=['POST', 'GET', 'PUT'])
def control_lights():
    lifx = LIFX(TOKEN)


    r = request.get_json()
    print(r['toggle'])
    if r['toggle'].lower() == 'on':
        turn = 'off'
    else:
        turn = 'on'   
       
    for location in lifx.house['homes'].keys():
        for room in lifx.house['homes'][location]['rooms'].keys():
            for prod in lifx.house['homes'][location]['rooms'][room]['products'].keys():
                if lifx.house['homes'][location]['rooms'][room]['products'][prod]['id'] == r['id']:
                    break

    lifx.toggle_power2(toggle=turn, level=r['level'], id=r['id'])
    # lifx.toggle_power3(level=r['level'], id=r['id'])
    return jsonify({'power': turn, 'location': location, 'room': room, 'prod': prod})

# lifx = LIFX(TOKEN)

# # lifx.status()
# # lifx.toggle_power(toggle='on', location='Apartment')
# # sleep(2)
# # lifx.toggle_power(toggle='off', location='Apartment', room='Bedroom', prod='Lamp')
# # lifx.status()
# pprint(lifx.house)

# control_lights(toggle='on', location='Apartment')
# sleep(2)
# control_lights(toggle='off', location='Apartment', room='Bedroom', prod='Lamp')
