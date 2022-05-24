from lifxlan import LifxLAN

lifx = LifxLAN()



# import requests
# from time import sleep
# import pprint
# from flask import current_app as app, jsonify, request


# TOKEN = 'c04948bf6a6cf78326accb4adce7fa0e4366e5804894f62191f6977892e51c3e'

# class LIFX:
#     def __init__(self, token):
#         self.token = token
#         self.headers = {'Authorization': f'Bearer {self.token}'}
#         self.house = {}
#         self.build_home()

#     def status(self):
#         response = requests.get('https://api.lifx.com/v1/lights/all', headers=self.headers)
#         return response.json()

#     def toggle_power(self, toggle, location=None, room=None, prod=None):

#         state = {'power': toggle}

#         if prod is not None:
#             prods = f"id:{self.house[location]['rooms'][room]['products'][prod]['id']}"
#         elif room is not None:
#             prods = f"group_id:{self.house[location]['rooms'][room]['id']}"
#         elif location is not None:
#             prods = f"location_id:{self.house[location]['id']}"
#         else:
#             prods = 'all'

#         response = requests.put(f'https://api.lifx.com/v1/lights/{prods}/state', data=state, headers=self.headers)
#         return response.status_code
    
#     # def power_off(self, location=None, room=None, prod=None):

#         # if prod is not None:
#         #     prods = f"id:{self.house[location]['rooms'][room]['products'][prod]['id']}"
#         # elif room is not None:
#         #     prods = f"group_id:{self.house[location]['rooms'][room]['id']}"
#         # elif location is not None:
#         #     prods = f"location_id:{self.house[location]['id']}"
#         # else:
#         #     prods = 'all'
        
#         # state = {'power': 'off'}
#         # response = requests.put(f'https://api.lifx.com/v1/lights/{prods}/state', data=state, headers=self.headers)
#         # return response.status_code

#     # def toggle_power2(self, toggle, level, id):

#     #     state = {'power': toggle}

#     #     if level == 'product':
#     #         prods = f"id:{id}"
#     #     elif level == 'room': 
#     #         prods = f"group_id:{level}"
#     #     elif level == 'house':
#     #         prods = f"location_id:{id}"
#     #     else:
#     #         prods = 'all'
            
#     #     response = requests.put(f'https://api.lifx.com/v1/lights/{prods}/state', data=state, headers=self.headers)
#     #     return response.status_code
    
#     def toggle_power3(self, level, id):

#         state = {'duration': '1'}
  
#         if level == 'product':
#             prods = f"id:{id}"
#         elif level == 'room': 
#             prods = f"group_id:{level}"
#         elif level == 'house':
#             prods = f"location_id:{id}"
#         else:
#             prods = 'all'
        
#         response = requests.put(f'https://api.lifx.com/v1/lights/{prods}/toggle', data=state, headers=self.headers)
#         print(f'https://api.lifx.com/v1/lights/{prods}/toggle')
#         return response.status_code
    

#     def build_home(self):
#         """ Builds a dictionary representation of each home regestered to the account. """

#         products = self.status()
#         for product in products:
#             # pprint.pprint(product)

#             location = product['location']
#             location_id = location['id']
#             location_name = location['name']

#             if location_name not in self.house:
#                 self.house[location_name] = {'id': location_id, 'rooms': {}}
            
#             room = product['group']
#             room_id = room['id']
#             room_name = room['name']

#             if room_id not in self.house[location_name]['rooms']:
#                 self.house[location_name]['rooms'] = {room_name: {'id': room_id, 'products': {}}}


#             room_products = self.house[location_name]['rooms'][room_name]['products']
#             room_products[product['label']] = {'brightness': product['brightness'],
#                                             'power': product['power'],
#                                             # 'name': product['label'],
#                                             'id': product['id'],
#                                             'product_type': product['product']['identifier']
#                                             }

#             # self.house[location_id] = self.house.get(location_id, {'name': location_name, 'rooms': {}})
#             # room = product['group']
#             # print(self.house)
#             # self.house[location_id]['rooms'] = self.house[location['id']].get(room['id'], {'name': room['name']})

#             # self.house[location['id']]['rooms'][room['id']]['item'] = self.house[location['id']][room['id']].get(product['uuid'], {'uuid': {}})
#             # self.house['name'] = product['label']


# @app.route('/api/lifx/blueprint', methods=['POST', 'GET', 'PUT'])
# def get_lifx_blueprint():
#     lifx = LIFX(TOKEN)
#     print(lifx.house)
#     return lifx.house

# @app.route('/api/lifx/power', methods=['POST', 'GET', 'PUT'])
# def control_lights():

#     r = request.get_json()

#     if r['isOn'] is True:
#         toggle = 'off'
#     else:
#         toggle = 'on'   
       
    
#     lifx = LIFX(TOKEN)
#     lifx.toggle_power3(level=r['level'], id=r['id'])
#     return jsonify(f'Lights turned {toggle}')

# # lifx = LIFX(TOKEN)
# # lifx.status()
# # lifx.toggle_power(toggle='on', location='Apartment')
# # sleep(2)
# # lifx.toggle_power(toggle='off', location='Apartment', room='Bedroom', prod='Lamp')
# # lifx.status()
# # pprint.pprint(lifx.house)

# # control_lights(toggle='on', location='Apartment')
# # sleep(2)
# # control_lights(toggle='off', location='Apartment', room='Bedroom', prod='Lamp')
