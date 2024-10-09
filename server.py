from hunter import Hunter, Puppet, Beast, Gun, Prophet
from agent import Agent, Cobra, Orangutan, Spider, Bluejay
from equipment import Equipment, PowerFists, VelocityBlade, HoloDecoy, TangleLine, AdrenalSurge, FlashBang, SmokeGrenade, StealthField
from flask import Flask, render_template, request
import random

app = Flask(__name__)
alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
item_classes = {
    'fists': PowerFists,
    'blade': VelocityBlade,
    'decoy': HoloDecoy,
    'tangle': TangleLine,
    'surge': AdrenalSurge,
    'flash': FlashBang,
    'stealth': StealthField,
    'smoke': SmokeGrenade,
    'surge2': AdrenalSurge,
    'flash2': FlashBang,
    'stealth2': StealthField,
    'smoke2': SmokeGrenade
}

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/options', methods=['GET'])
def option_page():
    return render_template("options.html")

@app.route('/start-game', methods=['POST'])
def start_game():
    agent_name = request.form.get('character')
    hunters = request.form.getlist('opponent')
    equipment = request.form.getlist('equipment')

    agent_class = globals()[agent_name]
    agent = agent_class(portrait_img=f"static/{agent_name.lower()}.jpg", mini_icon=f"static/{agent_name.lower()}_head.png")
    agent.position = "N1"
    for item_name in equipment:
        item_class = item_classes.get(item_name)
        if item_class:
            item_instance = item_class()
            agent.equip_item(item_instance)


    print(hunters)
    print(equipment)

    return render_template('game.html', agent=agent, alphabet=alphabet)

if __name__ == "__main__":
    app.run(debug=True)